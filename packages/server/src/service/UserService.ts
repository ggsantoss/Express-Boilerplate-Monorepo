import { LoginUserDTO } from '../dto/user/LoginUserDTO';
import { RegisterUserDTO } from '../dto/user/RegisterUserDTO';
import { UpdateUserDTO } from '../dto/user/UpdateUserDTO';
import { UpdateUserPartialDTO } from '../dto/user/UpdateUserPartialDTO';
import { UserResponseDTO } from '../dto/user/UserResponseDTO';
import { EmailAlreadyExistsException } from '../exception/EmailAlreadyExistsException';
import { InvalidPasswordException } from '../exception/InvalidPasswordException';
import { UserNotFoundException } from '../exception/UserNotFoundException';
import { UserRepository } from '../repository/UserRepository';
import { BcryptUtils } from '../utils/bcrypt';
import { JwtUtils } from '../utils/jwt';
import { Transformer } from '../utils/transformer';

export class UserService {
  private readonly userRepository = new UserRepository();

  /**
   * Register a new user.
   * @param user The user data to register.
   * @returns The registered user response.
   */
  public async register(data: RegisterUserDTO): Promise<UserResponseDTO> {
    const emailAlreadyExists = await this.userRepository.findByEmail(
      data.email,
    );
    if (emailAlreadyExists !== null) {
      throw new EmailAlreadyExistsException('Email already exists');
    }

    const hashedPassword = await BcryptUtils.hashPassword(data.password);

    const userCreated = await this.userRepository.create({
      name: data.name,
      email: data.email,
      password: hashedPassword,
    });

    return Transformer.toUserResponse(userCreated);
  }

  /**
   * Handle user login
   * @param user The login credentials
   * @returns A user response DTO or throws an error if login fails
   */
  public async login(
    data: LoginUserDTO,
  ): Promise<UserResponseDTO & { token: string }> {
    const foundUser = await this.userRepository.findByEmail(data.email);
    if (foundUser === null || foundUser === undefined) {
      throw new UserNotFoundException('User not found');
    }

    const passwordMatch = await BcryptUtils.comparePassword(
      data.password,
      foundUser.password,
    );
    if (!passwordMatch) {
      throw new InvalidPasswordException('Invalid password');
    }

    const token = JwtUtils.generateToken({
      userId: foundUser.id,
      email: foundUser.email,
      role: 'ADMIN',
    });

    const transformedUser = Transformer.toUserResponse(foundUser);

    return {
      ...transformedUser,
      token,
    };
  }

  /**
   * Find an user by the ID
   * @param id The id of the user
   * @returns The user
   */
  public async findById(id: number): Promise<UserResponseDTO> {
    const user = await this.userRepository.findById(id);
    if (user === null || user === undefined) {
      throw new UserNotFoundException('User not found');
    }

    return user;
  }

  /**
   * Retrieves a paginated list of users.
   *
   * @param limit - The maximum number of users to retrieve.
   * @param skip - The number of users to skip (used for pagination).
   * @returns A promise that resolves to an array of UserResponseDTOs.
   */
  public async findAll(
    limit: number,
    skip: number,
  ): Promise<UserResponseDTO[]> {
    return this.userRepository.findAll(limit, skip);
  }

  /**
   * Delete a user by id
   * @param id The id of the user
   * @returns Nothing
   */
  public async delete(id: number): Promise<void> {
    await this.userRepository.delete(id);
  }

  /**
   * Updates an user but you don't need to fill all fields
   * @param id Of the user to be updated
   * @param data Of the updated User
   * @returns The user Updated
   */
  public async updatePartial(
    id: number,
    data: UpdateUserPartialDTO,
  ): Promise<UserResponseDTO> {
    const user = await this.userRepository.findById(id);
    if (user === null || user === undefined) {
      throw new UserNotFoundException(`User with ID ${id} not found`);
    }

    if (data.email) {
      const emailAlreadyExists = await this.userRepository.findByEmail(
        data.email,
      );
      if (emailAlreadyExists !== null && emailAlreadyExists.id !== id) {
        throw new EmailAlreadyExistsException('Email already exists');
      }
    }

    const userUpdated = await this.userRepository.updatePartial(id, {
      name: data.name,
      email: data.email,
      password: data.password,
    });

    return Transformer.toUserResponse(userUpdated);
  }

  /**
   * Update user datas
   * @param id The id of the user to be updated
   * @param data To be updated
   * @returns The updated User
   */
  public async update(
    id: number,
    data: UpdateUserDTO,
  ): Promise<UserResponseDTO> {
    const user = await this.userRepository.findById(id);
    if (user === null || user === undefined) {
      throw new UserNotFoundException(`User with ID ${id} not found`);
    }

    const emailAlreadyExists = await this.userRepository.findByEmail(
      data.email,
    );
    if (emailAlreadyExists !== null) {
      throw new EmailAlreadyExistsException('Email already exists');
    }

    const userUpdated = await this.userRepository.update(id, {
      name: data.name,
      email: data.email,
      password: data.password,
    });

    return Transformer.toUserResponse(userUpdated);
  }
}
