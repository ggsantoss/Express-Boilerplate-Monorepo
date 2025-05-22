import { ValidationError } from 'joi';

/**
 * Utility class to format Joi validation errors in a structured and reusable way.
 */
export class ValidationErrorFormatter {
  private readonly error: ValidationError;

  constructor(error: ValidationError) {
    this.error = error;
  }

  /**
   * Returns a single string with all validation error messages joined by a comma.
   */
  public getMessage(): string {
    return this.error.details.map((detail) => detail.message).join(', ');
  }

  /**
   * Returns an array of all validation error messages.
   */
  public getMessages(): string[] {
    return this.error.details.map((detail) => detail.message);
  }

  /**
   * Returns the fields that caused validation errors.
   */
  public getFields(): string[] {
    return this.error.details.map((detail) => detail.path.join('.'));
  }

  /**
   * Returns an array of objects with field and message for each validation error.
   */
  public getDetailedErrors(): { field: string; message: string }[] {
    return this.error.details.map((detail) => ({
      field: detail.path.join('.'),
      message: detail.message,
    }));
  }
}
