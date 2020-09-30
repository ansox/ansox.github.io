import Game from './game/game.js';

function preload() {
  game.preload();
}

function keyPressed() {
  game.keyPressed(key);
}

function setup() {
  game.setup();
}

function draw() {
  game.drawn();
}

window.setup = setup;
window.draw = draw;
window.preload = preload;
window.keyPressed = keyPressed;

const game = new Game();