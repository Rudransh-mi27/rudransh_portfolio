'use client';

import Image from 'next/image';
import { ExternalLink, Terminal } from 'lucide-react';
import { GithubIcon } from '@/components/Icons/SocialIcons';
import styles from './ProjectCard3D.module.scss';

export default function ProjectCard3D({
  project,
  index,
  isHovered,
  onHover,
  onLeave,
  onClick,
}) {
  const isCompleted = project.status === 'Completed';

  return (
    <div
      className={`${styles.cardContainer} ${isHovered ? styles.hovered : ''}`}
      onMouseEnter={() => onHover(project.id)}
      onMouseLeave={onLeave}
      onClick={() => onClick(project)}
      role="button"
      tabIndex={0}
      aria-label={`${project.title} - Click to bring forward`}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick(project);
        }
      }}
    >
      {/* Floating 3D Panel */}
      <div className={styles.windowFrame}>
        {/* Browser Header */}
        <div className={styles.windowHeader}>
          <div className={styles.windowControls} aria-hidden="true">
            <span className={`${styles.controlDot} ${styles.dotRed}`} />
            <span className={`${styles.controlDot} ${styles.dotYellow}`} />
            <span className={`${styles.controlDot} ${styles.dotGreen}`} />
          </div>
          <div className={styles.urlPill}>
            <span className={styles.urlProtocol}>https://</span>
            <span className={styles.urlHost}>{project.id}.rudransh.dev</span>
          </div>
          <div className={styles.specStatusSeal}>
            <span className={styles.sealGlyph}>{isCompleted ? '◈' : '⟐'}</span>
            <span className={styles.sealCode}>{isCompleted ? 'PROD' : 'R&D'}</span>
          </div>
        </div>

        {/* Project Screenshot */}
        <div className={styles.mediaContainer}>
          {project.image ? (
            <Image
              src={project.image}
              alt={project.title}
              width={720}
              height={440}
              className={styles.screenshot}
              priority={index < 3}
            />
          ) : (
            <div className={styles.placeholderMedia}>
              <Terminal size={48} className={styles.placeholderIcon} />
              <span className={styles.placeholderTitle}>{project.title}</span>
            </div>
          )}

          {/* Specular sheen */}
          <div className={styles.specularOverlay} aria-hidden="true" />

          {/* Hover Reveal Overlay */}
          <div className={styles.hoverOverlay}>
            <div className={styles.hoverMeta}>
              <span className={styles.categoryBadge}>{project.category}</span>
              <h3 className={styles.hoverTitle}>{project.title}</h3>
              <p className={styles.hoverSubtitle}>{project.subtitle}</p>

              {/* Technologies Pills */}
              <div className={styles.techPills}>
                {project.technologies.slice(0, 4).map((tech, i) => (
                  <span key={i} className={styles.techPill}>
                    {tech}
                  </span>
                ))}
                {project.technologies.length > 4 && (
                  <span className={styles.techPillMore}>
                    +{project.technologies.length - 4}
                  </span>
                )}
              </div>
            </div>

            {/* Quick Action Buttons on Hover */}
            <div className={styles.cardActions} onClick={(e) => e.stopPropagation()}>
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.cardBtnLive}
                  onClick={(e) => e.stopPropagation()}
                >
                  <span className={styles.livePulseDot} />
                  <span>Live Demo</span>
                  <ExternalLink size={13} />
                </a>
              )}
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.cardBtnGit}
                  onClick={(e) => e.stopPropagation()}
                >
                  <GithubIcon size={14} />
                  <span>GitHub</span>
                  <ExternalLink size={12} className={styles.gitArrow} />
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Bottom Panel Caption Bar */}
        <div className={styles.captionBar}>
          <div className={styles.captionLeft}>
            <span className={styles.indexNumber}>0{index + 1}</span>
            <span className={styles.captionTitle}>{project.title}</span>
          </div>
          <span className={styles.captionCategory}>{project.tag.split('/')[0]}</span>
        </div>
      </div>
    </div>
  );
}
