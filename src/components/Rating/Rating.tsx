// src/components/Rating/Rating.tsx
"use client";

import React, { useState, useCallback, useMemo, forwardRef } from 'react';
import { IconSlot } from './IconSlot';
import { RatingProps } from './Rating.types';
import { DefaultStar } from './DefaultStar';

/**
 * A highly customizable, fractional rating component for React and Next.js.
 *
 * It supports custom icons, fractional values, keyboard navigation,
 * and both controlled and read-only modes.
 *
 * @example
 * <Rating value={2.5} onChange={setRating} />
 *
 * @example
 * <Rating value={4.3} icon={<span>🔥</span>} readOnly />
 */
export const Rating = forwardRef<HTMLDivElement, RatingProps>(
  (
    {
      value,
      onChange,
      count = 5,
      icon = <DefaultStar />,
      emptyIcon,
      color = '#FFC107',
      emptyColor = '#E0E0E0',
      size = 24,
      spacing = 4,
      readOnly = false,
    },
    ref // Pass the ref to the underlying DOM element
  ) => {
    
    // State to manage the temporary value when the user hovers over the component.
    const [hoverValue, setHoverValue] = useState<number | null>(null);

    // Determine which icon to use for the empty state.
    // We use `useMemo` to avoid re-calculating this on every render.
    const effectiveEmptyIcon = useMemo(
      () => emptyIcon || icon,
      [emptyIcon, icon]
    );

    // The value to display: either the hovered value or the actual prop value.
    const displayValue = hoverValue ?? value;

    /**
     * Calculates the fill percentage for a specific icon index.
     * @param index The 0-based index of the icon.
     * @returns A percentage value between 0 and 100.
     */
    const getFillPercentage = useCallback((index: number): number => {
      const iconValue = index + 1; // Convert 0-based index to 1-based value

      if (displayValue >= iconValue) {
        return 100; // This icon is fully filled
      }
      if (displayValue > index && displayValue < iconValue) {
        // This icon is partially filled (fractional part)
        // e.g., value = 4.3, index = 4 (iconValue = 5)
        // (4.3 - 4) * 100 = 30%
        return (displayValue - index) * 100;
      }
      return 0; // This icon is empty
    }, [displayValue]);

    // --- Event Handlers ---
    // We use `useCallback` to memoize handlers, preventing unnecessary
    // re-renders of child components (IconSlot).

    const handleMouseLeave = useCallback(() => {
      if (readOnly) return;
      setHoverValue(null);
    }, [readOnly]);

    const handleMouseEnter = useCallback(
      (index: number) => {
        if (readOnly) return;
        setHoverValue(index + 1); // Set the 1-based value
      },
      [readOnly]
    );

    const handleClick = useCallback(
      (index: number) => {
        if (readOnly || !onChange) return;
        onChange(index + 1);
      },
      [readOnly, onChange]
    );

    /**
     * Handles keyboard accessibility (ArrowLeft, ArrowRight)
     * for changing the rating value.
     */
    const handleKeyDown = useCallback(
      (e: React.KeyboardEvent<HTMLDivElement>) => {
        if (readOnly || !onChange) return;

        let newValue = value;
        if (e.key === 'ArrowRight') {
          newValue = Math.min(value + 1, count); // Increase, max 'count'
        } else if (e.key === 'ArrowLeft') {
          newValue = Math.max(value - 1, 0); // Decrease, min 0
        }

        if (newValue !== value) {
          e.preventDefault(); // Prevent default browser scroll on arrow keys
          onChange(newValue);
        }
      },
      [readOnly, onChange, value, count]
    );

    // --- Styles ---

    const containerStyle: React.CSSProperties = {
      display: 'inline-flex',
      gap: spacing,
      alignItems: 'center',
      cursor: readOnly ? 'default' : 'pointer',
      outline: 'none', // Remove default focus outline
    };

    const iconContainerStyle: React.CSSProperties = {
      // Wrapper for event handling
    };

    return (
      <div
        ref={ref}
        style={containerStyle}
        onMouseLeave={handleMouseLeave}
        // Accessibility (ARIA) attributes
        role="slider" // Behaves like a slider
        aria-valuenow={value}
        aria-valuemin={0}
        aria-valuemax={count}
        aria-readonly={readOnly}
        tabIndex={readOnly ? -1 : 0} // Make it focusable if not read-only
        onKeyDown={handleKeyDown} // Listen for keyboard events
      >
        {[...Array(count)].map((_, index) => (
          <div
            key={index}
            style={iconContainerStyle}
            onMouseEnter={() => handleMouseEnter(index)}
            onClick={() => handleClick(index)}
          >
            <IconSlot
              icon={icon}
              emptyIcon={effectiveEmptyIcon}
              fillPercentage={getFillPercentage(index)}
              size={size}
              color={color}
              emptyColor={emptyColor}
            />
          </div>
        ))}
      </div>
    );
  }
);

// Set a displayName for better debugging in React DevTools
Rating.displayName = 'Rating';