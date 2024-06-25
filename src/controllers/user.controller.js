import { HttpStatusCode } from '../utils/httpstatus.js';
import ControllerErrorHandler from '../utils/controller_error_handler.js';
import userService from '../services/user.service.js';
import { UserErrorCode } from '../resources/user.resource.js';
import StandardError from '../utils/standard_error.js';

/**
 * UserController class handles HTTP requests related to user operations.
 */
class UserController {
  /**
   * Handles the creation of a new user.
   * @param {Object} req - The HTTP request object.
   * @param {Object} res - The HTTP response object.
   */
  static async createUser(req, res) {
    try {
      const user = await userService.createUser(req.body);
      res.status(HttpStatusCode.Created).send(user);
    } catch (error) {
      ControllerErrorHandler.handleErrorResponse(res, error);
    }
  }

  /**
   * Retrieves all users.
   * @param {Object} req - The HTTP request object.
   * @param {Object} res - The HTTP response object.
   */
  static async getAllUsers(req, res) {
    try {
      const users = await userService.getAllUsers();
      res.send(users);
    } catch (error) {
      ControllerErrorHandler.handleErrorResponse(res, error);
    }
  }

  /**
   * Retrieves a user by ID.
   * @param {Object} req - The HTTP request object.
   * @param {Object} res - The HTTP response object.
   */
  static async getUserById(req, res) {
    try {
      const user = await userService.getUserById(req.params.id);
      res.send(user);
    } catch (error) {
      ControllerErrorHandler.handleErrorResponse(res, error);
    }
  }

  /**
   * Updates a user by ID.
   * @param {Object} req - The HTTP request object.
   * @param {Object} res - The HTTP response object.
   */
  static async updateUserById(req, res) {
    const updates = req.body;

    try {
      const user = await userService.updateUserById(req.params.id, updates);
      res.send(user);
    } catch (error) {
      ControllerErrorHandler.handleErrorResponse(res, error);
    }
  }

  /**
   * Deletes a user by ID.
   * @param {Object} req - The HTTP request object.
   * @param {Object} res - The HTTP response object.
   */
  static async deleteUserById(req, res) {
    try {
      const user = await userService.deleteUserById(req.params.id);
      if (!user) {
        throw new StandardError({
          code: UserErrorCode.USER_NOT_FOUND_ERROR,
          message: `User with id ${req.params.id} not found.`,
          status: HttpStatusCode.NotFound
        });
      }
      res.send(user);
    } catch (error) {
      ControllerErrorHandler.handleErrorResponse(res, error);
    }
  }
}

export default UserController;
