
const gameBoard = (() => {
    let defaultMarker = " ";
    let board = [defaultMarker, defaultMarker, defaultMarker, 
                defaultMarker, defaultMarker, defaultMarker, 
                defaultMarker, defaultMarker, defaultMarker];

    const getBoard = () => {
        let formated = board[0] +"|"+ board[1] +"|"+ board[2] + "\n" 
                    + board[3] +"|"+ board[4] +"|"+ board[5] + "\n" 
                    + board[6] +"|"+ board[7] +"|"+ board[8];
        return formated;
    };

    const placeMarker = (marker,position) => {
        if ((marker === "X" || marker === "O") && position >= 0 && position <= 8 && board[position] === defaultMarker) {
            board[position] = marker;
            return true;
        } else{
            return false;
        }
    }


    const checkWin = () =>{
        let symbol;

        if (board[0] === board[1] && board[0] === board[2] && board[0] !== defaultMarker){
            symbol = board[0];
        }else if (board[3] === board[4] && board[3] === board[5] && board[3] !== defaultMarker){
            symbol = board[3];
        }else if (board[6] === board[7] && board[6] === board[8] && board[6] !== defaultMarker){
            symbol = board[6];
        }else if (board[0] === board[3] && board[0] === board[6] && board[0] !== defaultMarker){
            symbol = board[0];
        }else if (board[1] === board[4] && board[1] === board[7] && board[1] !== defaultMarker){
            symbol = board[1];
        }else if (board[2] === board[5] && board[2] === board[8] && board[2] !== defaultMarker){
            symbol = board[2];
        }else if (board[0] === board[4] && board[0] === board[8] && board[0] !== defaultMarker){
            symbol = board[0];
        } else if (board[2] === board[4] && board[2] === board[6] && board[2] !== defaultMarker) {
            symbol = board[2];
        }else{
            symbol = defaultMarker;
        }

        return symbol;
    }

    const resetBoard = () => {
        board = [defaultMarker, defaultMarker, defaultMarker, 
            defaultMarker, defaultMarker, defaultMarker, 
            defaultMarker, defaultMarker, defaultMarker];
    }

    return {getBoard, placeMarker, checkWin, resetBoard, defaultMarker};
})();

function createPlayer (name, marker){
     return {name, marker};
};

const gameController = (() => {
    let player1 = createPlayer("Cheeze", "X");
    let player2 = createPlayer("Crackers", "O");

    let winCondition = "";
    while (winCondition === ""){
        console.log(gameBoard.getBoard());
        let input = prompt("Where do you wanna put the X marker? ");
        let result = gameBoard.placeMarker(player1.marker, input);
        if (gameBoard.checkWin() != gameBoard.defaultMarker){
            winCondition = gameBoard.checkWin();
            break;
        }
        console.log(gameBoard.getBoard());

        let input2 = prompt("Where do you wanna put the O marker? ");
        let result2 =gameBoard.placeMarker(player2.marker, input2);
        if (gameBoard.checkWin() != gameBoard.defaultMarker){
            winCondition = gameBoard.checkWin();
            break;
        }
    }
    
    console.log(gameBoard.getBoard());

    if (winCondition === player1.marker){
        console.log(player1.name + " is the winner!");
    }else if (winCondition === player2.marker){
        console.log(player2.name + " is the winner!");
    }else{
        console.log("It's a draw!");
    }
})

const displayController = (() => {

})();


gameController();