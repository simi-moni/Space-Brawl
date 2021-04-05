import { Sprite, Graphics, Text } from 'pixi.js';
import Scene from './Scene';
import Footer from '../components/Footer';
import { gsap } from 'gsap/all';

/**
 * End scene of the game which shows who won
 * @class
 */
export default class Win extends Scene {
    constructor({ winner }) {
        super();

        this._addBackground();
        this._addFooter();
        this._addWinner(winner);
        this._addWinSprite();
        this._addStars();
        this._addButton();
    }

    static get events() {
        return {
            replay: 'REPLAY',
        }
    }

    /**
     * @private
     */
    _addFooter() {
        const footer = new Footer();
        footer.x = - window.innerWidth / 2;
        footer.y = window.innerHeight / 2 - footer.height;
        this.addChild(footer);
    }

    /**
     * @private
     */
    _addWinSprite() {
        const wins = new Sprite.from('wins');
        wins.y = this._winner.height / 2 + 100;
        wins.x = -this._winner.height / 2;
        this._winner.addChild(wins);
    }

    /**
     * @private
     */
    _addWinner(winner) {
        this._winner = new Sprite.from(winner);
        this._winner.anchor.set(0.5);
        this._winner.scale.x = 0.85;
        this._winner.scale.y = 0.85;
        this._winner.y = -window.innerHeight / 2 + this._winner.height / 2 + 20;
        this.addChild(this._winner);
    }

    /**
     * @private
     */
    _addBackground() {
        this._background = new Sprite.from('play-scene');
        this._background.width = window.innerWidth;
        this._background.height = window.innerHeight;
        this._background.filters = [new PIXI.filters.BlurFilter(150, 10)];
        this._background.anchor.set(0.5);
        this.addChild(this._background);
    }

    /**
     * @private
     * Adding button for replay
     */
    _addButton() {
        this._button = new Graphics();
        this._button.beginFill(0xffffff);
        this._button.drawRoundedRect(0, 0, 280, 80, 50);
        this._button.pivot.x = 300 / 2;
        this._button.pivot.y = -260;
        this._button.endFill();
        this._button.interactive = true;
        this._button.buttonMode = true;
        this.addChild(this._button);
        const text = new Text('Replay', {
            fill: 0x000000,
            fontWeight: 'bold',
            align: 'center',
        });
        text.x = this._button.width / 2;
        text.y = this._button.height / 2;
        text.anchor.set(0.5);
        this._button.addChild(text);

        this._button.on('pointerdown', () => this.emit(Win.events.replay));
    }

    /**
     * @private creating star sprite
     * @param {Number} x 
     * @param {Number} y 
     * @param {Number} scale 
     * @param {Number} angle 
     * @returns star
     */
    _createStar(x, y, scale, angle) {
        const star = new Sprite.from('star');
        star.x = x;
        star.y = y;
        star.scale.set(scale);
        star.angle = angle;

        return star;
    }

    /**
     * @private adding created stars to the scene
     */
    _addStars() {
        const star = this._createStar(-500, -400, 0.80, 35);
        const star1 = this._createStar(420, -350, 0.35, 40);
        const star2 = this._createStar(650, -50, 0.35, 20);
        const star3 = this._createStar(-900, -40, 0.25, 35);

        this.addChild(star, star1, star2, star3);
    }

}