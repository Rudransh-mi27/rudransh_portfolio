'use client';

import { GraduationCap, Code2, Cpu } from 'lucide-react';
import { PERSONAL_INFO } from '@/data/portfolioData';
import styles from './About.module.scss';

export default function About() {
  const { education, aboutText } = PERSONAL_INFO;

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

        {/* Main Narrative & Education Deep Dive */}
        <div className={styles.contentGrid}>
          {/* Main narrative */}
          <div className={styles.narrativeCol}>
            <div className={styles.bioCard}>
              <h3 className={styles.bioHeading}>Engineering Philosophy</h3>
              {aboutText.map((paragraph, index) => (
                <p key={index} className={styles.paragraph}>
                  {paragraph}
                </p>
              ))}

              <div className={styles.principlesGrid}>
                <div className={styles.principleItem}>
                  <Code2 size={20} className={styles.principleIcon} />
                  <div>
                    <h4>Clean Architecture</h4>
                    <p>Modular backend services, structured routes, and defensive validation.</p>
                  </div>
                </div>

                <div className={styles.principleItem}>
                  <Cpu size={20} className={styles.principleIcon} />
                  <div>
                    <h4>Applied Intelligence</h4>
                    <p>Vector embeddings, similarity search, and RAG pipelines for real problems.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Education & Academic Stats */}
          <div className={styles.sideCol}>
            <div className={styles.educationCard}>
              <div className={styles.cardHeader}>
                <div className={styles.iconWrap}>
                  <GraduationCap size={22} />
                </div>
                <div>
                  <span className={styles.metaLabel}>ACADEMIC STATUS</span>
                  <h4 className={styles.degreeTitle}>{education.degree}</h4>
                </div>
              </div>

              <div className={styles.institution}>
                <span>{education.institution}</span>
              </div>

              <div className={styles.statsRow}>
                <div className={styles.statBox}>
                  <span className={styles.statNumber}>{education.cgpa}</span>
                  <span className={styles.statLabel}>Current CGPA</span>
                </div>
                <div className={styles.statBox}>
                  <span className={styles.statNumber}>{education.semester}</span>
                  <span className={styles.statLabel}>Current Term</span>
                </div>
                <div className={styles.statBox}>
                  <span className={styles.statNumber}>{education.expectedGraduation}</span>
                  <span className={styles.statLabel}>Expected Grad</span>
                </div>
              </div>

              <div className={styles.academicFocus}>
                <span className={styles.focusLabel}>Core Academic Modules:</span>
                <div className={styles.tagsGroup}>
                  <span className={styles.tag}>Data Structures</span>
                  <span className={styles.tag}>Algorithms</span>
                  <span className={styles.tag}>OOP</span>
                  <span className={styles.tag}>DBMS</span>
                  <span className={styles.tag}>Machine Learning</span>
                  <span className={styles.tag}>Discrete Math</span>
                </div>
              </div>
            </div>

            <div className={styles.quoteCard}>
              <div className={styles.quoteMark}>&ldquo;</div>
              <p className={styles.quoteBody}>
                {PERSONAL_INFO.tagline}
              </p>
              <span className={styles.quoteAuthor}>— Rudransh Mishra</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
