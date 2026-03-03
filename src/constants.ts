export const EXPERIENCE = new Date().getFullYear() - 2019 + "+";
export const PROJECTS_URL = "/projects/index.json";

export const BURN_TITLE_DURATION_MS = 2200;
export const BURN_IN_AFTER_INTRO_DELAY_MS = 2000;
export const BURN_CARD_DURATION_MS = 4800;
export const BURN_CARD_OUT_DURATION_MS = 9600;

export const SWIRL_CARD_COUNT_INITIAL = 12;
export const SWIRL_CARD_COUNT = 150;
export const SWIRL_INITIAL_WINDOW_SECONDS = 2;
export const SWIRL_SPREAD_SECONDS = 9.6;
export const SWIRL_JOKER_COUNT = 12;
export const SWIRL_Z_START = 4.2;
export const SWIRL_Z_END = -15.0;
export const SWIRL_XY_RADIUS = 9.0;
export const SWIRL_TURNS = 1.8;
export const SWIRL_SPEED_BASE = 0.12;
export const SWIRL_SPEED_VARIANCE = 0.11;
export const SWIRL_CARD_WIDTH = 1.2;
export const SWIRL_CARD_HEIGHT = 1.68;

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
    touch: "Don't just stare—swipe to drag me anywhere!",
    mouse: "Don't just stare—click and drag me anywhere!",
  },
];
