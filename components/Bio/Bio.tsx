import React from 'react';
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
  return (
    <Section id="bio">
      <div className={styles.container}>
        {/* Terminal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ type: 'spring', stiffness: 50, damping: 20 }}
          className={`${styles.terminal} trace-me`}
        >
          <div className={styles.terminalHeader}>
            <div className={styles.dot} />
            <div className={styles.dot} />
            <div className={styles.dot} />
            <div className={styles.terminalMeta}>arch-linux — zsh — 80x24</div>
          </div>
          
          <div className={styles.terminalContent}>
            <p>
              <span className={styles.lineNum}>1</span> <span className={styles.keyword}>class</span> <span className={styles.type}>Hafiz</span> <span className={styles.keyword}>extends</span> <span className={styles.type}>Architect</span> {'{'}
            </p>
            <p>
              <span className={styles.lineNum}>2</span> {'  '}<span className={styles.keyword}>constructor</span>() {'{'}
            </p>
            <p>
              <span className={styles.lineNum}>3</span> {'    '}<span className={styles.prop}>this</span>.location = <span className={styles.string}>'Alpine Remote'</span>;
            </p>
            <p>
              <span className={styles.lineNum}>4</span> {'    '}<span className={styles.prop}>this</span>.focus = [<span className={styles.string}>'Visual Physics'</span>, <span className={styles.string}>'DX'</span>];
            </p>
            <p>
              <span className={styles.lineNum}>5</span> {'    '}<span className={styles.prop}>this</span>.os = <span className={styles.string}>'Arch Linux'</span>;
            </p>
            <p>
              <span className={styles.lineNum}>6</span> {'  '}{'}'}
            </p>
            <p>
              <span className={styles.lineNum}>7</span> 
            </p>
            <p>
              <span className={styles.lineNum}>8</span> {'  '}<span className={styles.lineNum}>/* </span>
            </p>
            <p>
              <span className={styles.lineNum}>9</span> {'   '}* Obsessed with removal. If it doesn't
            </p>
             <p>
               <span className={styles.lineNum}>10</span> {'   '}* snap, bounce, or load instantly,
            </p>
             <p>
               <span className={styles.lineNum}>11</span> {'   '}* it is bloat. I turn Figma dreams
            </p>
             <p>
               <span className={styles.lineNum}>12</span> {'   '}* into <span className={styles.highlightText}>React</span> reality.
            </p>
             <p>
               <span className={styles.lineNum}>13</span> {'   '}*<span className={styles.lineNum}>/</span>
            </p>
            <p>
              <span className={styles.lineNum}>14</span> {'}'}
            </p>
            
            <motion.div 
              animate={{ opacity: [0, 1, 0] }}
              transition={{ repeat: Infinity, duration: 0.8 }}
              className={styles.cursor}
            />
          </div>
        </motion.div>

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
