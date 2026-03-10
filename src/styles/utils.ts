/*
 * Theme-agnostic CSS utilities shared across all visual themes.
 */

export const pixelatedClipPath = (step = 6): string => {
  const c = step * 2;
  return `clip-path: polygon(
    0 ${c}px,
    ${step}px ${c}px,
    ${step}px ${step}px,
    ${c}px ${step}px,
    ${c}px 0,
    calc(100% - ${c}px) 0,
    calc(100% - ${step}px) 0,
    calc(100% - ${step}px) ${step}px,
    100% ${step}px,
    100% ${c}px,
    100% calc(100% - ${c}px),
    100% calc(100% - ${step}px),
    calc(100% - ${step}px) calc(100% - ${step}px),
    calc(100% - ${step}px) 100%,
    calc(100% - ${c}px) 100%,
    ${c}px 100%,
    ${step}px 100%,
    ${step}px calc(100% - ${step}px),
    0 calc(100% - ${step}px),
    0 calc(100% - ${c}px)
  );`;
};
