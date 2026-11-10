'use client';

import { Terminal, Server, Layout, Database, BrainCircuit, Wrench, CheckCircle2 } from 'lucide-react';
import { SKILLS_DATA } from '@/data/portfolioData';
import styles from './Skills.module.scss';

const CATEGORY_ICONS = {
  'Programming': Terminal,
  'Backend Development': Server,
  'Frontend Development': Layout,
  'Databases & Storage': Database,
  'AI / Machine Learning': BrainCircuit,
  'Developer Tools': Wrench,
};

export default function Skills() {
  return (
    <section id="skills" className={styles.skillsSection}>
      <div className={styles.container}>
        <div className={styles.sectionHeader}>
          <div className={styles.sectionBadge}>
            <span>TECHNICAL CAPABILITIES</span>
          </div>
          <h2 className={styles.sectionTitle}>
            Tools, technologies &amp; <span className={styles.serifItalic}>foundational</span> architecture.
          </h2>
          <p className={styles.sectionSubtitle}>
            A disciplined stack focused on backend reliability, full-stack scalability, and practical AI/ML implementation.
          </p>
        </div>

        <div className={styles.skillsGrid}>
          {SKILLS_DATA.map((cat, idx) => {
            const Icon = CATEGORY_ICONS[cat.category] || Terminal;

            return (
              <div key={idx} className={styles.categoryCard}>
                <div className={styles.cardHeader}>
                  <div className={styles.iconWrap}>
                    <Icon size={20} />
                  </div>
                  <div>
                    <h3 className={styles.categoryTitle}>{cat.category}</h3>
                    {cat.note && (
                      <span className={styles.categoryNote}>
                        {cat.note}
                      </span>
                    )}
                  </div>
                </div>

                <div className={styles.skillsList}>
                  {cat.skills.map((skill, sIdx) => (
                    <div key={sIdx} className={styles.skillItem}>
                      <span className={styles.dot} />
                      <span className={styles.skillName}>{skill}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Stack Highlights Banner */}
        <div className={styles.stackBanner}>
          <div className={styles.bannerCol}>
            <div className={styles.bannerTag}>Core Strengths</div>
            <div className={styles.bannerValue}>REST API Engineering</div>
            <p className={styles.bannerDesc}>
              Structured routing, middleware validation, JWT authentication, and database optimization.
            </p>
          </div>
          <div className={styles.bannerCol}>
            <div className={styles.bannerTag}>Applied AI Experience</div>
            <div className={styles.bannerValue}>Semantic Vector Search &amp; RAG</div>
            <p className={styles.bannerDesc}>
              PostgreSQL pgvector, embedding generation, chunking strategies, and similarity matching.
            </p>
          </div>
          <div className={styles.bannerCol}>
            <div className={styles.bannerTag}>Learning Philosophy</div>
            <div className={styles.bannerValue}>Hands-on Production Code</div>
            <p className={styles.bannerDesc}>
              Building real systems from scratch rather than passive tutorials.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

