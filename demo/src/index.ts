// https://www.deviantart.com/notshurly/art/Transmutation-Circle-Tutorial-158371530

import { Transmutation, Random, RandomConfig } from "../../src";

const sentenceToWrite =
  "My first name is a random set of numbers and letters \
And other alphanumerics that changes hourly forever \
My last name a thousand vowels fading down a sinkhole \
To a susurrus it couldnt just be John Doe or Bingo";

const random = new Random(Math.random() * 2147483647);

const canvas = document.getElementById("Transmutation") as HTMLCanvasElement;
const transmutation = new Transmutation(
  canvas,
  RandomConfig(sentenceToWrite, random)
);

const resizeWindow = () => {
  canvas.width = canvas.clientWidth;
  canvas.height = canvas.clientHeight;
  transmutation.Draw(canvas.width, canvas.height, new Date().getTime() / 10000);
  window.requestAnimationFrame(resizeWindow);
};

window.requestAnimationFrame(resizeWindow);
