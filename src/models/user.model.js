import { pool } from '../utils/db.js';

class UserModel {
  /**
   * Saves a new user to the database.
   * @param {Object} user - The user object containing firstName, lastName, and email.
   * @returns {Object} The saved user object.
   */
  static async save(user) {
    const { firstName, lastName, email } = user;
    const query = `
      INSERT INTO users (first_name, last_name, email, deleted, created_at, updated_at)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *;
    `;
    const values = [firstName, lastName, email, false, new Date(), new Date()];
    const result = await pool.query(query, values);
    return result.rows[0];
  }

  /**
   * Retrieves all users from the database.
   * @returns {Array} An array of user objects.
   */
  static async getAllUsers() {
    const query = 'SELECT * FROM users WHERE deleted = false;';
    const result = await pool.query(query);
    return result.rows;
  }

  /**
   * Retrieves a user by ID from the database.
   * @param {number} userId - The ID of the user to retrieve.
   * @returns {Object} The user object.
   */
  static async getUserById(userId) {
    const query = 'SELECT * FROM users WHERE id = $1 AND deleted = false;';
    const result = await pool.query(query, [userId]);
    return result.rows[0];
  }

  /**
   * Updates a user by ID in the database.
   * @param {number} userId - The ID of the user to update.
   * @param {Object} user - The updated user object containing firstName, lastName, email, and deleted.
   * @returns {Object} The updated user object.
   */
  static async updateUserById(userId, user) {
    const { firstName, lastName, email, deleted } = user;
    const query = `
      UPDATE users
      SET first_name = $1, last_name = $2, email = $3, deleted = $4, updated_at = $5
      WHERE id = $6
      RETURNING *;
    `;
    const values = [firstName, lastName, email, deleted, new Date(), userId];
    const result = await pool.query(query, values);
    return result.rows[0];
  }

  /**
   * Finds a user by ID and updates using the provided updates object.
   * @param {number} userId - The ID of the user to update.
   * @param {Object} updates - The updates object containing fields to update.
   * @returns {Object} The updated user object.
   */
  static async findIdAndUpdate(userId, updates) {
    // Transform camelCase keys to snake_case
    const transformedUpdates = Object.keys(updates).reduce((acc, key) => {
      const snakeCaseKey = key.replace(/([A-Z])/g, '_$1').toLowerCase();
      acc[snakeCaseKey] = updates[key];
      return acc;
    }, {});

    const setQuery = Object.keys(transformedUpdates)
      .map((key, index) => `${key} = $${index + 1}`)
      .join(', ');
    const query = `
      UPDATE users
      SET ${setQuery}, updated_at = $${Object.keys(transformedUpdates).length + 1}
      WHERE id = $${Object.keys(transformedUpdates).length + 2}
      RETURNING *;
    `;
    const values = [...Object.values(transformedUpdates), new Date(), userId];
    const result = await pool.query(query, values);
    return result.rows[0];
  }

  /**
   * Deletes a user by ID from the database.
   * @param {number} userId - The ID of the user to delete.
   * @returns {boolean} True if deletion was successful, false otherwise.
   */
  static async deleteUserById(userId) {
    const query =
      'UPDATE users SET deleted = true, updated_at = $1 WHERE id = $2;';
    const result = await pool.query(query, [new Date(), userId]);
    return result.rowCount > 0;
  }
}

export default UserModel;
