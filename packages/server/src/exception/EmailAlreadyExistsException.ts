export class EmailAlreadyExistsException extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'EmailAlreadyExistsException';
  }
}
