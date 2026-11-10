'use client';

import { useState, useRef, useCallback } from 'react';
import Image from 'next/image';
import { ExternalLink, ArrowUpRight, Sparkles, Terminal, Code2 } from 'lucide-react';
import { GithubIcon } from '@/components/Icons/SocialIcons';
import styles from './ProjectCard3D.module.scss';

export default function ProjectCard3D({
  project,
  index,
  total,
  isSelected,
  isHovered,
  isDimmed,
  layoutTransform,
  onHover,
  onLeave,
  onClick,
}) {
  const cardRef = useRef(null);

  const isCompleted = project.status === 'Completed';

  // When hovered: card becomes significantly bigger, lifts forward, and straightens to face the user cleanly without any shaking
  const dynamicTransform = isHovered
    ? `${layoutTransform} scale(1.24) translateZ(160px) rotateY(10deg) rotateX(-5deg)`
    : `${layoutTransform} scale(1) translateZ(0px)`;

  return (
    <div
      ref={cardRef}
      className={`${styles.cardContainer} ${isHovered ? styles.hovered : ''} ${isDimmed ? styles.dimmed : ''} ${isSelected ? styles.selected : ''}`}
      style={{
        transform: dynamicTransform,
        zIndex: isHovered ? 120 : total - index,
      }}
      onMouseEnter={() => onHover(project.id)}
      onMouseLeave={onLeave}
      onClick={() => onClick(project)}
      role="button"
      tabIndex={0}
      aria-label={project.title}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick(project);
        }
      }}
    >
      {/* Floating 3D Panel */}
      <div className={styles.windowFrame}>
        {/* Browser / Viewport Window Header */}
        <div className={styles.windowHeader}>
          <div className={styles.windowControls} aria-hidden="true">
            <span className={`${styles.controlDot} ${styles.dotRed}`} />
            <span className={`${styles.controlDot} ${styles.dotYellow}`} />
            <span className={`${styles.controlDot} ${styles.dotGreen}`} />
          </div>
          <div className={styles.urlPill}>
            <span className={styles.urlProtocol}>https://</span>
            <span className={styles.urlHost}>
              {project.id}.rudransh.dev
            </span>
          </div>
          <div className={styles.specStatusSeal}>
            <span className={styles.sealGlyph}>{isCompleted ? '◈' : '⟐'}</span>
            <span className={styles.sealCode}>{isCompleted ? 'PROD' : 'R&D'}</span>
          </div>
        </div>

        {/* Project Screenshot / Media */}
        <div className={styles.mediaContainer}>
          {project.image ? (
            <Image
              src={project.image}
              alt={project.title}
              width={720}
              height={440}
              className={styles.screenshot}
              priority={index < 2}
            />
          ) : (
            <div className={styles.placeholderMedia}>
              <Terminal size={48} className={styles.placeholderIcon} />
              <span className={styles.placeholderTitle}>{project.title}</span>
            </div>
          )}

          {/* Specular sheen / glass glare reflection */}
          <div className={styles.specularOverlay} aria-hidden="true" />

          {/* Interactive Hover Reveal Overlay */}
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

            {/* Quick Action Buttons (Live Demo & GitHub) */}
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

      {/* 3D Floor Reflection fading into dark void */}
      <div className={styles.floorReflection} aria-hidden="true">
        {project.image && (
          <Image
            src={project.image}
            alt=""
            width={720}
            height={440}
            className={styles.reflectionImage}
          />
        )}
        <div className={styles.reflectionFade} />
      </div>
    </div>
  );
}

