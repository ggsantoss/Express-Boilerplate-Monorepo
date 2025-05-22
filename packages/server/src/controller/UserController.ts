import Joi from 'joi';
import { ValidationErrorFormatter } from '../utils/validationError';
import { UserService } from '../service/UserService';
import { Request, Response } from 'express';
import { RegisterUserDTO } from '../dto/user/RegisterUserDTO';
import { UpdateUserDTO } from '../dto/user/UpdateUserDTO';
import { UpdateUserPartialDTO } from '../dto/user/UpdateUserPartialDTO';

export class UserController {
  private readonly userService = new UserService();

  /**
   * Handles user registration.
   * Validates the request body, creates the user, and returns the created user data.
   *
   * @param req - Express request object containing user data in the body.
   * @param res - Express response object.
   * @returns A response with the newly created user or an error message.
   */
  public async register(req: Request, res: Response): Promise<Response> {
    const userSchema = Joi.object({
      name: Joi.string().min(5).max(50).required(),
      email: Joi.string().email().min(5).max(100).required(),
      password: Joi.string().min(8).max(100).required(),
    });

    const { error } = userSchema.validate(req.body);
    if (error instanceof Joi.ValidationError) {
      const formatter = new ValidationErrorFormatter(error);
      return res.status(400).json({
        success: false,
        message: formatter.getMessage(),
      });
    }

    const user: RegisterUserDTO = req.body;
    const createdUser = await this.userService.register(user);

    return res.status(201).json({
      success: true,
      message: 'User registered successfully',
      data: createdUser,
    });
  }

  /**
   * Handles user login.
   * Validates credentials, checks for existing user, verifies password, and returns a token.
   *
   * @param req - Express request object containing login credentials.
   * @param res - Express response object.
   * @returns A response with the user data and JWT token or an error message.
   */
  public async login(req: Request, res: Response): Promise<Response> {
    const userSchema = Joi.object({
      email: Joi.string().email().min(5).max(100).required(),
      password: Joi.string().min(8).max(100).required(),
    });

    const { error } = userSchema.validate(req.body);
    if (error instanceof Joi.ValidationError) {
      const formatter = new ValidationErrorFormatter(error);
      return res.status(400).json({
        success: false,
        message: formatter.getMessage(),
      });
    }

    const user: RegisterUserDTO = req.body;
    const userResponse = await this.userService.login(user);

    const { token, ...userData } = userResponse;

    return res.status(200).json({
      success: true,
      message: 'Login successful',
      user: userData,
      token: token,
    });
  }

  /**
   * Retrieves a user by their ID.
   *
   * @param req - Express request object containing user ID in the URL parameters.
   * @param res - Express response object.
   * @returns A response with the user data or an error message if not found.
   */
  public async findById(req: Request, res: Response): Promise<Response> {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid user ID',
      });
    }

    const user = await this.userService.findById(id);

    return res.status(200).json({
      success: true,
      data: user,
    });
  }

  /**
   * Controller to retrieve a paginated list of users.
   *
   * @param req - The request object containing query parameters `limit` and `skip`.
   * @param res - The response object used to return the paginated user list.
   * @returns A response with a list of users or an error message.
   */
  public async findAll(req: Request, res: Response): Promise<Response> {
    const limit = parseInt(req.query.limit as string, 10);
    const skip = parseInt(req.query.skip as string, 10);

    if (isNaN(limit) || isNaN(skip) || limit <= 0 || skip < 0) {
      return res.status(400).json({
        success: false,
        message: 'Invalid pagination parameters',
      });
    }

    const users = await this.userService.findAll(limit, skip);

    return res.status(200).json({
      success: true,
      data: users,
    });
  }

  /**
   * Delete an user by id
   * @param req - Express request object containing user ID in the URL parameters.
   * @param res - Express response object.
   * @returns No content
   */
  public async delete(req: Request, res: Response): Promise<Response> {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid user ID',
      });
    }

    await this.userService.delete(id);

    return res.status(204).json({
      success: true,
    });
  }

  /**
   * Updates an existing user's data based on the provided ID.
   * @param req - The request object containing user ID in the URL and updated user data in the body.
   * @param res - The response object used to send the HTTP response.
   * @returns A response with the updated user data or an error message.
   */
  public async updatePartial(req: Request, res: Response): Promise<Response> {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid user ID',
      });
    }

    const userSchema = Joi.object({
      name: Joi.string().min(5).max(50).optional(),
      email: Joi.string().email().min(5).max(100).optional(),
      password: Joi.string().min(8).max(100).optional(),
    }).min(1);

    const { error } = userSchema.validate(req.body);
    if (error instanceof Joi.ValidationError) {
      const formatter = new ValidationErrorFormatter(error);
      return res.status(400).json({
        success: false,
        message: formatter.getMessage(),
      });
    }

    const data: UpdateUserPartialDTO = req.body;
    const user = await this.userService.updatePartial(id, data);

    return res.status(200).json({
      success: true,
      data: user,
    });
  }

  /**
   * Updates an existing user's data based on the provided ID.
   *
   * @param req - The request object containing user ID in the URL and updated user data in the body.
   * @param res - The response object used to send the HTTP response.
   * @returns A response with the updated user data or an error message.
   */
  public async update(req: Request, res: Response): Promise<Response> {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid user ID',
      });
    }

    const userSchema = Joi.object({
      name: Joi.string().min(5).max(50).required(),
      email: Joi.string().email().min(5).max(100).required(),
      password: Joi.string().min(8).max(100).required(),
    });

    const { error } = userSchema.validate(req.body);
    if (error instanceof Joi.ValidationError) {
      const formatter = new ValidationErrorFormatter(error);
      return res.status(400).json({
        success: false,
        message: formatter.getMessage(),
      });
    }

    const data: UpdateUserDTO = req.body;
    const user = await this.userService.update(id, data);

    return res.status(200).json({
      success: true,
      data: user,
    });
  }
}
