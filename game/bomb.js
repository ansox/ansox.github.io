import Game from './game.js';
import Animation from './animation.js';

export default class Bomb {
  static image;
  static imageExplosion;

  static STATE_BOMB = 'bomb';
  static STATE_EXPLOSTION = 'explosion';
  static STATE_DESTROYED = 'destroyed';
  static STATE_EAT = 'eat';
  static STATE_ATACK = 'atack';

  constructor(x) {
    this.width = 96;
    this.height = 108;
    this.scale = 2;
    this.x = x;
    this.y = height - (this.height * this.scale) + 5;
    this.initalY = this.y;

    this.maxFrames = 10;
    this.frameSpeed = 2;
    this.speed = 3;
    this.maxFramesExplosion = 9;
    this.frameSpeedExplosion = 2;

    this.distance = 15;
    this.gravity = 2;
    this.forceSpeed = -35;

    this.mask = {
      marginX: 55,
      marginY: 85,
      width: 45,
      height: 45
    }

    this.grounded = 0;

    this.state = Bomb.STATE_BOMB;

    this.countEat = 0;

    this.animation = new Animation();
    this.animation.add(
      'bomb', Bomb.image,
      this.width, this.height,
      4, this.maxFrames, this.frameSpeed
    )
    this.animation.add(
      'explosion', Bomb.imageExplosion,
      this.width, this.height,
      4, this.maxFramesExplosion, this.frameSpeedExplosion, false
    )
  }

  static preload() {
    Bomb.image = loadImage('./game/imgs/bomb.png');
    Bomb.imageExplosion = loadImage('./game/imgs/explosion.png');
  }

  explode() {
    this.state = Bomb.STATE_EXPLOSTION;
    Game.audioCenter.play('explosion');
    Game.startShake();
  }

  tick() {
    if (this.state === Bomb.STATE_BOMB) {
      this.y = this.y + this.forceSpeed;
      this.forceSpeed += this.gravity;

      if (this.y > this.initalY) {
        this.y = this.initalY;
        this.distance = -4;
        this.grounded = true;
      }

      this.x += this.distance;

      Game.bombs.forEach(bomb => {
        if (bomb.x < -bomb.width) {
          Game.bombs = Game.bombs.filter(item => item != bomb)
        }
      });
    }

    if (this.state === Bomb.STATE_EAT) {
      this.countEat++;
      this.x += this.countEat;
      this.y -= this.countEat;

      if (this.countEat === 5) {
        this.destroyBomb();
      }
    }

    if (this.state === Bomb.STATE_ATACK) {
      this.x -= 15
    }

    if (this.animation.isEnded('explosion')) {
      this.destroyBomb();
    }
  }

  destroyBomb() {
    this.state = Bomb.STATE_DESTROYED;
    Game.bombs = Game.bombs.filter(item => item != this)
  }

  drawn() {
    // stroke('red');
    // noFill();
    // rect(this.x + this.mask.marginX, this.y + this.mask.marginY, this.mask.width * this.scale, this.mask.height * this.scale);

    if (this.state === Bomb.STATE_BOMB) {
      this.animation.play('bomb', this.x, this.y, this.scale);
    }
    else if (this.state === Bomb.STATE_EXPLOSTION) {
      this.animation.play('explosion', this.x, this.y, this.scale);
    } else if (this.state === Bomb.STATE_EAT) {
      this.animation.play('bomb', this.x, this.y, this.scale);
    } else if (this.state === Bomb.STATE_ATACK) {
      this.animation.play('bomb', this.x, this.y, this.scale);
    }


  }
}
