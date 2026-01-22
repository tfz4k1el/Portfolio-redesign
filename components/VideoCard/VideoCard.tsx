import React from 'react';
import { VideoPlayer } from '../ui/VideoPlayer';
import styles from './VideoCard.module.css';

interface VideoCardProps {
  title: string;
  role: string;
  description: string;
  tags: string[];
  videoUrl?: string;
  tweetId?: string; // Kept for interface compatibility but unused
}

const VideoCard: React.FC<VideoCardProps> = ({
  title,
  role,
  description,
  tags,
  videoUrl,
}) => {
  return (
    <div className={styles.card}>
      <div className={styles.content}>
        <div>
            <div className={styles.tagList}>
                {tags.map((tag, index) => (
                <span key={index} className="flex items-center">
                    {index > 0 && <span style={{ margin: '0 0.5rem', color: 'var(--text-secondary)' }}>/</span>}
                    {tag}
                </span>
                ))}
            </div>

            <h2 className={styles.title}>
                {title}
            </h2>
            
            <div className={styles.role}>
                ROLE: {role}
            </div>
        </div>

        <p className={styles.description}>
            {description}
        </p>
      </div>

      <div className={styles.visualContainer}>
        {videoUrl ? (
            <VideoPlayer src={videoUrl} autoPlay={true} />
        ) : (
            <div className="w-full h-full flex items-center justify-center bg-gray-900 text-gray-500">
                {/* Fallback for no video */}
                No Video Source
            </div>
        )}
      </div>
    </div>
  );
};

export default VideoCard;
