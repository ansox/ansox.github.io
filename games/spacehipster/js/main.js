var SpaceHipster = SpaceHipster || {};

//initiate the Phaser framework
SpaceHipster.game = new Phaser.Game(360, 592, Phaser.AUTO);

SpaceHipster.game.state.add('GameState', SpaceHipster.GameState);
SpaceHipster.game.state.start('GameState');    