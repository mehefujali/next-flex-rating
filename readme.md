# next-rating

A lightweight, flexible, and fully customizable rating component designed for React and Next.js.

Built with TypeScript, `next-rating` has zero dependencies and provides full support for fractional values, custom icons (SVG, Emojis, Components), and accessibility (keyboard navigation).
## Demo
https://next-flex-rating-demo.vercel.app

## Features

-   **Fractional Ratings:** Display precise values like `4.3` or `2.5`.
-   **Custom Icons:** Use any React node (SVG, Emoji, Component) for filled and empty states.
-   **Full Style Control:** Customize `size`, `spacing`, and `color` via props.
-   **Controlled & Read-Only:** Use as a controlled input with `onChange` or as a `readOnly` display.
-   **Zero Dependencies:** Extremely lightweight and fast, adding no bloat to your project.
-   **TypeScript Ready:** Fully typed out of the box for a superior developer experience.
-   **Accessible:** Full keyboard support (`ArrowLeft`, `ArrowRight`) and ARIA attributes.

---

## Installation

Install the package using npm or yarn:

```bash
npm install next-rating
```
Bashyarn add next-rating
Basic Usage1. Read-Only DisplayThis is the simplest way to use the component. It's ideal for displaying an existing rating.JavaScriptimport { Rating } from 'next-rating';
```
function ProductCard() {
  return (
    <div>
      <h3>Product Rating</h3>
      <Rating value={3.7} readOnly={true} />
    </div>
  );
}
```
2. Controlled (Interactive) ComponentTo capture user input, manage the value in your component's state and pass the onChange handler.JavaScriptimport React, { useState } from 'react';
```
import { Rating } from 'next-rating';

function LeaveReview() {
  const [rating, setRating] = useState(0);

  return (
    <div>
      <h3>Your Rating:</h3>
      <Rating 
        value={rating} 
        onChange={setRating} 
      />
      <p>You selected: {rating} star(s)</p>
    </div>
  );
}
```
Customization Examples1. Custom Icons (Emoji) and SizingYou can pass simple strings or emojis as icons and control the size and spacing.JavaScriptimport { Rating } from 'next-rating';
```
<Rating
  value={4.2}
  icon="🔥"
  emptyIcon="🧊"
  size={36}
  spacing={10}
  readOnly={true}
/>
```
2. Custom Icons (SVG Component)For ultimate control, pass your own SVG React components.JavaScriptimport { Rating } from 'next-rating';
```
// 1. Define your custom icon

const HeartIcon = () => (
  <svg xmlns="[http://www.w3.org/2000/svg](http://www.w3.org/2000/svg)" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
  </svg>
);


// 2. Use it in the Rating component
<Rating
  value={3}
  icon={<HeartIcon />}
  emptyIcon={<HeartIcon />} // Often you'll want the same base shape
  color="#E91E63"
  emptyColor="#F8BBD0"
  size={30}
/>
```
3. 10-Star RatingSimply change the count prop.JavaScriptimport { Rating } from 'next-rating';

<Rating
  value={8.5}
  count={10}
  readOnly={true}
/>

| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `value` | `number` | **(Required)** | The current rating value. Can be a fraction (e.g., 3.5). |
| `onChange` | `(newValue: number) => void` | `undefined` | Callback function when the user selects a new rating (makes it controlled). |
| `readOnly` | `boolean` | `false` | If true, all interactions (click, hover, keyboard) are disabled. |
| `count` | `number` | `5` | The total number of icons to display. |
| `icon` | `React.ReactNode` | `<DefaultStar />` | The icon for the "filled" state. |
| `emptyIcon` | `React.ReactNode` | `undefined` | The icon for the "empty" state. Defaults to icon if not provided. |
| `color` | `string` | `'#FFC107'` | CSS color for the filled icon. |
| `emptyColor` | `string` | `'#E0E0E0'` | CSS color for the empty icon. |
| `size` | `string \| number` | `24` | Width and height of each icon (in pixels if a number). |
| `spacing` | `string \| number` | `4` | Space between each icon (in pixels if a number). |