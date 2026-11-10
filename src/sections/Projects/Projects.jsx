'use client';

import ProjectShowcase3D from '@/components/ProjectShowcase/ProjectShowcase3D';
import { PROJECTS_DATA } from '@/data/portfolioData';
import styles from './Projects.module.scss';

export default function Projects() {
  return (
    <section id="projects" className={styles.projectsSection}>
      <div className={styles.container}>
        {/* Section Editorial Header */}
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>
            Engineered with <span className={styles.serifItalic}>precision</span>, built for scale.
          </h2>
        </div>

        {/* 3D Immersive Project Showcase Environment */}
        <div className={styles.showcaseWrapper}>
          <ProjectShowcase3D projects={PROJECTS_DATA} />
        </div>
      </div>
    </section>
  );
}
