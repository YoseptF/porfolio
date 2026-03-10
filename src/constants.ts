export const EXPERIENCE = new Date().getFullYear() - 2019 + "+";

export const DAY_CYCLE_MS = 45 * 1000; // 1 real minute = 1 full day/night cycle

// Terraria background parallax layers: far=0, mid=1, near=2
export const BG_LAYER_HEIGHTS = [
  "clamp(250px, 76vh, 950px)",
  "clamp(200px, 52vh, 750px)",
  "clamp(180px, 44vh, 640px)",
] as const;
export const BG_LAYER_Y_POS = ["bottom", "bottom", "bottom"] as const;

// Lighting stops — t=0.06 is when sun crosses left screen edge, t=0.44 is right screen edge.
// Outside those bounds the sun is off-screen → treat as near-night.
// Each stop: [time 0–1, value]
export const SCENE_LIGHT_STOPS: [number, string][] = [
  [0, "#000a28"], // sun off-screen left → night blue
  [0.06, "#ff8c3c"], // sun enters screen → warm dawn orange
  [0.25, "#000000"], // noon → no tint (black used at 0 alpha)
  [0.44, "#c8501e"], // sun leaving screen → warm dusk
  [0.5, "#000a28"], // sun off-screen right → night blue
  [0.75, "#000a28"], // deep night
  [1, "#000a28"],
];

export const SCENE_LIGHT_ALPHA_STOPS: [number, number][] = [
  [0, 0.55], // sun off-screen: dark overlay
  [0.06, 0.35], // dawn: moderate
  [0.25, 0.0], // noon: no overlay
  [0.44, 0.4], // dusk: moderate
  [0.5, 0.55], // sun off-screen: dark overlay
  [0.75, 0.25], // deep night — moon gives light, lighter overlay
  [1, 0.55],
];

export const BRIGHTNESS_STOPS: [number, number][] = [
  [0, 0.4], // sun off-screen left → dim
  [0.06, 0.6], // dawn → dim but visible
  [0.25, 1.1], // noon → peak brightness
  [0.44, 0.6], // dusk → dim again
  [0.5, 0.4], // sun off-screen right → dim
  [0.75, 0.65], // deep night — moon glow
  [1, 0.4],
];

export const PROJECTS_URL = "/projects/index.json";

export const BURN_TITLE_DURATION_MS = 2200;
export const BURN_CARD_DURATION_MS = 4800;
export const BURN_CARD_OUT_DURATION_MS = 9600;

export const SWIRL_CARD_COUNT_INITIAL = 12;
export const SWIRL_CARD_COUNT = 120;
export const SWIRL_INITIAL_WINDOW_SECONDS = 2;
export const SWIRL_SPREAD_SECONDS = 9.6;
export const SWIRL_JOKER_COUNT = 12;
export const SWIRL_Z_START = 4.2;
export const SWIRL_Z_END = -15.0;
export const SWIRL_XY_RADIUS = 9.0;
export const SWIRL_TURNS = 1.8;
export const SWIRL_SPEED_INITIAL = 0.02;
export const SWIRL_SPEED_FINAL = 0.45;
export const SWIRL_SPEED_VARIANCE = 0.08;
export const SWIRL_CARD_WIDTH = 1.2;
export const SWIRL_CARD_HEIGHT = 1.68;

export const TAUNT_CYCLE_MS = 9000;

export const DRAG_TAUNTS: { touch: string; mouse: string }[] = [
  {
    touch: "Try dragging me around! I dare ya.",
    mouse: "Try dragging me around! I dare ya.",
  },
  {
    touch: "Swipe me around. See what happens.",
    mouse: "Click and drag me around. See what happens.",
  },
  {
    touch: "I'm totally draggable. Yeet me across the screen!",
    mouse: "I'm totally draggable. Yeet me across the screen!",
  },
  {
    touch: "Wheeee! Er... I mean, professional dragging only.",
    mouse: "Wheeee! Er... I mean, professional dragging only.",
  },
  {
    touch: "I'm just sitting here. Grab me and take me for a spin.",
    mouse: "I'm just sitting here. Click, hold, and take me for a spin.",
  },
  {
    touch: "I'm completely draggable! Go ahead, grab and move me.",
    mouse: "I'm completely draggable! Go ahead, click and drag me.",
  },
  {
    touch: "Don't just stare. Swipe and drag me anywhere!",
    mouse: "Don't just stare. Click and drag me anywhere!",
  },
  {
    touch: "Still just staring? Grab and drag me, pal.",
    mouse: "Still just staring? Click and drag me, pal.",
  },
  {
    touch: "I've been here a while. At least give me a spin.",
    mouse: "I've been here a while. At least give me a spin.",
  },
  {
    touch: "The longer you wait, the snarkier I get. Drag me.",
    mouse: "The longer you wait, the snarkier I get. Drag me.",
  },
  {
    touch: "Move me already. I'm bored just sitting here.",
    mouse: "Move me already. I'm bored just sitting here.",
  },
  {
    touch: "You CAN drag me. I checked. Do it already.",
    mouse: "You CAN drag me. I checked. Do it already.",
  },
  {
    touch: "Found the portfolio. Now try dragging me.",
    mouse: "Found the portfolio. Now try dragging me.",
  },
  {
    touch: "Waiting for a sign? This is the sign. Drag me.",
    mouse: "Waiting for a sign? This is the sign. Drag me.",
  },
];
