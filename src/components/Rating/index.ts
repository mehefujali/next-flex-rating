// src/components/Rating/index.ts

/**
 * This is a "barrel file".
 * It re-exports the public API of the Rating component folder,
 * making it easy for consumers to import.
 *
 * Instead of: import { Rating } from './components/Rating/Rating';
 * Consumers can do: import { Rating } from './components/Rating';
 */

export { Rating } from './Rating';
export type { RatingProps } from './Rating.types';