var model = {
  init: function() {
    this.gameList = [
      {
        title: 'Farm Animals',
        description: 'A very simple farm for kids.',
        image: 'assets/farm.png',
        link: 'games/myfarmer/index.html'
      },
      {
        title: 'Virtual Pet',
        description: 'Take care of a virtual pet.',
        image: 'assets/virtualpet.png',
        link: 'games/virtualpet/index.html'
      },
      {
        title: 'Monster Kong',
        description: 'A clone of Donkey Kong arcade',
        image: 'assets/monsterkong.png',
        link: 'games/monsterkong/index.html'
      },
      {
        title: 'Space Hipster',
        description: 'Space shooter game',
        image: 'assets/spacehipster.png',
        link: 'games/spacehipster/index.html'
      },
      {
        title: 'Mr. Hop',
        description: 'Endless Runner',
        image: 'assets/mrhop.png',
        link: 'games/mrhop/index.html'
      }
    ]
  },

  getGameList: function() {
    return this.gameList;
  }
}

var controller = {
  init: function() {
    model.init();
    view.init();
  },

  getGameList: function() {
    return model.getGameList();
  }
}

var view = {
  init: function() {
    this.container = document.querySelector('.container');
    view.render();
  },

  render: function() {
    var getRow = function() {
      var row = document.createElement('div');
      row.setAttribute('class', 'row');

      return row;
    }

    var getCol = function() {
      var col = document.createElement('div');
      col.setAttribute('class', 'col l4 m6 s12');
      return col;
    }

    var getCard = function(game) {
      return '<a href="' + game.link + '">'+
       '<div class="card blue-grey darken-1">' +
        '    <div class="card-image">' +
        '      <div class="div-image">' +
        '        <img src="'+ game.image + '">' +
        '      </div>' +
        '    </div>' +
        '    <div class="card-content white-text">' +
        '      <span class="card-title">' + game.title + '</span>' +
        '      <p>' + game.description + '</p>' +
        '    </div>' +
        '    <div class="card-action">' +
        '      <a href="' + game.link + '">Acesse aqui</a>' +
        '    </div>' +
        '</div>' + 
        '</a>';
    }

    var gameList = controller.getGameList();
    var row;
    
    for (var i = 0; i < gameList.length; i++) {
      var game = gameList[i];

      if (i % 3 === 0) {
        if (row) {
          this.container.appendChild(row);
        }
     
        row = getRow();
      }

      var col = getCol();

      var text = getCard(game);

      col.innerHTML = getCard(game);
      
      row.appendChild(col);
    }

    this.container.appendChild(row);
  }

}

controller.init();