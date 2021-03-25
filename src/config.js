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
  }
};
