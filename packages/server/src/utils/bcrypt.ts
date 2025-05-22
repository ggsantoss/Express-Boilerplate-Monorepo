import bcrypt from 'bcrypt';
import { envConfig } from '../config/envConfig';

export class BcryptUtils {
  /**
   * Hash the password with bcrypt
   * @param password The password to be hashed
   * @returns The hashed password
   */
  public static async hashPassword(password: string): Promise<string> {
    const saltRounds = envConfig.BCRYPT_SALT_ROUNDS;
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
  }

  /**
   * Compare a raw password with a hashed one
   * @param password Raw password to be compared
   * @param hashedPassword Hashed password to be compared
   * @returns If it's equal or not
   */
  public static async comparePassword(
    password: string,
    hashedPassword: string,
  ): Promise<boolean> {
    const isMatch = await bcrypt.compare(password, hashedPassword);
    return isMatch;
  }
}
