export class UserResponseDTO {
  constructor(
    public id: number,
    public name: string,
    public email: string,
    public createdAt: Date,
  ) {}
}
