import { HttpStatusCode } from './httpstatus.js';
import StandardError from './standard_error.js';

class ControllerErrorHandler {
  /**
   * Handles error responses sent back to clients.
   * @param {object} res - Express response object
   * @param {Error | StandardError} error - Error object to handle
   */
  static handleErrorResponse(res, error) {
    let errorResponse;

    // Check if the error is a custom StandardError
    if (error instanceof StandardError) {
      errorResponse = {
        code: error.code,
        status: error.status,
        message: error.message,
        details: error.details
      };
    } else {
      // If it's a generic error, create a generic error response
      errorResponse = {
        status: HttpStatusCode.InternalServerError,
        message:
          'The server encountered an error and could not complete your request.',
        details: error.message
      };
    }

    // Send the error response with appropriate status code
    res.status(errorResponse.status).json(errorResponse);
  }
}

export default ControllerErrorHandler;
