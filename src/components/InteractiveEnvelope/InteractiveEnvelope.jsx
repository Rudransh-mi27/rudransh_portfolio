'use client';

import { useState, useEffect, useRef } from 'react';
import { Code2, GraduationCap, ArrowUpRight, Sparkles } from 'lucide-react';
import EngineeringDocument from './EngineeringDocument';
import AcademicTerminal from './AcademicTerminal';
import styles from './InteractiveEnvelope.module.scss';

export default function InteractiveEnvelope() {
  // Interaction states: 'idle' | 'hovered' | 'engineering' | 'terminal'
  const [activeMode, setActiveMode] = useState('idle');
  const [hoveredLetter, setHoveredLetter] = useState(null); // 'engineering' | 'academic' | null
  const [isEnvelopeHovered, setIsEnvelopeHovered] = useState(false);

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

  const handleSelectLetter = (type) => {
    setActiveMode(type);
  };

  const handleClose = () => {
    setActiveMode('idle');
    setHoveredLetter(null);
  };

  return (
    <div className={styles.envelopeWrapper}>
      {/* Centered 3D Physical Navy-Blue Envelope */}
      <div
        className={`${styles.envelopeRoot} ${isEnvelopeHovered ? styles.envelopeHovered : ''}`}
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
            {/* Subtle paper fold highlight along edges */}
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

        {/* 6. Envelope Front Pocket (Folds covering lower portions of both letters) */}
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

