using UnityEngine;
using System.Collections.Generic;

namespace EliCDavis.Transmutation
{
    public class Alphabet
    {
        private const int numberOfLettersInAlphabet = 26;

        Dictionary<char, Glyph> glyphs;

        public Alphabet()
        {
            glyphs = new Dictionary<char, Glyph>();
            for (int i = 0; i < numberOfLettersInAlphabet; i++)
            {
                this.glyphs[(char)(65 + i)] = new Glyph();
            }
        }

        public Glyph Glyph(char letter)
        {
            if (glyphs.ContainsKey(letter))
            {
                return glyphs[letter];
            }
            return null;
        }

    }

}