import Animation from "./animation.js";

export default class Coin {
  static image;

  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.width = 16;
    this.height = 16;
    this.speed = 4;
    this.maxFrames = 4;
    this.frameSpeed = 6;

    this.mask = {
      marginX: 0,
      marginY: 0,
      width: 16,
      height: 16
    }

    this.animation = new Animation();
    this.animation.add('coin', Coin.image,
      this.width, this.height,
      4, this.maxFrames, this.frameSpeed
    );

  }

  static preload() {
    Coin.image = loadImage('./game/imgs/coins.png');
  }

  tick() {
    this.x -= this.speed;
  }

  drawn() {
    this.animation.play('coin', this.x, this.y, 3);
  }
}