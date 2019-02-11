using UnityEngine;

namespace EliCDavis.Transmutation
{

    public interface IDrawingTool
    {
        void Line(Vector2 starting, Vector2 ending, float thickness);

        void Polygon(Vector2 center, float radius, int sides, float rotation, float thickness);

        void Circle(Vector2 center, float radius, float thickness);

    }

}