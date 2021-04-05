import { Container, Graphics, Sprite } from 'pixi.js';
import { gsap } from 'gsap/all';
import Rocket from './Rocket';

export default class Rover extends Container {
    constructor({ body, shadow, healthBar, }, { active, inactive, upperShield, lowerShield }, { paths }) {
        super();

        this.name = 'rover';

        this._upperDefault = upperShield;
        this._lowerDefault = lowerShield;

        this._addShadow(shadow);
        this._addHealthBar(healthBar);
        this._body = this._createBody(body);
        this._lowerShield = this._addShield(inactive, lowerShield);//shield inactive-lower
        this._upperShield = this._addShield(active, upperShield);//active -upper 
        this._addHitBoxes();
        this._rocket = this._createRocket(paths);
    }

    static get events() {
        return {
            no_hp: 'NO_HP',
        }
    }

    /**
     * Creating the body of the rover
     * @param {object} roverConfig 
     * @returns 
     */
    _createBody({ texture, x, y, angle }) {
        this._body = new Sprite.from(texture);
        this._body.y = y;
        this._body.x = x;
        this._body.angle = angle;
        this.addChild(this._body);

        return this._body;
    }

    /**
     * Adding the shadow of the rover
     * @param {object} shadowConfig 
     */
    _addShadow({ texture, x, y, angle }) {
        this._shadow = new Sprite.from(texture);
        this._shadow.y = y;
        this._shadow.x = x;
        this._shadow.angle = angle;
        this.addChild(this._shadow);
    }

    /**
     * Adding health bar
     * @param {object} healthBarConfig 
     */
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

    /**
     * @private handling the reduce of health
     */
    _loseHealth() {
        const lostHP = 120 * 0.1;

        if (this._health.width === 12) {
            this._health.width -= lostHP;
            this.emit(Rover.events.no_hp)
        } else {
            this._health.width -= lostHP;
        }
    }

    /**
     * Adding shield
     * @param {string} texture 
     * @param {object} shieldConfig 
     * @returns 
     */
    _addShield({ texture }, { x, y, angle }) {
        const shield = new Sprite.from(texture);
        shield.name = texture;
        shield.anchor.set(0.5);
        shield.y = y;
        shield.x = x;
        shield.angle = angle;
        this._body.addChild(shield);
        return shield;
    }

    /**
     * @private adding hitboxes
     */
    _addHitBoxes() {
        /*this._lowerShield.hitArea = new PIXI.Rectangle(this._lowerShield.x-50, this._lowerShield.y-100, 20, 210);
          this._upperShield.hitArea = new PIXI.Rectangle(this._upperShield.x -100, this._upperShield.y -50, 210, 20);*/
        this.lowerHitBox = new Graphics();
        this.lowerHitBox.beginFill(0x0000ff);
        this.lowerHitBox.drawRect(-110, -80, 50, 230);
        this.lowerHitBox.alpha = 0;
        this.lowerHitBox.endFill();
        this._body.addChild(this.lowerHitBox);

        this.upperHitBox = new Graphics();
        this.upperHitBox.beginFill(0x0000ff);
        this.upperHitBox.drawRect(-80, -110, 230, 50);
        this.upperHitBox.alpha = 0;
        this.upperHitBox.endFill();
        this._body.addChild(this.upperHitBox);
    }

    _isSwappable({ key }) {
        if ((key === "ArrowUp" && this._upperShield.x === this._lowerDefault.x) ||
            (key === "ArrowDown" && this._upperShield.x === this._upperDefault.x))
            this._swapShield();
    }

    /**
     * @private
     * used for swapping the shield
     */
    _swapShield() {
        const active = this._upperShield;
        const inactive = this._lowerShield;
        [this._lowerShield.name, this._upperShield.name] = [this._upperShield.name, this._lowerShield.name];
        this._tl = gsap.timeline();
        this._tl
            .to(active, { x: inactive.x, y: inactive.y, angle: inactive.angle - 90, duration: 0.3, })
            .to(inactive, { x: active.x, y: active.y, angle: active.angle + 90, duration: 0.3, }, '<');
    }

    /**
     * @private getter for the active part of the shield
     */
    _getActiveShield() {
        return this._lowerShield.name === 'shield-active' ? this.lowerHitBox : this.upperHitBox
    }

    _createRocket(paths) {
        const rocket = new Rocket(paths);
        rocket.alpha = 0;

        this.addChild(rocket);
        return rocket;
    }
}