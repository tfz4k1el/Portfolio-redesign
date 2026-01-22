import React from 'react';
import styles from './WideCard.module.css';

interface WideCardProps {
  title: string;
  role: string;
  description: string;
  desktopImg?: string;
  mobileImg?: string;
  mobileImages?: (string | string[])[];
  tags: string[];
  desktopScrollDuration?: string;
  mobileScrollDuration?: string;
}

const WideCard: React.FC<WideCardProps> = ({
  title,
  role,
  description,
  desktopImg,
  mobileImg,
  mobileImages,
  tags,
  desktopScrollDuration = "2s",
  mobileScrollDuration = "2.5s"
}) => {
  return (
    <div 
        className={styles.card}
        style={{
            '--desktop-duration': desktopScrollDuration,
            '--mobile-duration': mobileScrollDuration
        } as React.CSSProperties}
    >
      
      <div className={styles.backgroundGrid} />

      <div className={styles.content}>
        <div>
            <div className={styles.tagList}>
                {tags.map((tag, index) => (
                <span key={index} className="flex items-center">
                    {index > 0 && <span className="mr-3 text-gray-600">/</span>}
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
        {mobileImages ? (
            <div className={styles.scrollGrid}>
                {mobileImages.map((column, colIndex) => {
                    const images = Array.isArray(column) ? column : [column];
                    const isEven = colIndex === 1;
                    return (
                        <div key={colIndex} className={styles.scrollColumn}>
                             <div className={`${styles.slideTrack} ${isEven ? styles.columnEven : styles.columnOdd}`}>
                                {images.map((src, imgIndex) => (
                                    <img key={imgIndex} src={src} className={styles.scrollImage} alt="" loading="lazy" />
                                ))}
                            </div>
                        </div>
                    );
                })}
            </div>
        ) : (
            <>
                <img
                    src={desktopImg}
                    alt="Desktop Preview"
                    className={styles.desktopImage}
                    loading="lazy"
                />
                
                <img
                    src={mobileImg}
                    alt="Mobile Preview"
                    className={styles.mobileImage}
                    loading="lazy"
                />
            </>
        )}
      </div>
    </div>
  );
};

export default WideCard;
