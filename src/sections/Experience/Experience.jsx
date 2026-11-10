'use client';

import { useState } from 'react';
import { Briefcase, Calendar, MapPin, Download, ExternalLink, FileText, CheckCircle2 } from 'lucide-react';
import { EXPERIENCE_DATA } from '@/data/portfolioData';
import styles from './Experience.module.scss';

export default function Experience() {
  const [selectedCert, setSelectedCert] = useState(null);

  return (
    <section id="experience" className={styles.experienceSection}>
      <div className={styles.container}>
        <div className={styles.sectionHeader}>
          <div className={styles.sectionBadge}>
            <span>EXPERIENCE &amp; PRACTICE</span>
          </div>
          <h2 className={styles.sectionTitle}>
            Internships &amp; practical engineering <span className={styles.serifItalic}>exposure</span>.
          </h2>
        </div>

        <div className={styles.timeline}>
          {EXPERIENCE_DATA.map((exp, idx) => (
            <div key={idx} className={styles.timelineCard}>
              <div className={styles.cardTop}>
                <div className={styles.roleInfo}>
                  <div className={styles.roleBadge}>
                    <Briefcase size={14} />
                    <span>{exp.mode} Internship</span>
                  </div>
                  <h3 className={styles.roleTitle}>{exp.role}</h3>
                  <div className={styles.companyRow}>
                    <span className={styles.companyName}>{exp.company}</span>
                    {exp.affiliation && (
                      <span className={styles.affiliation}>
                        ({exp.affiliation})
                      </span>
                    )}
                  </div>
                </div>

                <div className={styles.metaCol}>
                  <div className={styles.dateBadge}>
                    <Calendar size={13} />
                    <span>{exp.duration}</span>
                  </div>

                  {exp.certificatePdf && (
                    <a
                      href={exp.certificatePdf}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.certBtn}
                    >
                      <FileText size={14} />
                      <span>View Certificate</span>
                      <ExternalLink size={12} />
                    </a>
                  )}
                </div>
              </div>

              <div className={styles.highlightsContainer}>
                <h4 className={styles.highlightsTitle}>Key Achievements &amp; Projects:</h4>
                <ul className={styles.highlightsList}>
                  {exp.highlights.map((item, hIdx) => (
                    <li key={hIdx}>
                      <CheckCircle2 size={15} className={styles.checkIcon} />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Built Projects Chips during internship */}
              <div className={styles.internshipProjects}>
                <span className={styles.internshipProjectsLabel}>Applications Engineered:</span>
                <div className={styles.internshipTags}>
                  <span className={styles.internshipTag}>Interactive Quiz System</span>
                  <span className={styles.internshipTag}>Expense Tracker CLI</span>
                  <span className={styles.internshipTag}>Task Management Engine</span>
                  <span className={styles.internshipTag}>Contact Directory</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

