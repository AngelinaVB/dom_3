export default class GamePlay {
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
    container.append(board);
    body.append(container, body.firstChild);
    this.cells = [...board.children];
    container.append(this.counter);
    this.counter = this.createGoblinCounter();
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

  resetScore() {
    this.lost.textContent = 0;
    this.dead.textContent = 0;
  }

  changeCursor() {
    this.board.classList.toggle("hammer");
    this.board.classList.toggle("hammer-boom");
  }

  createGoblinCounter() {
    this.goblinCounter = document.createElement("div");
    this.goblinCounter.classList.add("status");
    this.goblinCounter.innerHTML =
      'Убито гоблинов:<span class="dead">0</span><br>Промахов: <span class="lost">0</span><br>';
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

    if (this.dead.textContent >= 10) {
      this.resetScore();
    }

    if (this.lost.textContent <= 5) {
      this.resetScore();
    }

    this.changeCursor();
  }

  start() {
    setInterval(() => {
      this.generateposition();
    }, 1000);
  }
}
