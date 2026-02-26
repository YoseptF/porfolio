precision highp float;

uniform float uTime;
uniform vec3 uColor;
uniform vec2 uResolution;

float hash(vec2 p) {
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  f = f * f * (3.0 - 2.0 * f);

  float a = hash(i);
  float b = hash(i + vec2(1.0, 0.0));
  float c = hash(i + vec2(0.0, 1.0));
  float d = hash(i + vec2(1.0, 1.0));

  return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
}

void main() {
  vec2 uv = gl_FragCoord.xy / uResolution.xy;

  float grain = noise(uv * 300.0) * 0.06;
  float wave = sin(uv.x * 20.0 + uTime * 0.3) * sin(uv.y * 20.0 + uTime * 0.2) * 0.015;

  float vignette = 1.0 - pow(length(uv - 0.5) * 1.2, 2.5);

  vec3 color = uColor + grain + wave;
  color *= vignette;

  gl_FragColor = vec4(color, 1.0);
}
