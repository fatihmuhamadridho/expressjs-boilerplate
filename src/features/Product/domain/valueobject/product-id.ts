export class InvalidProductIdError extends Error {
  constructor() {
    super('Product id must be a positive integer');
    this.name = 'InvalidProductIdError';
  }
}

/** Product identifier value object; protects use cases from malformed route IDs. */
export class ProductId {
  private constructor(private readonly id: number) {}

  static create(value: string): ProductId {
    const id = Number(value);
    if (!Number.isSafeInteger(id) || id < 1) throw new InvalidProductIdError();
    return new ProductId(id);
  }

  value(): number {
    return this.id;
  }
  toString(): string {
    return String(this.id);
  }
}
