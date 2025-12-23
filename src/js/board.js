export default class Board {
  constructor() {
    this.board = null;
  }

  createBoard(number) {
    const board = document.createElement("div");
    board.classList.add("board");

    board.classList.add("hammer");

    let i = 0;
    do {
      const cell = document.createElement("div");
      cell.classList.add("cell");
      board.append(cell);
      i++;
    } while (i < Math.floor(number) ** 2);
    this.board = board;
  }

  getBoard(number) {
    this.createBoard(number);
    return this.board;
  }
}
