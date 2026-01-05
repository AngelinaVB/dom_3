import imageGoblin from "../img/goblin.png";

export default class Сharacter {
  constructor() {
    this.image = undefined;
  }

  createImage() {
    const image = document.createElement("img");
    image.src = imageGoblin;
    image.alt = "Изображение персонажа";
    document.querySelector("body").append(image);
    this.image = image;
    return this.image;
  }
}
