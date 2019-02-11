using UnityEngine;

namespace EliCDavis.Transmutation
{
    public class PolygonConfig
    {
        private int sides;

        private bool circles;

        private bool arcs;

        public PolygonConfig(int sides, bool circles, bool arcs)
        {
            this.sides = sides;
            this.circles = circles;
            this.arcs = arcs;
        }

        public static PolygonConfig RandomConfig()
        {
            return new PolygonConfig(
                Random.Range(3, 8),
                Random.value > .5,
                Random.value > .5
            );
        }

        public int Sides(){
            return sides;
        }

        public bool Circles(){
            return circles;
        }

        public bool Arcs(){
            return arcs;
        }
    }

}