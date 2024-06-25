// user.route.js

import express from 'express';
const router = express.Router();
import { validateRequest } from '../middlewares/validator.middleware.js';
import UserController from '../controllers/user.controller.js';
import { createUserSchema } from '../resources/user.resource.js';

router.post(
  '/',
  validateRequest({ bodySchema: createUserSchema }),
  UserController.createUser
);

router.get('/', UserController.getAllUsers);

router.get('/:id', UserController.getUserById);

router.patch('/:id', UserController.updateUserById);

router.delete('/:id', UserController.deleteUserById);

export default router;
