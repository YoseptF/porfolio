precision highp float;

uniform float uTime;
uniform vec3 uColor1;
uniform vec3 uColor2;
uniform vec3 uColor3;
uniform float uContrast;
uniform float uSpinAmount;
uniform float uSpinSpeed;
uniform float uPixelFilter;
uniform vec2 uResolution;

varying vec2 vUv;

#define TAU 6.28318530718

vec2 pixelate(vec2 uv, float pixelSize) {
  return floor(uv * pixelSize) / pixelSize;
}

void main() {
  float time = uTime * uSpinSpeed;
  float pixelSize = uPixelFilter;

  vec2 uv = vUv;
  if (pixelSize > 0.0) {
    float aspect = uResolution.x / uResolution.y;
    vec2 pxUv = vec2(uv.x * aspect, uv.y);
    pxUv = pixelate(pxUv, pixelSize);
    uv = vec2(pxUv.x / aspect, pxUv.y);
  }

  vec2 center = uv - 0.5;
  float dist = length(center);
  float angle = atan(center.y, center.x);

  float spinAngle = angle + dist * uSpinAmount + time;

  float pattern1 = sin(spinAngle * 5.0 + time * 0.5) * 0.5 + 0.5;
  float pattern2 = sin(spinAngle * 3.0 - time * 0.3 + dist * 8.0) * 0.5 + 0.5;
  float pattern3 = sin(dist * 12.0 - time * 0.8) * 0.5 + 0.5;

  float mixer = pattern1 * 0.5 + pattern2 * 0.3 + pattern3 * 0.2;

  mixer = pow(mixer, uContrast);

  vec3 color = mix(uColor1, uColor2, mixer);
  color = mix(color, uColor3, pow(dist * 1.4, 2.0));

  float vignette = 1.0 - pow(dist * 1.3, 2.5);
  color *= vignette;

  gl_FragColor = vec4(color, 1.0);
}
