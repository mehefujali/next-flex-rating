"use client";

import React from 'react';

/**
 * Internal props for a single icon slot.
 * @internal
 */
type IconSlotProps = {
  icon: React.ReactNode;
  emptyIcon: React.ReactNode;
  fillPercentage: number; // A value between 0 and 100
  size: string | number;
  color: string;
  emptyColor: string;
};

/**
 * `IconSlot` renders a single icon and handles the fractional filling logic.
 *
 * This component uses a 3-layer CSS stacking technique to prevent
 * the icon from scaling incorrectly (which causes the "small star" bug).
 *
 * 1. `containerStyle`: The main container, sets `position: relative` and size.
 * 2. `emptyIconStyle`: The background layer, 100% width/height, absolute position.
 * 3. `filledIconClipperStyle`: The foreground clipping layer. This has the fractional width (e.g., 70%) and `overflow: hidden`.
 * 4. `filledIconStyle`: The actual filled icon. This MUST be full-size (e.g., 24px)
 * so that it gets clipped by its parent (`filledIconClipperStyle`) instead of scaling down.
 *
 * @internal
 */
export const IconSlot: React.FC<IconSlotProps> = ({
  icon,
  emptyIcon,
  fillPercentage,
  size,
  color,
  emptyColor,
}) => {
  // 1. Main container
  const containerStyle: React.CSSProperties = {
    width: size,
    height: size,
    display: 'inline-block',
    position: 'relative',
    flexShrink: 0,
  };

  // 2. Empty icon (background layer)
  // This is a full-size layer.
  const emptyIconStyle: React.CSSProperties = {
    width: '100%',
    height: '100%',
    display: 'block',
    position: 'absolute',
    top: 0,
    left: 0,
    color: emptyColor,
  };

  // 3. Filled icon *clipper* (foreground layer)
  // This layer has the fractional width (e.g., 70%) and clips its content.
  const filledIconClipperStyle: React.CSSProperties = {
    width: `${fillPercentage}%`,
    height: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
    overflow: 'hidden',
  };

  // 4. The *actual* filled icon *inside* the clipper
  // This MUST be full-size (e.g., 24px) so it gets clipped correctly.
  const filledIconStyle: React.CSSProperties = {
    width: size,
    height: size,
    display: 'block',
    color: color,
  };

  return (
    <span style={containerStyle}>
      {/* Layer 1: Empty Icon (Full size) */}
      <span style={emptyIconStyle}>{emptyIcon}</span>

      {/* Layer 2: Clipper (Fractional width) */}
      <span style={filledIconClipperStyle}>
        {/* Layer 3: Filled Icon (Full size, clipped by parent) */}
        <span style={filledIconStyle}>{icon}</span>
      </span>
    </span>
  );
};

