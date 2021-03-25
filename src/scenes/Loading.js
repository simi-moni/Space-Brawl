import { Sprite, Graphics } from 'pixi.js';
import Footer from '../components/Footer';
import Scene from './Scene';
import { gsap } from 'gsap/all';

export default class Loading extends Scene {
    constructor() {
        super();

        this._addBackground();
        this._addLogo();
        this._addLoadingBar();
        this._addHighlight();
        this._addFooter();
    }

    static get events() {
        return {
            loaded: 'LOADED',
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
        this._background.filters = [new PIXI.filters.BlurFilter(150, 10)];
        this._background.anchor.set(0.5);

        this.addChild(this._background);
    }

    _addLogo() {
        this._logo = new Sprite.from('ooo');
        this._logo.anchor.set(0.5);

        this.addChild(this._logo);
    }

    _addLoadingBar() {
        this._loadingBar = new Graphics();
        this._loadingBar.lineStyle(2, 0xffffff, 1, 0);
        this._loadingBar.drawRoundedRect(0, 0, 500, 60, 50);
        this._loadingBar.pivot.x = 500 / 2;
        this._loadingBar.pivot.y = 60 / 2;
        this._loadingBar.y = window.innerHeight / 6.5;
        this._loadingBar.endFill();

        this.addChild(this._loadingBar);
    }

    _addHighlight() {
        const highlight = new Graphics();
        highlight.beginFill(0xffffff);
        highlight.drawRoundedRect(10, 10, 480, 40, 50);
        highlight.scale.x = 0;
        highlight.endFill();
        this._loadingBar.addChild(highlight);

        gsap.timeline({ onComplete: () => this.emit(Loading.events.loaded) })
            .to(highlight.scale, { x: 1, duration: 2, ease: 'power2.out', });
    }
}