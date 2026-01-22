import React, { useRef, useState, useEffect } from 'react';

interface VideoPlayerProps {
  src: string;
  poster?: string;
  autoPlay?: boolean;
}

export const VideoPlayer: React.FC<VideoPlayerProps> = ({ src, poster, autoPlay = false }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(true); // Default muted for autoplay friendliness

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const updateProgress = () => {
      if (video.duration) {
        setProgress((video.currentTime / video.duration) * 100);
      }
    };

    video.addEventListener('timeupdate', updateProgress);
    return () => video.removeEventListener('timeupdate', updateProgress);
  }, []);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;

    if (isPlaying) {
      video.pause();
    } else {
      video.play();
    }
    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const video = videoRef.current;
    if (!video) return;
    const time = (Number(e.target.value) / 100) * video.duration;
    video.currentTime = time;
    setProgress(Number(e.target.value));
  };

  return (
    <div className="relative w-full h-full group bg-black overflow-hidden">
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        className="w-full h-full object-cover"
        autoPlay={autoPlay}
        loop
        muted={isMuted}
        onClick={togglePlay}
        playsInline
      />
      
      {/* Controls Overlay - Visible on Hover */}
      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
        
        {/* Play/Pause Center Button (Optional, can be removed for cleaner look, strictly Untitled UI often has it) */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <button 
                className="bg-white/20 backdrop-blur-sm p-4 rounded-full pointer-events-auto hover:bg-white/30 transition shadow-lg"
                onClick={togglePlay}
            >
                {isPlaying ? (
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="text-white">
                        <rect x="6" y="4" width="4" height="16" />
                        <rect x="14" y="4" width="4" height="16" />
                    </svg>
                ) : (
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="text-white ml-1">
                        <path d="M5 3L19 12L5 21V3Z" />
                    </svg>
                )}
            </button>
        </div>

        {/* Bottom Bar */}
        <div className="relative z-10 flex items-center gap-4 bg-black/20 backdrop-blur-md p-3 rounded-xl border border-white/10 w-full mb-1">
            <button onClick={togglePlay} className="text-white hover:text-gray-200">
                {isPlaying ? (
                     <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg>
                ) : (
                     <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="5 3 19 12 5 21 5 3"/></svg>
                )}
            </button>
            
            {/* Progress Bar */}
            <div className="flex-1 flex items-center">
                <input 
                    type="range" 
                    min="0" 
                    max="100" 
                    value={progress} 
                    onChange={handleSeek}
                    className="w-full h-1 bg-white/30 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:rounded-full"
                />
            </div>

            {/* Mute Button */}
            <button onClick={toggleMute} className="text-white hover:text-gray-200">
                {isMuted ? (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="1" y1="1" x2="23" y2="23"></line><path d="M9 9v6a3 3 0 0 0 5.12 2.12M15 9.34V4l-6.81 5H4v6h5.28"></path><path d="M17 9v.01"></path></svg>
                ) : (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path></svg>
                )}
            </button>
        </div>
      </div>
    </div>
  );
};
