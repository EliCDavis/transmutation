export { Alphabet };

import { Random } from "./random";
import { Glyph } from ".";

const numberOfLettersInAlphabet = 26;

class Alphabet {
  glyphs: any;

  constructor(private random: Random) {
    // let letters = new Array<Glyph>(numberOfLettersInAlphabet);
    this.glyphs = {};
    for (
      let currentLetter = 0;
      currentLetter < numberOfLettersInAlphabet;
      currentLetter++
    ) {
      this.glyphs[String.fromCharCode(65 + currentLetter)] = new Glyph(random);
    }
  }

  /**
   * Glyph
   */
  public Glyph(letter: string): Glyph {
    if (letter.toUpperCase() in this.glyphs) {
      return this.glyphs[letter.toUpperCase()];
    }
    return null;
  }
}
