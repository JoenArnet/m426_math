export interface Shape {
  circumference(): number;
  area(): number;
  encompasses(other: Shape): boolean;
}

export class Point2D {
  constructor(
    public x: number,
    public y: number,
  ) {}

  distanceTo(other: Point2D): number {
    return Math.sqrt(
      Math.abs(this.x - other.x) ** 2 + Math.abs(this.y - other.y) ** 2,
    );
  }

  // Aufgabe 6: Hilfsmethoden für Punkteinschluss herausfinden
  isBetweenX(p: Point2D, q: Point2D): boolean {
    const min = Math.min(p.x, q.x);
    const max = Math.max(p.x, q.x);
    return this.x > min && this.x < max;
  }

  isBetweenY(p: Point2D, q: Point2D): boolean {
    const min = Math.min(p.y, q.y);
    const max = Math.max(p.y, q.y);
    return this.y > min && this.y < max;
  }
}

export class Circle implements Shape {
  constructor(
    public center: Point2D,
    public radius: number,
  ) {}

  circumference(): number {
    return 2 * Math.PI * this.radius;
  }

  area(): number {
    return Math.PI * this.radius ** 2;
  }

  // Aufgabe 5: Hilfsmethoden für Kreispunkte herausfinden
  north(): Point2D { return new Point2D(this.center.x, this.center.y + this.radius); }
  east(): Point2D { return new Point2D(this.center.x + this.radius, this.center.y); }
  south(): Point2D { return new Point2D(this.center.x, this.center.y - this.radius); }
  west(): Point2D { return new Point2D(this.center.x - this.radius, this.center.y); }

  // Aufgabe 8: Kreis beinhaltet Rechteck
  encompasses(other: Shape): boolean {
    if (other instanceof Rectangle) {
      // Alle Eckpunkte des Rechtecks müssen im Radius des Kreises liegen
      const corners = [
        other.bottomLeft,
        other.topRight,
        new Point2D(other.bottomLeft.x, other.topRight.y),
        new Point2D(other.topRight.x, other.bottomLeft.y)
      ];
      return corners.every(p => this.center.distanceTo(p) <= this.radius);
    }
    return false;
  }

  diameter(): number {
    return 2 * this.radius;
  }
}

export class Rectangle implements Shape {
  constructor(
    public bottomLeft: Point2D,
    public topRight: Point2D,
  ) {}

  circumference(): number {
    return 2 * (this.width() + this.height());
  }

  area(): number {
    return this.width() * this.height();
  }

  // Aufgabe 7: Rechteck beinhaltet Kreis
  encompasses(other: Shape): boolean {
    if (other instanceof Circle) {
      const pointsToCheck = [
        other.center,
        other.north(),
        other.east(),
        other.south(),
        other.west()
      ];
      
      // Ein Punkt liegt im Rechteck, wenn sein X zwischen Ax/Cx (vom Rechteck) und sein Y zwischen Ay/Cy liegt
      return pointsToCheck.every(p => 
        p.isBetweenX(this.bottomLeft, this.topRight) && 
        p.isBetweenY(this.bottomLeft, this.topRight)
      );
    }
    return false;
  }

  public width(): number {
    return this.topRight.x - this.bottomLeft.x;
  }

  public height(): number {
    return this.topRight.y - this.bottomLeft.y;
  }
}