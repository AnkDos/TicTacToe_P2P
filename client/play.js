var modal = document.getElementById('myModal');
var grid = new Array(3);
grid[0] = new Array(3);
grid[1] = new Array(3);
grid[2] = new Array(3);
var player = undefined;
var gameWon = 0;
var websocket = new WebSocket("ws://0.0.0.0:1234/");

document.getElementById('btn1').onclick = function (event) {
    websocket.send(JSON.stringify({
        type: 'create',
        game_id: document.getElementById('game_id').value,
        event:'create'
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
        player: 1,
        event: 'join'
    }));
    document.getElementById("game_id").readOnly = true;
    document.getElementById("btn2").disabled = true;
    document.getElementById("btn1").disabled = true;
    document.getElementById("game_ico").innerHTML = 'YOUR SYMBOL : O';
}


websocket.onmessage = function (event) {
    console.log("server response: ",event.data);
    if (event.data == "400") {
        endgame(400);
        document.getElementById("game_id").readOnly = false;
        document.getElementById("btn2").disabled = false;
        document.getElementById("btn1").disabled = false;
        document.getElementById("game_ico").innerHTML = '';
        document.getElementById("turn").innerHTML = '';

    } else if (event.data == "500") {
        endgame(500);
        document.getElementById("game_id").readOnly = false;
        document.getElementById("btn2").disabled = false;
        document.getElementById("btn1").disabled = false;
        document.getElementById("game_ico").innerHTML = '';
        document.getElementById("turn").innerHTML = '';
    } else if (event.data == "600") {
        endgame(600);
        document.getElementById("game_id").readOnly = false;
        document.getElementById("btn2").disabled = false;
        document.getElementById("btn1").disabled = false;
        document.getElementById("game_ico").innerHTML = '';
        document.getElementById("turn").innerHTML = '';
    }else if (event.data == "700") {
        endgame(700);
        document.getElementById("game_id").readOnly = false;
        document.getElementById("btn2").disabled = false;
        document.getElementById("btn1").disabled = false;
        document.getElementById("game_ico").innerHTML = '';
        document.getElementById("turn").innerHTML = '';
    }else if (event.data == "800") {
        endgame(800);
        document.getElementById("game_id").readOnly = false;
        document.getElementById("btn2").disabled = false;
        document.getElementById("btn1").disabled = false;
        document.getElementById("game_ico").innerHTML = '';
        document.getElementById("turn").innerHTML = '';
        return
    }else if (event.data == "900") {
        endgame(900);
        document.getElementById("game_id").readOnly = false;
        document.getElementById("btn2").disabled = false;
        document.getElementById("btn1").disabled = false;
        document.getElementById("game_ico").innerHTML = '';
        document.getElementById("turn").innerHTML = '';
        return
    }

    data = JSON.parse(event.data)
    $(data.id).html(data.value)
    player = data.player
    if ("game_status" in data) {
        document.getElementById("turn").innerHTML = 'opposition turn to join'
    } else {
        if (player == null) {
            document.getElementById("turn").innerHTML = 'opposition turn to play'
        } else {
            document.getElementById("turn").innerHTML = 'your turn to play'
        }
    }
    if(data.grid != undefined){
        grid = data.grid;
    }
    
    if (data.winner != null) {
        endgame(data.winner)
    }
    console.log("current_player: ", player);
};

