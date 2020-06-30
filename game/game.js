import Scenario from './scenario.js';
import Player from './player.js';
import Enemy from './enemy.js';
import Bomb from './bomb.js';
import EnemySprites from './enemySprites.js';
import UI from './ui.js';
import GameOver from './gameover.js';
import StartGame from './startGame.js';
import Coin from './coin.js';
import AudioCenter from './audio-center.js';
import Particle from './particle.js';
import Intro from './intro.js';

export default class Game {
  static bombs = [];
  static enemy;
  static player;
  static coins = [];
  static audioCenter;
  static particles = [];

  static STATE_START = 'start';
  static STATE_INTRO = 'intro';
  static STATE_PLAYING = 'playing';
  static STATE_GAMEOVER = 'game_over';

  static shakeStartTime = -1;
  static shakeDuration = 200

  constructor() {

  }

  preloadEnemies(enemyList) {
    this.enemyList = enemyList;
    this.enemyList.list.forEach(enemy => {
      EnemySprites.add(enemy);
    })
  }

  preload() {
    loadJSON('./game/json/enemies.json', this.preloadEnemies.bind(this));

    Scenario.preload();
    Player.preload();
    Bomb.preload();
    UI.preload();
    GameOver.preload();
    StartGame.preload();
    Coin.preload();
    AudioCenter.preload();
  }

  setup() {
    createCanvas(windowWidth, windowHeight);

    this.scenario = new Scenario(4);
    this.start();

    this.state = Game.STATE_START;
  }

  start() {
    this.enemySpeed = 15;
    this.chancesToAtack = 20;
    this.nextLevel = 100;

    Game.player = new Player();
    this.startGame = new StartGame();
    this.gameOver = new GameOver();
    this.intro = new Intro();
    Game.audioCenter = new AudioCenter();

    this.enemies = this.enemyList.list.map(enemyData => {
      return new Enemy(enemyData, 10, 20);
    });

    Game.enemy = this.getEnemy();

    this.ui = new UI();

    Game.bombs = [];
    Game.coins = [];
    Game.particles = [];

    Game.audioCenter.loop('music');
  }

  keyPressed(key) {
    if (this.state === Game.STATE_PLAYING) {
      if (key === ' ') {
        Game.player.jump();
      }

      if (key === 'z' || key === 'Z') {
        Game.player.bomb();
      }
    }

    if (this.state === Game.STATE_GAMEOVER) {
      if (key === ' ' && this.gameOver.canRestart) {
        clear();
        this.start();
        this.state = Game.STATE_PLAYING;
        this.gameOver.end();
      }
    }

    if (this.state === Game.STATE_START) {
      if (key === ' ') {
        clear();
        this.state = Game.STATE_INTRO;
      }
    }

    if (this.state === Game.STATE_INTRO) {
      if (key === ' ' && this.intro.canStart) {
        this.start();
        this.state = Game.STATE_PLAYING;
      }
    }

  }

  drawn() {
    if (this.state === Game.STATE_PLAYING) {
      Game.preShake();

      this.scenario.tick();
      this.scenario.drawn();

      Game.player.tick();
      Game.player.drawn();

      if (random(101) <= 1.3) {
        const coin = new Coin(width - 16, random(height - 100, height - 250));
        Game.coins.push(coin);
      }

      Game.coins.forEach(coin => {
        coin.tick();
        coin.drawn();
      })

      Game.enemy.tick();
      Game.enemy.drawn();

      Game.bombs.forEach(bomb => {
        bomb.tick();
        bomb.drawn();
      })

      if (Game.enemy.x < - Game.enemy.width) {
        Game.enemy = this.getEnemy();
        Game.enemy.x = width + Game.enemy.width;
        Game.enemy.speed = parseInt(random(this.enemySpeed, this.enemySpeed + 5));
        Game.enemy.chancesToAtack = this.chancesToAtack;
      }

      Game.particles.forEach(particle => {
        if (particle) {
          particle.tick();
          particle.drawn();
        }
      })

      this.ui.tick();
      this.ui.draw();

      if (Game.player.lifes <= 0) {
        this.state = Game.STATE_GAMEOVER;
        Game.audioCenter.play('die');
        Game.audioCenter.stop('music');
      }

      if (Game.player.points > this.nextLevel) {
        this.nextLevel += 100;
        this.enemySpeed += 2;
        this.chancesToAtack += 2;
      }
    }

    if (this.state === Game.STATE_GAMEOVER) {
      this.scenario.drawn();

      this.gameOver.tick();
      this.gameOver.drawn();
    }

    if (this.state === Game.STATE_START) {
      this.scenario.tick();
      this.scenario.drawn();

      this.startGame.tick();
      this.startGame.draw();
    }

    if (this.state === Game.STATE_INTRO) {
      this.scenario.tick();
      this.scenario.drawn();

      this.intro.tick();
      this.intro.drawn();
    }
  }

  getEnemy() {
    return this.enemies[parseInt(random(4))];
  }

  static preShake() {
    if (Game.shakeStartTime == -1) return;
    var dt = Date.now() - Game.shakeStartTime;
    if (dt > Game.shakeDuration) {
      Game.shakeStartTime = -1;
      return;
    }
    var easingCoef = dt / Game.shakeDuration;
    var easing = Math.pow(easingCoef - 1, 3) + 1;
    // ctx.save();
    var dx = easing * (Math.cos(dt * 0.1) + Math.cos(dt * 0.3115)) * 10;
    var dy = easing * (Math.sin(dt * 0.05) + Math.sin(dt * 0.057113)) * 10;
    translate(dx, dy);
  }

  static postShake() {
    if (Game.shakeStartTime == -1) return;
    // ctx.restore();
  }

  static startShake() {
    Game.shakeStartTime = Date.now();
  }

  static generateParticles(amount, x, y) {
    for (let i = 0; i < amount; i++) {
      Game.particles.push(new Particle(x, y, 1, 1));
    }
  }
}