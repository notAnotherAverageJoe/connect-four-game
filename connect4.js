class Game {
   // Initialize game properties
  constructor(p1, p2, height = 6, width = 7) {
    this.players = [p1, p2];
    this.height = height;
    this.width = width;
    this.currPlayer = p1;
    // Create a 2D array to represent the game board
    this.board = Array.from({ length: height }, () => Array(width).fill(null));
    this.gameOver = false;
    this.makeHtmlBoard();
  }

  makeHtmlBoard() {
    const board = document.getElementById('board');
    
    board.innerHTML = '';

    const top = document.createElement('tr');
    top.setAttribute('id', 'column-top');
    top.addEventListener('click', (evt) => this.handleClick(evt));

    for (let x = 0; x < this.width; x++) {
      const headCell = document.createElement('td');
      headCell.setAttribute('id', x);
      top.append(headCell);
    }

    board.append(top);
 // Create the main part of the board with cells for each row and column
    for (let y = 0; y < this.height; y++) {
      const row = document.createElement('tr');
      for (let x = 0; x < this.width; x++) {
        const cell = document.createElement('td');
        cell.setAttribute('id', `${y}-${x}`);
        row.append(cell);
      }
      board.append(row);
    }
  }
 // Method to find the top empty row in a given column
  findSpotForCol(x) {
    for (let y = this.height - 1; y >= 0; y--) {
      if (!this.board[y][x]) {
        return y;
      }
    }
    return null;
  }
  // Method to place a piece in the HTML table and update the game board
  placeInTable(y, x) {
    const piece = document.createElement('div');
    piece.className = 'piece';
    piece.style.backgroundColor = this.currPlayer.color;
    piece.style.top = `${-50 * (y + 2)}px`;

    const spot = document.getElementById(`${y}-${x}`);
    spot.append(piece);
  }

  endGame(msg) {
    alert(msg);
    document.getElementById('column-top').removeEventListener('click', this.handleClick);
  }

  handleClick(evt) {
    const x = +evt.target.id;
    const y = this.findSpotForCol(x);
  // If the column is full, ignore the click
    if (y === null) {
      return;
    }

    this.board[y][x] = this.currPlayer;
    this.placeInTable(y, x);

    if (this.board.every(row => row.every(cell => cell))) {
      return this.endGame('Tie!');
    }

    if (this.checkForWin()) {
      this.gameOver = true;
      return this.endGame(`The ${this.currPlayer.color} player won!`);
    }

    this.currPlayer = this.players.find(player => player !== this.currPlayer);
  }

  checkForWin() {
    //Helper function to check if all cells in a given array match the current player
    const _win = cells =>
      cells.every(([y, x]) =>
        y >= 0 && y < this.height && x >= 0 && x < this.width && this.board[y][x] === this.currPlayer
      );

    for (let y = 0; y < this.height; y++) {
      for (let x = 0; x < this.width; x++) {
        // Define sets of cells for horizontal, vertical, and diagonal directions
        const horiz = [[y, x], [y, x + 1], [y, x + 2], [y, x + 3]];
        const vert = [[y, x], [y + 1, x], [y + 2, x], [y + 3, x]];
        const diagDR = [[y, x], [y + 1, x + 1], [y + 2, x + 2], [y + 3, x + 3]];
        const diagDL = [[y, x], [y + 1, x - 1], [y + 2, x - 2], [y + 3, x - 3]];

        if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {
          return true;
        }
      }
    }

    return false;
  }
}

class Player {
  constructor(color) {
    this.color = color;
  }
}

document.getElementById('start-game').addEventListener('click', () => {
  const p1 = new Player(document.getElementById('p1-color').value);
  const p2 = new Player(document.getElementById('p2-color').value);
  new Game(p1, p2);
});
