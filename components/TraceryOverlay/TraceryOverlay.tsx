import React, { useRef, useEffect, useState } from "react";
import styles from "./TraceryOverlay.module.css";

interface TraceryOverlayProps {
    enabled?: boolean;
}

const TraceryOverlay: React.FC<TraceryOverlayProps> = ({ enabled = true }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const playPromiseRef = useRef<Promise<void> | null>(null);
  
  // State for targets
  const targetsRef = useRef<Set<Element>>(new Set());
  const visibleTargetsRef = useRef<Set<Element>>(new Set());
  
  // Element decorative state
  const elementState = useRef<WeakMap<Element, {
    corner: number;
    leaderLen: number;
    text: string;
  }>>(new WeakMap());

  // Tech "deco" text options
  const techProps = [
    "display: block", "z-index: 4", "opacity: 1", "overflow: hidden", 
    "matrix(1,0,0,1,0,0)", "pointer-events: none", "transform: translateZ(0)",
    "will-change: transform", "filter: blur(0px)", "status: pending"
  ];

  // --- AUDIO SETUP ---
  useEffect(() => {
    if (typeof window !== 'undefined') {
        const audio = new Audio('/binary-effect.m4a');
        audio.loop = true;
        audio.volume = 0.5;
        audioRef.current = audio;

        // Unlock AudioContext on first interaction
        const unlock = () => {
            if (audioRef.current) {
                const p = audioRef.current.play();
                if (p !== undefined) {
                    p.then(() => {
                        audioRef.current?.pause();
                        if (audioRef.current) audioRef.current.currentTime = 0;
                    }).catch(() => {});
                }
            }
            ['click', 'touchstart', 'keydown'].forEach(evt => 
                window.removeEventListener(evt, unlock)
            );
        };

        ['click', 'touchstart', 'keydown'].forEach(evt => 
            window.addEventListener(evt, unlock, { once: true, passive: true })
        );
    }
    
    return () => {
        if (audioRef.current) {
            audioRef.current.pause();
            audioRef.current = null;
        }
    };
  }, []);

  // --- TARGET TRACKING (Mutation + Intersection) ---
  useEffect(() => {
      if (!enabled) return;

      const observerOptions = {
          root: null,
          rootMargin: "50px",
          threshold: 0
      };

      const intersectionObserver = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
              if (entry.isIntersecting) {
                  visibleTargetsRef.current.add(entry.target);
                  
                  // Init state if needed
                  if (!elementState.current.has(entry.target)) {
                      elementState.current.set(entry.target, {
                        corner: Math.floor(Math.random() * 4),
                        leaderLen: 10 + Math.random() * 20,
                        text: techProps[Math.floor(Math.random() * techProps.length)]
                    });
                  }
              } else {
                  visibleTargetsRef.current.delete(entry.target);
              }
          });
      }, observerOptions);

      const updateTargets = () => {
          const selector = 'img, h1, h2, h3, h4, h5, h6, p, a, button, ul, li, form, input, textarea, code, pre, blockquote, .trace-me';
          const currentDefaults = new Set(document.querySelectorAll(selector));
          
          // Add new targets to observer
          currentDefaults.forEach(el => {
              if (!targetsRef.current.has(el)) {
                  targetsRef.current.add(el);
                  intersectionObserver.observe(el);
              }
          });

          // Remove old targets (optional, but good for cleanup)
          targetsRef.current.forEach(el => {
              if (!currentDefaults.has(el)) {
                  targetsRef.current.delete(el);
                  intersectionObserver.unobserve(el);
                  visibleTargetsRef.current.delete(el);
              }
          });
      };

      // Initial scan
      updateTargets();

      // Watch for DOM changes
      const mutationObserver = new MutationObserver((mutations) => {
          // Simple debounce could be added here if needed
          updateTargets();
      });
      mutationObserver.observe(document.body, { childList: true, subtree: true });

      return () => {
          intersectionObserver.disconnect();
          mutationObserver.disconnect();
          targetsRef.current.clear();
          visibleTargetsRef.current.clear();
      };
  }, [enabled]);

  // --- RENDER & SCROLL LOOP ---
  useEffect(() => {
    if (!enabled) return;
    
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let isScrolling = false;
    let scrollTimeout: NodeJS.Timeout;
    let animationFrameId: number;
    let frameCount = 0;

    const stopAudio = () => {
        if (audioRef.current) {
            audioRef.current.pause();
            audioRef.current.currentTime = 0;
        }
    };

    const handleScroll = () => {
        if (!isScrolling) {
            isScrolling = true;
            // Start Audio safely
            if (audioRef.current) {
                playPromiseRef.current = audioRef.current.play();
                if (playPromiseRef.current) {
                    playPromiseRef.current.catch(e => {
                        // Expected if user hasn't interacted yet
                        // console.debug("Audio play blocked", e);
                    });
                }
            }
        }
        
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
            isScrolling = false;
            // Clear canvas
            if (ctx && canvas) {
                 const dpr = window.devicePixelRatio || 1;
                 ctx.clearRect(0, 0, canvas.width, canvas.height); // Using scaled dims handled below?
                 // Actually clearRect uses coordinate space
                 ctx.clearRect(0, 0, canvas.width / (window.devicePixelRatio || 1), canvas.height / (window.devicePixelRatio || 1));
            }
            
            // Stop Audio safely
            if (playPromiseRef.current) {
                playPromiseRef.current.then(() => stopAudio()).catch(() => stopAudio());
            } else {
                stopAudio();
            }
        }, 150);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    // Handle Resize
    const handleResize = () => {
        const dpr = window.devicePixelRatio || 1;
        canvas.width = window.innerWidth * dpr;
        canvas.height = window.innerHeight * dpr;
        ctx.scale(dpr, dpr);
        canvas.style.width = `${window.innerWidth}px`;
        canvas.style.height = `${window.innerHeight}px`;
    };
    window.addEventListener('resize', handleResize);
    handleResize();

    // Animation Loop
    const render = () => {
      animationFrameId = requestAnimationFrame(render);
      
      if (!isScrolling) return;

      frameCount++;
      const updateText = frameCount % 4 === 0; // Slow down text updates slightly for perf

      const dpr = window.devicePixelRatio || 1;
      // Clear with correct bounds
      ctx.clearRect(0, 0, canvas.width / dpr, canvas.height / dpr);
      
      const overlayColor = getComputedStyle(document.documentElement).getPropertyValue('--overlay-color').trim() || '#FFFFFF';
      
      ctx.strokeStyle = overlayColor; 
      ctx.lineWidth = 1;
      ctx.setLineDash([]);
      ctx.fillStyle = overlayColor;
      
      const fontMono = getComputedStyle(document.documentElement).getPropertyValue('--font-mono').trim() || 'monospace';
      ctx.font = `500 10px ${fontMono}`;

      // Only iterate visible targets
      visibleTargetsRef.current.forEach(el => {
            const rect = el.getBoundingClientRect(); 
            // Double check visibility in viewport (getBoundingClientRect is fast enough for <50 items)
             if (rect.width === 0 || rect.height === 0) return;

             let state = elementState.current.get(el);
             if (!state) return; // Should exist from intersection observer

             if (updateText) {
                 state.text = techProps[Math.floor(Math.random() * techProps.length)];
             }

             // Drawing Logic (Same as before)
             const bracketLen = 12; // Slightly smaller
             const gap = 2;
             const x = rect.left - gap;
             const y = rect.top - gap;
             const w = rect.width + (gap * 2);
             const h = rect.height + (gap * 2);

             ctx.beginPath();
             // Top-Left
             ctx.moveTo(x, y + bracketLen); ctx.lineTo(x, y); ctx.lineTo(x + bracketLen, y);
             // Top-Right
             ctx.moveTo(x + w - bracketLen, y); ctx.lineTo(x + w, y); ctx.lineTo(x + w, y + bracketLen);
             // Bottom-Right
             ctx.moveTo(x + w, y + h - bracketLen); ctx.lineTo(x + w, y + h); ctx.lineTo(x + w - bracketLen, y + h);
             // Bottom-Left
             ctx.moveTo(x + bracketLen, y + h); ctx.lineTo(x, y + h); ctx.lineTo(x, y + h - bracketLen);
             ctx.stroke();

             // Connecting Line & Text
             const { corner, leaderLen, text } = state;
             ctx.beginPath();
             let textX = 0, textY = 0;

             switch(corner) {
                case 0: // TL
                    ctx.moveTo(x, y); ctx.lineTo(x - leaderLen, y - leaderLen);
                    textX = x - leaderLen; textY = y - leaderLen - 4; ctx.textAlign = 'right'; break;
                case 1: // TR
                    ctx.moveTo(x + w, y); ctx.lineTo(x + w + leaderLen, y - leaderLen);
                    textX = x + w + leaderLen; textY = y - leaderLen - 4; ctx.textAlign = 'left'; break;
                case 2: // BL
                    ctx.moveTo(x, y + h); ctx.lineTo(x - leaderLen, y + h + leaderLen);
                    textX = x - leaderLen; textY = y + h + leaderLen + 10; ctx.textAlign = 'right'; break;
                case 3: // BR
                    ctx.moveTo(x + w, y + h); ctx.lineTo(x + w + leaderLen, y + h + leaderLen);
                    textX = x + w + leaderLen; textY = y + h + leaderLen + 10; ctx.textAlign = 'left'; break;
             }
             ctx.stroke();
             ctx.fillText(text, textX, textY);
      });
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(scrollTimeout);
    };
  }, [enabled]);

  return <canvas ref={canvasRef} className={styles.canvas} />;
};

export default TraceryOverlay;
