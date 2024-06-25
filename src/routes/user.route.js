// user.route.js

import express from 'express';
const router = express.Router();
import { validateRequest } from '../middlewares/validator.middleware.js';
import UserController from '../controllers/user.controller.js';
import { createUserSchema } from '../resources/user.resource.js';

// Route for creating a new user
router.post(
  '/',
  validateRequest({ bodySchema: createUserSchema }), // Middleware to validate request body against createUserSchema
  UserController.createUser // Controller method to handle user creation
);

// Route for fetching all users
router.get('/', UserController.getAllUsers);

// Route for fetching a user by ID
router.get('/:id', UserController.getUserById);

// Route for updating a user by ID
router.patch('/:id', UserController.updateUserById);

// Route for deleting a user by ID
router.delete('/:id', UserController.deleteUserById);

export default router;
