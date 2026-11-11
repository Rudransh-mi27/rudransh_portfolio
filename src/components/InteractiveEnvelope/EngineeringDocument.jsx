'use client';

import { ArrowLeft, Code2, Cpu, Sparkles, Terminal, ShieldCheck } from 'lucide-react';
import { PERSONAL_INFO } from '@/data/portfolioData';
import styles from './EngineeringDocument.module.scss';

export default function EngineeringDocument({ onClose }) {
  const { aboutText } = PERSONAL_INFO;

  return (
    <div
      className={styles.documentCard}
      role="region"
      aria-label="Engineering Philosophy Document"
    >
      {/* Top Document Header Bar */}
      <div className={styles.docHeader}>
        <div className={styles.sealMark}>
          <span className={styles.sealIcon}>◈</span>
          <span className={styles.sealText}>R. MISHRA // ARCHITECTURAL ESSAY</span>
        </div>

        <button
          type="button"
          onClick={onClose}
          className={styles.returnBtn}
          title="Return to Envelope (Esc)"
          aria-label="Return to envelope"
        >
          <ArrowLeft size={14} />
          <span>Return to Envelope</span>
        </button>
      </div>

      {/* Document Body */}
      <div className={styles.docBody}>
        {/* Title Block */}
        <header className={styles.titleBlock}>
          <div className={styles.categoryPill}>TECHNICAL PHILOSOPHY &amp; CORE PRINCIPLES</div>
          <h1 className={styles.docTitle}>
            Engineering systems driven by <span className={styles.serifItalic}>logic</span> &amp; real-world utility.
          </h1>
          <div className={styles.docDivider} aria-hidden="true" />
        </header>

        {/* Narrative Paragraphs */}
        <div className={styles.narrativeSection}>
          <div className={styles.leadParagraph}>
            {aboutText[0]}
          </div>

          <div className={styles.bodyParagraph}>
            {aboutText[1]}
          </div>

          <div className={styles.credoQuote}>
            <div className={styles.quoteBar} />
            <blockquote className={styles.credoText}>
              &ldquo;{aboutText[2]}&rdquo;
            </blockquote>
          </div>
        </div>

        {/* Dual Pillar Architectural Foundations */}
        <div className={styles.pillarsGrid}>
          <div className={styles.pillarCard}>
            <div className={styles.pillarIcon}>
              <Code2 size={20} />
            </div>
            <div className={styles.pillarContent}>
              <h3 className={styles.pillarTitle}>Clean Architecture</h3>
              <p className={styles.pillarDesc}>
                Modular backend services, structured routes, middleware validation, and defensive error boundaries engineered for maintainability and horizontal scalability.
              </p>
            </div>
          </div>

          <div className={styles.pillarCard}>
            <div className={styles.pillarIcon}>
              <Cpu size={20} />
            </div>
            <div className={styles.pillarContent}>
              <h3 className={styles.pillarTitle}>Applied Intelligence</h3>
              <p className={styles.pillarDesc}>
                Vector embeddings, pgvector cosine search, semantic retrieval pipelines, and factual context augmentation bridging machine learning into practical utility.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Signature / Footer */}
        <footer className={styles.docFooter}>
          <div className={styles.signatureCol}>
            <span className={styles.sigLabel}>STATED WITH CONVICTION</span>
            <span className={styles.sigName}>Rudransh Mishra</span>
            <span className={styles.sigMeta}>Full-Stack Developer &amp; AI/ML Undergraduate</span>
          </div>

          <div className={styles.mottoCol}>
            <span className={styles.mottoQuote}>&ldquo;{PERSONAL_INFO.tagline}&rdquo;</span>
          </div>
        </footer>
      </div>
    </div>
  );
}

