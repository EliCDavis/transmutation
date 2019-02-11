using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using EliCDavis.Transmutation;

public class GameBehavior : MonoBehaviour
{

    [SerializeField]
    private Vector2 dimensions;

    [SerializeField]
    private string sentence;

    [SerializeField] Material material;

    void Start()
    {
        var config = Config.RandomConfig(sentence.ToUpper());
        var drawingTool = new LineRendererDrawingTool(new GameObject("Transmutation").transform, material);
        var transmtationCircle = new TransmutationCircle(config, drawingTool);
        transmtationCircle.Draw(10, 10);


        // var alphabet = new Alphabet();
        // for (int i = 0; i < displaySentence.Length; i++)
        // {
        //     alphabet.Glyph(displaySentence[i]).Draw(Vector2.right * (i * 5), Vector2.one, 0, drawingTool);
        // }

    }

}
