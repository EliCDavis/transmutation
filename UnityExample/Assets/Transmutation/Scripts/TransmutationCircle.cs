using System.Collections.Generic;
using UnityEngine;

namespace EliCDavis.Transmutation
{
    public class TransmutationCircle
    {

        private int characterOn;

        private Config config;

        private IDrawingTool drawingTool;

        private List<SkillPlacement> symbolPositions;

        public TransmutationCircle(Config config, IDrawingTool drawingTool)
        {
            this.config = config;
            this.drawingTool = drawingTool;
            this.characterOn = 0;
        }

        public SkillPlacement[] Draw(float x, float y)
        {
            return Draw(new Vector2(x, y));
        }

        public SkillPlacement[] Draw(Vector2 dimensions)
        {
            var middleCords = dimensions / 2;

            float maxRadius = Mathf.Min(dimensions.x, dimensions.y);

            symbolPositions = new List<SkillPlacement>();

            if (config.GetBorderConfig() != null)
            {
                maxRadius = DrawBorder(maxRadius, middleCords, config.GetBorderConfig());
            }

            if (config.GetPolygonConfigs() != null)
            {
                foreach (var polyConfig in config.GetPolygonConfigs())
                {
                    maxRadius = DrawMiddle(maxRadius, middleCords, polyConfig);
                }
            }

            if (config.GetInnerBorderConfig() != null)
            {
                maxRadius = DrawBorder(maxRadius, middleCords, config.GetInnerBorderConfig());
            }

            if (config.GetInnerPolygonConfig() != null)
            {
                maxRadius = DrawMiddle(maxRadius, middleCords, config.GetInnerPolygonConfig());
            }

            symbolPositions.Add(new SkillPlacement(middleCords, maxRadius));

            return symbolPositions.ToArray();
        }

        private void NextSymbol(Vector3 pos, float size, float angle)
        {
            var g = config
                .GetAlphabet()
                .Glyph(config.GetSentence()[characterOn % config.GetSentence().Length]);

            if (g != null)
            {
                g.Draw(pos, Vector2.one * size, angle, drawingTool);
            }

            characterOn += 1;
        }

        private void CircleText(Vector2 pos, float radius, float fontSize)
        {
            int numLetters = (int)(((radius * Mathf.PI * 2) / fontSize) * 0.4);
            float angle = (Mathf.PI * 2) / numLetters;
            for (int i = 0; i < numLetters; i++)
            {
                float curAngle = angle * i;
                NextSymbol(
                    new Vector2(
                        Mathf.Cos(curAngle) * radius,
                        Mathf.Sin(curAngle) * radius
                    ) + pos,
                    fontSize,
                    curAngle
                );
            }
        }

        private float DrawBorder(float maxRadius, Vector2 middleCords, BorderConfig borderConfig)
        {
            float remainingRadius = 1f;

            foreach (var type in borderConfig.GetBorderTypes())
            {
                switch (type)
                {
                    case BorderType.Line:
                        drawingTool.Circle(middleCords, maxRadius * remainingRadius, 1f);
                        break;

                    case BorderType.Text:
                        CircleText(middleCords, maxRadius * remainingRadius, ((maxRadius * remainingRadius) / 20.0f) * config.GetTextSize());
                        break;
                }

                remainingRadius -= 0.05f;
            }

            return remainingRadius * maxRadius;
        }

        private void PolyVertexIntersections(Vector2 position, float radius, int sides, float rotation)
        {
            float angleIncrement = (Mathf.PI * 2) / sides;
            for (int vertex = 0; vertex < sides; vertex++)
            {
                drawingTool.Line(
                    position,
                    new Vector2(
                        Mathf.Cos(rotation + angleIncrement * vertex) * radius,
                        Mathf.Sin(rotation + angleIncrement * vertex) * radius
                    ) + position,
                    1
                );
            }
        }

        private void PolyMidpointCircles(Vector2 position, float radius, int sides, float rotation, float circleRadius)
        {
            float angleIncrement = (Mathf.PI * 2) / sides;
            for (int vertex = 0; vertex < sides; vertex++)
            {
                float angle = rotation + angleIncrement * vertex;
                Vector3 adjustedPosition = (new Vector2(Mathf.Cos(angle), Mathf.Sin(angle)) * radius) + position;
                drawingTool.Circle(adjustedPosition, circleRadius, 1);
                symbolPositions.Add(new SkillPlacement(adjustedPosition, circleRadius));
            }
        }

        private float DrawMiddle(float maxRadius, Vector2 middleCords, PolygonConfig polyConfig)
        {
            float apothem = maxRadius * Mathf.Cos(Mathf.PI / polyConfig.Sides());

            drawingTool.Polygon(middleCords, maxRadius, polyConfig.Sides() * 2, Mathf.PI / 2, 1);
            drawingTool.Polygon(middleCords, maxRadius, polyConfig.Sides(), Mathf.PI / 2, 1);
            PolyVertexIntersections(middleCords, maxRadius, polyConfig.Sides() * 2, (Mathf.PI / 2 + Mathf.PI / polyConfig.Sides()));

            float midpointCircleRadius = maxRadius / 8.0f;

            if (polyConfig.Circles())
            {
                PolyMidpointCircles(
                  middleCords,
                  apothem,
                  polyConfig.Sides(),
                  (Mathf.PI / 2 + Mathf.PI / polyConfig.Sides()),
                  midpointCircleRadius
                );
            }

            return (apothem - midpointCircleRadius) * 0.99f;
        }

    }
}