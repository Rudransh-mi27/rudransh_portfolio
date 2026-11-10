'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Trophy, Award, FileText, ExternalLink, X, Shield, Users, Terminal } from 'lucide-react';
import { ACHIEVEMENTS_DATA } from '@/data/portfolioData';
import styles from './Achievements.module.scss';

const ICON_MAP = {
  'National Hackathon': Trophy,
  'State / Inter-College Hackathon': Award,
  'Security & Applied AI': Shield,
  'Technical Community': Users,
  'Algorithmic Problem Solving': Terminal,
};

export default function Achievements() {
  const [activeCert, setActiveCert] = useState(null);

  return (
    <section id="achievements" className={styles.achievementsSection}>
      <div className={styles.container}>
        <div className={styles.sectionHeader}>
          <div className={styles.sectionBadge}>
            <span>HONORS &amp; RECOGNITION</span>
          </div>
          <h2 className={styles.sectionTitle}>
            Hackathons, certifications &amp; <span className={styles.serifItalic}>credentials</span>.
          </h2>
          <p className={styles.sectionSubtitle}>
            Verified participation and problem-solving credentials under competitive sprint environments.
          </p>
        </div>

        <div className={styles.achievementsGrid}>
          {ACHIEVEMENTS_DATA.map((item, idx) => {
            const Icon = ICON_MAP[item.category] || Award;
            const hasCertificate = Boolean(item.certificatePdf || item.certificateImage);

            return (
              <div key={idx} className={styles.card}>
                <div className={styles.cardHeader}>
                  <div className={styles.iconWrap}>
                    <Icon size={20} />
                  </div>
                  <span className={styles.badge}>{item.badge}</span>
                </div>

                <div className={styles.cardBody}>
                  <span className={styles.category}>{item.category}</span>
                  <h3 className={styles.title}>{item.title}</h3>
                  <p className={styles.description}>{item.description}</p>
                </div>

                {hasCertificate && (
                  <div className={styles.cardFooter}>
                    <button
                      onClick={() => setActiveCert(item)}
                      className={styles.certPreviewBtn}
                    >
                      <FileText size={14} />
                      <span>View Credential</span>
                      <ExternalLink size={12} />
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Modal for Certificate Preview */}
      {activeCert && (
        <div className={styles.modalBackdrop} onClick={() => setActiveCert(null)}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <div>
                <span className={styles.modalMeta}>{activeCert.category}</span>
                <h3 className={styles.modalTitle}>{activeCert.title}</h3>
              </div>
              <button
                className={styles.closeBtn}
                onClick={() => setActiveCert(null)}
                aria-label="Close Preview"
              >
                <X size={20} />
              </button>
            </div>

            <div className={styles.modalBody}>
              {activeCert.certificateImage && (
                <div className={styles.imagePreviewWrapper}>
                  <Image
                    src={activeCert.certificateImage}
                    alt={`${activeCert.title} Certificate`}
                    width={900}
                    height={600}
                    className={styles.certImage}
                  />
                </div>
              )}

              {activeCert.certificatePdf && (
                <div className={styles.pdfActionBox}>
                  <p>Official Verification Document (PDF)</p>
                  <a
                    href={activeCert.certificatePdf}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.downloadPdfBtn}
                  >
                    <span>Open Official Document in Full Screen</span>
                    <ExternalLink size={15} />
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

