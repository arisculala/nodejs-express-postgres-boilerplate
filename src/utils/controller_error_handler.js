import { HttpStatusCode } from './httpstatus.js';
import StandardError from './standard_error.js';

class ControllerErrorHandler {
  static handleErrorResponse(res, error) {
    let errorResponse;
    if (error instanceof StandardError) {
      errorResponse = {
        code: error.code,
        status: error.status,
        message: error.message,
        details: error.details
      };
    } else {
      errorResponse = {
        status: HttpStatusCode.InternalServerError,
        message:
          'The server encountered an error and could not complete your request.',
        details: error.message
      };
    }
    res.status(errorResponse.status).json(errorResponse);
  }
}

export default ControllerErrorHandler;
