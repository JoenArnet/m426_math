import { assertEquals } from "@std/assert";
import { gcdEuclid, Fraction } from "./gcd.ts";

const gcdTests = [
    { a: 1, b: 1, expected: 1 },
    { a: 1, b: 2, expected: 1 },
    { a: 2, b: 2, expected: 2 },
    { a: 3, b: 4, expected: 1 },
    { a: 6, b: 9, expected: 3 },
    { a: 81, b: 36, expected: 9 },
   ];

Deno.test("gcdEuclid - Table Driven Tests", () => {
    for (const { a, b, expected } of gcdTests) {
        const actual = gcdEuclid(a, b);
        assertEquals(actual, expected, `Fehler bei ggT(${a}, ${b})`);
    }
});

Deno.test("Fraction.cancel mit Euklid", () => {
    const frac = new Fraction(81, 36);
    frac.cancel(); 
    assertEquals(frac.numerator, 9);
    assertEquals(frac.denominator, 4);
});

Deno.test("Fraction.cancel - Trivialer Fall", () => {
    const frac = new Fraction(1, 1);
    frac.cancel();
    assertEquals(frac.numerator, 1);
    assertEquals(frac.denominator, 1);
});

Deno.test("Fraction: Automatische Kürzung im Konstruktor (2/4 -> 1/2)", () => {
    const frac = new Fraction(2, 4);
    assertEquals(frac.numerator, 1);
    assertEquals(frac.denominator, 2);
});

Deno.test("Fraction: Automatische Kürzung bei negativen Vorzeichen (-4/8 -> -1/2)", () => {
    const frac = new Fraction(-4, 8);
    assertEquals(frac.numerator, -1);
    assertEquals(frac.denominator, 2);
});