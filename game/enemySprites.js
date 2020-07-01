export default class EnemySprites {
  static sprites = {};

  static add(enemy) {
    EnemySprites.sprites[enemy.id] = {
      image: loadImage(enemy.runSpritesheet),
      imageHit: loadImage(enemy.hitSpritesheet),
      imageAtack: !!enemy.atackspriteSheet ? loadImage(enemy.atackspriteSheet) : null,
      exclamation: loadImage('./game/imgs/exclamation.png')
    }
  }
}