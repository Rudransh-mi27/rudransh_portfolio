'use client';

import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import {
  GRAPH_NODES,
  GRAPH_LINKS,
  CATEGORIES,
  getConnectedNodeIds,
  getConnectedLinks,
} from '@/data/skillsGraphData';
import { TechIcon } from './TechIcons';
import ConstellationControls from './ConstellationControls';
import TechExplorationPanel from './TechExplorationPanel';
import styles from './ConstellationCanvas.module.scss';

// SVG Virtual Canvas Dimensions
const CANVAS_WIDTH = 1350;
const CANVAS_HEIGHT = 980;

export default function ConstellationCanvas() {
  const containerRef = useRef(null);
  const svgRef = useRef(null);

  // Viewport transform state (camera)
  const [transform, setTransform] = useState({ x: 0, y: 0, scale: 1 });
  const [targetTransform, setTargetTransform] = useState({ x: 0, y: 0, scale: 1 });
  const isAnimatingCamera = useRef(false);

  // Interaction states
  const [hoveredNodeId, setHoveredNodeId] = useState(null);
  const [selectedNodeId, setSelectedNodeId] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [hasEnteredViewport, setHasEnteredViewport] = useState(false);

  // Dragging state
  const isDragging = useRef(false);
  const dragStart = useRef({ x: 0, y: 0 });
  const lastPan = useRef({ x: 0, y: 0 });
  const hasMoved = useRef(false);

  // Touch state for mobile pinch-to-zoom
  const initialPinchDist = useRef(null);
  const initialScale = useRef(1);

  // Particle flow animation tick
  const [particleOffset, setParticleOffset] = useState(0);

  // Animate particle flow
  useEffect(() => {
    let animId;
    let start = performance.now();
    const tick = (now) => {
      const elapsed = (now - start) / 1000;
      setParticleOffset((elapsed * 0.4) % 1);
      animId = requestAnimationFrame(tick);
    };
    animId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animId);
  }, []);

  // Smooth camera spring interpolation (LERP)
  useEffect(() => {
    let animFrame;
    const lerpCamera = () => {
      setTransform((curr) => {
        const dx = targetTransform.x - curr.x;
        const dy = targetTransform.y - curr.y;
        const ds = targetTransform.scale - curr.scale;

        // If close enough, snap to target
        if (Math.abs(dx) < 0.1 && Math.abs(dy) < 0.1 && Math.abs(ds) < 0.001) {
          isAnimatingCamera.current = false;
          return targetTransform;
        }

        isAnimatingCamera.current = true;
        return {
          x: curr.x + dx * 0.12,
          y: curr.y + dy * 0.12,
          scale: curr.scale + ds * 0.12,
        };
      });

      animFrame = requestAnimationFrame(lerpCamera);
    };

    animFrame = requestAnimationFrame(lerpCamera);
    return () => cancelAnimationFrame(animFrame);
  }, [targetTransform]);

  // Initial reveal on scroll
  useEffect(() => {
    if (!containerRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasEnteredViewport(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  // Compute node map for instant coordinate lookups
  const nodeMap = useMemo(() => {
    const map = new Map();
    GRAPH_NODES.forEach((n) => map.set(n.id, n));
    return map;
  }, []);

  // Compute connected nodes and links for current hover/selection
  const activeFocusId = selectedNodeId || hoveredNodeId;
  const connectedNodeIds = useMemo(() => {
    if (!activeFocusId) return new Set();
    return getConnectedNodeIds(activeFocusId);
  }, [activeFocusId]);

  const activeLinks = useMemo(() => {
    if (!activeFocusId) return [];
    return getConnectedLinks(activeFocusId);
  }, [activeFocusId]);

  const activeLinkSet = useMemo(() => {
    const set = new Set();
    activeLinks.forEach((l) => {
      set.add(`${l.source}->${l.target}`);
      set.add(`${l.target}->${l.source}`);
    });
    return set;
  }, [activeLinks]);

  // Selected Node Details
  const selectedNode = useMemo(() => {
    if (!selectedNodeId) return null;
    return nodeMap.get(selectedNodeId);
  }, [selectedNodeId, nodeMap]);

  // Array of connected node objects for the side panel
  const selectedConnectedNodes = useMemo(() => {
    if (!selectedNodeId) return [];
    const ids = Array.from(getConnectedNodeIds(selectedNodeId));
    return ids.map((id) => nodeMap.get(id)).filter(Boolean);
  }, [selectedNodeId, nodeMap]);

  // Generate subtle background stars
  const backgroundStars = useMemo(() => {
    const stars = [];
    for (let i = 0; i < 75; i++) {
      stars.push({
        id: i,
        x: (i * 137.5) % CANVAS_WIDTH,
        y: (i * 229.3) % CANVAS_HEIGHT,
        r: (i % 3 === 0 ? 1.5 : 1) + (i % 5) * 0.2,
        opacity: 0.15 + (i % 4) * 0.12,
        delay: (i % 10) * 0.4,
      });
    }
    return stars;
  }, []);

  // Center / Fit Constellation in the container
  const fitConstellation = useCallback(() => {
    if (!containerRef.current) return;
    const { clientWidth, clientHeight } = containerRef.current;
    const scaleX = clientWidth / CANVAS_WIDTH;
    const scaleY = clientHeight / CANVAS_HEIGHT;
    const fitScale = Math.min(scaleX, scaleY) * 0.92;
    const offsetX = (clientWidth - CANVAS_WIDTH * fitScale) / 2;
    const offsetY = (clientHeight - CANVAS_HEIGHT * fitScale) / 2;

    setTargetTransform({
      x: offsetX,
      y: offsetY,
      scale: fitScale,
    });
  }, []);

  // Center and focus camera on a specific node (Deep Exploration Mode)
  const focusOnNode = useCallback(
    (nodeId) => {
      const node = nodeMap.get(nodeId);
      if (!node || !containerRef.current) return;

      const { clientWidth, clientHeight } = containerRef.current;
      const isMobile = clientWidth < 768;

      // Higher zoom for close inspection
      const targetScale = isMobile ? 1.4 : 1.65;

      // Center the node. On desktop, shift slightly to the left to give breathing room for the side panel (380px)
      const horizontalOffset = isMobile ? clientWidth / 2 : (clientWidth - 360) / 2;
      const verticalOffset = isMobile ? clientHeight / 2 - 80 : clientHeight / 2;

      const targetX = horizontalOffset - node.x * targetScale;
      const targetY = verticalOffset - node.y * targetScale;

      setSelectedNodeId(nodeId);
      setTargetTransform({
        x: targetX,
        y: targetY,
        scale: targetScale,
      });
    },
    [nodeMap]
  );

  // Return to full constellation
  const handleReturnToConstellation = useCallback(() => {
    setSelectedNodeId(null);
    fitConstellation();
  }, [fitConstellation]);

  // Initial fit on mount and window resize
  useEffect(() => {
    fitConstellation();
    const onResize = () => {
      if (!selectedNodeId) {
        fitConstellation();
      } else {
        focusOnNode(selectedNodeId);
      }
    };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [fitConstellation, selectedNodeId, focusOnNode]);

  // Handle keyboard navigation (Esc to return)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && selectedNodeId) {
        handleReturnToConstellation();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedNodeId, handleReturnToConstellation]);

  // Zoom controls
  const handleZoomIn = () => {
    setTargetTransform((prev) => ({
      ...prev,
      scale: Math.min(prev.scale * 1.25, 2.4),
    }));
  };

  const handleZoomOut = () => {
    setTargetTransform((prev) => ({
      ...prev,
      scale: Math.max(prev.scale * 0.8, 0.5),
    }));
  };

  // Mouse wheel zoom
  const handleWheel = (e) => {
    e.preventDefault();
    if (!containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const zoomFactor = e.deltaY < 0 ? 1.12 : 0.89;
    const newScale = Math.min(Math.max(transform.scale * zoomFactor, 0.45), 2.5);

    // Zoom centered around mouse pointer
    const newX = mouseX - (mouseX - transform.x) * (newScale / transform.scale);
    const newY = mouseY - (mouseY - transform.y) * (newScale / transform.scale);

    setTargetTransform({
      x: newX,
      y: newY,
      scale: newScale,
    });
  };

  // Mouse drag panning handlers
  const handleMouseDown = (e) => {
    // Only drag on left mouse button
    if (e.button !== 0) return;
    isDragging.current = true;
    hasMoved.current = false;
    dragStart.current = { x: e.clientX, y: e.clientY };
    lastPan.current = { x: targetTransform.x, y: targetTransform.y };
  };

  const handleMouseMove = (e) => {
    if (!isDragging.current) return;
    const dx = e.clientX - dragStart.current.x;
    const dy = e.clientY - dragStart.current.y;

    if (Math.abs(dx) > 3 || Math.abs(dy) > 3) {
      hasMoved.current = true;
    }

    setTargetTransform((prev) => ({
      ...prev,
      x: lastPan.current.x + dx,
      y: lastPan.current.y + dy,
    }));
  };

  const handleMouseUp = () => {
    isDragging.current = false;
  };

  // Touch panning and pinch-to-zoom
  const handleTouchStart = (e) => {
    if (e.touches.length === 1) {
      isDragging.current = true;
      hasMoved.current = false;
      dragStart.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      lastPan.current = { x: targetTransform.x, y: targetTransform.y };
    } else if (e.touches.length === 2) {
      isDragging.current = false;
      const dx = e.touches[0].clientX - e.touches[1].clientX;
      const dy = e.touches[0].clientY - e.touches[1].clientY;
      initialPinchDist.current = Math.hypot(dx, dy);
      initialScale.current = targetTransform.scale;
    }
  };

  const handleTouchMove = (e) => {
    if (e.touches.length === 1 && isDragging.current) {
      const dx = e.touches[0].clientX - dragStart.current.x;
      const dy = e.touches[0].clientY - dragStart.current.y;
      if (Math.abs(dx) > 4 || Math.abs(dy) > 4) {
        hasMoved.current = true;
      }
      setTargetTransform((prev) => ({
        ...prev,
        x: lastPan.current.x + dx,
        y: lastPan.current.y + dy,
      }));
    } else if (e.touches.length === 2 && initialPinchDist.current) {
      const dx = e.touches[0].clientX - e.touches[1].clientX;
      const dy = e.touches[0].clientY - e.touches[1].clientY;
      const currentDist = Math.hypot(dx, dy);
      const factor = currentDist / initialPinchDist.current;
      const newScale = Math.min(Math.max(initialScale.current * factor, 0.45), 2.5);
      setTargetTransform((prev) => ({
        ...prev,
        scale: newScale,
      }));
    }
  };

  const handleTouchEnd = () => {
    isDragging.current = false;
    initialPinchDist.current = null;
  };

  // Click on background closes exploration
  const handleSvgBackgroundClick = (e) => {
    if (hasMoved.current) return;
    if (e.target.tagName === 'svg' || e.target.classList.contains('bg-interactive-surface')) {
      if (selectedNodeId) {
        handleReturnToConstellation();
      }
    }
  };

  // Click on a node
  const handleNodeClick = (e, nodeId) => {
    e.stopPropagation();
    if (hasMoved.current) return;

    if (selectedNodeId === nodeId) {
      // Clicking already selected node toggles back to full view
      handleReturnToConstellation();
    } else {
      focusOnNode(nodeId);
    }
  };

  return (
    <div
      ref={containerRef}
      className={`${styles.canvasContainer} ${hasEnteredViewport ? styles.entered : ''}`}
      onWheel={handleWheel}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      aria-label="Interactive Technology Constellation"
    >
      {/* Interactive Controls & Category Switcher */}
      <ConstellationControls
        zoom={transform.scale}
        onZoomIn={handleZoomIn}
        onZoomOut={handleZoomOut}
        onReset={handleReturnToConstellation}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
        totalNodes={GRAPH_NODES.length}
        activeConnectionsCount={activeLinks.length}
      />

      {/* Main SVG Vector Graph Engine */}
      <svg
        ref={svgRef}
        className={styles.constellationSvg}
        onClick={handleSvgBackgroundClick}
        role="img"
      >
        <defs>
          {/* Subtle glow filter */}
          <filter id="nodeGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="6" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>

          {/* Strong beam filter for active connection lines */}
          <filter id="beamGlow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="3.5" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>

          {/* Radial dark vignette gradient */}
          <radialGradient id="vignetteGrad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#0c0d14" stopOpacity="0.4" />
            <stop offset="65%" stopColor="#070709" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#070709" stopOpacity="0.98" />
          </radialGradient>
        </defs>

        {/* Base dark interactive background */}
        <rect
          width="100%"
          height="100%"
          fill="url(#vignetteGrad)"
          className="bg-interactive-surface"
        />

        {/* Transformed Scene Group (Pan & Zoom) */}
        <g
          transform={`translate(${transform.x}, ${transform.y}) scale(${transform.scale})`}
          className={styles.sceneGroup}
        >
          {/* 1. Celestial Starfield & Astronomical Coordinate Rings */}
          <g className={styles.starfield} aria-hidden="true">
            {backgroundStars.map((s) => (
              <circle
                key={s.id}
                cx={s.x}
                cy={s.y}
                r={s.r}
                fill="#ffffff"
                opacity={s.opacity}
              />
            ))}

            {/* Subtle celestial coordinate guides */}
            <circle
              cx={CANVAS_WIDTH / 2}
              cy={CANVAS_HEIGHT / 2}
              r={320}
              fill="none"
              stroke="rgba(255, 255, 255, 0.035)"
              strokeDasharray="4 8"
            />
            <circle
              cx={CANVAS_WIDTH / 2}
              cy={CANVAS_HEIGHT / 2}
              r={520}
              fill="none"
              stroke="rgba(255, 255, 255, 0.025)"
              strokeDasharray="6 12"
            />
          </g>

          {/* 2. Connection Lines Between Technologies */}
          <g className={styles.linksLayer} aria-hidden="true">
            {GRAPH_LINKS.map((link, idx) => {
              const sourceNode = nodeMap.get(link.source);
              const targetNode = nodeMap.get(link.target);
              if (!sourceNode || !targetNode) return null;

              const isLinkActive =
                activeLinkSet.has(`${link.source}->${link.target}`) ||
                activeLinkSet.has(`${link.target}->${link.source}`);

              const isFilteredOut =
                selectedCategory !== 'all' &&
                sourceNode.category !== selectedCategory &&
                targetNode.category !== selectedCategory;

              // Calculate connection style
              let stroke = 'rgba(255, 255, 255, 0.12)';
              let strokeWidth = 1.2;
              let opacity = 0.65;

              if (isFilteredOut) {
                opacity = 0.05;
              } else if (activeFocusId) {
                if (isLinkActive) {
                  const sourceCat = CATEGORIES[sourceNode.category?.toUpperCase()];
                  stroke = sourceCat?.color || '#38bdf8';
                  strokeWidth = 2.4;
                  opacity = 1;
                } else {
                  opacity = 0.08;
                }
              }

              // Path geometry
              const pathD = `M ${sourceNode.x} ${sourceNode.y} L ${targetNode.x} ${targetNode.y}`;

              // Animated particle position along this path when active
              const pX = sourceNode.x + (targetNode.x - sourceNode.x) * particleOffset;
              const pY = sourceNode.y + (targetNode.y - sourceNode.y) * particleOffset;

              return (
                <g key={`link-${idx}`}>
                  {/* Base connection line */}
                  <line
                    x1={sourceNode.x}
                    y1={sourceNode.y}
                    x2={targetNode.x}
                    y2={targetNode.y}
                    stroke={stroke}
                    strokeWidth={strokeWidth}
                    opacity={opacity}
                    strokeLinecap="round"
                    filter={isLinkActive ? 'url(#beamGlow)' : undefined}
                    className={styles.connectionLine}
                  />

                  {/* Flowing energy particle along active connection */}
                  {isLinkActive && !isFilteredOut && (
                    <circle
                      cx={pX}
                      cy={pY}
                      r={3.2}
                      fill="#ffffff"
                      filter="url(#beamGlow)"
                      opacity={0.9}
                    />
                  )}
                </g>
              );
            })}
          </g>

          {/* 3. Interactive Technology Nodes */}
          <g className={styles.nodesLayer}>
            {GRAPH_NODES.map((node) => {
              const category = CATEGORIES[node.category?.toUpperCase()] || CATEGORIES.BACKEND;
              const isSelected = selectedNodeId === node.id;
              const isHovered = hoveredNodeId === node.id;
              const isConnected = connectedNodeIds.has(node.id);
              const isCategoryMatch = selectedCategory === 'all' || node.category === selectedCategory;

              let nodeOpacity = 1;
              let nodeScale = 1;

              if (!isCategoryMatch) {
                nodeOpacity = 0.2;
                nodeScale = 0.85;
              } else if (activeFocusId) {
                if (isSelected || isHovered) {
                  nodeOpacity = 1;
                  nodeScale = 1.22;
                } else if (isConnected) {
                  nodeOpacity = 0.95;
                  nodeScale = 1.08;
                } else {
                  nodeOpacity = 0.28;
                  nodeScale = 0.92;
                }
              }

              const radius = node.size / 2;

              return (
                <g
                  key={node.id}
                  transform={`translate(${node.x}, ${node.y}) scale(${nodeScale})`}
                  className={`${styles.nodeGroup} ${isSelected ? styles.selectedNode : ''}`}
                  opacity={nodeOpacity}
                  onClick={(e) => handleNodeClick(e, node.id)}
                  onMouseEnter={() => !isDragging.current && setHoveredNodeId(node.id)}
                  onMouseLeave={() => setHoveredNodeId(null)}
                  role="button"
                  tabIndex={0}
                  aria-label={`${node.name} (${category.label}) - Click to explore`}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      focusOnNode(node.id);
                    }
                  }}
                >
                  {/* Ambient Halo / Radar Ring */}
                  <circle
                    r={radius + 8}
                    fill="none"
                    stroke={category.color}
                    strokeWidth={isSelected ? 1.8 : 1}
                    strokeOpacity={isSelected ? 0.7 : isHovered ? 0.45 : isConnected ? 0.3 : 0}
                    strokeDasharray={isSelected ? '4 3' : undefined}
                    filter={isSelected || isHovered ? 'url(#nodeGlow)' : undefined}
                    className={isSelected ? styles.radarRing : ''}
                  />

                  {/* Outer category boundary circle */}
                  <circle
                    r={radius}
                    fill="#0b0b12"
                    stroke={isSelected || isHovered ? category.color : category.border}
                    strokeWidth={isSelected ? 2.5 : isHovered ? 2 : 1.4}
                    className={styles.nodeCircle}
                  />

                  {/* Subtle inner depth gradient */}
                  <circle
                    r={radius - 2}
                    fill="rgba(255, 255, 255, 0.02)"
                    stroke="rgba(255, 255, 255, 0.06)"
                    strokeWidth={1}
                  />

                  {/* Technology Icon centered */}
                  <foreignObject
                    x={-radius}
                    y={-radius}
                    width={node.size}
                    height={node.size}
                    className={styles.iconContainer}
                  >
                    <div className={styles.iconCenter}>
                      <TechIcon
                        id={node.id}
                        size={Math.round(node.size * 0.48)}
                        color={category.color}
                      />
                    </div>
                  </foreignObject>

                  {/* Technology Name & Category Label Below Node */}
                  <text
                    y={radius + 18}
                    textAnchor="middle"
                    className={styles.nodeLabel}
                    fill="#ffffff"
                  >
                    {node.name}
                  </text>
                  <text
                    y={radius + 29}
                    textAnchor="middle"
                    className={styles.nodeSubLabel}
                    fill={category.color}
                  >
                    {category.label.split(' ')[0]}
                  </text>
                </g>
              );
            })}
          </g>
        </g>
      </svg>

      {/* Floating Hover Tooltip (When hovering without panel open) */}
      {hoveredNodeId && !selectedNodeId && (
        <div
          className={styles.hoverTooltip}
          style={{
            left: `${transform.x + (nodeMap.get(hoveredNodeId)?.x || 0) * transform.scale}px`,
            top: `${transform.y + (nodeMap.get(hoveredNodeId)?.y || 0) * transform.scale - 70}px`,
          }}
        >
          <div className={styles.tooltipHeader}>
            <span className={styles.tooltipName}>{nodeMap.get(hoveredNodeId)?.name}</span>
          </div>
          <p className={styles.tooltipDesc}>{nodeMap.get(hoveredNodeId)?.description}</p>
        </div>
      )}

      {/* Deep Exploration Side Panel */}
      {selectedNode && (
        <TechExplorationPanel
          node={selectedNode}
          connectedNodes={selectedConnectedNodes}
          onClose={handleReturnToConstellation}
          onSelectNode={focusOnNode}
        />
      )}
    </div>
  );
}

