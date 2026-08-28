# Bloomy Lesson Design

## Direction

Quiet observatory at first light: a bright, precise learning surface with living green as the anchor and a clear sky-blue accent. The interface should feel focused and calm, while the moving mathematical visual supplies the wonder.

## Color strategy

Restrained product palette. Pure white is the lesson canvas; green communicates progression and primary actions; blue distinguishes sine and angle information; coral distinguishes cosine when two data series need separation.

```css
:root {
  --bg: oklch(1 0 0);
  --surface: oklch(0.975 0.008 150);
  --surface-strong: oklch(0.945 0.016 150);
  --ink: oklch(0.205 0.025 150);
  --muted: oklch(0.48 0.025 150);
  --primary: oklch(0.56 0.158 150);
  --primary-dark: oklch(0.42 0.13 150);
  --accent: oklch(0.61 0.15 235);
  --cosine: oklch(0.64 0.17 35);
  --success: oklch(0.56 0.158 150);
  --warning: oklch(0.72 0.15 82);
  --danger: oklch(0.58 0.19 25);
  --line: oklch(0.89 0.018 150);
}
```

## Typography

Use a single, highly readable humanist sans-serif stack: Inter when available, then system UI. Instructional copy runs 16px to 18px with generous line height. Mathematical readouts use tabular numerals. There are no display headlines in the lesson surface; the teaching text is the primary type.

## Layout

The lesson fills exactly one viewport with no page scrolling. The stage is a two column grid on desktop. The left column holds teaching text, supporting visuals such as the sine and cosine graphs, readouts, and the current question. The right column holds the persistent unit circle, which receives the largest visual area. Below 1000px the stage stacks into a single column.

## Components

- Buttons use one consistent pill vocabulary: green filled primary, neutral text secondary, visible focus ring.
- Narration appears in place with word-level timing; it does not arrive inside a decorative card.
- Challenges occupy a compact panel near the narration and clearly distinguish prompt, hint, success, and skip.
- Progress uses a restrained path motif and explicit text, not color alone.
- Graph series are labeled directly with both color and name.

## Motion

Every slide opens in a watch stage where the figure animates the concept on its own while narration reveals at a speech-like cadence. The learner then enters a try stage and manipulates the same figure. Most state transitions run 180ms to 260ms with ease-out curves. With reduced motion, the demonstration jumps to its final state and narration appears immediately.

## Accessibility

All interactive targets are at least 44px, keyboard reachable, and labeled. Pointer interaction is supplemented by arrow-key angle controls. Graphs include textual live values. Bold type and labels reinforce every color-coded concept.
