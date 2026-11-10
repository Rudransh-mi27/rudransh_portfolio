'use client';

import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Layers,
  Sparkles,
  Compass,
  ArrowRight,
  Maximize2,
} from 'lucide-react';
import ProjectCard3D from './ProjectCard3D';
import ProjectExpansionModal from './ProjectExpansionModal';
import styles from './ProjectShowcase3D.module.scss';

const FILTERS = [
  { id: 'all', label: 'All Projects' },
  { id: 'featured', label: 'Featured Systems' },
  { id: 'aiml', label: 'AI & ML / RAG' },
  { id: 'fullstack', label: 'Backend & Web' },
];

export default function ProjectShowcase3D({ projects = [] }) {
  const containerRef = useRef(null);

  // Active filter state
  const [activeFilter, setActiveFilter] = useState('all');

  // Active project index in the 3D cascade
  const [activeIndex, setActiveIndex] = useState(0);

  // Hovered card id
  const [hoveredId, setHoveredId] = useState(null);

  // Expanded project for cinematic full-screen presentation
  const [expandedProject, setExpandedProject] = useState(null);

  // Scroll entrance state
  const [hasEntered, setHasEntered] = useState(false);

  // Mouse Parallax across the 3D world
  const [mouseParallax, setMouseParallax] = useState({ x: 0, y: 0 });
  const targetParallax = useRef({ x: 0, y: 0 });

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

  // Reset active index when filter changes
  useEffect(() => {
    setActiveIndex(0);
  }, [activeFilter]);

  // Intersection Observer for staggered entrance animation
  useEffect(() => {
    if (!containerRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasEntered(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  // Smooth mouse parallax loop
  useEffect(() => {
    let animId;
    const loop = () => {
      setMouseParallax((curr) => ({
        x: curr.x + (targetParallax.current.x - curr.x) * 0.08,
        y: curr.y + (targetParallax.current.y - curr.y) * 0.08,
      }));
      animId = requestAnimationFrame(loop);
    };
    animId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animId);
  }, []);

  const handleMouseMove = (e) => {
    // If a card is hovered, freeze the stage perspective so there is zero jitter/shaking
    if (!containerRef.current || hoveredId) return;
    const rect = containerRef.current.getBoundingClientRect();
    const nx = (e.clientX - rect.left) / rect.width - 0.5;
    const ny = (e.clientY - rect.top) / rect.height - 0.5;

    targetParallax.current = {
      x: Number((nx * 10).toFixed(2)),
      y: Number((ny * 8).toFixed(2)),
    };
  };

  const handleMouseLeave = () => {
    targetParallax.current = { x: 0, y: 0 };
    setHoveredId(null);
  };

  // Step next/prev in the 3D cascade
  const handleNext = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % filteredProjects.length);
  }, [filteredProjects.length]);

  const handlePrev = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + filteredProjects.length) % filteredProjects.length);
  }, [filteredProjects.length]);

  // Next/prev while in modal
  const handleModalNext = useCallback(() => {
    if (!expandedProject) return;
    const currIdx = filteredProjects.findIndex((p) => p.id === expandedProject.id);
    const nextIdx = (currIdx + 1) % filteredProjects.length;
    setExpandedProject(filteredProjects[nextIdx]);
  }, [expandedProject, filteredProjects]);

  const handleModalPrev = useCallback(() => {
    if (!expandedProject) return;
    const currIdx = filteredProjects.findIndex((p) => p.id === expandedProject.id);
    const prevIdx = (currIdx - 1 + filteredProjects.length) % filteredProjects.length;
    setExpandedProject(filteredProjects[prevIdx]);
  }, [expandedProject, filteredProjects]);

  // Touch swipe support for mobile
  const touchStart = useRef(0);
  const handleTouchStart = (e) => {
    touchStart.current = e.touches[0].clientX;
  };
  const handleTouchEnd = (e) => {
    const diff = touchStart.current - e.changedTouches[0].clientX;
    if (diff > 50) handleNext();
    else if (diff < -50) handlePrev();
  };

  return (
    <div
      ref={containerRef}
      className={`${styles.showcaseRoot} ${hasEntered ? styles.revealed : ''}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Top Filter and Telemetry Header */}
      <div className={styles.topControlBar}>
        <div className={styles.filterPills} role="tablist">
          {FILTERS.map((f) => (
            <button
              key={f.id}
              role="tab"
              aria-selected={activeFilter === f.id}
              onClick={() => setActiveFilter(f.id)}
              className={`${styles.filterBtn} ${activeFilter === f.id ? styles.activeFilter : ''}`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main 3D Perspective Stage */}
      <div className={styles.stageViewport}>
        {/* Subtle Stardust & Perspective Coordinate Grid */}
        <div className={styles.perspectiveGrid} aria-hidden="true" />

        {/* Rotated 3D Environment (Perspective Camera) */}
        <div
          className={styles.perspectiveEnvironment}
          style={{
            transform: `
              rotateY(${-24 + mouseParallax.x}deg)
              rotateX(${13 - mouseParallax.y}deg)
              rotateZ(2deg)
            `,
          }}
        >
          {filteredProjects.map((project, idx) => {
            // Calculate relative offset from active index
            const offset = idx - activeIndex;

            // Spatially layered diagonal cascade (matching reference screenshot)
            const baseX = offset * 230 - 60;
            const baseY = -offset * 75 + 10;
            const baseZ = -offset * 120;
            const baseRotateZ = offset * 0.5;

            const layoutTransform = `
              translate3d(${baseX}px, ${baseY}px, ${baseZ}px)
              rotateZ(${baseRotateZ}deg)
            `;

            return (
              <ProjectCard3D
                key={project.id}
                project={project}
                index={idx}
                total={filteredProjects.length}
                isSelected={activeIndex === idx}
                isHovered={hoveredId === project.id}
                isDimmed={Boolean(hoveredId && hoveredId !== project.id)}
                layoutTransform={layoutTransform}
                onHover={setHoveredId}
                onLeave={() => setHoveredId(null)}
                onClick={setExpandedProject}
              />
            );
          })}
        </div>
      </div>

      {/* Bottom Floating Navigation HUD */}
      <div className={styles.bottomHud}>
        <div className={styles.hudLeft}>
          <button
            type="button"
            onClick={handlePrev}
            className={styles.hudNavBtn}
            aria-label="Previous project in 3D space"
            title="Previous (Left Arrow)"
          >
            <ChevronLeft size={18} />
          </button>

          <div className={styles.indexTrack}>
            <span className={styles.activeNumber}>
              0{activeIndex + 1}
            </span>
            <span className={styles.divider}>/</span>
            <span className={styles.totalNumber}>
              0{filteredProjects.length}
            </span>
          </div>

          <button
            type="button"
            onClick={handleNext}
            className={styles.hudNavBtn}
            aria-label="Next project in 3D space"
            title="Next (Right Arrow)"
          >
            <ChevronRight size={18} />
          </button>
        </div>

        <div className={styles.hudRight}>
          <div className={styles.progressDots}>
            {filteredProjects.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setActiveIndex(i)}
                className={`${styles.dotPill} ${activeIndex === i ? styles.activeDotPill : ''}`}
                aria-label={`Jump to project ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Full-Screen Cinematic Project Presentation Modal */}
      {expandedProject && (
        <ProjectExpansionModal
          project={expandedProject}
          onClose={() => setExpandedProject(null)}
          onNext={handleModalNext}
          onPrev={handleModalPrev}
          hasMultiple={filteredProjects.length > 1}
        />
      )}
    </div>
  );
}

