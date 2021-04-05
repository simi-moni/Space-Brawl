import { Sprite } from 'pixi.js';
import Scene from './Scene';
import gsap from 'gsap';
import Footer from '../components/Footer';
import Rover from '../components/Rover';
import Planets from '../components/Planets';
import config from '../config';
import { random } from '../core/utils';
import Rocket from '../components/Rocket';

export default class Play extends Scene {
  async onCreated() {
    this._addBackground();

    const planets = new Planets();
    this.addChild(planets);

    this._roverPlayer = new Rover(config.player, config.shield, config.rocket);
    this._roverPlayer.name = 'player';
    this._roverBot = new Rover(config.bot, config.shield, config.rocket);
    this._roverBot.name = 'bot'
    this.addChild(this._roverPlayer);
    this.addChild(this._roverBot);

    const footer = new Footer();
    footer.x = - window.innerWidth / 2;
    footer.y = window.innerHeight / 2 - footer.height;
    this.addChild(footer);

    this._addListeners();

    this._botTurn();
  }

  static get events() {
    return {
      game_over: 'GAME_OVER',
    }
  }

  _addBackground() {
    this._background = new Sprite.from('play-scene');
    this._background.width = window.innerWidth;
    this._background.height = window.innerHeight;
    this._background.anchor.set(0.5);
    this.addChild(this._background);
  }

  /**
   * @private
   */
  _addListeners() {
    document.addEventListener('keydown', async (e) => {
      if (this._isPlayer && e.key === ' ') {
        await this._roverPlayer._rocket.fireRocket(1, 0);
      } else {
        this._roverPlayer._isSwappable(e);
      }
    });

    this._roverBot._rocket.on(Rocket.events.fired, () => this._handleFire(this._roverBot, this._roverPlayer));
    this._roverPlayer._rocket.on(Rocket.events.fired, () => this._handleFire(this._roverPlayer, this._roverBot));

    this._roverPlayer.once(Rover.events.no_hp, () => this.emit(Play.events.game_over, { winner: '2' }));
    this._roverBot.once(Rover.events.no_hp, () => this.emit(Play.events.game_over, { winner: '1' }));
  };

  /**
   * randomizes the shield of the bot 
   * @param {Object} bot 
   */
  _randomShield(bot) {
    if (random(0, 1) > 0.5)
      if (bot._upperShield.x === bot._lowerDefault.x || bot._upperShield.x === bot._upperDefault.x)
        bot._swapShield();
  }

  /**
   * handling the processes after rocket is fired
   * @param {Object} player 
   * @param {Object} bot 
   */
  async _handleFire(player, bot) {
    if (this._detectCollisions(player, bot)) {
      await player._rocket.reverse(player.name);
      if (this._detectCollisions(player, player)) {
        this._changeTurns();
      } else {
        player._loseHealth();
        this._changeTurns();
      }
    } else {
      bot._loseHealth();
      this._changeTurns();
    }
  }

  /**
   * @private setting bot turn
   */
  _botTurn() {
    this._isPlayer = false;
    this._randomShield(this._roverBot);
    setTimeout(() => {
      this._roverBot._rocket.fireRocket(0, 1);
    }, 500);
  }

  /**
   * @private setting player turn
   */
  _playerTurn() {
    this._isPlayer = true;
    this._randomShield(this._roverBot);
  }

  /**
   * @private switch the turns
   */
  _changeTurns() {
    this._isPlayer === true ? this._botTurn() : this._playerTurn()
  }

  /**
   * simple collision detections
   * @param {Object} _rocket 
   * @param {Object} rover 
   * @returns boolean
   */
  _detectCollisions(_rocket, rover) {
    const rocket = _rocket._rocket.getBounds();
    const roverShield = rover._getActiveShield().getBounds();

    return (rocket.x + rocket.width > roverShield.x && rocket.x < roverShield.x + roverShield.width &&
      rocket.y + rocket.height > roverShield.y && rocket.y < roverShield.y + roverShield.height)
  }

  hitTestRectangle(r1, r2) {

    //Define the variables we'll need to calculate
    let hit, combinedHalfWidths, combinedHalfHeights, vx, vy;

    //hit will determine whether there's a collision
    hit = false;

    //Find the center points of each sprite
    r1.centerX = r1.x + r1.width / 2;
    r1.centerY = r1.y + r1.height / 2;
    r2.centerX = r2.x + r2.width / 2;
    r2.centerY = r2.y + r2.height / 2;

    //Find the half-widths and half-heights of each sprite
    r1.halfWidth = r1.width / 2;
    r1.halfHeight = r1.height / 2;
    r2.halfWidth = r2.width / 2;
    r2.halfHeight = r2.height / 2;

    //Calculate the distance vector between the sprites
    vx = r1.centerX - r2.centerX;
    vy = r1.centerY - r2.centerY;

    //Figure out the combined half-widths and half-heights
    combinedHalfWidths = r1.halfWidth + r2.halfWidth;
    combinedHalfHeights = r1.halfHeight + r2.halfHeight;

    //Check for a collision on the x axis
    if (Math.abs(vx) < combinedHalfWidths) {

      //A collision might be occurring. Check for a collision on the y axis
      if (Math.abs(vy) < combinedHalfHeights) {

        //There's definitely a collision happening
        hit = true;
      } else {

        //There's no collision on the y axis
        hit = false;
      }
    } else {

      //There's no collision on the x axis
      hit = false;
    }

    //`hit` will be either `true` or `false`
    return hit;
  };

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
