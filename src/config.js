export default {
  view: {
    width: window.innerWidth,
    height: window.innerHeight,
    backgroundColor: 0xffffff,
    worldWidth: 1000,
    worldHeight: 500,
    resizeTo: window,
    centerOnResize: true,
  },
  game: {
    width: 1000,
    height: 500,
    drag: false,
    pinch: true,
    decelerate: true,
    wheel: false,
  },
  scenes: {
    Splash: {
      hideDelay: 0,
    },
  },
  assets: {
    root: '/',
  },
  player: {
    body: {
      texture: 'rover',
      x: 480,
      y: -30,
      angle: 0,

    },
    shadow: {
      texture: 'rover-shadow',
      x: 480,
      y: 60,
      angle: 0,
    },
    healthBar: {
      texture: 'health-bar',
      x: 460,
      y: -100,
    },
  },
  bot: {
    body: {
      texture: 'rover',
      x: -670,
      y: -70,
      angle: 180,

    },
    shadow: {
      texture: 'rover-shadow',
      x: -670,
      y: -150,
      angle: 180,
    },
    healthBar: {
      texture: 'health-bar',
      x: -820,
      y: -90,
    },
  },
  shield: {
    active: {
      texture: 'shield-active',
    },
    inactive: {
      texture: 'shield-inactive',
    },
    upperShield: {
      x: 30,
      y: -60,
      angle: 310,
    },
    lowerShield: {
      x: -60,
      y: 25,
      angle: 325,
    }
  },
  rocket: {
    paths: [
      'M1 167C45.3333 79.3333 202 -69 474 39C814 174 609 502 413 423C300 371 326 274 413 260C491 254 847 347.667 1013 379',
      'M0.999987 196C-2.00001 291.333 61.6 484 340 492C688 502 527 212 716 68C905 -76 1050 43 1062 133',
      'M1 1C-0.33333 82.3333 82.2 243.6 423 238C763.8 232.4 958.333 186.333 1013 164',
      'M1 185C50.3333 111 184.6 -28.4 327 6C505 49 455 335 914 330',
      'M1 91C50.6667 48 218.2 -28 491 12C832 62 689 225 905 269',
      'M1 1L1021 113',
      'M1 48C87 24.6667 295.2 -16 440 8C621 38 744 163 875 182',
      'M1 75C51 43.6667 200.2 -14.2 397 5C643 29 849 55 932 84',
      'M1 341C36.3333 232.333 165 12.2 397 1.00001C629 -10.2 852.333 295.667 935 450',
      'M1 181C26.6667 119.667 111.6 -2.2 246 1C414 5 542 167 534 333C526 499 348 526 282 482C216 438 159 314 313 194C467 74 930 118 1027 199',
    ],
  },
};
