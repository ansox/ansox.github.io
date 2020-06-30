import Game from "./game.js";

export default class Particle {

  constructor(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.width = w;
    this.height = h;
    this.lifeTime = 15;
    this.curLife = 0;
    this.speed = 2;
    this.dx = randomGaussian();
    this.dy = randomGaussian();
  }

  tick() {
    this.x += this.dx * this.speed;
    this.y += this.dy * this.speed;

    this.curLife++;

    if (this.curLife === this.lifeTime) {
      Game.particles = Game.particles.filter(item => item != this);
    }
  }

  drawn() {
    fill(255, 204, 0);
    stroke(255, 204, 0);
    rect(this.x, this.y, this.width, this.height);
  }
}