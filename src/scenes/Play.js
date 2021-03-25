import { Sprite } from 'pixi.js';
import Scene from './Scene';
import gsap from 'gsap';
import Footer from '../components/Footer';
import Rover from '../components/Rover';
import Planets from '../components/Planets';
import config from '../config';

export default class Play extends Scene {
  async onCreated() {
    this._addBackground();

    const planets = new Planets();
    this.addChild(planets);

    this._roverPlayer = new Rover(config.player, config.shield);
    this._roverBot = new Rover(config.bot, config.shield);
    this.addChild(this._roverPlayer);
    this.addChild(this._roverBot);

    const footer = new Footer();
    footer.x = - window.innerWidth / 2;
    footer.y = window.innerHeight / 2 - footer.height;
    this.addChild(footer);

    this._listener();
  }

  _addBackground() {
    this._background = new Sprite.from('play-scene');
    this._background.width = window.innerWidth;
    this._background.height = window.innerHeight;
    this._background.anchor.set(0.5);
    this.addChild(this._background);
  }

  _listener() {
    document.addEventListener('keydown', (e) => {
      if (e.key === ' ') {
        this._roverPlayer._fireRocket();
      } else {
        this._roverPlayer._isSwappable(e);
      }
    })
  }

  /**
   * Hook called by the application when the browser window is resized.
   * Use this to re-arrange the game elements according to the window size
   *
   * @param  {Number} width  Window width
   * @param  {Number} height Window height
   */
  onResize(width, height) { // eslint-disable-line no-unused-vars

  }
}
