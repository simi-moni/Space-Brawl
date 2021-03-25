import { Sprite, Graphics, Text, Container } from 'pixi.js';
import { gsap } from 'gsap/all';
import Scene from './Scene';
import Footer from '../components/Footer';
import Planets from '../components/Planets';

export default class Countdown extends Scene {
    constructor() {
        super();

        this.name = 'countdown';

        this._addBackground();
        const planets = new Planets();
        this.addChild(planets);
        this._addFooter();
        this.count();
    }

    static get events() {
        return {
            startGame: 'STARTGAME',
        }
    }

    _addFooter() {
        const footer = new Footer();
        footer.x = - window.innerWidth / 2;
        footer.y = window.innerHeight / 2 - footer.height;
        this.addChild(footer);
    }

    _addBackground() {
        this._background = new Sprite.from('play-scene');
        this._background.width = window.innerWidth;
        this._background.height = window.innerHeight;
        this._background.anchor.set(0.5);
        this.addChild(this._background);
    }

    _drawCircle(number) {
        this.removeChild(this._container);
        this._container = new Container();
        this._outerCircle = new Graphics();
        this._outerCircle.lineStyle(20, 0xffffff, 1, 0);
        this._outerCircle.drawCircle(0, 0, 250);
        this._outerCircle.endFill();

        this._innerCircle = new Graphics();
        this._innerCircle.beginFill(0x000000);
        this._innerCircle.alpha = 0.4;
        this._innerCircle.drawCircle(0, 0, 250);
        this._innerCircle.endFill();

        const text = new Text(number, {
            fill: 0xffffff,
            fontWeight: 'bold',
            align: 'center',
            fontSize: 200,
        });
        text.anchor.set(0.5);

        this._container.addChild(this._innerCircle);
        this._container.addChild(this._outerCircle);
        this._container.addChild(text);
        this.addChild(this._container);
        return this._container;
    }

    timer(ms) { return new Promise(res => setTimeout(res, ms)); }
    async count() {
        for (let i = 3; i > 0; i--) {
            let container = this._drawCircle(i);
            container.alpha = 0;
            container.scale.x = 0;
            container.scale.y = 0;
            gsap.timeline()
                .to(container, { alpha: 1, })
                .to(container.scale, { x: 1, y: 1 }, '<');
            await this.timer(1000);
        }
        this.emit(Countdown.events.startGame);
    }
}
