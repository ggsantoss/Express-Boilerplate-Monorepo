export class UpdateUserDTO {
  constructor(
    public name: string,
    public email: string,
    public password: string,
  ) {}
}
