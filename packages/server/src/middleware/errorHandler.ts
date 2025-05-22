import { NextFunction, Request, Response } from 'express';
import { BadRequestException } from '../exception/BadRequestException';
import { EmailAlreadyExistsException } from '../exception/EmailAlreadyExistsException';
import { InvalidPasswordException } from '../exception/InvalidPasswordException';
import { UserNotFoundException } from '../exception/UserNotFoundException';
import { ResourceNotFoundException } from '../exception/ResourceNotFoundException';
import { UniqueFieldException } from '../exception/UniqueFieldException';

type ErrorConstructor = new (...args: unknown[]) => Error;

const errorStatusMap = new Map<ErrorConstructor, number>([
  [BadRequestException, 400],
  [EmailAlreadyExistsException, 400],
  [InvalidPasswordException, 400],
  [UserNotFoundException, 404],
  [ResourceNotFoundException, 404],
  [UniqueFieldException, 409],
]);

export class ErrorHandler {
  /**
   * Handle the untracked errors
   * @param err The error
   * @param req The request
   * @param res The response
   * @param next The next middleware function
   * @returns void
   */
  public static handler(
    err: Error,
    _req: Request,
    res: Response,
    _next: NextFunction,
  ): void {
    for (const [ErrorClass, statusCode] of errorStatusMap.entries()) {
      if (err instanceof ErrorClass) {
        res.status(statusCode).json({
          success: false,
          message: err.message,
        });
        return;
      }
    }

    res.status(500).json({
      success: false,
      message: err.message || 'Internal Server Error',
    });
  }
}
