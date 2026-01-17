import React from 'react';
import styles from './Footer.module.css';

const FooterLink = ({ href, label }: { href: string, label: string }) => (
  <a 
    href={href}
    className={styles.link}
  >
    [{label}]
  </a>
);

export const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.branding}>
            <div className={styles.name}>HAFIZ</div>
            <div className={styles.tagline}>
                Seeking remote mountain peaks.
            </div>
        </div>
        
        <div className={styles.links}>
            <FooterLink href="#" label="GH" />
            <FooterLink href="#" label="LI" />
            <FooterLink href="#" label="X" />
            <FooterLink href="mailto:hello@hafiz.dev" label="MAIL" />
        </div>

        <div className={styles.copyright}>
            © {new Date().getFullYear()} SYSTEM_LOCKED
        </div>
      </div>
    </footer>
  );
};
