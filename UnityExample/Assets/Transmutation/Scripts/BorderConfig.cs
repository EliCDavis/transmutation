using UnityEngine;

namespace EliCDavis.Transmutation
{
    public class BorderConfig
    {
        private BorderType[] borders;

        public BorderConfig(params BorderType[] borders)
        {
            this.borders = borders;
        }

        public static BorderConfig RandomConfig()
        {  
            var numCircles = Random.Range(2, 5);
            BorderType[] borders = new BorderType[numCircles];
            for (int i = 0; i < numCircles; i++)
            {
                borders[i] = Random.value > .5f ? BorderType.Text : BorderType.Line; 
            }
            return new BorderConfig(borders);
        }

        public BorderType[] GetBorderTypes()
        {
            return borders;
        }

    }

}
