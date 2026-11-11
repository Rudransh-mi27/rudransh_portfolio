'use client';

import InteractiveEnvelope from '@/components/InteractiveEnvelope/InteractiveEnvelope';
import styles from './About.module.scss';

export default function About() {
  return (
    <section id="about" className={styles.aboutSection}>
      <div className={styles.container}>
        {/* Section Header */}
        <div className={styles.sectionHeader}>
          <div className={styles.sectionBadge}>
            <span>BACKGROUND &amp; PHILOSOPHY</span>
          </div>
          <h2 className={styles.sectionTitle}>
            Engineering systems driven by <span className={styles.serifItalic}>logic</span> &amp; real-world utility.
          </h2>
        </div>

        {/* Central Cinematic Interactive Envelope */}
        <div className={styles.envelopeContainer}>
          <InteractiveEnvelope />
        </div>
      </div>
    </section>
  );
}
