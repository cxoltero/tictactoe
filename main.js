$(document).ready(function(){
  var turn = 0;

  $("#cell11 , #cell12, #cell13, #cell21, #cell22, #cell23, #cell31, #cell32, #cell33 ")
    .click(
      function(){
        // alert("click");
        var cell = $(this);
          if(turn=== 0){

            cell.css("background", "url(images/o.png");
            turn = 1 ;

          }else{
            cell.css("background", "url(images/o.png");
            turn = 0;
          }
      }
    );

});




