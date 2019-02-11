using UnityEngine;

namespace EliCDavis.Transmutation
{

    public class Config
    {

        private Alphabet alphabet;

        private string sentence;

        private BorderConfig borderConfig;

        private PolygonConfig[] polygonConfigs;

        private BorderConfig innerBorderConfig;

        private PolygonConfig innerPolygonConfig;

        private float textSize;

        public Config(
            Alphabet alphabet,
            string sentence,
            BorderConfig borderConfig,
            PolygonConfig[] polygonConfigs,
            BorderConfig innerBorderConfig,
            PolygonConfig innerPolygonConfig,
            float textSize
        )
        {
            this.alphabet = alphabet;
            this.sentence = sentence.ToUpper();
            this.borderConfig = borderConfig;
            this.polygonConfigs = polygonConfigs;
            this.innerBorderConfig = innerBorderConfig;
            this.innerPolygonConfig = innerPolygonConfig;
            this.textSize = textSize;
        }

        public static Config RandomConfig(string sentence)
        {
            var randomPolys = new PolygonConfig[Random.Range(1,3)];
            for (int i = 0; i < randomPolys.Length; i++)
            {
                randomPolys[i] = PolygonConfig.RandomConfig();
            }
            return new Config(
                new Alphabet(),
                sentence,
                BorderConfig.RandomConfig(),
                randomPolys,
                BorderConfig.RandomConfig(),
                null,
                .5f
            );
        }

        public Alphabet GetAlphabet()
        {
            return alphabet;
        }

        public string GetSentence()
        {
            return sentence;
        }

        public BorderConfig GetBorderConfig()
        {
            return borderConfig;
        }

        public PolygonConfig[] GetPolygonConfigs()
        {
            return polygonConfigs;
        }

        public BorderConfig GetInnerBorderConfig()
        {
            return innerBorderConfig;
        }

        public PolygonConfig GetInnerPolygonConfig()
        {
            return innerPolygonConfig;
        }

        public float GetTextSize()
        {
            return textSize;
        }
    }

}