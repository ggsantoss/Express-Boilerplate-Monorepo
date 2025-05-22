import { Prisma, User } from '@prisma/client';
import { prisma } from '../db/prisma';

export class UserRepository {
  /**
   * Creates a new user in the database.
   * @param data The data required to create a user.
   * @returns The created user.
   */
  public async create(data: Prisma.UserCreateInput): Promise<User> {
    const user = await prisma.user.create({ data });
    return user;
  }

  /**
   * Deletes a user from the database.
   * @param id The ID used to identify the user.
   */
  public async delete(id: number): Promise<void> {
    await prisma.user.delete({ where: { id } });
  }

  /**
   * Finds a user in the database by their ID.
   * @param id The ID used to find the user.
   * @returns The user if found, or null otherwise.
   */
  public async findById(id: number): Promise<User | null> {
    const user = await prisma.user.findFirst({ where: { id } });
    return user;
  }

  /**
   * Retrieves a list of users from the database.
   * @param limit The maximum number of users to retrieve.
   * @param skip The number of users to skip (for pagination).
   * @returns An array of users.
   */
  public async findAll(limit: number, skip: number): Promise<User[]> {
    return await prisma.user.findMany({ take: limit, skip });
  }

  /**
   * Finds an user in the database by email.
   * @param Email of the user.
   * @returns The user if found, or null otherwise.
   */
  public async findByEmail(email: string): Promise<User> {
    return await prisma.user.findFirst({ where: { email } });
  }

  /**
   * Updates an user partialment
   * @param id Of the user to be updated
   * @param data Of the new updated user
   * @returns The user updated
   */
  public async updatePartial(
    id: number,
    data: Prisma.UserUpdateArgs['data'],
  ): Promise<User> {
    if (Object.keys(data).length === 0) {
      throw new Error('At least one field must be provided to update');
    }

    const user = await prisma.user.update({
      where: { id },
      data,
    });
    return user;
  }
  /**
   * Updates an existing user in the database.
   * @param id The ID of the user to update.
   * @param data The fields to update on the user.
   * @returns The updated user.
   */
  public async update(
    id: number,
    data: Prisma.UserUpdateArgs['data'],
  ): Promise<User> {
    const user = await prisma.user.update({
      where: { id },
      data,
    });
    return user;
  }
}
