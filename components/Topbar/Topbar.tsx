import React from 'react';
import styles from './Topbar.module.css';

interface TopbarProps {
  theme: string; // 'dark' or 'light'
  toggleTheme: () => void;
  palette: string;
  onPaletteChange: (newPalette: string) => void;
}

const THEMES = [
  { id: 'catppuccin', color: '#cba6f7', label: 'Catppuccin' },
  { id: 'rosepine', color: '#eb6f92', label: 'Rose Pine' },
  { id: 'apple', color: '#007aff', label: 'Apple System' },
  { id: 'everforest', color: '#a7c080', label: 'Everforest' },
  { id: 'kanagawa', color: '#7E9CD8', label: 'Kanagawa' },
];

export const Topbar: React.FC<TopbarProps> = ({ theme, toggleTheme, palette, onPaletteChange }) => {
  return (
    <nav className={styles.topbar}>
      <div className={styles.inner}>
        <div className={styles.controls}>
          <div className={styles.themeList}>
            {THEMES.map((t) => (
              <button
                key={t.id}
                className={styles.themeIconBtn}
                style={{ backgroundColor: t.color }}
                title={t.label}
                onClick={() => onPaletteChange(t.id)}
                data-active={palette === t.id}
                aria-label={`Select ${t.label} Theme`}
              />
            ))}
          </div>

          <button onClick={toggleTheme} className={styles.themeBtn} aria-label="Toggle Light/Dark Mode" style={{ mixBlendMode: 'difference' }}>
            {theme === 'light' ? (
              /* Sun Icon */
              <svg className={styles.icon} viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none">
                <circle cx="12" cy="12" r="5" />
                <line x1="12" y1="1" x2="12" y2="3" />
                <line x1="12" y1="21" x2="12" y2="23" />
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                <line x1="1" y1="12" x2="3" y2="12" />
                <line x1="21" y1="12" x2="23" y2="12" />
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
              </svg>
            ) : (
              /* Moon Icon */
              <svg className={styles.icon} viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
              </svg>
            )}
          </button>
        </div>
      </div>
    </nav>
  );
};
