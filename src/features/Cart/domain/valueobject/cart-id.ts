import { InvalidInputError } from '../../../../pkg/errs/invalid-input.error';

export class InvalidCartIdError extends InvalidInputError {
  constructor() {
    super('Cart id must be a positive integer');
    this.name = 'InvalidCartIdError';
  }
}
export class CartId {
  private constructor(private readonly id: number) {}
  static create(value: string): CartId {
    const id = Number(value);
    if (!/^[1-9]\d*$/.test(value) || !Number.isSafeInteger(id)) throw new InvalidCartIdError();
    return new CartId(id);
  }
  value(): number {
    return this.id;
  }

  toString(): string {
    return String(this.id);
  }
}
