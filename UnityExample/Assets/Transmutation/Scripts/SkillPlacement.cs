using System.Collections.Generic;
using UnityEngine;

namespace EliCDavis.Transmutation
{
    public class SkillPlacement
    {

        private Vector2 placement;

        private float radius;

        public SkillPlacement(Vector2 placement, float radius)
        {
            this.placement = placement;
            this.radius = radius;
        }

        public Vector2 GetPlacement()
        {
            return placement;
        }

        public float GetRadius()
        {
            return radius;
        }

    }
}