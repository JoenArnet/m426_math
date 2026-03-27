export function gcdEuclid(a: number, b: number): number {
    a = Math.abs(a);
    b = Math.abs(b);
    if (a === 0) return b;
    if (b === 0) return a;
    if (a === b) return a;
    return a > b ? gcdEuclid(a - b, b) : gcdEuclid(a, b - a);
}

export class Fraction {
    public numerator: number;
    public denominator: number;

    constructor(numerator: number, denominator: number) {
        if (denominator === 0) {
            throw new Error("Nenner darf nicht 0 sein.");
        }
        
        this.numerator = numerator;
        this.denominator = denominator;

        this.cancel(); //Kürzen
    }

    cancel(): void {
        if (this.numerator === 0) {
            this.denominator = 1;
            return;
        }
        const commonDivisor = gcdEuclid(this.numerator, this.denominator);
        this.numerator = this.numerator / commonDivisor;
        this.denominator = this.denominator / commonDivisor;
    }
}