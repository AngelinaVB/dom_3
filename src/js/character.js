import imageGoblin from "../img/goblin.png";

export default class Сharacter {
  constructor() {
    this.image = undefined;
  }

  createImage() {
    const image = document.createElement("div");
    image.classList.add("img");
    image.src = imageGoblin;
    image.alt = "Изображение персонажа";
    document.querySelector("body").append(image);
    return (this.image = image);
  }
}
