'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { Code2, GraduationCap } from 'lucide-react';
import EngineeringDocument from './EngineeringDocument';
import AcademicTerminal from './AcademicTerminal';
import styles from './InteractiveEnvelope.module.scss';

export default function InteractiveEnvelope() {
  // Interaction states: 'idle' | 'engineering' | 'terminal'
  const [activeMode, setActiveMode] = useState('idle');
  const [hoveredLetter, setHoveredLetter] = useState(null); // 'engineering' | 'academic' | null
  const [isEnvelopeHovered, setIsEnvelopeHovered] = useState(false);

  // Scroll scrub state for the speech bubble
  const [bubbleState, setBubbleState] = useState({
    opacity: 0,
    blur: 12,
    scale: 0.92,
  });

  const stageRef = useRef(null);

  // Close with Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setActiveMode('idle');
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Lock body scroll when document or terminal is open
  useEffect(() => {
    if (activeMode === 'engineering' || activeMode === 'terminal') {
      const original = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = original;
      };
    }
  }, [activeMode]);

  // Scroll-based blur and opacity scrub for the comic speech bubble
  useEffect(() => {
    // Check prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    if (prefersReducedMotion) {
      setBubbleState({ opacity: 1, blur: 0, scale: 1 });
      return;
    }

    let rafId;

    const updateScrollScrub = () => {
      if (!stageRef.current) return;
      const rect = stageRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;

      // Center of the About section composition relative to viewport
      const sectionCenter = rect.top + rect.height / 2;
      const viewportCenter = viewportHeight / 2;

      // Distance from center of viewport
      const distFromCenter = Math.abs(sectionCenter - viewportCenter);

      // Plateau where bubble is completely sharp (0px blur, 1.0 opacity) while section is in view
      const plateau = Math.min(220, rect.height * 0.35);
      const effectiveDist = Math.max(0, distFromCenter - plateau);
      const fadeRange = viewportHeight * 0.5;

      // Normalized factor: 1 when section is active in center, fades to 0 when scrolling away
      const rawFactor = Math.max(0, Math.min(1, 1 - effectiveDist / fadeRange));

      // Smooth cubic curve for natural reveal
      const smoothFactor = rawFactor * rawFactor * (3 - 2 * rawFactor);

      // Interpolate opacity, blur, and subtle scale
      const opacity = Number(smoothFactor.toFixed(3));
      const blur = Number(((1 - smoothFactor) * 12).toFixed(1));
      const scale = Number((0.92 + 0.08 * smoothFactor).toFixed(3));

      setBubbleState({ opacity, blur, scale });
    };

    const handleScroll = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(updateScrollScrub);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });

    // Initial calculation on mount
    updateScrollScrub();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
      cancelAnimationFrame(rafId);
    };
  }, []);

  const handleSelectLetter = (type) => {
    setActiveMode(type);
  };

  const handleClose = () => {
    setActiveMode('idle');
    setHoveredLetter(null);
  };

  return (
    <div ref={stageRef} className={styles.envelopeWrapper}>
      {/* Two-Column Composition: [ INTERACTIVE ENVELOPE ] [ SUPERHERO AVATAR ] */}
      <div className={styles.compositionStage}>
        {/* Left Column: Interactive Navy-Blue Envelope */}
        <div className={styles.envelopeColumn}>
          <div
            className={`${styles.envelopeRoot} ${
              isEnvelopeHovered ? styles.envelopeHovered : ''
            }`}
            onMouseEnter={() => setIsEnvelopeHovered(true)}
            onMouseLeave={() => {
              setIsEnvelopeHovered(false);
              setHoveredLetter(null);
            }}
          >
            {/* 1. Envelope Back Base Panel */}
            <div className={styles.envelopeBack} />

            {/* 2. Open Triangular Back Flap (pointing upward) */}
            <div className={styles.backFlap} aria-hidden="true">
              <svg
                viewBox="0 0 520 180"
                className={styles.flapSvg}
                preserveAspectRatio="none"
              >
                <polygon
                  points="0,180 260,0 520,180"
                  className={styles.flapPolygon}
                />
                <polyline
                  points="0,180 260,0 520,180"
                  fill="none"
                  stroke="rgba(255, 255, 255, 0.08)"
                  strokeWidth="1.5"
                />
              </svg>
            </div>

            {/* 3. Deep Interior Envelope Cavity Shadow */}
            <div className={styles.cavityShadow} aria-hidden="true" />

            {/* 4. Letter 2: Academic Status (Layered Behind Letter 1) */}
            <div
              className={`${styles.letter} ${styles.academicLetter} ${
                hoveredLetter === 'academic' ? styles.letterActiveHover : ''
              }`}
              onMouseEnter={(e) => {
                e.stopPropagation();
                setHoveredLetter('academic');
              }}
              onMouseLeave={() => setHoveredLetter(null)}
              onClick={() => handleSelectLetter('terminal')}
              role="button"
              tabIndex={0}
              aria-label="Open Academic Status Terminal"
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  handleSelectLetter('terminal');
                }
              }}
            >
              <div className={styles.letterContent}>
                <div className={styles.academicHeader}>
                  <div className={styles.letterIconWrap}>
                    <GraduationCap size={16} className={styles.academicIcon} />
                  </div>
                  <div className={styles.letterTextGroup}>
                    <span className={styles.letterTag}>BASH TERMINAL // SPECS</span>
                    <h4 className={styles.academicTitle}>Academic Status</h4>
                  </div>
                </div>
                <p className={styles.academicSnippet}>
                  SRMU • B.Tech CSE (AI &amp; ML) • 8.02 CGPA • Term 03
                </p>
              </div>
            </div>

            {/* 5. Letter 1: Engineering Philosophy (Layered in Front of Letter 2) */}
            <div
              className={`${styles.letter} ${styles.engineeringLetter} ${
                hoveredLetter === 'engineering' ? styles.letterActiveHover : ''
              }`}
              onMouseEnter={(e) => {
                e.stopPropagation();
                setHoveredLetter('engineering');
              }}
              onMouseLeave={() => setHoveredLetter(null)}
              onClick={() => handleSelectLetter('engineering')}
              role="button"
              tabIndex={0}
              aria-label="Open Engineering Philosophy Document"
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  handleSelectLetter('engineering');
                }
              }}
            >
              <div className={styles.letterContent}>
                <div className={styles.engineeringHeader}>
                  <div className={styles.letterIconWrap}>
                    <Code2 size={16} className={styles.engIcon} />
                  </div>
                  <div className={styles.letterTextGroup}>
                    <span className={styles.letterTag}>ARCHITECTURAL MANIFESTO</span>
                    <h4 className={styles.engTitle}>Engineering Philosophy</h4>
                  </div>
                </div>
                <p className={styles.engSnippet}>
                  Systems driven by logic, structured routes &amp; real-world utility
                </p>
              </div>
            </div>

            {/* 6. Envelope Front Pocket */}
            <div className={styles.frontPocket} aria-hidden="true">
              <svg
                viewBox="0 0 520 288"
                className={styles.pocketSvg}
                preserveAspectRatio="none"
              >
                <defs>
                  <linearGradient id="leftFoldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#0c224a" />
                    <stop offset="100%" stopColor="#081836" />
                  </linearGradient>
                  <linearGradient id="rightFoldGrad" x1="100%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#0b1f44" />
                    <stop offset="100%" stopColor="#071632" />
                  </linearGradient>
                  <linearGradient id="bottomFoldGrad" x1="50%" y1="100%" x2="50%" y2="0%">
                    <stop offset="0%" stopColor="#0a1d3f" />
                    <stop offset="100%" stopColor="#0e2854" />
                  </linearGradient>
                </defs>

                {/* Left triangular fold */}
                <polygon
                  points="0,0 260,154 0,288"
                  fill="url(#leftFoldGrad)"
                  className={styles.foldLeft}
                />

                {/* Right triangular fold */}
                <polygon
                  points="520,0 260,154 520,288"
                  fill="url(#rightFoldGrad)"
                  className={styles.foldRight}
                />

                {/* Bottom trapezoidal / V fold */}
                <polygon
                  points="0,288 260,136 520,288"
                  fill="url(#bottomFoldGrad)"
                  className={styles.foldBottom}
                />

                {/* Crisp seam lighting lines */}
                <polyline
                  points="0,288 260,136 520,288"
                  fill="none"
                  stroke="rgba(255, 255, 255, 0.08)"
                  strokeWidth="1.2"
                />
                <polyline
                  points="0,0 260,154 520,0"
                  fill="none"
                  stroke="rgba(0, 0, 0, 0.35)"
                  strokeWidth="1.5"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Right Column: Stable Superhero Avatar Guide with Scroll-Animated Speech Bubble */}
        <div
          className={`${styles.avatarColumn} ${
            activeMode !== 'idle' ? styles.avatarDimmed : ''
          }`}
          aria-hidden="true"
        >
          <div className={styles.avatarFigure}>
            {/* Scroll-Animated Comic Speech Bubble */}
            <div
              className={styles.speechBubble}
              style={{
                opacity: bubbleState.opacity,
                filter: `blur(${bubbleState.blur}px)`,
                transform: `scale(${bubbleState.scale})`,
              }}
              role="note"
              aria-label="Comic speech bubble: Check It Out! About me"
            >
              <span className={styles.bubbleTextLine}>Check It Out!</span>
              <span className={styles.bubbleTextLine}>About me</span>

              {/* Pointing Speech Bubble Tail directed towards the superhero */}
              <svg
                className={styles.speechTailSvg}
                viewBox="0 0 28 20"
                fill="none"
                aria-hidden="true"
              >
                {/* Seam patch to seamlessly merge tail with speech bubble body */}
                <rect x="3" y="-3" width="22" height="5" fill="#f7f3e8" />
                <path
                  d="M 4 0 C 4 8, 1 14, 0 19 C 6 15, 15 10, 24 0 Z"
                  fill="#f7f3e8"
                />
                <path
                  d="M 4 0 C 4 8, 1 14, 0 19 C 6 15, 15 10, 24 0"
                  stroke="#000000"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>

            <Image
              src="/assets/about/batman_avatar.webp"
              alt="Superhero guide pointing to the About section envelope"
              width={576}
              height={985}
              className={styles.avatarImage}
              priority
            />

            {/* Realistic Contact Floor Shadow */}
            <div className={styles.avatarFloorShadow} />
          </div>
        </div>
      </div>

      {/* Expanded Engineering Philosophy Document Overlay */}
      {activeMode === 'engineering' && (
        <div
          className={styles.modalBackdrop}
          onClick={(e) => {
            if (e.target === e.currentTarget) handleClose();
          }}
        >
          <EngineeringDocument onClose={handleClose} />
        </div>
      )}

      {/* Expanded Academic Status Bash Terminal Overlay */}
      {activeMode === 'terminal' && (
        <div
          className={styles.modalBackdrop}
          onClick={(e) => {
            if (e.target === e.currentTarget) handleClose();
          }}
        >
          <AcademicTerminal onClose={handleClose} />
        </div>
      )}
    </div>
  );
}
