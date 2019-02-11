using System.Collections.Generic;
using UnityEngine;

namespace EliCDavis.Transmutation
{
    public class Glyph
    {
        private Stroke[] strokes;

        public Glyph()
        {
            do
            {
                strokes = GenerateStrokes();
            } while (ValidStrokes(strokes) == false);
        }

        public void Draw(Vector2 center, Vector2 dimensions, float rotation, IDrawingTool drawingTool)
        {
            foreach (var stroke in strokes)
            {
                stroke.Draw(center, dimensions, rotation, drawingTool);
            }
        }

        private bool ValidStrokes(Stroke[] strokes)
        {
            return strokes.Length > 4;
        }

        private Stroke[] GenerateStrokes()
        {
            var probabilities = new float[][]{
                new float[]{ 3/4, 2/3, 3/4 },
                new float[]{ 2/3, 3/4, 2/3 },
                new float[]{ 3/4, 2/3, 3/4 },
            };

            var chosenPoints = new List<Vector2>();

            for (int rowIndex = 0; rowIndex < probabilities.Length; rowIndex++)
            {
                for (int entryIndex = 0; entryIndex < probabilities[rowIndex].Length; entryIndex++)
                {
                    if (Random.value > probabilities[rowIndex][entryIndex])
                    {
                        chosenPoints.Add(new Vector2(
                            rowIndex + Random.Range(0, .2f),
                            entryIndex + Random.Range(0, .2f)));
                    }
                }
            }

            var pointsAdded = new List<int>();
            var strokes = new List<Stroke>();

            for (int pointIndex = 0; pointIndex < chosenPoints.Count; pointIndex++)
            {
                for (int otherIndex = pointIndex + 1; otherIndex < chosenPoints.Count; otherIndex++)
                {
                    float distance = Vector3.Distance(chosenPoints[pointIndex], chosenPoints[otherIndex]);
                    if (distance > 0.9f && Random.value > distance - .5f)
                    {
                        strokes.Add(new Stroke(
                            chosenPoints[pointIndex] * .5f,
                            chosenPoints[otherIndex] * .5f));

                        if (!pointsAdded.Contains(pointIndex))
                        {
                            pointsAdded.Add(pointIndex);
                        }
                        if (!pointsAdded.Contains(otherIndex))
                        {
                            pointsAdded.Add(otherIndex);
                        }
                    }
                }
            }

            // for (int pointIndex = 0; pointIndex < chosenPoints.Count; pointIndex++)
            // {
            //     if (!pointsAdded.Contains(pointIndex) && Random.value > 0.8)
            //     {
            //         strokes.Add(new Stroke(
            //                 chosenPoints[pointIndex] * .5f,
            //                 chosenPoints[pointIndex] * 0.55f));
            //         break;
            //     }
            // }

            return strokes.ToArray();
        }

    }

}