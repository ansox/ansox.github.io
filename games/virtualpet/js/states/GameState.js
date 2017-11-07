//this game will have only 1 state
var GameState = {
  
    //executed after everything is loaded
    create: function() {      
      this.background = this.game.add.sprite(0, 0, 'backyard');
      this.background.inputEnabled = true;
      this.background.events.onInputDown.add(this.placeItem, this);
      
      this.pet = this.game.add.sprite(100, 400, 'pet');
      this.pet.anchor.setTo(0.5);
      this.pet.customParams = { health: 100, fun: 100 };
      this.pet.inputEnabled = true;
      this.pet.input.enableDrag();
      this.pet.animations.add('funnyfaces', [1, 2, 3, 2, 1], 7, false);

      this.apple = this.game.add.sprite(72, 570, 'apple');
      this.apple.anchor.set(0.5);
      this.apple.customParams = {health: 20};
      this.apple.inputEnabled = true;
      this.apple.events.onInputDown.add(this.pickItem, this);

      this.candy = this.game.add.sprite(144, 570, 'candy');
      this.candy.anchor.set(0.5);
      this.candy.customParams = {health: -10, fun: 10};      
      this.candy.inputEnabled = true;
      this.candy.events.onInputDown.add(this.pickItem, this);
      
      this.toy = this.game.add.sprite(216, 570, 'toy');
      this.toy.anchor.set(0.5);
      this.toy.customParams = {fun: 20};
      this.toy.inputEnabled = true;
      this.toy.events.onInputDown.add(this.pickItem, this);

      this.rotate = this.game.add.sprite(288, 570, 'rotate');
      this.rotate.anchor.set(0.5);
      this.rotate.inputEnabled = true;
      this.rotate.events.onInputDown.add(this.rotatePet, this);

      this.buttons = [this.apple, this.candy, this.toy, this.rotate];

      this.selectedItem = null;
      this.uiBlocked = false;

      var style = {
        font: '20px Arial', 
        fill: '#fff'
      }

      this.game.add.text(10, 20, 'Health:', style);
      this.game.add.text(140, 20, 'Fun:', style);
      
      this.healthText  = this.game.add.text(80, 20, '', style);
      this.funText  = this.game.add.text(185, 20, '', style);
      
      this.refreshStats();

      this.statsDecreaser = this.game.time.events.loop(Phaser.Timer.SECOND * 5, this.reduceProperties, this);
    },
    
    pickItem: function(sprite, event) {

      if (!this.uiBlocked) {
        console.log('pick item');

        this.clearSelection();

        this.selectedItem = sprite;

        sprite.alpha = 0.4;

        
      }
    },

    rotatePet: function(sprite, event) {
      if (!this.uiBlocked) {
        this.uiBlocked = true;

        this.clearSelection();
        sprite.alpha = 0.4;

        var petRotation = this.game.add.tween(this.pet);
        petRotation.to({ angle: '+720'}, 1000);
        
        petRotation.onComplete.add(function() {
          this.uiBlocked = false;
          sprite.alpha = 1;
          this.pet.customParams.fun += 10;
          console.log(this.pet.customParams.fun);

          this.refreshStats();
        }, this)

        petRotation.start();
        
      }
    },

    clearSelection: function() {
      this.buttons.forEach(function(item) {
        item.alpha = 1;
      });

      this.selectedItem = null;
    },

    placeItem: function(sprite, event) {
      if (this.selectedItem && !this.uiBlocked) {
        var x = event.position.x;
        var y = event.position.y;
  
        var newItem = this.game.add.sprite(x, y, this.selectedItem.key);
        newItem.anchor.setTo(0.5);
        newItem.customParams = this.selectedItem.customParams;

        this.uiBlocked = true;

        var petMovement = this.game.add.tween(this.pet);
        petMovement.to({x: x, y: y}, 700);
  

        petMovement.onComplete.add(function() {
          newItem.destroy();

          this.pet.animations.play('funnyfaces');
          
          this.uiBlocked = false;

          var stat;

          for(stat in newItem.customParams) {
            console.log(stat);

            this.pet.customParams[stat] += newItem.customParams[stat];
          }

          this.refreshStats();

        }, this);

        petMovement.start();
      }
    },

    refreshStats: function() {
      this.healthText.text = this.pet.customParams.health;
      this.funText.text = this.pet.customParams.fun;
    },

    reduceProperties: function() {
      this.pet.customParams.health -= 10;
      this.pet.customParams.fun -= 15;
      this.refreshStats();
    },
    
    update: function() {
      if (this.pet.customParams.health <= 0 || this.pet.customParams.fun <= 0) {
        this.pet.frame = 4;
        this.uiBlocked = true;
        this.game.time.events.add(2000, this.gameOver, this);
      }
    },
    gameOver: function() {
      this.game.state.start('HomeState', true, false, 'GAME OVER');
    }
  };