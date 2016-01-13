$(document).ready(function(){
  var myDataRef = new Firebase('https://tictactoexxx.firebaseio.com/');
  var turn = 1;
  var counter = 0;

// here we tell the function that when you click on any of the cells
// it has to change the image background of that cell,
  
  $('.cell').on('click', function(){
    if($(this).hasClass('checked')){
      alert('boxed checked');
      return;
    }
    else{
      $(this).addClass('checked');

      if(turn=== 0){
        $(this).css("background", "url(images/o.png)").addClass('o');
        validate()
        turn = 1 ;
      }else{
        $(this).css("background", "url(images/x.png)").addClass('x');
        validate()
        turn = 0;
      }
      counter ++;
    }
    if(counter === 9){
        alert('it was a tie');
        window.location.reload();
    }
    function checkRow(){
        for(var i =1; i<4; i++){
            if($('#row'+i).children('.x').length === 3 || $('#row'+i).children('.o').length === 3){
                alert('You won!');
                window.location.reload();
                return;
            };
        }
    }

    function checkCol(){
        for(var i =1; i<4; i++){
            if(
              ($('#cell1'+i).hasClass('x') && $('#cell2'+i).hasClass('x') && $('#cell3'+i).hasClass('x')) || 
              ($('#cell1'+i).hasClass('o') && $('#cell2'+i).hasClass('o') && $('#cell3'+i).hasClass('o'))){
                alert('You won!');
                window.location.reload();
                return;
            }
        }
    }  

    function checkCross(){
      if(($('#cell22').hasClass('x') && $('#cell11').hasClass('x') && $('#cell33').hasClass('x')) ||
         ($('#cell22').hasClass('o') && $('#cell11').hasClass('o') && $('#cell33').hasClass('o'))){
          alert('You won!');
          window.location.reload();
          return;
      }
      else if(($('#cell22').hasClass('x') && $('#cell31').hasClass('x') && $('#cell13').hasClass('x')) ||
         ($('#cell22').hasClass('o') && $('#cell31').hasClass('o') && $('#cell13').hasClass('o'))){
          alert('You won!');
          window.location.reload();
          return;
      }
    }  
    function validate(){
        checkRow();
        checkCol();
        checkCross();
    }
  });


  //         myDataRef.push({player: turn, cell: cell[0].id});


});



