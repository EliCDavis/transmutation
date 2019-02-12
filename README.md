# Transmutation Circle

Procedurally generate random transmutation circles from Fullmetal Alchemist. Implemented in both the web browser and an exmaple Unity Project. Read more about how it works [here](https://medium.com/@eli.davis1995/procedurally-generating-my-first-tattoo-9f81ed617089).

## Example Output

### Unity Version

![Example](https://i.imgur.com/4T9KhQ2.png)

The Unity version uses drawing interface that is passed to it to make the transmutation circle. I implemented it using something that will use the line renderer tool to draw it. If you want to create your own drawing tool you just have to implement 3 methods

```c#
public interface IDrawingTool
{
    void Line(Vector2 starting, Vector2 ending, float thickness);

    void Polygon(Vector2 center, float radius, int sides, float rotation, float thickness);

    void Circle(Vector2 center, float radius, float thickness);
}
```

### Typescript Canvas Version
![Example](https://i.imgur.com/whwAPQU.png)

## Inspiration

I want to procedurally generate a skill tree based on the number of powers and upgrades that exist for Scry's upcoming game Rapture. I thought I'd try my hand at building these circles to see how feasable such a thing would be.

Inspiration for rune generation pulled from [here](https://www.reddit.com/r/proceduralgeneration/comments/5wzo7j/monthly_challenge_16_march_2017_procedural_runes/).

## Dev

```bash
npm run dev
```

Open your web browser to localhost:3000, webpage refreshes on save
