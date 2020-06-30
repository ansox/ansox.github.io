export default class AudioCenter {
  static music;
  static jump;
  static coin;
  static explosion;
  static bomb;
  static atack;
  static die;
  static hurt;

  constructor() {
    this.audio = {};
    this.audio['music'] = AudioCenter.music;
    this.audio['jump'] = AudioCenter.jump;
    this.audio['coin'] = AudioCenter.coin;
    this.audio['explosion'] = AudioCenter.explosion;
    this.audio['bomb'] = AudioCenter.bomb;
    this.audio['atack'] = AudioCenter.atack;
    this.audio['die'] = AudioCenter.die;
    this.audio['hurt'] = AudioCenter.hurt;
  }

  static preload() {
    AudioCenter.music = loadSound('./game/audio/music.ogg');
    AudioCenter.jump = loadSound('./game/audio/jump.mp3');
    AudioCenter.coin = loadSound('./game/audio/coin.wav');
    AudioCenter.explosion = loadSound('./game/audio/explosion.wav');
    AudioCenter.bomb = loadSound('./game/audio/bomb.ogg');
    AudioCenter.atack = loadSound('./game/audio/atack.ogg');
    AudioCenter.die = loadSound('./game/audio/die.wav');
    AudioCenter.hurt = loadSound('./game/audio/hurt.wav');
  }

  loop(id) {
    this.audio[id].setVolume(0.5);
    this.audio[id].loop();
  }

  play(id, volume = 1, speed = 1) {
    this.audio[id].rate(speed)
    this.audio[id].setVolume(volume);
    this.audio[id].play();
  }

  stop(id) {
    this.audio[id].stop();
  }
}