'use client';

import { useState } from 'react';
import Image from 'next/image';
import { ExternalLink, Layers, Sparkles, X, ChevronRight, Terminal } from 'lucide-react';
import { GithubIcon } from '@/components/Icons/SocialIcons';
import { PROJECTS_DATA } from '@/data/portfolioData';
import styles from './Projects.module.scss';

const FILTERS = [
  { id: 'all', label: 'All Works' },
  { id: 'featured', label: 'Featured' },
  { id: 'aiml', label: 'AI & ML / RAG' },
  { id: 'fullstack', label: 'Backend & Web' }
];

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [activeModalProject, setActiveModalProject] = useState(null);

  const filteredProjects = PROJECTS_DATA.filter((proj) => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'featured') return proj.featured;
    if (activeFilter === 'aiml') {
      return (
        proj.tag?.includes('AI') ||
        proj.tag?.includes('Machine Learning') ||
        proj.tag?.includes('Data Analysis')
      );
    }
    if (activeFilter === 'fullstack') {
      return (
        proj.tag?.includes('Full-Stack') ||
        proj.tag?.includes('Backend') ||
        proj.tag?.includes('Frontend')
      );
    }
    return true;
  });

  return (
    <section id="projects" className={styles.projectsSection}>
      <div className={styles.container}>
        {/* Editorial Section Header */}
        <div className={styles.sectionHeader}>
          <div className={styles.headerLeft}>
            <div className={styles.sectionBadge}>
              <span>SELECTED ARCHITECTURE</span>
            </div>
            <h2 className={styles.sectionTitle}>
              Engineered with <span className={styles.serifItalic}>precision</span>, built for scale.
            </h2>
          </div>

          {/* Minimalist Filter Pills */}
          <div className={styles.filterPills}>
            {FILTERS.map((f) => (
              <button
                key={f.id}
                onClick={() => setActiveFilter(f.id)}
                className={`${styles.filterBtn} ${activeFilter === f.id ? styles.activeFilter : ''}`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        <div className={styles.projectsGrid}>
          {filteredProjects.map((project, idx) => {
            const isFeatured = project.featured;
            const isCompleted = project.status === 'Completed';

            return (
              <div
                key={project.id}
                className={`${styles.projectCard} ${isFeatured ? styles.featuredCard : ''}`}
              >
                {/* Visual Area (if image exists) */}
                {project.image ? (
                  <div className={styles.cardMedia}>
                    <div className={styles.imageWrapper}>
                      <Image
                        src={project.image}
                        alt={project.title}
                        width={600}
                        height={340}
                        className={styles.projectImage}
                      />
                    </div>

                    {/* Unique Architectural Spec Stamp replacing the generic button */}
                    <div className={`${styles.specStatusSeal} ${isCompleted ? styles.sealCompleted : styles.sealInProgress}`}>
                      <span className={styles.sealGlyph}>{isCompleted ? '◈' : '⟐'}</span>
                      <span className={styles.sealCode}>{isCompleted ? 'PROD // DEPLOYED' : 'R&D // ACTIVE BUILD'}</span>
                    </div>
                  </div>
                ) : (
                  <div className={styles.cardHeaderPlain}>
                    <div className={styles.techTagPill}>
                      <Layers size={13} />
                      <span>{project.tag}</span>
                    </div>

                    {/* Unique Architectural Spec Stamp */}
                    <div className={`${styles.specStatusSeal} ${isCompleted ? styles.sealCompleted : styles.sealInProgress}`}>
                      <span className={styles.sealGlyph}>{isCompleted ? '◈' : '⟐'}</span>
                      <span className={styles.sealCode}>{isCompleted ? 'PROD // DEPLOYED' : 'R&D // ACTIVE BUILD'}</span>
                    </div>
                  </div>
                )}

                {/* Card Content */}
                <div className={styles.cardBody}>
                  <div className={styles.metaRow}>
                    <span className={styles.projectSubtitle}>{project.subtitle}</span>
                    {isFeatured && (
                      <span className={styles.featuredTag}>
                        <Sparkles size={11} /> Featured Work
                      </span>
                    )}
                  </div>

                  <h3 className={styles.projectTitle}>
                    {project.title}
                  </h3>

                  <p className={styles.description}>{project.description}</p>

                  {/* Highlights / Architectural contributions */}
                  {project.contributions && (
                    <div className={styles.contributions}>
                      <span className={styles.contributionHeading}>Architectural Decisions:</span>
                      <ul className={styles.contributionList}>
                        {project.contributions.slice(0, 3).map((item, i) => (
                          <li key={i}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Tech stack tags */}
                  <div className={styles.techTags}>
                    {project.technologies.map((tech) => (
                      <span key={tech} className={styles.techTag}>
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Action links */}
                  <div className={styles.cardFooter}>
                    <div className={styles.linkGroup}>
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={styles.primaryLink}
                        >
                          <span>Live System</span>
                          <ExternalLink size={13} />
                        </a>
                      )}

                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={styles.secondaryLink}
                          aria-label={`GitHub Repository for ${project.title}`}
                        >
                          <GithubIcon size={14} />
                          <span>Source</span>
                        </a>
                      )}
                    </div>

                    {(project.architectureImage || project.secondaryImage) && (
                      <button
                        onClick={() => setActiveModalProject(project)}
                        className={styles.inspectBtn}
                      >
                        <span>System Architecture</span>
                        <ChevronRight size={14} />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Modal for Architecture / In-depth preview */}
      {activeModalProject && (
        <div className={styles.modalBackdrop} onClick={() => setActiveModalProject(null)}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <div>
                <span className={styles.modalMeta}>SYSTEM ARCHITECTURE BLUEPRINT</span>
                <h3 className={styles.modalTitle}>{activeModalProject.title}</h3>
              </div>
              <button
                className={styles.closeBtn}
                onClick={() => setActiveModalProject(null)}
                aria-label="Close Preview"
              >
                <X size={20} />
              </button>
            </div>

            <div className={styles.modalBody}>
              {activeModalProject.architectureImage && (
                <div className={styles.modalMediaWrapper}>
                  <h4>Data Pipeline &amp; Routing Topology</h4>
                  <Image
                    src={activeModalProject.architectureImage}
                    alt={`${activeModalProject.title} Architecture`}
                    width={900}
                    height={500}
                    className={styles.modalImg}
                  />
                </div>
              )}

              {activeModalProject.secondaryImage && (
                <div className={styles.modalMediaWrapper}>
                  <h4>Production Interface</h4>
                  <Image
                    src={activeModalProject.secondaryImage}
                    alt={`${activeModalProject.title} Dashboard`}
                    width={900}
                    height={500}
                    className={styles.modalImg}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
