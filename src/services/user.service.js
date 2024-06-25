import UserModel from '../models/user.model.js';
import { UserErrorCode } from '../resources/user.resource.js';
import { HttpStatusCode } from '../utils/httpstatus.js';
import StandardError from '../utils/standard_error.js';

/**
 * UserService class
 * Handles operations related to users, including creation, retrieval, updating, and deletion.
 */
class UserService {
  /**
   * Create a new user
   * @param {Object} newUserData - Data for the new user
   * @returns {Object} Created user object
   */
  static async createUser(newUserData) {
    const user = await UserModel.save(newUserData);
    return user;
  }

  /**
   * Get all users
   * @returns {Array} List of all users
   */
  static async getAllUsers() {
    const users = await UserModel.getAllUsers();
    return users;
  }

  /**
   * Get a user by ID
   * @param {string} id - ID of the user to retrieve
   * @returns {Object} User object
   * @throws {StandardError} If the user is not found
   */
  static async getUserById(id) {
    const user = await UserModel.getUserById(id);
    if (!user) {
      throw new StandardError({
        code: UserErrorCode.USER_NOT_FOUND_ERROR,
        message: `User with id ${id} not found.`,
        status: HttpStatusCode.NotFound
      });
    }
    return user;
  }

  /**
   * Update a user by ID
   * @param {string} id - ID of the user to update
   * @param {Object} updates - Object containing the fields to update
   * @returns {Object} Updated user object
   * @throws {StandardError} If the update contains invalid fields or if the user is not found
   */
  static async updateUserById(id, updates) {
    // Check allowable user fields that can be updated
    const allowedUpdates = ['firstName', 'lastName', 'email'];
    const isValidOperation = Object.keys(updates).every((update) =>
      allowedUpdates.includes(update)
    );
    if (!isValidOperation) {
      throw new StandardError({
        code: UserErrorCode.USER_UPDATE_ERROR,
        message: `Invalid data updates for user with id ${id}.`,
        status: HttpStatusCode.BadRequest
      });
    }
    const updatedUser = await UserModel.findIdAndUpdate(id, updates, {
      new: true,
      runValidators: true
    });
    if (!updatedUser) {
      throw new StandardError({
        code: UserErrorCode.USER_NOT_FOUND_ERROR,
        message: `User with id ${id} not found.`,
        status: HttpStatusCode.NotFound
      });
    }
    return updatedUser;
  }

  /**
   * Delete a user by ID
   * @param {string} id - ID of the user to delete
   * @returns {Object} Deleted user object
   * @throws {StandardError} If the user is not found
   */
  static async deleteUserById(id) {
    const deletedUser = await UserModel.deleteUserById(id);
    if (!deletedUser) {
      throw new StandardError({
        code: UserErrorCode.USER_NOT_FOUND_ERROR,
        message: `User with id ${id} not found.`,
        status: HttpStatusCode.NotFound
      });
    }
    return deletedUser;
  }
}

export default UserService;
