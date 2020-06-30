import GameOver from "./gameover.js";

export default class StartGame {
  static font;
  static image;
  static chest;

  constructor() {
    this.width = 350;
    this.height = 350;
    this.x = (width / 2) - (this.width / 2);
    this.y = 100;

    this.chestWidth = 64;
    this.chestHeight = 35;
    this.scale = 3;

    this.countTick = 0;
    this.maxTick = 15;
    this.showText = true;
  }

  static preload() {
    StartGame.font = loadFont('./game/fonts/fontStart.otf');
    StartGame.image = loadImage('./game/imgs/map.png');
    StartGame.chest = loadImage('./game/imgs/chest.png');
  }

  tick() {
    this.countTick++;
    if (this.countTick > this.maxTick) {
      this.countTick = 0;
      this.showText = !this.showText;
    }
  }

  draw() {
    image(StartGame.image, this.x, this.y, this.width, this.height);
    image(StartGame.chest,
      width / 2 - ((this.chestWidth * this.scale) / 2),
      height / 3 + 40,
      this.chestWidth * this.scale,
      this.chestHeight * this.scale);

    textFont(StartGame.font);
    textSize(120);
    textAlign(CENTER);
    text('Pirates Treasure', width / 2, height / 3)
    textFont(GameOver.font);
    if (this.showText) {
      textSize(25);
      text('Aperte "Espaço" para começar', width / 2, (height / 2) + 200);
    }
  }
}