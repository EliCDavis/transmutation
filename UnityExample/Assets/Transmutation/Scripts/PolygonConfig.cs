using UnityEngine;

namespace EliCDavis.Transmutation
{
    public class PolygonConfig
    {
        private int sides;

        private bool circles;


        public PolygonConfig(int sides, bool circles)
        {
            this.sides = sides;
            this.circles = circles;
        }

        public static PolygonConfig RandomConfig()
        {
            return new PolygonConfig(
                Random.Range(3, 8),
                Random.value > .5
            );
        }

        public int Sides(){
            return sides;
        }

        public bool Circles(){
            return circles;
        }

    }

}