// https://www.deviantart.com/notshurly/art/Transmutation-Circle-Tutorial-158371530

import { Transmutation, Glyph, Alphabet, Random } from "../../src";
import { Vector } from "../../src/vector";

const sentenceToWrite =
  "My first name is a random set of numbers and letters \
And other alphanumerics that changes hourly forever \
My last name a thousand vowels fading down a sinkhole \
To a susurrus it couldnt just be John Doe or Bingo";

const canvas = document.getElementById("Transmutation") as HTMLCanvasElement;
const transmutation = new Transmutation(
  canvas,
  Math.random() * 2147483647,
  sentenceToWrite
); //
const alphabet = new Alphabet(new Random(666));

const resizeWindow = () => {
  canvas.width = canvas.clientWidth;
  canvas.height = canvas.clientHeight;

  transmutation.Draw(canvas.width, canvas.height);

  // for (var i = 0; i < sentenceToWrite.length; i++) {
  //   let letter = alphabet.Glyph(sentenceToWrite.charAt(i));

  //   if (letter !== null) {
  //     letter.Draw(
  //       canvas.getContext("2d"),
  //       new Vector(30 + ((i * 30) % 300), 30 + 30 * Math.floor((i * 30) / 300)),
  //       Vector.one().scale(20),
  //       0,
  //       "black"
  //     );
  //   }
  // }

  // for (let i = 0; i < 26; i++) {

  //   alphabet
  //     .Glyph(String.fromCharCode(65 + i))
  //     .Draw(
  //       canvas.getContext("2d"),
  //       new Vector(10 + i * 30, i * 30),
  //       Vector.one().scale(20),
  //       0,
  //       "black"
  //     );
  // }
};
resizeWindow();
window.addEventListener("resize", () => resizeWindow());
