'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { ArrowDown, Download, MapPin, ArrowUpRight } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '@/components/Icons/SocialIcons';
import { PERSONAL_INFO } from '@/data/portfolioData';
import styles from './Hero.module.scss';

export default function Hero() {
  const portraitRef = useRef(null);
  const [blurStyle, setBlurStyle] = useState({ blur: 0, opacity: 1, scale: 1 });

  useEffect(() => {
    let animationFrameId;
    let currentBlur = 0;
    let targetBlur = 0;
    let currentOpacity = 1;
    let targetOpacity = 1;
    let currentScale = 1;
    let targetScale = 1;

    const updateTargets = () => {
      if (!portraitRef.current) return;
      const rect = portraitRef.current.getBoundingClientRect();

      // rect.top is the vertical distance from top of viewport to the top of hair
      // Blur animation starts ONLY when hair reaches top of the screen (rect.top <= 0)
      const overflowPastTop = -rect.top;

      if (overflowPastTop <= 0) {
        targetBlur = 0;
        targetOpacity = 1;
        targetScale = 1;
      } else {
        // Smoothly ramp up over 450px of scroll past the top edge
        const progress = Math.min(overflowPastTop / 450, 1);
        // Cinematic quadratic ease-out
        const ease = 1 - Math.pow(1 - progress, 2);
        targetBlur = ease * 28;
        targetOpacity = 1 - ease * 0.55;
        targetScale = 1 + ease * 0.06;
      }
    };

    const loop = () => {
      // Fast, responsive recovery when returning to top; smooth cinematic ramp when scrolling down
      const isRecovering = targetBlur < currentBlur;
      const blurFactor = isRecovering ? 0.22 : 0.09;
      const attrFactor = isRecovering ? 0.22 : 0.09;

      currentBlur += (targetBlur - currentBlur) * blurFactor;
      currentOpacity += (targetOpacity - currentOpacity) * attrFactor;
      currentScale += (targetScale - currentScale) * attrFactor;

      // Clean snap when settled near top to immediately restore crisp perfection
      if (isRecovering && currentBlur < 0.2) {
        currentBlur = targetBlur;
        currentOpacity = targetOpacity;
        currentScale = targetScale;
      }

      setBlurStyle({
        blur: Number(currentBlur.toFixed(2)),
        opacity: Number(currentOpacity.toFixed(3)),
        scale: Number(currentScale.toFixed(4)),
      });

      animationFrameId = requestAnimationFrame(loop);
    };

    const onScroll = () => {
      updateTargets();
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    updateTargets();
    loop();

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  const handleScrollToProjects = (e) => {
    e.preventDefault();
    const el = document.getElementById('projects');
    if (el) {
      const topOffset = 80;
      const elementPosition = el.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - topOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section id="home" className={styles.heroSection}>
      {/* ========================================================= */}
      {/* LAYER 1: Deep Background Typography & Ambient Atmosphere   */}
      {/* ========================================================= */}
      <div className={styles.layerBackground} aria-hidden="true">
        <div className={styles.bgTypographyWrap}>
          <div className={styles.bgGiantTitle}>RUDRANSH</div>
          <div className={styles.bgGiantSubtitle}>PORTFOLIO EDITION &lsquo;26</div>
        </div>
        <div className={styles.ambientGlow} />
      </div>

      {/* ========================================================= */}
      {/* LAYER 2: Full-Screen Portrait - Blurs ONLY when Hair Hits Top */}
      {/* ========================================================= */}
      <div className={styles.layerPortrait} aria-hidden="true">
        <div
          ref={portraitRef}
          className={styles.portraitContainer}
          style={{
            filter: `blur(${blurStyle.blur}px)`,
            opacity: blurStyle.opacity,
            transform: `scale(${blurStyle.scale})`,
            willChange: 'filter, opacity, transform'
          }}
        >
          <div className={styles.imageWrapper}>
            <Image
              src="/assets/avatar/avatar_cutout.png"
              alt="Rudransh Mishra Portrait Cutout"
              width={1670}
              height={941}
              priority
              className={styles.portraitImage}
            />
          </div>

          {/* Vignette fade towards bottom */}
          <div className={styles.portraitVignette} />
        </div>
      </div>

      {/* ========================================================= */}
      {/* LAYER 3: Foreground Text - Positioned Below the Shoulder   */}
      {/* ========================================================= */}
      <div className={styles.layerForeground}>
        <div className={styles.heroContainer}>
          {/* Top Meta Bar */}
          <div className={styles.metaBar}>
            <div className={styles.statusIndicator}>
              <span className={styles.statusText}>{PERSONAL_INFO.availableStatus}</span>
            </div>

            <div className={styles.locationBadge}>
              <MapPin size={12} className={styles.locationIcon} />
              <span>{PERSONAL_INFO.location}</span>
            </div>
          </div>

          {/* Dedicated clearance spacer so head, eyes, and hair have abundant breathing room */}
          <div className={styles.faceClearanceSpacer} />

          {/* Name & Quote Sitting Cleanly Below the Shoulders */}
          <div className={styles.heroContentBelowShoulder}>
            <h1 className={styles.mainTitle}>
              <span className={styles.titlePrimary}>RUDRANSH</span>
              <span className={styles.titleSerif}>Mishra</span>
            </h1>

            <p className={styles.editorialTagline}>
              &ldquo;{PERSONAL_INFO.tagline}&rdquo;
            </p>

            {/* Clean Hero Action Group */}
            <div className={styles.heroActionRow}>
              <a
                href={PERSONAL_INFO.resumePath}
                download="Rudransh_Mishra_Resume.pdf"
                className={styles.primaryBtn}
                target="_blank"
                rel="noopener noreferrer"
              >
                <span>Download CV</span>
                <Download size={14} />
              </a>

              <a
                href="#projects"
                onClick={handleScrollToProjects}
                className={styles.secondaryBtn}
              >
                <span>Selected Work</span>
                <ArrowDown size={14} />
              </a>

              <div className={styles.socialPillsWrap}>
                <a
                  href={PERSONAL_INFO.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.socialPill}
                  aria-label="GitHub"
                >
                  <GithubIcon size={14} />
                  <span>GitHub</span>
                  <ArrowUpRight size={11} className={styles.arrow} />
                </a>

                <a
                  href={PERSONAL_INFO.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.socialPill}
                  aria-label="LinkedIn"
                >
                  <LinkedinIcon size={14} />
                  <span>LinkedIn</span>
                  <ArrowUpRight size={11} className={styles.arrow} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
