import { assertEquals, assertAlmostEquals } from "@std/assert";
import { Circle, Point2D, Rectangle } from "./geometry.ts";

// Vorhandener Test
Deno.test("circumference of a circle with radius 5 is roughtly 31.416", () => {
  const circle = new Circle(new Point2D(3, 4), 5);
  assertAlmostEquals(circle.circumference(), 31.416, 0.01);
});

// Aufgabe 5 & 6: Tests für Hilfsmethoden
Deno.test("Circle points and point inclusion", () => {
  const m = new Point2D(5, 5);
  const circle = new Circle(m, 5);
  
  const n = circle.north(); // (5, 10)
  const s = circle.south(); // (5, 0)
  const e = circle.east();  // (10, 5)
  const w = circle.west();  // (0, 5)

  assertEquals(n.y, 10);
  assertEquals(s.y, 0);
  
  // M liegt zwischen W und E auf X-Achse
  assertEquals(m.isBetweenX(w, e), true);
  // M liegt zwischen N und S auf Y-Achse
  assertEquals(m.isBetweenY(s, n), true);
  
  // Negativtest
  const farAway = new Point2D(20, 20);
  assertEquals(farAway.isBetweenX(w, e), false);
});

// Aufgabe 7: Rechteck umschließt Kreis
Deno.test("Rectangle encompasses Circle", () => {
  const rect = new Rectangle(new Point2D(0, 0), new Point2D(10, 10));
  
  const smallCircle = new Circle(new Point2D(5, 5), 2);
  const largeCircle = new Circle(new Point2D(5, 5), 6); // ragt über Rand (N ist bei 11)

  assertEquals(rect.encompasses(smallCircle), true, "Sollte kleinen Kreis umschließen");
  assertEquals(rect.encompasses(largeCircle), false, "Sollte zu großen Kreis nicht umschließen");
});

// Aufgabe 8: Kreis umschließt Rechteck
Deno.test("Circle encompasses Rectangle", () => {
  const circle = new Circle(new Point2D(5, 5), 10);
  
  const smallRect = new Rectangle(new Point2D(4, 4), new Point2D(6, 6));
  const largeRect = new Rectangle(new Point2D(-10, -10), new Point2D(20, 20));

  assertEquals(circle.encompasses(smallRect), true, "Kreis sollte kleines Rechteck umschließen");
  assertEquals(circle.encompasses(largeRect), false, "Kreis sollte riesiges Rechteck nicht umschließen");
});