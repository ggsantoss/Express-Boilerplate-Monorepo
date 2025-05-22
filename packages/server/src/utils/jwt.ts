import jwt from 'jsonwebtoken';
import { envConfig } from '../config/envConfig';

const JWT_SECRET = envConfig.JWT_SECRET;
const JWT_EXPIRES_IN = '1h';

/**
 * Class the handle jwt
 */
export class JwtUtils {
  /**
   * Generate the jwt token
   * @param payload The payload to set the token
   * @returns The token
   */
  public static generateToken(payload: Record<string, unknown>): string {
    return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
  }

  /**
   * Verify the token to see if its valid and extract the payload
   * @param token The token to be verified
   * @returns The payload decoded
   */
  public static verifyToken(token: string): Record<string, unknown> | string {
    try {
      const decoded = jwt.verify(token, JWT_SECRET);
      return decoded;
    } catch (error) {
      throw new Error('Invalid or expired token');
    }
  }
}
