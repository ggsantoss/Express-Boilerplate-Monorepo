export class UpdateUserPartialDTO {
  constructor(
    public name?: string,
    public email?: string,
    public password?: string,
  ) {}
}
