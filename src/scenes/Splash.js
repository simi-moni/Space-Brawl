import Assets from '../core/AssetManager';
import Scene from './Scene';
import { Text } from 'pixi.js';
import config from '../config';

export default class Splash extends Scene {
  constructor() {
    super();

    this.loadingText = new Text('0%', {
      fontSize: 75,
      fill: 0xffc900,
    });

    this.config = config.scenes.Splash;

    this.loadingText.anchor.set(0.5);
    this.loadingText.x = this.width / 2;
    this.loadingText.y = this.height / 2;
    this.addChild(this.loadingText);
  }

  get finish() {
    return new Promise((res) => setTimeout(res, this.config.hideDelay));
  }

  preload() {
    const images = {
      logo: Assets.images.logo,
      'play-scene': Assets.images['play-scene'],
      ooo: Assets.images.ooo,
      arrow: Assets.images.arrow,
      'key-default': Assets.images['key-default'],
      'key-long': Assets.images['key-long'],
      'planet-1': Assets.images['planet-1'],
      'planet-2': Assets.images['planet-2'],
      'planet-3': Assets.images['planet-3'],
      'planet-4': Assets.images['planet-4'],
      rover: Assets.images.rover,
      'rover-shadow': Assets.images['rover-shadow'],
      'health-bar': Assets.images['rover-health-bar'],
      'shield-active': Assets.images['shield-active'],
      'shield-inactive': Assets.images['shield-inactive'],
      rocket: Assets.images.rocket,
      wins: Assets.images.wins,
      star: Assets.images.star,
      '1': Assets.images['1'],
      '2': Assets.images['2'],
    };
    const sounds = {

    };

    return super.preload({ images, sounds });
  }

  onResize(width, height) { // eslint-disable-line no-unused-vars
    this.loadingText.x = width / 2;
    this.loadingText.y = (height / 2) + 500;
  }

  onLoadProgress(val) {
    this.loadingText.text = `${val}%`;
  }
}
