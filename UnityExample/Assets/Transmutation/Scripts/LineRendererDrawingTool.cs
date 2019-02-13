
using System.Collections;
using System.Collections.Generic;
using UnityEngine;

namespace EliCDavis.Transmutation
{

    public class LineRendererDrawingTool : IDrawingTool
    {

        private Transform parent;

        private Material lineMaterial;

        public LineRendererDrawingTool(Transform parent, Material lineMaterial)
        {
            this.parent = parent;
            this.lineMaterial = lineMaterial;
        }

        private LineRenderer NewLine(float thickness)
        {
            GameObject lineObject = new GameObject("Line");
            lineObject.transform.SetParent(parent);
            lineObject.transform.localPosition = Vector3.zero;

            var line = lineObject.AddComponent<LineRenderer>();
            line.useWorldSpace = false;
            line.material = lineMaterial;
            line.startWidth = 0.1f * thickness;
            line.endWidth = 0.1f * thickness;
            return line;
        }

        public void Line(Vector2 starting, Vector2 ending, float thickness)
        {
            var line = NewLine(thickness);

            line.positionCount = 2;
            line.SetPosition(0, new Vector3(starting.x, starting.y, 0));
            line.SetPosition(1, new Vector3(ending.x, ending.y, 0));

        }

        public void Polygon(Vector2 center, float radius, int sides, float rotation, float thickness)
        {
            var line = NewLine(thickness);

            line.positionCount = sides + 1;

            float angleIncrement = (Mathf.PI * 2) / sides;
            for (int i = 0; i <= sides; i++)
            {
                line.SetPosition(i, new Vector3(
                        center.x + (Mathf.Cos(rotation + angleIncrement * (i % sides)) * radius),
                        center.y + (Mathf.Sin(rotation + angleIncrement * (i % sides)) * radius),
                        0
                    )
                );
            }

        }

        public void Circle(Vector2 center, float radius, float thickness)
        {
            Polygon(center, radius, 40, 0, thickness);
        }

    }
}