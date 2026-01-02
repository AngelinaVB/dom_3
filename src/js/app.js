import Board from "./board";
import Сharacter from "./character";
import GamePlay from "./game";

const board = new Board();
const image = new Сharacter();
const gameplay = new GamePlay(board, image);

gameplay.init();
