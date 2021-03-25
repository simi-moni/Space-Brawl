import { Container, Graphics, Sprite } from 'pixi.js';
import { gsap, MotionPathPlugin } from 'gsap/all';

export default class Rover extends Container {
    constructor({ body, shadow, healthBar, }, { active, inactive, upperShield, lowerShield }) {
        super();

        this.name = 'rover';

        // this._health = health;
        this._upperDefault = upperShield;
        this._lowerDefault = lowerShield;

        this._addShadow(shadow);
        this._addHealthBar(healthBar);
        this._body = this._createBody(body);
        this._lowerShield = this._addShield(inactive, lowerShield);//shield inactive-lower
        this._upperShield = this._addShield(active, upperShield);//active -upper 
    }

    _createBody({ texture, x, y, angle }) {
        this._body = new Sprite.from(texture);
        this._body.y = y;
        this._body.x = x;
        this._body.angle = angle;
        this.addChild(this._body);

        return this._body;
    }

    _createRocket() {
        this._rocket = new Sprite.from('rocket');
        this._rocket.angle = 60;
        this.addChild(this._rocket);
    }

    _addShadow({ texture, x, y, angle }) {
        this._shadow = new Sprite.from(texture);
        this._shadow.y = y;
        this._shadow.x = x;
        this._shadow.angle = angle;
        this.addChild(this._shadow);
    }

    _addHealthBar({ texture, x, y }) {
        this._healthBar = new Sprite.from(texture);
        this._healthBar.y = y;
        this._healthBar.x = x;
        this._health = new Graphics();
        this._health.beginFill(0x00ff00);
        this._health.drawRoundedRect(35, 35, 120, 10, 50);
        this._health.endFill();
        this._healthBar.addChild(this._health);
        this.addChild(this._healthBar);
    }

    _addShield({ texture }, { x, y, angle }) {
        // this._body.removeChild(this._shield);
        this._shield = new Sprite.from(texture);
        this._shield.anchor.set(0.5);
        this._shield.y = y;
        this._shield.x = x;
        this._shield.angle = angle;
        this._body.addChild(this._shield);
        return this._shield;
    }

    _isSwappable({ key }) {
        if ((key === "ArrowUp" && this._upperShield.x === this._lowerDefault.x) ||
            (key === "ArrowDown" && this._upperShield.x === this._upperDefault.x))
            this._swapShield();
    }

    _swapShield() {
        const active = this._upperShield;
        const inactive = this._lowerShield;
        this._tl = gsap.timeline();
        this._tl
            .to(active, { x: inactive.x, y: inactive.y, angle: inactive.angle - 90, duration: 0.3, })
            .to(inactive, { x: active.x, y: active.y, angle: active.angle + 90, duration: 0.3, }, '<');
    }

    _fireRocket() {
        gsap.registerPlugin(MotionPathPlugin);
        this._createRocket();
        /*  gsap.to(this._rocket, {
              duration: 5,
              motionPath: {
                  path: 'M1 185C50.3333 111 184.6 -28.4 327 6C505 49 455 335 914 330',
                  autoRotate: 90,
              }
          });*/

    }
}