export class ResourceGatewayError extends Error {
  constructor(
    message: string,
    readonly kind: 'timeout' | 'unavailable',
    options?: ErrorOptions
  ) {
    super(message, options);
    this.name = 'ResourceGatewayError';
  }
}
