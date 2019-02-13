using UnityEngine;

namespace EliCDavis.Transmutation
{
    public class Stroke
    {

        private Vector2 start;

        private Vector2 end;

        public Stroke(Vector2 start, Vector2 end)
        {
            this.start = start;
            this.end = end;
        }

        public void Draw(Vector2 center, Vector2 dimensions, float rotation, IDrawingTool drawingTool)
        {
            var halfOne = Vector2.one / 2.0f;
            var reAdjust = center - (dimensions * 0.5f);

            var startCentered = start - halfOne;
            var originalStartAngle = Mathf.Atan2(startCentered.y, startCentered.x);

            var scaledStart = new Vector2(
              startCentered.magnitude * Mathf.Cos(rotation + originalStartAngle),
              startCentered.magnitude * Mathf.Sin(rotation + originalStartAngle)
            ) + halfOne;

            scaledStart = new Vector2(
              scaledStart.x * dimensions.x,
              scaledStart.y * dimensions.y
            ) + reAdjust;

            var endCentered = this.end - halfOne;
            var originalEndAngle = Mathf.Atan2(endCentered.y, endCentered.x);

            var scaledEnd = new Vector2(
              endCentered.magnitude * Mathf.Cos(rotation + originalEndAngle),
              endCentered.magnitude * Mathf.Sin(rotation + originalEndAngle)
            ) + halfOne;

            scaledEnd = new Vector2(
              scaledEnd.x * dimensions.x,
              scaledEnd.y * dimensions.y
            ) + reAdjust;

            drawingTool.Line(scaledStart, scaledEnd, dimensions.magnitude);
        }

    }

}