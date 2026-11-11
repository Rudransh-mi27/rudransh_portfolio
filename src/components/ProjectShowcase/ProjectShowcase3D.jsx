'use client';

import { useState, useEffect, useMemo } from 'react';
import Image from 'next/image';
import { ExternalLink, X, Terminal } from 'lucide-react';
import { GithubIcon } from '@/components/Icons/SocialIcons';
import ProjectCard3D from './ProjectCard3D';
import styles from './ProjectShowcase3D.module.scss';

const FILTERS = [
  { id: 'all', label: 'All Projects' },
  { id: 'featured', label: 'Featured Systems' },
  { id: 'aiml', label: 'AI & ML / RAG' },
  { id: 'fullstack', label: 'Backend & Web' },
];

export default function ProjectShowcase3D({ projects = [] }) {
  // Active filter state
  const [activeFilter, setActiveFilter] = useState('all');

  // Currently hovered card id
  const [hoveredId, setHoveredId] = useState(null);

  // Focused project that comes forward on screen when clicked
  const [focusedProject, setFocusedProject] = useState(null);

  // Filter projects
  const filteredProjects = useMemo(() => {
    return projects.filter((proj) => {
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
  }, [projects, activeFilter]);

  // Lock body scroll and listen for Escape key when project comes forward
  useEffect(() => {
    if (!focusedProject) return;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setFocusedProject(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [focusedProject]);

  return (
    <div className={styles.showcaseRoot}>
      {/* Top Filter Bar */}
      <div className={styles.topControlBar}>
        <div className={styles.filterPills} role="tablist">
          {FILTERS.map((f) => {
            const count = projects.filter((proj) => {
              if (f.id === 'all') return true;
              if (f.id === 'featured') return proj.featured;
              if (f.id === 'aiml') {
                return (
                  proj.tag?.includes('AI') ||
                  proj.tag?.includes('Machine Learning') ||
                  proj.tag?.includes('Data Analysis')
                );
              }
              if (f.id === 'fullstack') {
                return (
                  proj.tag?.includes('Full-Stack') ||
                  proj.tag?.includes('Backend') ||
                  proj.tag?.includes('Frontend')
                );
              }
              return true;
            }).length;

            return (
              <button
                key={f.id}
                role="tab"
                aria-selected={activeFilter === f.id}
                onClick={() => setActiveFilter(f.id)}
                className={`${styles.filterBtn} ${activeFilter === f.id ? styles.activeFilter : ''}`}
              >
                <span>{f.label}</span>
                <span className={styles.filterCount}>{count}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* All Project Cards in 3D Gallery Grid */}
      <div className={styles.projectsGrid}>
        {filteredProjects.map((project, idx) => (
          <ProjectCard3D
            key={project.id}
            project={project}
            index={idx}
            isHovered={hoveredId === project.id}
            onHover={setHoveredId}
            onLeave={() => setHoveredId(null)}
            onClick={(proj) => setFocusedProject(proj)}
          />
        ))}
      </div>

      {/* Focused Project Comes Forward on Screen When Tapped */}
      {focusedProject && (
        <div
          className={styles.focusBackdrop}
          onClick={(e) => {
            // Tapping anywhere on screen except that card area replaces it back
            if (e.target === e.currentTarget) {
              setFocusedProject(null);
            }
          }}
          role="dialog"
          aria-modal="true"
          aria-labelledby="focused-project-title"
        >
          <div
            className={styles.focusedCard}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Browser Header */}
            <div className={styles.focusedHeader}>
              <div className={styles.windowControls} aria-hidden="true">
                <span className={`${styles.controlDot} ${styles.dotRed}`} />
                <span className={`${styles.controlDot} ${styles.dotYellow}`} />
                <span className={`${styles.controlDot} ${styles.dotGreen}`} />
              </div>

              <div className={styles.focusedUrlPill}>
                <span className={styles.urlProtocol}>https://</span>
                <span className={styles.urlHost}>{focusedProject.id}.rudransh.dev</span>
              </div>

              <button
                type="button"
                onClick={() => setFocusedProject(null)}
                className={styles.focusedCloseBtn}
                aria-label="Close"
                title="Replace back to projects"
              >
                <X size={16} />
              </button>
            </div>

            {/* Focused Project Image */}
            <div className={styles.focusedMedia}>
              {focusedProject.image ? (
                <Image
                  src={focusedProject.image}
                  alt={focusedProject.title}
                  width={900}
                  height={520}
                  className={styles.focusedScreenshot}
                  priority
                />
              ) : (
                <div className={styles.focusedPlaceholder}>
                  <Terminal size={48} />
                  <span>{focusedProject.title}</span>
                </div>
              )}
            </div>

            {/* Focused Project Details */}
            <div className={styles.focusedBody}>
              <div className={styles.focusedMeta}>
                <span className={styles.focusedCategory}>{focusedProject.category}</span>
                <h3 id="focused-project-title" className={styles.focusedTitle}>
                  {focusedProject.title}
                </h3>
                <p className={styles.focusedSubtitle}>{focusedProject.subtitle}</p>
              </div>

              <p className={styles.focusedDescription}>{focusedProject.description}</p>

              {/* Technologies Pills */}
              <div className={styles.focusedTechPills}>
                {focusedProject.technologies?.map((tech, i) => (
                  <span key={i} className={styles.focusedTechPill}>
                    {tech}
                  </span>
                ))}
              </div>

              {/* Action Buttons */}
              <div className={styles.focusedActions}>
                {focusedProject.liveUrl && (
                  <a
                    href={focusedProject.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.focusedBtnLive}
                  >
                    <span className={styles.solidDot} />
                    <span>Live Demo</span>
                    <ExternalLink size={14} />
                  </a>
                )}
                {focusedProject.githubUrl && (
                  <a
                    href={focusedProject.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.focusedBtnGit}
                  >
                    <GithubIcon size={15} />
                    <span>GitHub Repository</span>
                    <ExternalLink size={13} />
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
