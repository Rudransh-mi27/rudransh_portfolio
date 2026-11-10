'use client';

import ConstellationCanvas from '@/components/TechConstellation/ConstellationCanvas';
import { CATEGORIES } from '@/data/skillsGraphData';
import styles from './Skills.module.scss';

export default function Skills() {
  return (
    <section id="skills" className={styles.skillsSection}>
      <div className={styles.container}>
        {/* Section Header */}
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>
            Connected architecture &amp; <span className={styles.serifItalic}>knowledge</span> graph.
          </h2>

          <p className={styles.sectionSubtitle}>
            Explore the technologies, tools and systems I use to build things.
          </p>
        </div>

        {/* Interactive Technology Constellation Canvas */}
        <div className={styles.constellationWrapper}>
          <ConstellationCanvas />
        </div>

        {/* Architecture Strengths Banner */}
        <div className={styles.stackBanner}>
          <div className={styles.bannerCol}>
            <div className={styles.bannerTag}>ENGINEERING CORE</div>
            <div className={styles.bannerValue}>REST API Architecture</div>
            <p className={styles.bannerDesc}>
              Structured routing, middleware validation, JWT authorization, and transactional database modeling.
            </p>
          </div>
          <div className={styles.bannerCol}>
            <div className={styles.bannerTag}>APPLIED AI SYSTEMS</div>
            <div className={styles.bannerValue}>Vector Search &amp; RAG</div>
            <p className={styles.bannerDesc}>
              PostgreSQL pgvector, embedding generation, semantic retrieval, and factual LLM context augmentation.
            </p>
          </div>
          <div className={styles.bannerCol}>
            <div className={styles.bannerTag}>DEVELOPMENT DISCIPLINE</div>
            <div className={styles.bannerValue}>Production Reliability</div>
            <p className={styles.bannerDesc}>
              Clean Git version control, Docker containerization, rigorous API testing, and defensive engineering.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
