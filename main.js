var myDataRef = new Firebase('https://tictactoexxx.firebaseio.com/');


$(document).ready(function(){

  var turn = 1;

// here we tell the function that when you click on any of the cells
// it has to change the image background of that cell,
  $("#cell11 , #cell12, #cell13, #cell21, #cell22, #cell23, #cell31, #cell32, #cell33 ")
    .click(
      function(){
        // alert("click");
        var cell = $(this);
        //If its turn 0, use O and then switch to turn 1
          if(turn=== 0){

            cell.css("background", "url(images/o.png)");
            turn = 1 ;
        // if it is turn 1, use x as background, then switch to turn 0.
          }else{
            cell.css("background", "url(images/x.png)");
            turn = 0;
          }

          myDataRef.push({player: turn, cell: cell[0].id});


      }
      );

});

// when you refresh the page
//  - erase database
//  - create a new game object
//  {game: 1,
      turn1: {player: 0}
    // }



