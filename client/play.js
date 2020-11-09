var modal = document.getElementById('myModal');
var grid = new Array(3);
grid[0] = new Array(3);
grid[1] = new Array(3);
grid[2] = new Array(3);
console.log("init_grid ", grid)
var player = undefined;
var gameWon = 0;
var websocket = new WebSocket("ws://0.0.0.0:1234/");

document.getElementById('btn1').onclick = function (event) {
    websocket.send(JSON.stringify({
        type: 'create',
        game_id: document.getElementById('game_id').value
    }));
    document.getElementById("game_id").readOnly = true;
    document.getElementById("btn1").disabled = true;
    document.getElementById("btn2").disabled = true;
    document.getElementById("game_ico").innerHTML = 'YOUR SYMBOL : X';
}

document.getElementById('btn2').onclick = function (event) {
    websocket.send(JSON.stringify({
        type: 'join',
        game_id: document.getElementById('game_id').value,
    }));
    document.getElementById("game_id").readOnly = true;
    document.getElementById("btn2").disabled = true;
    document.getElementById("btn1").disabled = true;
    document.getElementById("game_ico").innerHTML = 'YOUR SYMBOL : O';
}


websocket.onmessage = function (event) {
    console.log('socket_msg ', event.data )
    
    if (event.data == "400") {
        endgame(400);
        document.getElementById("game_id").readOnly = false;
        document.getElementById("btn2").disabled = false;
        document.getElementById("btn1").disabled = false;
        document.getElementById("game_ico").innerHTML = '';
        document.getElementById("turn").innerHTML = '';
        
    }else if (event.data == "500"){
        endgame(500);
        document.getElementById("game_id").readOnly = false;
        document.getElementById("btn2").disabled = false;
        document.getElementById("btn1").disabled = false;
        document.getElementById("game_ico").innerHTML = '';
        document.getElementById("turn").innerHTML = '';   
    }else if (event.data == "600"){
        endgame(600);
        document.getElementById("game_id").readOnly = false;
        document.getElementById("btn2").disabled = false;
        document.getElementById("btn1").disabled = false;
        document.getElementById("game_ico").innerHTML = '';
        document.getElementById("turn").innerHTML = '';   
    }
    data = JSON.parse(event.data)
    $(data.id).html(data.value)
    $(data.id).css("pointer-events", "none")
    player = data.player
    grid = data.grid
    console.log("soc_grid ", grid)
    if (data.winner != null) {
        console.log("winner", data.winner)
        endgame(data.winner)
    }
    console.log("websocket_ret : ", data.id)
};

$("#square_one").click(function () {
    console.log("clicked");
    if (checkLegalMove(0, 0) == true) {
        game_id = document.getElementById('game_id').value
        winner = null
        make_call = false;
        if (player == 1) {
            $("#square_one_text").html("X");
            grid[0][0] = 'X';
            input_value = 'X';
            if (checkWin(1) == true) {
                winner = 1;
            }
            player = 2;
            make_call = true ;

        } else if(player==2)  {
            $("#square_one_text").html("O");
            grid[0][0] = 'O';
            input_value = 'O';
            if (checkWin(2) == true) {
                winner = 2;
            }
            player = 1;
            make_call = true ;
        }

        if (checkTie() == true) {
            winner = 0
        }
        if (make_call == true){
        websocket.send(JSON.stringify({
            id: "#square_one_text",
            player: player,
            grid: grid,
            value: input_value,
            winner: winner,
            type: 'play',
            game_id: game_id
        }));
    }
    }
});

$("#square_two").click(function () {
    console.log("clicked");
    if (checkLegalMove(0, 0) == true) {
        game_id = document.getElementById('game_id').value
        winner = null
        make_call = false;
        if (player == 1) {
            $("#square_two_text").html("X");
            grid[0][1] = 'X';
            input_value = 'X';
            if (checkWin(1) == true) {
                winner = 1;
            }
            player = 2;
            make_call = true ;

        } else if(player==2)  {
            $("#square_two_text").html("O");
            grid[0][1] = 'O';
            input_value = 'O';
            if (checkWin(2) == true) {
                winner = 2;
            }
            player = 1;
            make_call = true ;
        }

        if (checkTie() == true) {
            winner = 0
        }
        if (make_call == true){
        websocket.send(JSON.stringify({
            id: "#square_two_text",
            player: player,
            grid: grid,
            value: input_value,
            winner: winner,
            type: 'play',
            game_id: game_id
        }));
    }
    }
});

