Connect Four Game
Overview
Connect Four is a two-player connection game in which the players first choose a color and then take turns dropping one colored disc from the top into a vertically suspended grid. The objective of the game is to connect four of one's own discs of the same color in a row, horizontally, vertically, or diagonally, before the opponent.

This implementation is written in JavaScript and utilizes HTML and CSS for the user interface.

Classes
Game Class
Constructor
new Game(p1, p2, height = 6, width = 7): Initializes a new Connect Four game with two players and optional board dimensions.
Methods
makeBoard(): Creates the in-JS board structure.
makeHtmlBoard(): Generates the HTML table and column tops for the game board.
findSpotForCol(x): Given a column index, returns the top empty row in that column.
placeInTable(y, x): Updates the DOM to place a piece into the HTML board.
endGame(msg): Announces the end of the game with a message and removes the click event listener.
handleClick(evt): Handles the click event on the column tops to play a piece.
checkForWin(): Checks the board for a winning combination.
