import { Container, Sprite } from 'pixi.js';

/**
 * Class used for creating the planets
 */
export default class Planets extends Container {
    constructor() {
        super();

        this._createPlanet('planet-1', window.innerHeight - 400, 440);
        this._createPlanet('planet-2', -window.innerHeight + 200, -400);
        this._createPlanet('planet-3', -window.innerHeight + 50, 370);
        this._createPlanet('planet-4', window.innerHeight, -550);
    }

    _createPlanet(name, x, y) {
        this._body = new Sprite.from(name);
        this._body.x = x;
        this._body.y = y;
        this._body.anchor.set(0.5);
        this.addChild(this._body);
    }
}