$("#square_three").click(function () {
    console.log("clicked");
    if (checkLegalMove(0, 0) == true) {
        game_id = document.getElementById('game_id').value
        winner = null
        make_call = false;
        if (player == 1) {
            $("#square_three_text").html("X");
            grid[0][2] = 'X';
            input_value = 'X';
            if (checkWin(1) == true) {
                winner = 1;
            }
            player = 2;
            make_call = true ;

        } else if(player==2)  {
            $("#square_three_text").html("O");
            grid[0][2] = 'O';
            input_value = 'O';
            if (checkWin(2) == true) {
                winner = 2;
            }
            player = 1;
            make_call = true ;
        }

        if (checkTie() == true) {
            winner = 0
        }
        if (make_call == true){
        websocket.send(JSON.stringify({
            id: "#square_three_text",
            player: player,
            grid: grid,
            value: input_value,
            winner: winner,
            type: 'play',
            game_id: game_id
        }));
    }
    }
});

$("#square_four").click(function () {
    console.log("clicked");
    if (checkLegalMove(0, 0) == true) {
        game_id = document.getElementById('game_id').value
        winner = null
        make_call = false;
        if (player == 1) {
            $("#square_four_text").html("X");
            grid[1][0] = 'X';
            input_value = 'X';
            if (checkWin(1) == true) {
                winner = 1;
            }
            player = 2;
            make_call = true ;

        } else if(player==2)  {
            $("#square_four_text").html("O");
            grid[1][0] = 'O';
            input_value = 'O';
            if (checkWin(2) == true) {
                winner = 2;
            }
            player = 1;
            make_call = true ;
        }

        if (checkTie() == true) {
            winner = 0
        }
        if (make_call == true){
        websocket.send(JSON.stringify({
            id: "#square_four_text",
            player: player,
            grid: grid,
            value: input_value,
            winner: winner,
            type: 'play',
            game_id: game_id
        }));
    }
    }
});

$("#square_five").click(function () {
    console.log("clicked");
    if (checkLegalMove(0, 0) == true) {
        game_id = document.getElementById('game_id').value
        winner = null
        make_call = false;
        if (player == 1) {
            $("#square_five_text").html("X");
            grid[1][1] = 'X';
            input_value = 'X';
            if (checkWin(1) == true) {
                winner = 1;
            }
            player = 2;
            make_call = true ;

        } else if(player==2)  {
            $("#square_five_text").html("O");
            grid[1][1] = 'O';
            input_value = 'O';
            if (checkWin(2) == true) {
                winner = 2;
            }
            player = 1;
            make_call = true ;
        }

        if (checkTie() == true) {
            winner = 0
        }
        if (make_call == true){
        websocket.send(JSON.stringify({
            id: "#square_five_text",
            player: player,
            grid: grid,
            value: input_value,
            winner: winner,
            type: 'play',
            game_id: game_id
        }));
    }
    }
});

$("#square_six").click(function () {
    console.log("clicked");
    if (checkLegalMove(0, 0) == true) {
        game_id = document.getElementById('game_id').value
        winner = null
        make_call = false;
        if (player == 1) {
            $("#square_six_text").html("X");
            grid[1][2] = 'X';
            input_value = 'X';
            if (checkWin(1) == true) {
                winner = 1;
            }
            player = 2;
            make_call = true ;

        } else if(player==2)  {
            $("#square_six_text").html("O");
            grid[1][2] = 'O';
            input_value = 'O';
            if (checkWin(2) == true) {
                winner = 2;
            }
            player = 1;
            make_call = true ;
        }

        if (checkTie() == true) {
            winner = 0
        }
        if (make_call == true){
        websocket.send(JSON.stringify({
            id: "#square_six_text",
            player: player,
            grid: grid,
            value: input_value,
            winner: winner,
            type: 'play',
            game_id: game_id
        }));
    }
    }
});

$("#square_seven").click(function () {
    console.log("clicked");
    if (checkLegalMove(0, 0) == true) {
        game_id = document.getElementById('game_id').value
        winner = null
        make_call = false;
        if (player == 1) {
            $("#square_seven_text").html("X");
            grid[2][0] = 'X';
            input_value = 'X';
            if (checkWin(1) == true) {
                winner = 1;
            }
            player = 2;
            make_call = true ;

        } else if(player==2)  {
            $("#square_seven_text").html("O");
            grid[2][0] = 'O';
            input_value = 'O';
            if (checkWin(2) == true) {
                winner = 2;
            }
            player = 1;
            make_call = true ;
        }

        if (checkTie() == true) {
            winner = 0
        }
        if (make_call == true){
        websocket.send(JSON.stringify({
            id: "#square_seven_text",
            player: player,
            grid: grid,
            value: input_value,
            winner: winner,
            type: 'play',
            game_id: game_id
        }));
    }
    }
});

