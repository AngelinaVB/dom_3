import Board from "./board";
import GamePlay from "./game";
import Сharacter from "./character";

const board = new Board();
const image = new Сharacter();
const gameplay = new GamePlay(board, image);

gameplay.init();
