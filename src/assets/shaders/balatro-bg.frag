precision highp float;

uniform float time;
uniform float spin_time;
uniform float contrast;
uniform float spin_amount;
uniform float pixel_fac;
uniform float spin_ease;
uniform float zoom;
uniform vec2 offset;
uniform vec2 resolution;
uniform vec4 colour_1;
uniform vec4 colour_2;
uniform vec4 colour_3;

void main() {
  vec2 screen_coords = gl_FragCoord.xy;
  float pixel_size = length(resolution.xy) / pixel_fac;

  vec2 uv = (floor(screen_coords.xy / pixel_size) * pixel_size - 0.5 * resolution.xy) / length(resolution.xy) - offset;
  float uv_len = length(uv);

  float speed = (spin_time * spin_ease * 0.2) + 302.2;
  float angle = atan(uv.y, uv.x) + (spin_amount > 0.0 ? speed - spin_ease * 20.0 * (spin_amount * uv_len + (1.0 - spin_amount)) : 0.0);

  vec2 mid = (resolution.xy / length(resolution.xy)) / 2.0;
  uv = vec2(uv_len * cos(angle) + mid.x, uv_len * sin(angle) + mid.y) - mid;

  uv *= zoom;
  speed = time * 2.0;

  vec2 uv2 = vec2(uv.x + uv.y);

  for (int i = 0; i < 5; i++) {
    uv2 += sin(max(uv.x, uv.y)) + uv;
    uv += 0.5 * vec2(
      cos(5.1123314 + 0.353 * uv2.y + speed * 0.131121),
      sin(uv2.x - 0.113 * speed)
    );
    uv -= 1.0 * cos(uv.x + uv.y) - 1.0 * sin(uv.x * 0.711 - uv.y);
  }

  float cmod = (0.25 * contrast + 0.5 * spin_amount + 1.2);
  float paint = min(2.0, max(0.0, length(uv) * 0.035 * cmod));
  float c1p = max(0.0, 1.0 - cmod * abs(1.0 - paint));
  float c2p = max(0.0, 1.0 - cmod * abs(paint));
  float c3p = 1.0 - min(1.0, c1p + c2p);

  vec4 ret = (0.3 / contrast) * colour_1
    + (1.0 - 0.3 / contrast) * (colour_1 * c1p + colour_2 * c2p + vec4(c3p * colour_3.rgb, c3p * colour_1.a));
  gl_FragColor = ret;
}
