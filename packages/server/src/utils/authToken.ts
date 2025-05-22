import { Request } from 'express';
import jwt from 'jsonwebtoken';
import { UnauthorizedException } from '../exception/UnauthorizedException';

/**
 * Utility class for handling Bearer token authentication in Express
 */
export class AuthToken {
  /**
   * Extracts the Bearer token from the Authorization header.
   *
   * @param req Express request object
   * @returns Token string
   * @throws Error if the header is missing or malformed
   */
  public static extract(req: Request): string {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException(
        'Authorization header missing or malformed',
      );
    }

    return authHeader.split(' ')[1];
  }

  /**
   * Verifies and decodes a JWT token.
   *
   * @param req Express request object
   * @param secret JWT secret key
   * @returns Decoded token payload
   * @throws jwt.JsonWebTokenError or jwt.TokenExpiredError
   */
  public static verify<T>(req: Request, secret: string): T {
    const token = this.extract(req);
    const decoded = jwt.verify(token, secret) as T;
    return decoded;
  }
}
