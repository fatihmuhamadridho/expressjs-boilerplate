import { InvalidInputError } from '../../../../pkg/errs/invalid-input.error';

export class InvalidProductIdError extends InvalidInputError {
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
    if (!/^[1-9]\d*$/.test(value) || !Number.isSafeInteger(id)) throw new InvalidProductIdError();
    return new ProductId(id);
  }

  value(): number {
    return this.id;
  }
  toString(): string {
    return String(this.id);
  }
}
