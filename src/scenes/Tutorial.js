import { Sprite, Graphics, Text, Container } from 'pixi.js';
import Scene from './Scene';
import Footer from '../components/Footer';
import { gsap } from 'gsap/all';

export default class Tutorial extends Scene {
    constructor() {
        super();

        this._addBackground();
        this._addFooter();
        this._addButton();
        this._addKey('key-default', 'arrow', -90);
        this._addDescription('Press the up arrow key to move the shield up');
        this.d = [{ key: 'key-default', type: 'arrow', angle: 90, desc: 'Press the down arrow key to move the shield up' },
        { key: 'key-long', desc: 'Press the spacebar key to fire' }];
    }

    get data() {
        return this.d.shift();
    }

    static get events() {
        return {
            finish: 'FINISH',
        }
    }

    _addBackground() {
        this._background = new Sprite.from('play-scene');
        this._background.width = window.innerWidth;
        this._background.height = window.innerHeight;
        this._background.filters = [new PIXI.filters.BlurFilter(150, 10)];
        this._background.anchor.set(0.5);
        this.addChild(this._background);
    }

    _addFooter() {
        const footer = new Footer();
        footer.x = - window.innerWidth / 2;
        footer.y = window.innerHeight / 2 - footer.height;
        this.addChild(footer);
    }

    _addKey(textureName, type, angle) {
        this.removeChild(this._frame);
        this._frame = new Sprite.from(textureName);
        this._frame.anchor.set(0.5, 1.1);
        this._frame.alpha = 0;
        this.addChild(this._frame);
        if (textureName === 'key-default') {
            const key = new Sprite.from(type);
            key.angle = angle;
            key.anchor.set(0.5);
            key.y = -240
            key.alpha = 0;
            this._frame.addChild(key);


            gsap.timeline()
                .to(this._frame, { alpha: 1 })
                .to(key, { alpha: 1 }, '<')

        } else {
            const spacebar = new Text('Spacebar', {
                fill: 0xffffff,
                fontWeight: 'bold',
                align: 'center',
                fontSize: 60,
            });
            spacebar.anchor.set(0.5);
            spacebar.y = -100;
            spacebar.alpha = 0;
            this._frame.addChild(spacebar);

            gsap.timeline()
                .to(this._frame, { alpha: 1 })
                .to(spacebar, { alpha: 1 }, '<')
        }
    }

    _addDescription(desc) {
        this.removeChild(this._description);
        this._description = new Graphics();
        this._description.lineStyle(2, 0xffffff, 1, 0);
        this._description.drawRoundedRect(0, 0, 600, 50, 50);
        this._description.pivot.x = 600 / 2;
        this._description.pivot.y = 0;
        this._description.endFill();
        this._description.interactive = true;
        this._description.buttonMode = true;
        this._description.alpha = 0;
        this.addChild(this._description);
        const text = new Text(desc, {
            fill: 0xffffff,
            fontWeight: 'bold',
            align: 'center',
        });
        text.x = this._description.width / 2;
        text.y = this._description.height / 2;
        text.anchor.set(0.5);
        text.alpha = 0;
        this._description.addChild(text);

        gsap.timeline()
            .to(this._description, { alpha: 1 })
            .to(text, { alpha: 1 }, '<')
    }

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
        const text = new Text('Next', {
            fill: 0x000000,
            fontWeight: 'bold',
            align: 'center',
        });
        text.x = this._button.width / 2;
        text.y = this._button.height / 2;
        text.anchor.set(0.5);
        this._button.addChild(text);

        this._button.on('pointerdown', () => this._buttonHandler());
    }

    _buttonHandler() {
        let obj = this.data;
        if (typeof obj !== 'undefined') {
            this._addKey(obj.key, obj.type, obj.angle);
            this._addDescription(obj.desc);
        }
        else {
            this.emit(Tutorial.events.finish);
        }
    }
}