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
 * It uses a CSS clipping technique by overlaying a 'filled' icon
 * on top of an 'empty' icon and setting its width based on `fillPercentage`.
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
  
  // Base style for the icon wrapper.
  // This container stacks the empty and filled icons on top of each other.
  const iconWrapperStyle: React.CSSProperties = {
    width: size,
    height: size,
    display: 'inline-block',
    position: 'relative', // Establishes a positioning context
    flexShrink: 0, // Prevents shrinking inside a flex container
  };

  // Common styles for both empty and filled icon containers
  const iconStyle: React.CSSProperties = {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    overflow: 'hidden', // Ensures icon doesn't bleed outside its bounds
  };

  // Style for the 'filled' part of the icon.
  // This is the core logic: we clip the filled icon
  // by setting its width to the required percentage.
  const filledIconStyle: React.CSSProperties = {
    ...iconStyle,
    color: color,
    width: `${fillPercentage}%`,
  };

  return (
    <span style={iconWrapperStyle}>
      {/* 1. The Empty Icon (Bottom Layer) */}
      <span style={{ ...iconStyle, color: emptyColor }}>
        {emptyIcon}
      </span>
      
      {/* 2. The Filled Icon (Top Layer, Clipped) */}
      <span style={filledIconStyle}>
        {icon}
      </span>
    </span>
  );
};