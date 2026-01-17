import React, { useState, useEffect } from 'react';
import { Hero } from './components/Hero/Hero';
import { Bio } from './components/Bio/Bio';
import { WorkStack } from './components/WorkStack/WorkStack';
import { TheLab } from './components/TheLab/TheLab';
import { Footer } from './components/Footer/Footer';
import { Topbar } from './components/Topbar/Topbar';
import { motion, useScroll, useSpring } from 'framer-motion';
import TraceryOverlay from './components/TraceryOverlay/TraceryOverlay';
import styles from './App.module.css';

// Import Themes (so variables are available)

import './themes/rosepine.css';
import './themes/nord.css';
import './themes/catppuccin.css';
import './themes/gruvbox.css';
import './themes/kanagawa.css';

const App: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Theme State: 'light' or 'default' (dark)
  const [mode, setMode] = useState('default');
  const [palette, setPalette] = useState('catppuccin');

  useEffect(() => {
    // Construct theme string: e.g. "rosepine" or "rosepine-light"
    const themeString = mode === 'light' ? `${palette}-light` : palette;
    document.documentElement.setAttribute('data-theme', themeString);
  }, [mode, palette]);

  const toggleTheme = () => {
    setMode(prev => prev === 'default' ? 'light' : 'default');
  };

  // Tracery State
  const [traceryEnabled, setTraceryEnabled] = useState(true);

  return (
    <div className={styles.appContainer}>
      <Topbar 
        theme={mode} 
        toggleTheme={toggleTheme} 
        palette={palette}
        onPaletteChange={setPalette}
      />
      
      {/* Top Progress Bar */}
      <motion.div
        className={styles.progressBar}
        style={{ scaleX }}
      />
      
      {traceryEnabled && <TraceryOverlay enabled={true} />}

      {/* Grid Overlay for Texture */}
      <div className={styles.gridOverlay} />

      {/* Main Content */}
      <main className={styles.mainContent}>
        <Hero traceryEnabled={traceryEnabled} toggleTracery={() => setTraceryEnabled(!traceryEnabled)} />
        <Bio />
        <WorkStack />
        <TheLab />
      </main>
      
      <Footer />
    </div>
  );
};

export default App;