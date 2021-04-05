import { Container, Graphics, Sprite } from 'pixi.js';
import { gsap, MotionPathPlugin } from 'gsap/all';
import { random } from '../core/utils';

export default class Rocket extends Container {
    constructor(path) {
        super();

        this.name = 'rocket';
        this._paths = path;
        this._rocketIsActive = false;

        this._createRocket();
    }

    static get events() {
        return {
            fired: 'FIRED',
        }
    }

    _createRocket() {
        this._rocket = new Sprite.from('rocket');

        this.addChild(this._rocket);
    }

    /**
     * used to fire the rocket
     */
    async fireRocket(start, end) {
        if (this._rocketIsActive) return;

        //some of the rockets stop before the shield or pass it by because the offset maybe
        //how to fix the issue so i can detect true collisons
        this._rocketIsActive = true;

        gsap.registerPlugin(MotionPathPlugin);
        const randomPath = Math.floor(random(0, this._paths.length));
        this._tl = new gsap.timeline();
        await this._tl.fromTo(this,
            {
                x: 0,
                y: 0,
            }, {
            duration: 3,
            ease: 'power3.in',

            motionPath: {
                path: this._paths[randomPath],
                align: this,
                autoRotate: 1.55,
                useRadians: true,
                start: start, end: end,
                offsetX: -570,
                offsetY: -70,
            },
        }
        ).to(this, { alpha: 1, duration: 0.1 }, '<');
        this.alpha = 0;
        this._rocketIsActive = false;
        this.emit(Rocket.events.fired);
    }
    /**
     * reversing the rocket to the sender rover
     * @param {String} name 
     */
    async reverse(name) {
        this._tl.pause();
        this.alpha = 1;
        const tl = new gsap.timeline();

        if (name === 'player') {
            this.angle = 100;
            await tl
                .to(this, { x: this.parent.toGlobal(this.position).x - this.width, y: this.parent.y, duration: 3 })
                .to(this, { alpha: 0, duration: 0.1 }, '>-0.5');
        } else {
            this.angle = -100;
            await tl
                .to(this, { x: this.parent.toLocal(this.position).x - this.width, y: this.parent.y, duration: 3 })
                .to(this, { alpha: 0, duration: 0.1 }, '>-0.5');
        }
    }
}