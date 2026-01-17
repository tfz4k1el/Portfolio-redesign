import React, { useRef, useEffect } from "react";
import styles from "./TraceryOverlay.module.css";

interface TraceryOverlayProps {
    enabled: boolean;
}

const TraceryOverlay: React.FC<TraceryOverlayProps> = ({ enabled = true }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Initialize Audio
  useEffect(() => {
    // Only create audio instance once on client side
    if (typeof window !== 'undefined') {
        const audio = new Audio('/binary-effect.m4a');
        audio.loop = true;
        audio.volume = 0.5;
        audioRef.current = audio;
    }

    return () => {
        if (audioRef.current) {
            audioRef.current.pause();
            audioRef.current.currentTime = 0;
        }
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // 1. Gather Targets (Do this rarely, not every frame)
    const allTargets = Array.from(document.querySelectorAll('img, h1, h2, h3, h4, h5, h6, p, a, button, ul, li, form, input, textarea, code, pre, blockquote, .trace-me'));

    // 2. Track Scroll State
    let isScrolling = false;
    let scrollTimeout: NodeJS.Timeout;

    const handleScroll = () => {
        if (!isScrolling) {
            isScrolling = true;
            if (audioRef.current) {
                audioRef.current.play().catch(e => console.log("Audio play failed:", e));
            }
        }
        
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
            isScrolling = false;
            // Clear canvas when scrolling stops
            if (ctx && canvas) {
                 ctx.clearRect(0, 0, canvas.width, canvas.height);
            }
            // Stop Audio
            if (audioRef.current) {
                audioRef.current.pause();
                audioRef.current.currentTime = 0;
            }
        }, 150);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    let animationFrameId: number;
    let frameCount = 0;

    // Tech "deco" text to display
    const techProps = [
        "display: block", 
        "z-index: 4", 
        "opacity: 1", 
        "overflow: hidden", 
        "matrix(1,0,0,1,0,0)",
        "pointer-events: none",
        "transform: translateZ(0)",
        "will-change: transform",
        "filter: blur(0px)",
        "status: pending"
    ];

    // State for element stability (persistent corners/lengths)
    const elementState = new WeakMap<Element, {
        corner: number; // 0: TL, 1: TR, 2: BL, 3: BR
        leaderLen: number;
        text: string;
    }>();

    const render = () => {
      animationFrameId = requestAnimationFrame(render);
      
      if (!isScrolling) return;

      frameCount++;
      const updateText = frameCount % 2 === 0;

      // Draw Layer
      const dpr = window.devicePixelRatio || 1;
      ctx.clearRect(0, 0, canvas.width / dpr, canvas.height / dpr);
      
      // Common styles
      // Access theme variable --overlay-color for the drawing color
      const overlayColor = getComputedStyle(document.documentElement).getPropertyValue('--overlay-color').trim() || '#FFFFFF';
      
      ctx.strokeStyle = overlayColor; 
      ctx.lineWidth = 1;
      ctx.setLineDash([]); // Solid lines for camera focus
      ctx.fillStyle = overlayColor;
      ctx.font = '500 10px monospace';

      // Iterate ALL targets every frame
      allTargets.forEach(el => {
            const rect = el.getBoundingClientRect(); 
            
            // Optimization: Only process if on screen with buffer
            if (rect.width > 0 && rect.height > 0 && 
                rect.top >= -50 && rect.bottom <= window.innerHeight + 50) {
                
                // Get or Init State
                let state = elementState.get(el);
                if (!state) {
                    state = {
                        corner: Math.floor(Math.random() * 4),
                        leaderLen: 10 + Math.random() * 20,
                        text: techProps[Math.floor(Math.random() * techProps.length)]
                    };
                    elementState.set(el, state);
                }

                // Update text every 2 frames
                if (updateText) {
                    state.text = techProps[Math.floor(Math.random() * techProps.length)];
                }

                // Draw Camera Focus Corners (L-shapes)
                const bracketLen = 16; // Length of the corner arms
                const gap = 2; // Spacing from the element

                const x = rect.left - gap;
                const y = rect.top - gap;
                const w = rect.width + (gap * 2);
                const h = rect.height + (gap * 2);

                ctx.beginPath();
                
                // Top-Left
                ctx.moveTo(x, y + bracketLen);
                ctx.lineTo(x, y);
                ctx.lineTo(x + bracketLen, y);

                // Top-Right
                ctx.moveTo(x + w - bracketLen, y);
                ctx.lineTo(x + w, y);
                ctx.lineTo(x + w, y + bracketLen);

                // Bottom-Right
                ctx.moveTo(x + w, y + h - bracketLen);
                ctx.lineTo(x + w, y + h);
                ctx.lineTo(x + w - bracketLen, y + h);

                // Bottom-Left
                ctx.moveTo(x + bracketLen, y + h);
                ctx.lineTo(x, y + h);
                ctx.lineTo(x, y + h - bracketLen);
                
                ctx.stroke();

                // Draw Connecting Line & Text (Stable position)
                const { corner, leaderLen, text } = state;
                
                ctx.beginPath();
                let textX = 0;
                let textY = 0;

                switch(corner) {
                    case 0: // Top-Left
                        ctx.moveTo(x, y);
                        ctx.lineTo(x - leaderLen, y - leaderLen);
                        textX = x - leaderLen;
                        textY = y - leaderLen - 4;
                        ctx.textAlign = 'right';
                        break;
                    case 1: // Top-Right
                        ctx.moveTo(x + w, y);
                        ctx.lineTo(x + w + leaderLen, y - leaderLen);
                        textX = x + w + leaderLen;
                        textY = y - leaderLen - 4;
                        ctx.textAlign = 'left';
                        break;
                    case 2: // Bottom-Left
                        ctx.moveTo(x, y + h);
                        ctx.lineTo(x - leaderLen, y + h + leaderLen);
                        textX = x - leaderLen;
                        textY = y + h + leaderLen + 10;
                        ctx.textAlign = 'right';
                        break;
                    case 3: // Bottom-Right
                        ctx.moveTo(x + w, y + h);
                        ctx.lineTo(x + w + leaderLen, y + h + leaderLen);
                        textX = x + w + leaderLen;
                        textY = y + h + leaderLen + 10;
                        ctx.textAlign = 'left';
                        break;
                }
                
                ctx.stroke();
                ctx.fillText(text, textX, textY);
            }
      });
    };

    // Handle Resize with High DPI Support
    const handleResize = () => {
        const dpr = window.devicePixelRatio || 1;
        canvas.width = window.innerWidth * dpr;
        canvas.height = window.innerHeight * dpr;
        
        ctx.scale(dpr, dpr);
        
        // Fix CSS size
        canvas.style.width = `${window.innerWidth}px`;
        canvas.style.height = `${window.innerHeight}px`;
    };
    window.addEventListener('resize', handleResize);
    handleResize(); // Init size

    render(); // Start Loop

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(scrollTimeout);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={styles.canvas}
    />
  );
};

export default TraceryOverlay;
