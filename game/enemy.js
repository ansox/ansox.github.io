import Animation from './animation.js';
import EnemySprites from './enemySprites.js';
import Game from './game.js';
import Bomb from './bomb.js';

export default class Enemy {
  static STATE_RUN = 'run';
  static STATE_HIT = 'hit';
  static STATE_ATACK = 'atack';

  constructor(enemyData, speed, chanceToAtack) {
    this.id = enemyData.id;
    this.width = enemyData.width;
    this.height = enemyData.height;
    this.scale = 2;
    this.x = width - this.width - 100;
    this.y = height - (this.height * this.scale) - 30;
    this.speed = speed;
    this.chanceToAtack = chanceToAtack;

    this.mask = {
      marginX: enemyData.mask.marginX,
      marginY: enemyData.mask.marginY,
      width: enemyData.mask.width,
      height: enemyData.mask.height
    }

    this.state = Enemy.STATE_RUN;

    this.maxFrames = enemyData.maxFrames;
    this.frameSpeed = enemyData.frameSpeed;
    this.colFrames = enemyData.colFrames;
    this.maxFramesHit = enemyData.maxFramesHit;
    this.frameSpeedHit = enemyData.frameSpeedHit;
    this.colFramesHit = enemyData.colFramesHit;
    this.maxFramesAtack = enemyData.maxFramesAtack;
    this.frameSpeedAtack = enemyData.frameSpeedAtack;
    this.colFramesAtack = enemyData.colFramesAtack;
    this.eatAtack = enemyData.eatAtack;

    this.animation = new Animation();
    this.animation.add(
      'run', EnemySprites.sprites[this.id].image,
      this.width, this.height,
      this.colFrames, this.maxFrames, this.frameSpeed
    );
    this.animation.add(
      'hit', EnemySprites.sprites[this.id].imageHit,
      this.width, this.height,
      this.colFramesHit, this.maxFramesHit, this.frameSpeedHit, false
    );
    this.animation.add(
      'atack', EnemySprites.sprites[this.id].imageAtack,
      this.width, this.height,
      this.colFramesAtack, this.maxFramesAtack, this.frameSpeedAtack, false
    )
  }

  hit(state) {
    this.state = state;
  }

  tick() {
    if (this.state === Enemy.STATE_RUN) {
      this.x -= this.speed;
    } else if (this.state === Enemy.STATE_HIT) {
      if (this.animation.isEnded('hit')) {
        this.x = 0 - width;
        this.animation.restart('hit');
        this.state = Enemy.STATE_RUN;
      }
    } else if (this.state === Enemy.STATE_ATACK) {
      if (this.animation.isEnded('atack')) {
        this.animation.restart('atack');
        this.state = Enemy.STATE_RUN;
      }
    }

    for (let bomb of Game.bombs) {
      if (bomb.state === Bomb.STATE_BOMB && this.isColliding(bomb)) {
        const chance = random(101);
        if (bomb.grounded && chance < this.chanceToAtack) {
          Game.audioCenter.play('atack');
          this.hit(Enemy.STATE_ATACK);
          bomb.state = this.eatAtack ? Bomb.STATE_EAT : Bomb.STATE_ATACK;
        }
        else {
          this.hit(Enemy.STATE_HIT);
          Game.player.addPoints(10);
          bomb.explode();
        }
      }
    }
  }

  isColliding(entity) {
    const collision = collideRectRect(
      this.x + this.mask.marginX, this.y + this.mask.marginY,
      this.mask.width * this.scale, this.mask.height * this.scale,
      entity.x + entity.mask.marginX, entity.y + entity.mask.marginY,
      entity.mask.width * this.scale, entity.mask.height * this.scale
    )

    return collision;
  }

  drawn() {
    // stroke('red');
    // noFill();
    // rect(this.x + this.mask.marginX, this.y + this.mask.marginY, this.mask.width * this.scale, this.mask.height * this.scale);

    if (this.state === Enemy.STATE_RUN) {
      this.animation.play('run', this.x, this.y, this.scale);
    } else if (this.state === Enemy.STATE_HIT) {
      this.animation.play('hit', this.x, this.y, this.scale);
    } else if (this.state === Enemy.STATE_ATACK) {
      this.animation.play('atack', this.x, this.y, this.scale);
    }

  }
}