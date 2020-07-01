import GameOver from "./gameover.js";
import Game from "./game.js";

export default class Intro {
  static spaceKey;
  static zKey;

  static STATE_INTRO = 'intro';
  static STATE_STARTING = 'starting';

  constructor() {
    this.curIndex = 0;
    this.messages = [];
    this.messageIndex = 0;
    this.time = 0;
    this.maxTime = 4;
    this.showMessage = true;
    this.countTick = 0;
    this.maxTick = 15;
    this.showText = true;
    this.canStart = false;
    this.state = Intro.STATE_INTRO;

    this.spaceWidth = 64;
    this.spaceHeight = 32;

    this.zWidth = 32;
    this.zSpaceHeight = 32;

    this.timer = 250;
    this.countTimer = 0;
    this.maxTimer = 1;

    this.messages.push('A vida de um pirata não é fácil!');
    this.messages.push('')
    this.messages.push('Corra, pule, roube tesouros e');
    this.messages.push('aproveite para explodir alguns');
    this.messages.push('outros piratas pelo caminho!')
    this.messages.push('')

    this.messages.push('Bem-vindo a Pirates Treasure!')
    this.messages.push('RAAAAARRRRRR!!!')

  }

  static preload() {
    Intro.spaceKey = loadImage('./game/imgs/spaceKey.png')
    Intro.zKey = loadImage('./game/imgs/zKey.png')
  }

  start() {
    Game.player.x = -600;
  }

  nextState() {
    if (this.state === Intro.STATE_INTRO && !this.showMessage) {
      this.state = Intro.STATE_STARTING;
    }
  }

  tick() {
    if (this.state === Intro.STATE_INTRO) {
      this.time++;

      if (this.showMessage) {
        if (this.time >= this.maxTime) {
          this.time = 0;

          if (this.curIndex < this.messages[this.messageIndex].length) {
            this.curIndex++;
          }
          else {

            if (this.messageIndex < this.messages.length) {
              this.messageIndex++;
              this.curIndex = 0;
            }

            if (this.messageIndex >= this.messages.length) {
              this.showMessage = false;
            }

          }
        }
      }

      this.countTick++;
      if (this.countTick > this.maxTick) {
        this.countTick = 0;
        this.showText = !this.showText;
      }

      if (Game.player.x < 40) {
        Game.player.x++;
      }
    }

    if (this.state === Intro.STATE_STARTING) {
      if (this.timer > 0) {
        this.countTimer++;

        if (this.countTimer === this.maxTimer) {
          this.countTimer = 0;
          this.timer -= 1.2;
        }
      }
      else {
        this.canStart = true;
      }
    }
  }

  drawn() {
    if (this.state === Intro.STATE_INTRO) {
      textFont(GameOver.font);
      textSize(20);
      textAlign(CENTER);

      for (let i = 0; i < this.messageIndex; i++) {
        text(this.messages[i], width / 2, 100 + (40 * i));
      }

      if (this.showMessage) {
        text(this.messages[this.messageIndex].substring(this.curIndex, 0), width / 2, 100 + (40 * this.messageIndex));
      }
      else {
        if (this.showText) {
          textSize(25);
          text('Aperte "Espaço" para começar', width / 2, (height / 2) + 200);
        }
      }
    }

    if (this.state === Intro.STATE_STARTING) {
      textFont(GameOver.font);
      textSize(20);
      // fill(0, 0, 0, this.opacity);
      textAlign(LEFT);

      // tint(255, this.opacity);

      image(Intro.spaceKey,
        width / 2 - (this.spaceWidth * 3),
        height / 2 - 50,
        this.spaceWidth * 1.5,
        this.spaceHeight * 1.5, 0, 0,
        this.spaceWidth, this.spaceHeight)
      text(': Pular', width / 2 - 50, height / 2 - 15,);

      image(Intro.zKey,
        width / 2 - (this.zWidth * 6),
        height / 2 + 20,
        this.zWidth * 1.5,
        this.zSpaceHeight * 1.5, 0, 0,
        this.zWidth, this.zSpaceHeight)
      text(': Lançar bomba', width / 2 - 50, height / 2 + 55,);

      // noTint();
    }

    Game.player.drawn();
  }
}