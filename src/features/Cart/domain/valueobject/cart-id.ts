export class InvalidCartIdError extends Error {
  constructor() {
    super('Cart id must be a positive integer');
    this.name = 'InvalidCartIdError';
  }
}
export class CartId {
  private constructor(private readonly id: number) {}
  static create(value: string): CartId {
    const id = Number(value);
    if (!Number.isSafeInteger(id) || id < 1) throw new InvalidCartIdError();
    return new CartId(id);
  }
  toString(): string {
    return String(this.id);
  }
}
