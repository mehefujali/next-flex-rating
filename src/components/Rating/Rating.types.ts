
import React from "react";

/**
 * Defines the public props interface for the Rating component.
 */
export type RatingProps = {
  /**
   * The current rating value. Can be a fractional number (e.g., 3.5).
   */
  value: number;

  /**
   * Optional callback function that is triggered when the rating value changes.
   * Receives the new rating value (number) as its only argument.
   */
  onChange?: (newValue: number) => void;

  /**
   * The total number of icons to display.
   * @default 5
   */
  count?: number;

  /**
   * The icon to be used for the 'filled' state.
   * Can be any valid ReactNode (SVG, component, string, emoji).
   * @default <DefaultStar />
   */
  icon?: React.ReactNode;

  /**
   * The icon to be used for the 'empty' state.
   * If not provided, the 'icon' prop will be used for both states.
   */
  emptyIcon?: React.ReactNode;

  /**
   * The color of the filled icon.
   * @default '#FFC107' (Golden yellow)
   */
  color?: string;

  /**
   * The color of the empty icon.
   * @default '#E0E0E0' (Light gray)
   */
  emptyColor?: string;

  /**
   * The size (width and height) of a single icon, in pixels or any CSS unit.
   * @default 24
   */
  size?: string | number;

  /**
   * The spacing (gap) between icons, in pixels or any CSS unit.
   * @default 4
   */
  spacing?: string | number;

  /**
   * If `true`, the component will be in read-only mode, disabling all interactions.
   * @default false
   */
  readOnly?: boolean;
};
