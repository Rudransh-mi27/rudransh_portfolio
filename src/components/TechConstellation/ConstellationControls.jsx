'use client';

import { Plus, Minus, RotateCcw, Maximize2, Layers } from 'lucide-react';
import { CATEGORIES } from '@/data/skillsGraphData';
import styles from './ConstellationControls.module.scss';

export default function ConstellationControls({
  zoom,
  onZoomIn,
  onZoomOut,
  onReset,
  selectedCategory,
  onSelectCategory,
  totalNodes,
  activeConnectionsCount,
}) {
  const categoriesList = [
    { id: 'all', label: 'All Ecosystem', color: '#ffffff' },
    ...Object.values(CATEGORIES),
  ];

  return (
    <div className={styles.controlsRoot}>
      {/* Category Filter Pills (Top / Floating) */}
      <div className={styles.categoryBar} role="tablist" aria-label="Constellation Categories">
        {categoriesList.map((cat) => {
          const isActive = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => onSelectCategory(cat.id)}
              className={`${styles.catTab} ${isActive ? styles.activeTab : ''}`}
              style={{
                '--tab-color': cat.color,
              }}
            >
              <span className={styles.catLabel}>{cat.label}</span>
            </button>
          );
        })}
      </div>

      {/* Floating HUD Widget (Bottom-Left) */}
      <div className={styles.hudWidget}>
        <div className={styles.telemetry}>
          <div className={styles.telemetryRow}>
            <span className={styles.telemetryLabel}>ACTIVE NODES</span>
            <span className={styles.telemetryValue}>{totalNodes} Verified</span>
          </div>
          <div className={styles.telemetryRow}>
            <span className={styles.telemetryLabel}>ZOOM LEVEL</span>
            <span className={styles.telemetryValue}>{Math.round(zoom * 100)}%</span>
          </div>
        </div>

        <div className={styles.actionButtons}>
          <button
            type="button"
            onClick={onZoomIn}
            className={styles.actionBtn}
            title="Zoom In (+)"
            aria-label="Zoom in"
          >
            <Plus size={16} />
          </button>
          <button
            type="button"
            onClick={onZoomOut}
            className={styles.actionBtn}
            title="Zoom Out (-)"
            aria-label="Zoom out"
          >
            <Minus size={16} />
          </button>
          <div className={styles.btnDivider} />
          <button
            type="button"
            onClick={onReset}
            className={styles.actionBtn}
            title="Reset Constellation View"
            aria-label="Reset constellation view"
          >
            <RotateCcw size={14} />
          </button>
        </div>
      </div>
    </div>
  );
}