$("#square_one").click(function () {
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
            make_call = true;

        } else if (player == 2) {
            $("#square_one_text").html("O");
            grid[0][0] = 'O';
            input_value = 'O';
            if (checkWin(2) == true) {
                winner = 2;
            }
            player = 1;
            make_call = true;
        }
        if (checkTie() == true) {
            winner = 0
        }
        if (make_call == true) {
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
    if (checkLegalMove(0, 1) == true) {
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
            make_call = true;

        } else if (player == 2) {
            $("#square_two_text").html("O");
            grid[0][1] = 'O';
            input_value = 'O';
            if (checkWin(2) == true) {
                winner = 2;
            }
            player = 1;
            make_call = true;
        }

        if (checkTie() == true) {
            winner = 0
        }
        if (make_call == true) {
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
    if (checkLegalMove(0, 2) == true) {
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
            make_call = true;

        } else if (player == 2) {
            $("#square_three_text").html("O");
            grid[0][2] = 'O';
            input_value = 'O';
            if (checkWin(2) == true) {
                winner = 2;
            }
            player = 1;
            make_call = true;
        }

        if (checkTie() == true) {
            winner = 0
        }
        if (make_call == true) {
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
    if (checkLegalMove(1, 0) == true) {
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
            make_call = true;

        } else if (player == 2) {
            $("#square_four_text").html("O");
            grid[1][0] = 'O';
            input_value = 'O';
            if (checkWin(2) == true) {
                winner = 2;
            }
            player = 1;
            make_call = true;
        }

        if (checkTie() == true) {
            winner = 0
        }
        if (make_call == true) {
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
    if (checkLegalMove(1, 1) == true) {
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
            make_call = true;

        } else if (player == 2) {
            $("#square_five_text").html("O");
            grid[1][1] = 'O';
            input_value = 'O';
            if (checkWin(2) == true) {
                winner = 2;
            }
            player = 1;
            make_call = true;
        }

        if (checkTie() == true) {
            winner = 0
        }
        if (make_call == true) {
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
    if (checkLegalMove(1, 2) == true) {
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
            make_call = true;

        } else if (player == 2) {
            $("#square_six_text").html("O");
            grid[1][2] = 'O';
            input_value = 'O';
            if (checkWin(2) == true) {
                winner = 2;
            }
            player = 1;
            make_call = true;
        }

        if (checkTie() == true) {
            winner = 0
        }
        if (make_call == true) {
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
    if (checkLegalMove(2, 0) == true) {
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
            make_call = true;

        } else if (player == 2) {
            $("#square_seven_text").html("O");
            grid[2][0] = 'O';
            input_value = 'O';
            if (checkWin(2) == true) {
                winner = 2;
            }
            player = 1;
            make_call = true;
        }

        if (checkTie() == true) {
            winner = 0
        }
        if (make_call == true) {
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
    if (checkLegalMove(2, 1) == true) {
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
            make_call = true;

        } else if (player == 2) {
            $("#square_eight_text").html("O");
            grid[2][1] = 'O';
            input_value = 'O';
            if (checkWin(2) == true) {
                winner = 2;
            }
            player = 1;
            make_call = true;
        }

        if (checkTie() == true) {
            winner = 0
        }
        if (make_call == true) {
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
    if (checkLegalMove(2, 2) == true) {
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
            make_call = true;

        } else if (player == 2) {
            $("#square_nine_text").html("O");
            grid[2][2] = 'O';
            input_value = 'O';
            if (checkWin(2) == true) {
                winner = 2;
            }
            player = 1;
            make_call = true;
        }

        if (checkTie() == true) {
            winner = 0
        }
        if (make_call == true) {
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
    if (winner != null){
        tieGame = false;
    }
    console.log("Is a Tie : " , tieGame)
    return tieGame
}

function checkLegalMove(row, column) {
    // return true;
    if (grid[row][column] !== undefined && grid[row][column] !== null) {
        return false;
    } else {
        return true;
    }
}

code = 0
function endgame(num) {
    code = num
    if (num == 0) {
        $(".modal_text").html("Tie game!");
        $("#myModal").css("display", "block");
        $("#restartBtn2").hide()
        $("#restartBtn1").show()
    }
    if (num == 1) {
        $(".modal_text").html("X Wins!");
        $("#myModal").css("display", "block");
        $("#restartBtn2").hide()
        $("#restartBtn1").show()
    }
    if (num == 2) {
        $(".modal_text").html("O Wins!");
        $("#myModal").css("display", "block");
        $("#restartBtn2").hide()
        $("#restartBtn1").show()
    }
    if (num == 400) {
        $(".modal_text").html("Sorry Game Not Available!");
        $("#myModal").css("display", "block");
        $("#restartBtn1").hide()
        $("#restartBtn2").show()
    }
    if (num == 500) {
        $(".modal_text").html("Other Player Quit the game!");
        $("#myModal").css("display", "block");
        $("#restartBtn1").hide()
        $("#restartBtn2").show()
    }
    if (num == 600) {
        $(".modal_text").html("Sorry the game is already full!");
        $("#myModal").css("display", "block");
        $("#restartBtn1").hide()
        $("#restartBtn2").show()
    }
    if (num == 700) {
        $(".modal_text").html("Sorry this game id already been played");
        $("#myModal").css("display", "block");
        $("#restartBtn1").hide()
        $("#restartBtn2").show()
    }
    if (num == 800) {
        $(".modal_text").html("Wait for opposition to accept");
        $("#myModal").css("display", "block");
        $("#restartBtn2").hide()
        $("#restartBtn1").show()
    }
    if (num == 900) {
        $(".modal_text").html("Opposition Joined ,click on play again to join");
        $("#myModal").css("display", "block");
        $("#restartBtn2").hide()
        $("#restartBtn1").show()
    }
    

}

function recreate_game(){
    websocket.send(JSON.stringify({
        type: 'create',
        game_id: document.getElementById('game_id').value,
        event: 'recreate'
    }));
}

function rejoin_game(){
    websocket.send(JSON.stringify({
        type: 'join',
        game_id: document.getElementById('game_id').value,
        player: 1,
        event:'rejoin'
    }));
}

$("#restartBtn1").click(function () {
    grid = new Array(3);
    grid[0] = new Array(3);
    grid[1] = new Array(3);
    grid[2] = new Array(3);
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
    console.log("restart_player ",player);
    game_id = document.getElementById('game_id').value
    if (player!= 1 && player!=2){
        recreate_game()
        document.getElementById("game_ico").innerHTML = 'YOUR SYMBOL : X';
    }else{
        rejoin_game()
        document.getElementById("game_ico").innerHTML = 'YOUR SYMBOL : O';
    }
});

$("#restartBtn2").click(function () {
    grid = new Array(3);
    grid[0] = new Array(3);
    grid[1] = new Array(3);
    grid[2] = new Array(3);
    gameWon = 0;
    player = undefined
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
});
