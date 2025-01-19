const createPlayer = (name, marker) => {
    return {name, marker};
}

const gameBoard = (() => {
    let defaultMarker = " ";
    let board = [defaultMarker, defaultMarker, defaultMarker, 
                defaultMarker, defaultMarker, defaultMarker, 
                defaultMarker, defaultMarker, defaultMarker];

    const inputfield = document.getElementById("playerX");
    const inputfield2 = document.getElementById("playerO");

    let player1 = createPlayer(inputfield.value, "X");
    let player2 = createPlayer(inputfield2.value,"O");

    let turn = player1;

    const playboard = document.getElementById("board");
    playboard.addEventListener("click", (event) => {
        if (event.target.tagName === "BUTTON"){
            const position = event.target.id;
            gameBoard.gameController(turn.marker, position);
        }
    });

    const placeMarker = (marker,position) => {
        if (position >= 0 && position <= 8 && board[position] === defaultMarker) {
            
            board[position] = marker;
            const button= document.getElementById(position);
            button.textContent = marker;
            
            if (turn === player1){
                turn = player2;
            }else{
                turn = player1;
            }
            
            return true;
        } else{
            return false;
        }
    }

    //Checks if we can end the game. Wether we have a winner or if the board is full.
    const checkWin = (currentMarker) =>{
        let symbol;
        if ((board[0] === board[1] && board[0] === board[2] && board[0] === currentMarker) || 
        (board[3] === board[4] && board[3] === board[5] && board[3] === currentMarker) ||
        (board[6] === board[7] && board[6] === board[8] && board[6] === currentMarker) ||
        (board[0] === board[3] && board[0] === board[6] && board[0] === currentMarker) ||
        (board[1] === board[4] && board[1] === board[7] && board[1] === currentMarker) ||
        (board[2] === board[5] && board[2] === board[8] && board[2] === currentMarker) || 
        (board[0] === board[4] && board[0] === board[8] && board[0] === currentMarker) ||
        (board[2] === board[4] && board[2] === board[6] && board[2] === currentMarker)) {
            symbol = true;
        }else{
            symbol = false;
        }

        return symbol;
    }

    const checkTie = () => {
        let tie = true;
        for (let i = 0; i < board.length; i++){
            if (board[i] === " "){
                tie = false;
            }
        }
        return tie;
    }

    const resetBoard = () => {
        board = [defaultMarker, defaultMarker, defaultMarker, 
            defaultMarker, defaultMarker, defaultMarker, 
            defaultMarker, defaultMarker, defaultMarker];
        
        const buttons = document.getElementById('buttonContainer').querySelectorAll('button');
        buttons.forEach(button => {
            button.textContent = " ";
        });
    }

    const gameController = (turn, position) => {
        if (gameBoard.placeMarker(turn, position)){
            if (gameBoard.checkWin(turn)){
                something = document.getElementById("displayBoard").textContent = `Player ${turn} has won!`;
            }else{
                if (gameBoard.checkTie()){
                    something = document.getElementById("displayBoard").textContent = `It's a draw!`;
                }
            };
        }
    }

    return {placeMarker, checkWin, checkTie, resetBoard, defaultMarker, turn, gameController};

})();
