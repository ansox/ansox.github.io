import Animation from "./animation.js";
import Treasure from "./treasure.js";

export default class Diamond extends Treasure {
  static image;

  constructor(x, y) {
    super(x, y);

    this.width = 24;
    this.height = 24;
    this.speed = 4;
    this.maxFrames = 4;
    this.frameSpeed = 6;
    this.particleColor = 'rgb(105, 163, 214)';
    this.points = 20;

    this.mask = {
      marginX: 0,
      marginY: 0,
      width: 24,
      height: 24
    }

    this.animation = new Animation();
    this.animation.add('diamond', Diamond.image,
      this.width, this.height,
      4, this.maxFrames, this.frameSpeed
    );

  }

  static preload() {
    Diamond.image = loadImage('./game/imgs/diamond.png');
  }

  drawn() {
    this.animation.play('diamond', this.x, this.y, 3);
  }
}