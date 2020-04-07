var table = document.getElementById("table");
table.addEventListener("click", clickHandler);

var xToPlay = true;
var moves = 0;

var cells = document.getElementsByTagName("td");
var turn = document.getElementById("turn");

function didSomeoneWin(cells){
    var row1 = cells[0].innerText + cells[1].innerText + cells[2].innerText;
    var row2 = cells[3].innerText + cells[4].innerText + cells[5].innerText;
    var row3 = cells[6].innerText + cells[7].innerText + cells[8].innerText;

    var col1 = cells[0].innerText + cells[3].innerText + cells[6].innerText;
    var col2 = cells[1].innerText + cells[4].innerText + cells[7].innerText;
    var col3 = cells[2].innerText + cells[5].innerText + cells[8].innerText;

    var diagonal1 = cells[0].innerText + cells[4].innerText + cells[8].innerText;
    var diagonal2 = cells[2].innerText + cells[4].innerText + cells[6].innerText;

    var array = [row1, row2, row3, col1, col2, col3, diagonal1, diagonal2];
    array.forEach(function(result){
        if(result == "XXX"){
            setTimeout(function (){
                window.alert("Player X has won!");
                document.location.reload();
            }, 500)

            Array.from(cells).forEach(function(element){
                if(element.innerText == "X"){
                    element.style.backgroundColor = "rgb(150, 255, 0)";
                }
            })
                
        } else if (result == "OOO"){
            setTimeout(function (){
                window.alert("Player O has won!");
                document.location.reload();
            }, 500)

            Array.from(cells).forEach(function(element){
                if(element.innerText == "O"){
                    element.style.backgroundColor = "rgb(150, 255, 0)";
                }
            })
                
        } else if (moves == 9) {
            setTimeout(function (){
                document.location.reload();
            }, 500)      
        }
    })
}

var xPlays = "PLAYER X'S TURN";
var oPlays = "PLAYER O'S TURN";

var turnFill = document.createTextNode(xPlays);
turn.appendChild(turnFill);

function clickHandler(e){
    
    var id = e.target.id;
    var box = document.getElementById(id);

    

    if(e.target.innerText != "X" && e.target.innerText != "O"){

        if(xToPlay){
            var X = document.createTextNode("X");
            box.appendChild(X);
            xToPlay = false;
        } else {
            var O = document.createTextNode("O");
            box.appendChild(O);
            xToPlay = true;
        }

        turn.textContent = "";

        if(xToPlay){
            var turnFill = document.createTextNode(xPlays);
            turn.appendChild(turnFill);
        } else {
            var turnFill = document.createTextNode(oPlays);
            turn.appendChild(turnFill);
        }

        moves++;

        if (moves >= 5){
            didSomeoneWin(cells);
        }

    } else {
        box.style.backgroundColor = "red";
        setTimeout(function (){
            box.style.backgroundColor = "white";
        }, 1000)
    }
}