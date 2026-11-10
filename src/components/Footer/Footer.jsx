'use client';

import { ArrowUp, Mail } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '@/components/Icons/SocialIcons';
import { PERSONAL_INFO } from '@/data/portfolioData';
import styles from './Footer.module.scss';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.topRow}>
          <div className={styles.brandCol}>
            <span className={styles.brandTitle}>
              RUDRANSH <span className={styles.brandSerif}>Mishra</span>
            </span>
            <p className={styles.brandSubtitle}>
              Full-Stack Developer &amp; AI/ML Undergraduate
            </p>
          </div>

          <button
            onClick={scrollToTop}
            className={styles.scrollTopBtn}
            aria-label="Scroll to top"
          >
            <span>Back to Top</span>
            <ArrowUp size={15} />
          </button>
        </div>

        <div className={styles.bottomRow}>
          <p className={styles.copyright}>
            &copy; {new Date().getFullYear()} Rudransh Mishra. Engineered with Next.js, Three.js &amp; SCSS.
          </p>

          <div className={styles.socialLinks}>
            <a
              href={PERSONAL_INFO.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className={styles.socialIcon}
            >
              <GithubIcon size={16} />
            </a>
            <a
              href={PERSONAL_INFO.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className={styles.socialIcon}
            >
              <LinkedinIcon size={16} />
            </a>
            <a
              href={`mailto:${PERSONAL_INFO.email}`}
              aria-label="Email"
              className={styles.socialIcon}
            >
              <Mail size={16} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
