import Animation from './animation.js';
import EnemySprites from './enemySprites.js';
import Game from './game.js';
import Bomb from './bomb.js';
import Diamond from './diamond.js';
import Rubi from './rubi.js';

export default class Enemy {
  static STATE_RUN = 'run';
  static STATE_HIT = 'hit';
  static STATE_ATACK = 'atack';

  constructor(enemyData, speed, chancesToAtack) {
    this.id = enemyData.id;
    this.width = enemyData.width;
    this.height = enemyData.height;
    this.scale = 2;
    this.x = width - this.width - 100;
    this.y = height - (this.height * this.scale) - 30;
    this.speed = speed;
    this.chancesToAtack = chancesToAtack;
    this.inAlert = false;
    this.ignoreBomb = false;

    this.mask = {
      marginX: enemyData.mask.marginX,
      marginY: enemyData.mask.marginY,
      width: enemyData.mask.width,
      height: enemyData.mask.height
    }

    this.state = Enemy.STATE_RUN;

    this.visionCollisor = {
      x: this.x + 500,
      y: height - 100,
      width: 100,
      height: 50
    }

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
      this.visionCollisor.x = this.x - (width / 4);
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

      if (!this.ignoreBomb) {
        if (bomb.state === Bomb.STATE_BOMB && bomb.grounded &&
          this.x >= width / 2 && this.isVisonColliding(this.visionCollisor, bomb)) {
          const chance = random(100);

          if (chance < this.chancesToAtack) {
            this.x -= 5;
            this.inAlert = true;
          }
          else {
            this.ignoreBomb = true;
          }
        }
      }

      if (bomb.state === Bomb.STATE_BOMB && this.isColliding(bomb)) {
        if (this.inAlert) {
          Game.audioCenter.play('atack');
          this.hit(Enemy.STATE_ATACK);
          bomb.state = this.eatAtack ? Bomb.STATE_EAT : Bomb.STATE_ATACK;
        }
        else {
          this.hit(Enemy.STATE_HIT);
          const chanceToDiamond = random(100);
          if (chanceToDiamond <= 20) {
            Game.coins.push(new Diamond(this.x + (this.width / 2), height - 100));
          }
          else {
            Game.coins.push(new Rubi(this.x + (this.width / 2), height - 100));
          }
          bomb.explode();
        }
      }
    }
  }

  isVisonColliding(entity1, entity2) {
    const collision = collideRectRect(
      entity1.x, entity1.y,
      entity1.width, entity1.height,
      entity2.x + entity2.mask.marginX, entity2.y + entity2.mask.marginY,
      entity2.mask.width * this.scale, entity2.mask.height * this.scale
    )

    return collision;
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
    // rect(this.visionCollisor.x, this.visionCollisor.y, this.visionCollisor.width, this.visionCollisor.height);


    if (this.state === Enemy.STATE_RUN) {
      this.animation.play('run', this.x, this.y, this.scale);
    } else if (this.state === Enemy.STATE_HIT) {
      this.animation.play('hit', this.x, this.y, this.scale);
    } else if (this.state === Enemy.STATE_ATACK) {
      this.animation.play('atack', this.x, this.y, this.scale);
    }

    if (this.inAlert) {
      image(
        EnemySprites.sprites[this.id].exclamation,
        this.x + this.mask.marginX + (this.mask.width / 2) + 15, (height - (this.mask.height * 2)) - 80,
        20 * 2,
        22 * 2
      );
    }

  }
}