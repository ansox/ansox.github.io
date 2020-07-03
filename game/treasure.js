import Animation from "./animation.js";
import Game from "./game.js";

export default class Treasure {
  static image;

  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.width = 16;
    this.height = 16;
    this.speed = 4;
    this.maxFrames = 4;
    this.frameSpeed = 6;
    this.particleColor = '#fff';
    this.points = 1;

    this.mask = {
      marginX: 0,
      marginY: 0,
      width: this.width,
      height: this.height
    }
  }

  static preload() {

  }

  destroy() {
    Game.generateParticles(100, this.x, this.y, this.particleColor);
    Game.player.addPoints(this.points);
    Game.audioCenter.play('coin');
    Game.coins = Game.coins.filter(item => item != this);
  }

  tick() {
    this.x -= this.speed;
  }

  drawn() {

  }
}