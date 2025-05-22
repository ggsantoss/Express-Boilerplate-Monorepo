export class RegisterUserDTO {
  constructor(
    public name: string,
    public email: string,
    public password: string,
  ) {}
}
