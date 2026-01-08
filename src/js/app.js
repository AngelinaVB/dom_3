import Board from "./board.js";
import Сharacter from "./character.js";
import GamePlay from "./game.js";

const board = new Board();
const image = new Сharacter();
const gameplay = new GamePlay(board, image);

gameplay.init();
