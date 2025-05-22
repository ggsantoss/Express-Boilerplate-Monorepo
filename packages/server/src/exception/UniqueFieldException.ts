export class UniqueFieldException extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'UniqueFieldException';
  }
}
