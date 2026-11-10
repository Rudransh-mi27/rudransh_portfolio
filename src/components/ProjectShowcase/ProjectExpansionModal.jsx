'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import {
  X,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  Cpu,
  Layers,
  ArrowRight,
  CheckCircle2,
  Terminal,
} from 'lucide-react';
import { GithubIcon } from '@/components/Icons/SocialIcons';
import { TechIcon } from '@/components/TechConstellation/TechIcons';
import styles from './ProjectExpansionModal.module.scss';

export default function ProjectExpansionModal({
  project,
  onClose,
  onNext,
  onPrev,
  hasMultiple = true,
}) {
  const modalRef = useRef(null);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight' && onNext) onNext();
      if (e.key === 'ArrowLeft' && onPrev) onPrev();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose, onNext, onPrev]);

  // Lock body scroll while modal is open
  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, []);

  if (!project) return null;

  const isCompleted = project.status === 'Completed';

  // Map technology names to TechIcon IDs
  const getTechIconId = (name) => {
    const lower = name.toLowerCase();
    if (lower.includes('node')) return 'nodejs';
    if (lower.includes('express')) return 'express';
    if (lower.includes('react')) return 'react';
    if (lower.includes('javascript')) return 'javascript';
    if (lower.includes('python')) return 'python';
    if (lower.includes('mongo')) return 'mongodb';
    if (lower.includes('postgres') || lower.includes('pgvector')) return 'postgresql';
    if (lower.includes('supabase')) return 'supabase';
    if (lower.includes('jwt')) return 'jwt';
    if (lower.includes('git')) return 'git';
    if (lower.includes('docker')) return 'docker';
    if (lower.includes('api')) return 'rest-apis';
    if (lower.includes('pandas')) return 'pandas';
    if (lower.includes('numpy')) return 'numpy';
    if (lower.includes('embedding') || lower.includes('vector')) return 'embeddings';
    if (lower.includes('rag')) return 'rag';
    return 'default';
  };

  return (
    <div
      className={styles.modalBackdrop}
      onClick={(e) => e.target === modalRef.current && onClose()}
      ref={modalRef}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-project-title"
    >
      <div className={styles.modalContainer}>
        {/* Top Sticky Bar */}
        <div className={styles.stickyBar}>
          <div className={styles.barLeft}>
            <div className={styles.specBadge}>
              <span className={styles.specGlyph}>{isCompleted ? '◈' : '⟐'}</span>
              <span>{isCompleted ? 'PROD // DEPLOYED' : 'R&D // ACTIVE BUILD'}</span>
            </div>
            <span className={styles.barDivider} />
            <span className={styles.barCategory}>{project.category}</span>
          </div>

          <div className={styles.barRight}>
            {hasMultiple && (
              <div className={styles.navControls}>
                <button
                  type="button"
                  onClick={onPrev}
                  className={styles.navBtn}
                  title="Previous Project (←)"
                  aria-label="Previous project"
                >
                  <ChevronLeft size={18} />
                </button>
                <button
                  type="button"
                  onClick={onNext}
                  className={styles.navBtn}
                  title="Next Project (→)"
                  aria-label="Next project"
                >
                  <ChevronRight size={18} />
                </button>
              </div>
            )}

            <button
              type="button"
              onClick={onClose}
              className={styles.closeBtn}
              aria-label="Close modal"
              title="Return to 3D Showcase (Esc)"
            >
              <X size={18} />
              <span className={styles.closeLabel}>Return to 3D Space</span>
            </button>
          </div>
        </div>

        {/* Scrollable Project Case Study Body */}
        <div className={styles.modalContent}>
          {/* Hero Presentation Header */}
          <section className={styles.heroSection}>
            <div className={styles.heroHeader}>
              <div className={styles.tagLine}>{project.tag}</div>
              <h1 id="modal-project-title" className={styles.projectTitle}>
                {project.title}
              </h1>
              <p className={styles.projectSubtitle}>{project.subtitle}</p>
            </div>

            {/* Main Project Screenshot Showcase */}
            <div className={styles.mainMediaWrap}>
              <div className={styles.browserWindow}>
                <div className={styles.browserHeader}>
                  <div className={styles.browserDots}>
                    <span />
                    <span />
                    <span />
                  </div>
                  <div className={styles.browserUrl}>
                    https://{project.id}.rudransh.dev/live-preview
                  </div>
                  <div className={styles.browserStatus}>200 OK</div>
                </div>

                <div className={styles.imageCanvas}>
                  {project.image ? (
                    <Image
                      src={project.image}
                      alt={project.title}
                      width={1280}
                      height={760}
                      className={styles.heroImage}
                      priority
                    />
                  ) : (
                    <div className={styles.mediaFallback}>
                      <Terminal size={56} />
                      <span>{project.title} Architecture View</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Action Bar (Live Demo & GitHub) */}
            <div className={styles.heroActions}>
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.btnLiveDemo}
                >
                  <span className={styles.livePulse} />
                  <span>Explore Live Deployment</span>
                  <ExternalLink size={16} />
                </a>
              )}

              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.btnGitHub}
                >
                  <GithubIcon size={18} />
                  <span>View Source on GitHub</span>
                  <ExternalLink size={14} className={styles.btnArrow} />
                </a>
              )}
            </div>
          </section>

          {/* Detailed Case Study Grid */}
          <div className={styles.caseStudyGrid}>
            {/* Left Column: Overview, Problem & Architecture */}
            <div className={styles.gridLeft}>
              {/* Executive Overview */}
              <section className={styles.studySection}>
                <div className={styles.sectionHeading}>
                  <span className={styles.headingNum}>01</span>
                  <h3>Project Overview &amp; Context</h3>
                </div>
                <p className={styles.bodyParagraph}>{project.description}</p>

                <div className={styles.overviewCallouts}>
                  <div className={styles.calloutCard}>
                    <span className={styles.calloutLabel}>THE PROBLEM</span>
                    <p className={styles.calloutText}>{project.problem}</p>
                  </div>

                  <div className={styles.calloutCard}>
                    <span className={styles.calloutLabel}>WHY IT WAS BUILT</span>
                    <p className={styles.calloutText}>{project.whyBuilt}</p>
                  </div>
                </div>
              </section>

              {/* Technical Architecture Pipeline */}
              {project.architecture && project.architecture.length > 0 && (
                <section className={styles.studySection}>
                  <div className={styles.sectionHeading}>
                    <span className={styles.headingNum}>02</span>
                    <h3>System Architecture &amp; Data Pipeline</h3>
                  </div>

                  <div className={styles.architectureFlow}>
                    {project.architecture.map((node, i) => (
                      <div key={i} className={styles.archStepCard}>
                        <div className={styles.archStepHeader}>
                          <span className={styles.archStepIndex}>{node.step}</span>
                          <span className={styles.archStepTech}>{node.tech}</span>
                        </div>
                        <h4 className={styles.archStepTitle}>{node.title}</h4>
                        <p className={styles.archStepDesc}>{node.desc}</p>
                        {i < project.architecture.length - 1 && (
                          <div className={styles.archConnector} aria-hidden="true">
                            <ArrowRight size={14} />
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* Verified Engineering Contributions */}
              <section className={styles.studySection}>
                <div className={styles.sectionHeading}>
                  <span className={styles.headingNum}>03</span>
                  <h3>Engineering Contributions &amp; Implementation</h3>
                </div>

                <div className={styles.contributionsList}>
                  {project.contributions.map((item, i) => (
                    <div key={i} className={styles.contributionItem}>
                      <div className={styles.contribDot}>
                        <CheckCircle2 size={15} />
                      </div>
                      <p className={styles.contribText}>{item}</p>
                    </div>
                  ))}
                </div>
              </section>
            </div>

            {/* Right Column: Spec Sheet, Target Audience & Tech Stack */}
            <div className={styles.gridRight}>
              {/* Technology Stack Badges */}
              <div className={styles.sidebarCard}>
                <h4 className={styles.sidebarTitle}>
                  <Cpu size={16} />
                  <span>Technology Stack</span>
                </h4>
                <div className={styles.techStackList}>
                  {project.technologies.map((tech, i) => {
                    const iconId = getTechIconId(tech);
                    return (
                      <div key={i} className={styles.techBadge}>
                        <TechIcon id={iconId} size={18} color="#34d399" />
                        <span className={styles.techName}>{tech}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Key Features */}
              {project.keyFeatures && (
                <div className={styles.sidebarCard}>
                  <h4 className={styles.sidebarTitle}>
                    <Layers size={16} />
                    <span>Core Features</span>
                  </h4>
                  <ul className={styles.featureList}>
                    {project.keyFeatures.map((feat, i) => (
                      <li key={i} className={styles.featureItem}>
                        <span className={styles.featureBullet}>&bull;</span>
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Target Audience & Deployment Telemetry */}
              <div className={styles.sidebarCard}>
                <h4 className={styles.sidebarTitle}>
                  <ShieldCheck size={16} />
                  <span>Deployment Specs</span>
                </h4>
                <div className={styles.specTelemetry}>
                  <div className={styles.specRow}>
                    <span className={styles.specLabel}>Status</span>
                    <span className={styles.specVal}>{project.status}</span>
                  </div>
                  <div className={styles.specRow}>
                    <span className={styles.specLabel}>Category</span>
                    <span className={styles.specVal}>{project.category}</span>
                  </div>
                  <div className={styles.specRow}>
                    <span className={styles.specLabel}>Audience</span>
                    <span className={styles.specVal}>{project.targetAudience}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

