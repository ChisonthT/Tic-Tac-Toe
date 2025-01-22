const createPlayer = (name, marker) => {
    return {name, marker};
}

const gameBoard = (() => {
    let defaultMarker = " ";
    let board = [defaultMarker, defaultMarker, defaultMarker, 
                defaultMarker, defaultMarker, defaultMarker, 
                defaultMarker, defaultMarker, defaultMarker];

    let player1 = createPlayer("playerX", "X");
    let player2 = createPlayer("playerO","O");

    let turn = player1;

    function handleClick(event){
        if (event.target.tagName === "BUTTON"){
            const position = event.target.id;
            gameBoard.gameController(turn.marker, position);
        }
    }

    const playboard = document.getElementById("board");
    playboard.addEventListener("click", handleClick);

    //Resets the board
    const resetBoard = () => {
        board = [defaultMarker, defaultMarker, defaultMarker, 
            defaultMarker, defaultMarker, defaultMarker, 
            defaultMarker, defaultMarker, defaultMarker];
        
        const buttons = document.getElementById('board').querySelectorAll('button');
        buttons.forEach((button) => {
            button.textContent = " ";
        });
        
        turn = player1;

        playboard.addEventListener("click", handleClick);
        document.getElementById("displayBoard").textContent = `It's Player ${player1.marker}'s turn`;
    }


    const boardReset = document.getElementById("reset");
    boardReset.addEventListener("click", resetBoard);

    //Places a marker on the board.
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

    //Checks if a player has won.
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

    //Checks if the game is a draw
    const checkTie = () => {
        let tie = true;
        for (let i = 0; i < board.length; i++){
            if (board[i] === " "){
                tie = false;
            }
        }
        return tie;
    }

    //Controls the order of the game.
    const gameController = (turn, position) => {
        if (gameBoard.placeMarker(turn, position)){
            if (gameBoard.checkWin(turn)){
                something = document.getElementById("displayBoard")
                .textContent = `Player ${turn} has won!`;
                const bing = document.getElementById("board");
                bing.removeEventListener("click", handleClick, false);

            }else{
                if (gameBoard.checkTie()){
                    something = document.getElementById("displayBoard").textContent = `It's a draw!`;
                    const bing = document.getElementById("board");
                    bing.removeEventListener("click", handleClick, false);
                }else {
                    if (turn === player1.marker){
                        document.getElementById("displayBoard").textContent = `It's Player ${player2.marker}'s turn`;
                    }else{
                        document.getElementById("displayBoard").textContent = `It's Player ${player1.marker}'s turn`;
                    }
                }
            }

        }
    }

    return {placeMarker, checkWin, checkTie, resetBoard, defaultMarker, turn, gameController};

})();
