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
            <FooterLink href="https://wa.me/918592882354" label="WA" />
            <FooterLink href="https://instagram.com/z4rchx" label="IG" />
            <FooterLink href="https://x.com/z4f3x" label="X" />
            <FooterLink href="https://www.linkedin.com/in/hafiz-yoosuf-348035325/" label="LI" />
            <FooterLink href="mailto:hafizyoosuf710@gmail.com" label="MAIL" />
        </div>

        <div className={styles.copyright}>
            © {new Date().getFullYear()} SYSTEM_LOCKED
        </div>
      </div>
    </footer>
  );
};
