/** Connect Four
 *
 * Player 1 and 2 alternate turns. On each turn, a piece is dropped down a
 * column until a player gets four-in-a-row (horiz, vert, or diag) or until
 * board fills (tie)
 */

const WIDTH = 7;
const HEIGHT = 6;

let currPlayer = 1; // active player: 1 or 2
const board = []; // array of rows, each row is array of cells  (board[y][x])

/** makeBoard: create in-JS board structure:
 *    board = array of rows, each row is array of cells  (board[y][x])
 */

function makeBoard() {
  // TODO: set "board" to empty HEIGHT x WIDTH matrix array
  for(let i = 0; i < HEIGHT; i++){
    board[i] = [];
    for(let j = 0; j < WIDTH; j++){
      board[i][j] = null;
    }
  }
  return board;
}

/** makeHtmlBoard: make HTML table and row of column tops. */

function makeHtmlBoard() {
  // TODO: get "htmlBoard" variable from the item in HTML w/ID of "board"
  const htmlBoard = document.querySelector("#board");
  // TODO: add comment for this code
  const top = document.createElement("tr"); //creating new table row
  top.setAttribute("id", "column-top"); //setting the id attribute to 'column-top'
  top.addEventListener("click", handleClick); //adding event listener to the tr to listen for a mouse click

  for (let x = 0; x < WIDTH; x++) {
    let headCell = document.createElement("td"); //creating td element
    headCell.setAttribute("id", x); //set table data attribute id to 'x'
    top.append(headCell); //append table data to trow
  }
  htmlBoard.append(top); //append table row to board

  // TODO: add comment for this code: populate gameboard
  for (let y = 0; y < HEIGHT; y++) {
    const row = document.createElement("tr"); //creating table row element
    for (var x = 0; x < WIDTH; x++) { 
      const cell = document.createElement("td"); //creating table data element
      const open = document.createElement("div");
      open.setAttribute("class", "opening");
      open.setAttribute("id", `${y}-${x}`);
      //cell.setAttribute("id", `${y}-${x}`); //giving td element an id attribute of "x"
      cell.append(open);
      row.append(cell); //append table data to table row 

    }
    htmlBoard.append(row); //append table row to board
  }
}

//vvvv this comment made little sense vvv
/** findSpotForCol: given column x, return top empty y (null if filled) */

function findSpotForCol(x) {
  // column(x how we move from left to right) stays the same as we loop through row (y how we move up and down) 
  // TODO: write the real version of this, rather than always returning 0
  for(let y = HEIGHT-1; y >= 0; y--){
    if (board[y][x] === null){
      return y;
    }
  }
  return null;
}

/** placeInTable: update DOM to place piece into HTML table of board */

function placeInTable(y, x) {
  // TODO: make a div and insert into correct table cell
  const newDiv = document.createElement("div")
  newDiv.classList.add('piece');
  newDiv.classList.add('p' + currPlayer);
  const getDiv = document.getElementById(`${y}-${x}`);
  console.log(getDiv);
  getDiv.append(newDiv);
}

/** endGame: announce game end */

function endGame(msg) {
  // TODO: pop up alert message
  return alert(msg);
}

/** handleClick: handle click of column top to play piece */

function handleClick(evt) {
  // get x from ID of clicked cell
  let x = +evt.target.id;

  // get next spot in column (if none, ignore click)
  let y = findSpotForCol(x);
  if (y === null) {
    return;
  }

  // place piece in board and add to HTML table
  // TODO: add line to update in-memory board
  placeInTable(y, x);
  board[y][x] = currPlayer;

  // check for win
  if (checkForWin(board)) {
    return endGame(`Player ${currPlayer} won!`);
  }

  // check for tie
  // TODO: check if all cells in board are filled; if so call, call endGame
  const checkForTie = () => {
     if(board.every( val => val === null )){
       endGame();
     }
  };

  // switch players
  // TODO: switch currPlayer 1 <-> 2
  currPlayer === 1 ? currPlayer = 2 : currPlayer = 1; 
  // console.log(currPlayer);

}

/** checkForWin: check board cell-by-cell for "does a win start here?" */

function checkForWin() {
  function _win(cells) {
    // Check four cells to see if they're all color of current player
    //  - cells: list of four (y, x) cells
    //  - returns true if all are legal coordinates & all match currPlayer

    return cells.every(
      ([y, x]) =>
        y >= 0 &&
        y < HEIGHT &&
        x >= 0 &&
        x < WIDTH &&
        board[y][x] === currPlayer
    );
  }

  // TODO: read and understand this code. Add comments to help you.
  //This determines how we determine if four vertical horizontal o diagonal slots are aligned in a row 
  for (var y = 0; y < HEIGHT; y++) {
    for (var x = 0; x < WIDTH; x++) {
      var horiz = [[y, x], [y, x + 1], [y, x + 2], [y, x + 3]];
      var vert = [[y, x], [y + 1, x], [y + 2, x], [y + 3, x]];
      var diagDR = [[y, x], [y + 1, x + 1], [y + 2, x + 2], [y + 3, x + 3]];
      var diagDL = [[y, x], [y + 1, x - 1], [y + 2, x - 2], [y + 3, x - 3]];

      if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {
        return true;
      }
    }
  }
}

makeBoard();
makeHtmlBoard();
