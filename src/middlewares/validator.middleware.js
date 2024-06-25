import { HttpStatusCode } from '../utils/httpstatus.js';

/**
 * Middleware function to validate request parameters, body, and headers against Joi schemas.
 * @param {Object} options - Object containing Joi schemas for bodySchema, paramsSchema, and headersSchema.
 * @returns {Function} Express middleware function.
 */
function validateRequest({ bodySchema, paramsSchema, headersSchema }) {
  return (req, res, next) => {
    // Validate request body
    if (bodySchema) {
      const { error: bodyError } = bodySchema.validate(req.body);
      if (bodyError) {
        return handleBadRequestValidationError(res, bodyError);
      }
    }

    // Validate request parameters
    if (paramsSchema) {
      const { error: paramsError } = paramsSchema.validate(req.params);
      if (paramsError) {
        return handleBadRequestValidationError(res, paramsError);
      }
    }

    // Validate request headers
    if (headersSchema) {
      const { error: headersError } = headersSchema.validate(req.headers);
      if (headersError) {
        return handleBadRequestValidationError(res, headersError);
      }
    }

    next(); // Proceed to the next middleware
  };
}

/**
 * Handles validation errors in the request.
 * @param {Object} res - The HTTP response object.
 * @param {Object} error - The Joi validation error object.
 * @returns {Object} HTTP response object with error details.
 */
function handleBadRequestValidationError(res, error) {
  return res.status(HttpStatusCode.BadRequest).json({
    status: HttpStatusCode.BadRequest,
    message: 'Bad Request: Validation error',
    details: error.details
  });
}

/**
 * Middleware function to validate the response body against a Joi schema.
 * @param {Object} schema - Joi schema to validate the response body.
 * @returns {Function} Express middleware function.
 */
function validateResponse(schema) {
  return (req, res, next) => {
    const { error } = schema.validate(res.body);
    if (error) {
      return handleResponseValidationError(res, error);
    }
    next(); // Proceed to the next middleware
  };
}

/**
 * Handles validation errors in the response.
 * @param {Object} res - The HTTP response object.
 * @param {Object} error - The Joi validation error object.
 * @returns {Object} HTTP response object with error details.
 */
function handleResponseValidationError(res, error) {
  return res.status(HttpStatusCode.InternalServerError).json({
    status: HttpStatusCode.InternalServerError,
    message: 'Internal Server Error',
    details: error.details
  });
}

export { validateRequest, validateResponse };
