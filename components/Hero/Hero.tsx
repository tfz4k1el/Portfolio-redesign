import React from 'react';
import { motion } from 'framer-motion';
import { COLORS } from '../../constants';
import { Section } from '../Section/Section';
import styles from './Hero.module.css';

const MountainWireframe = () => (
  <svg
    className={styles.wireframe}
    viewBox="0 0 1440 400"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    preserveAspectRatio="none"
  >
    <path
      d="M0 400L200 300L350 380L500 150L650 350L800 200L950 380L1100 250L1250 350L1440 400"
      stroke={COLORS.white}
      strokeWidth="1"
      vectorEffect="non-scaling-stroke"
    />
    <path
      d="M100 400L300 350L450 390L600 250L750 380L900 280L1050 390L1200 300L1440 400"
      stroke={COLORS.blue}
      strokeWidth="0.5"
      vectorEffect="non-scaling-stroke"
      strokeDasharray="4 4"
    />
    <defs>
      <linearGradient id="paint0_linear" x1="720" y1="0" x2="720" y2="400" gradientUnits="userSpaceOnUse">
        <stop stopColor={COLORS.black} stopOpacity="0" />
        <stop offset="1" stopColor={COLORS.black} />
      </linearGradient>
    </defs>
    <rect width="1440" height="400" fill="url(#paint0_linear)" />
  </svg>
);

export const Hero: React.FC = () => {
  return (
    <div className={styles.heroContainer}>
      <div className={styles.overlay} />
      <MountainWireframe />
      
      <Section className="z-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className={styles.contentGrid}
        >
          <div className={styles.titleColumn}>
            <h1 className={styles.title}>
              HAFIZ
              <span className={styles.subtitle}>
                 — UI ARCHITECT
              </span>
            </h1>
          </div>
          
          <div className={styles.statusColumn}>
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className={styles.statusBox}
            >
              <p className={styles.statusLine}>
                SYSTEM_STATUS: <span className={styles.statusOnline}>ONLINE</span>
              </p>
              <p className={styles.description}>
                High-performance systems.<br />
                Kinetic interaction.<br />
                0% Bloat.
              </p>
            </motion.div>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className={styles.scrollIndicator}
        >
          SCROLL_VELOCITY: UNLOCKED
        </motion.div>
      </Section>
    </div>
  );
};
