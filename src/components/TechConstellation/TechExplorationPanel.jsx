'use client';

import { ExternalLink, X, ArrowRight, Compass, ShieldCheck } from 'lucide-react';
import { TechIcon } from './TechIcons';
import { CATEGORIES } from '@/data/skillsGraphData';
import styles from './TechExplorationPanel.module.scss';

export default function TechExplorationPanel({
  node,
  connectedNodes = [],
  onClose,
  onSelectNode,
}) {
  if (!node) return null;

  const category = CATEGORIES[node.category?.toUpperCase()] || CATEGORIES.BACKEND;

  return (
    <aside className={styles.panel} aria-label={`${node.name} Technology Details`}>
      <div className={styles.header}>
        <div />
        <button
          type="button"
          onClick={onClose}
          className={styles.closeBtn}
          aria-label="Return to constellation"
          title="Return to constellation (Esc)"
        >
          <X size={18} />
          <span className={styles.closeLabel}>Return</span>
        </button>
      </div>

      <div className={styles.identity}>
        <div
          className={styles.iconWrap}
          style={{ borderColor: category.border }}
        >
          <TechIcon id={node.id} size={36} color={category.color} />
        </div>
        <div className={styles.titleArea}>
          <h3 className={styles.nodeName}>{node.name}</h3>
        </div>
      </div>

      <div className={styles.scrollContent}>
        {/* Short Description */}
        <div className={styles.block}>
          <h4 className={styles.blockTitle}>Core Architecture</h4>
          <p className={styles.blockText}>{node.description}</p>
        </div>

        {/* Workflow Usage */}
        <div className={styles.block}>
          <h4 className={styles.blockTitle}>How I Use It In Production</h4>
          <div className={styles.usageCard} style={{ borderLeftColor: category.color }}>
            <p className={styles.usageText}>{node.usage}</p>
          </div>
        </div>

        {/* Connected Knowledge Graph Links */}
        {connectedNodes.length > 0 && (
          <div className={styles.block}>
            <div className={styles.connectedHeader}>
              <h4 className={styles.blockTitle}>Connected Ecosystem</h4>
              <span className={styles.connectedCount}>{connectedNodes.length} relationships</span>
            </div>
            <div className={styles.relatedGrid}>
              {connectedNodes.map((rel) => {
                const relCat = CATEGORIES[rel.category?.toUpperCase()] || CATEGORIES.BACKEND;
                return (
                  <button
                    key={rel.id}
                    type="button"
                    onClick={() => onSelectNode(rel.id)}
                    className={styles.relatedChip}
                    title={`Focus on ${rel.name}`}
                  >
                    <TechIcon id={rel.id} size={15} color={relCat.color} />
                    <span className={styles.chipName}>{rel.name}</span>
                    <ArrowRight size={12} className={styles.chipArrow} />
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Official Documentation Action */}
      <div className={styles.footer}>
        <a
          href={node.docUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.docBtn}
          style={{ '--btn-accent': category.color }}
        >
          <span>Official Documentation</span>
          <ExternalLink size={15} />
        </a>
      </div>
    </aside>
  );
}

