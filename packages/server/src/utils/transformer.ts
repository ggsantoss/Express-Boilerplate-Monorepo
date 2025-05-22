import { User } from '@prisma/client';
import { UserResponseDTO } from '../dto/user/UserResponseDTO';

/**
 * Class resposable to transform data into UserResponseDTO.
 */
export class Transformer {
  /**
   * Static method to transform User into UserResponseDTO.
   * @param user The user to be transformed.
   * @returns UserResponseDTO.
   */
  public static toUserResponse(user: User): UserResponseDTO {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      createdAt: user.createdAt,
    };
  }
}
