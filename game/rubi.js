import Animation from "./animation.js";
import Treasure from "./treasure.js";

export default class Rubi extends Treasure {
  static image;

  constructor(x, y) {
    super(x, y);

    this.width = 24;
    this.height = 24;
    this.speed = 4;
    this.maxFrames = 4;
    this.frameSpeed = 6;
    this.particleColor = 'rgb(206, 85, 87)';
    this.points = 10;

    this.mask = {
      marginX: 0,
      marginY: 0,
      width: 24,
      height: 24
    }

    this.animation = new Animation();
    this.animation.add('rubi', Rubi.image,
      this.width, this.height,
      4, this.maxFrames, this.frameSpeed
    );

  }

  static preload() {
    Rubi.image = loadImage('./game/imgs/rubi.png');
  }

  drawn() {
    this.animation.play('rubi', this.x, this.y, 3);
  }
}