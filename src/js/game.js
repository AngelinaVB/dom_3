export default class GamePlay {
  constructor(board, image) {
    this.board = board;
    this.boardSize = 4;
    this.image = image;
    this.activeImage = null;
    this.boardListeners = [];
  }

  init() {
    this.redrawBoard();

    this.board.addEventListener("click", this.onBoardClick.bind(this));

    this.start();
  }

  redrawBoard() {
    this.board = this.board.getBoard(this.boardSize);
    const body = document.querySelector("body");
    const container = document.createElement("div");
    container.classList.add("container");
    this.counter = this.createGoblinCounter();
    container.append(this.counter);
    container.append(this.board);
    body.append(container, body.firstChild);
    this.cells = [...this.board.children];
  }

  createGoblinCounter() {
    this.goblinCounter = document.createElement("div");
    this.goblinCounter.classList.add("status");
    this.goblinCounter.innerHTML =
      'Убито гоблинов: <span class = "dead">0</span><br>Промахов: <span class = "lost">0</span>';
    return this.goblinCounter;
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

  onBoardClick(e) {
    e.preventDefault();
    this.dead = document.querySelector(".dead");
    this.lost = document.querySelector(".lost");
    this.boardListeners.forEach((callback) => callback(e.target));

    if (e.target.classList.contains("image")) {
      ++this.dead.textContent;
      this.dead.innerHTML = this.dead.textContent;
      
    } else {
      ++this.lost.textContent;
      this.lost.innerHTML = this.lost.textContent;
      this.lose();
    }

    this.changeCursor();
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

  dialogSmow() {
    const dialog = document.querySelector("dialog");

    dialog.showModal();
    this.dialogClose();
  }

  dialogClose() {
    const close = document.querySelector(".close");
    close.addEventListener("click", () => {
 
    });
    this.resetScore();
  }

  lose() {
    if (this.lost.textContent == 5) {
      this.dialogSmow();
    }
  }

  resetScore() {
    this.dead.textContent = 0;
    this.lost.textContent = 0;
  }

  changeCursor() {
    this.board.classList.toggle("hammer");
    this.board.classList.toggle("hammer-boom");
  }

  start() {
    const intervalId = setInterval(() => {
      this.generateposition();
    }, 1000);
  }
/*   clearInterval(intervalId); */
}