$("#square_eight").click(function () {
    console.log("clicked");
    if (checkLegalMove(0, 0) == true) {
        game_id = document.getElementById('game_id').value
        winner = null
        make_call = false;
        if (player == 1) {
            $("#square_eight_text").html("X");
            grid[2][1] = 'X';
            input_value = 'X';
            if (checkWin(1) == true) {
                winner = 1;
            }
            player = 2;
            make_call = true ;

        } else if(player==2)  {
            $("#square_eight_text").html("O");
            grid[2][1] = 'O';
            input_value = 'O';
            if (checkWin(2) == true) {
                winner = 2;
            }
            player = 1;
            make_call = true ;
        }

        if (checkTie() == true) {
            winner = 0
        }
        if (make_call == true){
        websocket.send(JSON.stringify({
            id: "#square_eight_text",
            player: player,
            grid: grid,
            value: input_value,
            winner: winner,
            type: 'play',
            game_id: game_id
        }));
    }
    }
});

$("#square_nine").click(function () {
    console.log("clicked");
    if (checkLegalMove(0, 0) == true) {
        game_id = document.getElementById('game_id').value
        winner = null
        make_call = false;
        if (player == 1) {
            $("#square_nine_text").html("X");
            grid[2][2] = 'X';
            input_value = 'X';
            if (checkWin(1) == true) {
                winner = 1;
            }
            player = 2;
            make_call = true ;

        } else if(player==2)  {
            $("#square_nine_text").html("O");
            grid[2][2] = 'O';
            input_value = 'O';
            if (checkWin(2) == true) {
                winner = 2;
            }
            player = 1;
            make_call = true ;
        }

        if (checkTie() == true) {
            winner = 0
        }
        if (make_call == true){
        websocket.send(JSON.stringify({
            id: "#square_nine_text",
            player: player,
            grid: grid,
            value: input_value,
            winner: winner,
            type: 'play',
            game_id: game_id
        }));
    }
    }
});

function checkWin(playerNum) {
    //check horizontal
    for (i = 0; i < 3; i++) {

        if ((grid[i][0] == grid[i][1] && grid[i][1] == grid[i][2]) && grid[i][0] != undefined && grid[i][1] != undefined && grid[i][2] != undefined) {
            console.log("horizontal won");
            return true;
        }
    }

    //check vertical
    for (i = 0; i < 3; i++) {
        if ((grid[0][i] == grid[1][i] && grid[1][i] == grid[2][i]) && grid[0][i] != undefined && grid[1][i] != undefined && grid[2][i] != undefined) {
            console.log("vertical won");
            return true;
        }
    }

    //check diagonal
    if (((grid[0][0] == grid[1][1] && grid[1][1] == grid[2][2]) || (grid[0][2] == grid[1][1] && grid[1][1] == grid[2][0])) && grid[1][1] != undefined) {
        console.log("diagonal won");
        return true;
    }


    return false;
}

function checkTie() {
    var tieGame = true;
    for (var i = 0; i < 3; i++) {
        for (var x = 0; x < 3; x++) {
            if (grid[i][x] == null && grid[i][x] == undefined) {
                tieGame = false;
            }
        }
    }
    return tieGame
}

function checkLegalMove(row, column) {
    console.log(grid[row][column]);
    if (grid[row][column] !== undefined && grid[row][column] !== null) {
        return false;
    } else {
        return true;
    }
}

function endgame(num) {
    if (num == 0) {
        $(".modal_text").html("Tie game!");
        $("#myModal").css("display", "block");
    }
    if (num == 1) {
        $(".modal_text").html("X Wins!");
        $("#myModal").css("display", "block");
    }
    if (num == 2) {
        $(".modal_text").html("O Wins!");
        $("#myModal").css("display", "block");
    }
    if (num == 400) {
        $(".modal_text").html("Sorry Game Not Available!");
        $("#myModal").css("display", "block");
    }
    if (num == 500) {
        $(".modal_text").html("Other Player Quit the game!");
        $("#myModal").css("display", "block");
    }
    if (num == 600){
        $(".modal_text").html("Sorry the game is already full!");
        $("#myModal").css("display", "block");
    }
    
}
// function locaAll(){
//     document.querySelector("td").style.pointerEvents = "none";
// }

// function unlockAll(){
//     document.getElementsByTagName("td").disabled = false;
// }

$("#restartBtn").click(function () {
    grid = new Array(3);
    grid[0] = new Array(3);
    grid[1] = new Array(3);
    grid[2] = new Array(3);
    player = 1;
    gameWon = 0;
    $("#square_one_text").html("");
    $("#square_two_text").html("");
    $("#square_three_text").html("");
    $("#square_four_text").html("");
    $("#square_five_text").html("");
    $("#square_six_text").html("");
    $("#square_seven_text").html("");
    $("#square_eight_text").html("");
    $("#square_nine_text").html("");
    modal.style.display = "none";
    game_id = document.getElementById('game_id').value
});

