import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Section } from '../Section/Section';
import styles from './Bio.module.css';

const Highlight = ({ children, href }: { children: React.ReactNode; href?: string }) => (
  href ? (
    <a href={href} className={styles.highlight} target="_blank" rel="noopener noreferrer">
      {children}
    </a>
  ) : (
    <span className={styles.highlight}>{children}</span>
  )
);

export const Bio: React.FC = () => {
    const [imageIndex, setImageIndex] = useState(0);

  return (
    <Section id="bio">
      <div className={styles.container}>
        {/* Image Switcher */}
        <div className={styles.imageWrapper} onMouseLeave={() => setImageIndex(prev => (prev === 0 ? 1 : 0))}>
          <motion.img 
            src="/assets/images/Hafiz.jpg"
            alt="Hafiz"
            className={styles.profileImage}
            animate={{ opacity: imageIndex === 0 ? 1 : 0 }}
            transition={{ duration: 0.5 }}
          />
          <motion.img 
            src="/assets/images/Hafiz 1.jpg"
            alt="Hafiz Alternate"
            className={styles.profileImageHidden}
            animate={{ opacity: imageIndex === 1 ? 1 : 0 }}
            transition={{ duration: 0.5 }}
          />
        </div>

        {/* Text Side */}
        <div className={styles.textSide}>
            <h2 className={styles.heading}>About me</h2>
            <p className={styles.paragraph}>
                I specialize in crafting <Highlight href="https://www.figma.com">interactive UIs</Highlight> and <Highlight href="https://www.adobe.com/products/aftereffects.html">motion graphics</Highlight> that feel alive. My workflow creates a seamless bridge between design and engineering—prototyping fluid motion in <Highlight href="https://www.figma.com">Figma</Highlight> and <Highlight href="https://www.adobe.com/products/aftereffects.html">After Effects</Highlight> before cooking it up in <Highlight href="https://react.dev">ReactJS</Highlight>.
            </p>
            <p className={styles.paragraph}>
                I’m a <Highlight href="https://about.google">Google</Highlight> fanboy with a compulsive need to optimize my digital space—which is why I run <Highlight href="https://archlinux.org">Arch Linux</Highlight> (by the way) and tinker with <Highlight href="https://xda-developers.com">custom ROMs</Highlight>. That curiosity has cost me two bricked phones, but the control is worth the risk.
            </p>
            <p className={styles.paragraph}>
                When I disconnect, you’ll find me near mountains and lakes, thinking about thinking.
            </p>
        </div>
      </div>
    </Section>
  );
};
