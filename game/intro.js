import GameOver from "./gameover.js";
import Game from "./game.js";

export default class Intro {
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

    this.messages.push('A vida de um pirata não é fácil!');
    this.messages.push('')
    this.messages.push('Corra, pule, roube tesouros e');
    this.messages.push('aproveite para explodir alguns');
    this.messages.push('outros piratas pelo caminho!')
    this.messages.push('')

    this.messages.push('Bem-vindo a Pirates Treasure!')
    this.messages.push('RAAAAARRRRRR!!!')

  }

  start() {
    Game.player.x = -600;
  }

  tick() {
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
            this.canStart = true;
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

  drawn() {
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

    Game.player.drawn();
  }
}