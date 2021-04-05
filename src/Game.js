import Splash from './scenes/Splash';
import Play from './scenes/Play';
import { Container } from 'pixi.js';
import Loading from './scenes/Loading';
import Win from './scenes/Win';
import Tutorial from './scenes/Tutorial';
import Countdown from './scenes/Countdown';

/**
 * Main game stage, manages scenes/levels.
 *
 * @extends {PIXI.Container}
 */
export default class Game extends Container {

  static get events() {
    return {
      SWITCH_SCENE: 'switch_scene'
    };
  }

  /**
   * @param {PIXI.Sprite} background 
   */
  constructor({ background } = {}) {
    super();

    this._background = background;
    this.currentScene = null;
  }

  async start() {
    this._addListeners();

    await this.switchScene(Splash, { scene: 'splash' });
    await this.currentScene.finish;
    await this.switchScene(Loading, { scene: 'loading' });
  }

  _addListeners() {
    this.on(Game.events.SWITCH_SCENE, () => {
      this.currentScene.once(Loading.events.loaded, async () => {
        await this.switchScene(Tutorial, { scene: 'tutorial' });
      });

      this.currentScene.once(Tutorial.events.finish, async () => {
        await this.switchScene(Countdown, { scene: 'countdown' });
      });

      this.currentScene.once(Countdown.events.startGame, async () => {
        await this.switchScene(Play, { scene: 'play' });
      });

      this.currentScene.once(Play.events.game_over, async (data) => {
        await this.switchScene(Win, { scene: 'win' }, data);
      });

      this.currentScene.once(Win.events.replay, async () =>
        await this.switchScene(Countdown, { scene: 'countdown' })
      );
    });
  }

  /**
   * @param {Function} constructor 
   * @param {String} scene 
   */
  switchScene(constructor, scene, data = {}) {
    this.removeChild(this.currentScene);
    this.currentScene = new constructor(data);
    this.currentScene.background = this._background;
    this.addChild(this.currentScene);

    this.emit(Game.events.SWITCH_SCENE, { scene });

    return this.currentScene.onCreated();
  }

  /**
   * Hook called by the application when the browser window is resized.
   * Use this to re-arrange the game elements according to the window size
   *
   * @param  {Number} width  Window width
   * @param  {Number} height Window height
   */
  onResize(width, height) {
    if (this.currentScene === null) return;

    this.currentScene.onResize(width, height);
  }
}
