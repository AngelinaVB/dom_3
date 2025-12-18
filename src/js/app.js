import imageGoblin from "../img/goblin.png";

export default class Board {
  constructor() {
    this.board = null;
  }

  createBoard(number) {
    const board = document.createElement("div");
    board.classList.add("board");

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

export class Сharacter {
  constructor() {
    this.image = undefined;
  }

  createImage() {
    const image = document.createElement("img");
    image.src = imageGoblin;
    image.alt = "Изображение персонажа";
    document.querySelector("body").append(image);
    return (this.image = image);
  }
}

export class GamePlay {
  constructor(board, image) {
    this.board = board;
    this.boardSize = 4;
    this.image = image;
    this.activeImage = null;
    this.position = null;
    this.boardListeners = [];
  }

  init() {
    this.redrawBoard();

    this.board.addEventListener("click", this.onBoardClick.bind(this));

    this.start();
  }

  redrawBoard() {
    const board = this.board.getBoard(this.boardSize);
    const body = document.querySelector("body");
    const container = document.createElement("div");
    container.classList.add("container");
    this.counter = this.createGoblinCounter();
    container.append(this.counter);
    container.append(board);
    body.append(container, body.firstChild);
    this.cells = [...board.children];
  }

  generateposition() {
    let randomNumber;

    do {
      randomNumber = Math.floor(Math.random() * this.boardSize ** 2);
    } while (randomNumber === this.position);

    this.deletedImage();
    this.position = randomNumber;
    this.adventImage();

    return;
  }

  deletedImage() {
    if (this.activeImage === null) {
      return;
    }
    this.cells[this.position].firstChild.remove();
  }

  adventImage() {
    this.activeImage = this.image.createImage();
    this.cells[this.position].append(this.activeImage);
  }

  createGoblinCounter() {
    this.goblinCounter = document.createElement("div");
    this.goblinCounter.classList.add("status");
    return this.goblinCounter;
  }

  onBoardClick(event) {
    event.preventDefault();
    this.dead = document.querySelector(".dead");
    this.lost = document.querySelector(".lost");
    this.boardListeners.forEach((callback) => callback(event.target));

    if (event.target.classList.contains("img")) {
      ++this.dead.textContent;
      event.target.classList.remove("img");
    } else {
      ++this.lost.textContent;
    }

    if (this.dead.textContent > 5) {
      this.resetScore();
      alert("Победа!!");
    }

    if (this.lost.textContent = 5) {
      this.resetScore();
      alert("Поражение!");
    }

    this.changeCursor();
  }

  resetScore() {
    this.lost.textContent = 0;
    this.dead.textContent = 0;
  }

  changeCursor() {
    this.board.classList.toggle("hammer");
    this.board.classList.toggle("hammer-boom");
  }

  start() {
    setInterval(() => {
      this.generateposition();
    }, 1000);
  }
}


const board = new Board();
const image = new Сharacter();
const gameplay = new GamePlay(board, image);

gameplay.init();
