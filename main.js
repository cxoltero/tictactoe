(function($){
  $(document).ready(function(){
  var randomId = function() {
      function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
          .toString(16)
          .substring(1);
      }
      return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
        s4() + '-' + s4() + s4() + s4();
  }
  var gameNumber = prompt('Please enter game id, press ok for new game');
  var gameID = gameNumber || randomId();
  var player1 =  prompt("Player 1 name", 'Player 1');
  var player2 =  prompt("Player 2 name",  'Player 2') ;
  var myDataRef = new Firebase('https://tictactoexxx.firebaseio.com/games');
  var currentPlayer = '';
  var gameOver= false;
  var turn = 0;
  var counter = 0;
// here we tell the function that when you click on any of the cells
// it has to change the image background of that cell,

  $('#gameId')[0].innerText = gameID;

  var currentGame = myDataRef.child(gameID);
  var newObj = function(){
    var obj = {};
    for(let i =1; i<4; i++){
      for(let j = 1; j <4; j++){
       obj['cell'+ i + j] = '';
      }
    }
    obj.player1 = player1;
    obj.player2 = player2;
    obj.winner = '';
    obj.turn = 1;
    obj.counter = 0;
    return obj;
  }

  currentGame.set(newObj());

  currentGame.on("value", function(value) {
      var currentObj = value.val();
      if(currentObj){
        for(var i = 1; i <= 3; i++){
          for(var j = 1; j<=3; j++){
            var id = 'cell'+i+j;
            var JQid = '#'+id;
            if(currentObj[id] === 'o'){
              $(JQid).addClass('o');
            }else if(currentObj[id] === 'x'){
              $(JQid).addClass('x');
            }
          }
        }

      counter = currentObj.counter;
      turn = currentObj.turn;
      }
  });

  
  $('.cell').on('click', function(){
    if($(this).hasClass('checked')){
      alert('boxed checked');
      return;
    }
    else{
      $(this).addClass('checked');
      var obj = {};

      if(turn=== 0){
        obj[this.id] = 'o';
        obj.turn = 1;
        currentGame.update(obj);
        currentPlayer = player2;
        validate();
      }else{
        obj[this.id] = 'x';
        obj.turn = 0;
        currentGame.update(obj);
        currentPlayer = player1;
        validate();
      }
      counter ++;
      if(counter === 9 && gameOver === false){
        alert('it was a tie');
      }
    }

    function checkRow(){
        for(var i =1; i<4; i++){
            if($('#row'+i).children('.x').length === 3 || $('#row'+i).children('.o').length === 3){
                // alert(currentPlayer + ' won!');
                gameOver= true;
                return;
            };
        }
    }

    function checkCol(){
        for(var i =1; i<4; i++){
            if(
              ($('#cell1'+i).hasClass('x') && $('#cell2'+i).hasClass('x') && $('#cell3'+i).hasClass('x')) || 
              ($('#cell1'+i).hasClass('o') && $('#cell2'+i).hasClass('o') && $('#cell3'+i).hasClass('o'))){
                // alert(currentPlayer + ' won!');
                gameOver= true;
                return;
            }
        }
    }  

    function checkCross(){
      if(($('#cell22').hasClass('x') && $('#cell11').hasClass('x') && $('#cell33').hasClass('x')) ||
         ($('#cell22').hasClass('o') && $('#cell11').hasClass('o') && $('#cell33').hasClass('o'))){
          // alert(currentPlayer + ' won!');
          gameOver= true;
          return;
      }
      else if(($('#cell22').hasClass('x') && $('#cell31').hasClass('x') && $('#cell13').hasClass('x')) ||
         ($('#cell22').hasClass('o') && $('#cell31').hasClass('o') && $('#cell13').hasClass('o'))){
          // alert(currentPlayer + ' won!');
          gameOver= true;
          return;
      }
    }  

    function validate(){
        checkRow();
        checkCol();
        checkCross();
        if(gameOver){
          var another = confirm(currentPlayer + ' won!, Would you like to start another game?');
          if(another){
            // window.location.reload();
            currentGame.update(newObj());
          }
        } 
    }
  });

  $('#restart').on('click', function(){
    window.location.reload();
  });
});

})(jQuery)



