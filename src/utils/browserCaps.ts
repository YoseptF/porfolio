const ua = navigator.userAgent;

export const isIOS =
  /iPad|iPhone|iPod/.test(ua) ||
  (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);

export const isFirefox = ua.includes('Firefox');

// feTurbulence and feGaussianBlur have no GPU code path on iOS Safari or Firefox —
// they CPU-rasterize every frame. Reduce filter complexity on those platforms.
export const slowFilters = isIOS || isFirefox;
