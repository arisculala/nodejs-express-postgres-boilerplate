import UserController from '../../controllers/user.controller';
import userService from '../../services/user.service';
import ControllerErrorHandler from '../../utils/controller_error_handler';
import { HttpStatusCode } from '../../utils/httpstatus';
import { UserErrorCode } from '../../resources/user.resource';
import StandardError from '../../utils/standard_error';

jest.mock('../../services/user.service');
jest.mock('../../utils/controller_error_handler');

describe('UserController', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('createUser', () => {
    const mockReq = { body: { firstName: 'John', lastName: 'Doe', email: 'john.doe@example.com' } };
    const mockRes = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    };

    it('should create a new user successfully', async () => {
      const mockUser = { id: '1', ...mockReq.body };
      userService.createUser.mockResolvedValue(mockUser);

      await UserController.createUser(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(HttpStatusCode.Created);
      expect(mockRes.send).toHaveBeenCalledWith(mockUser);
    });

    it('should handle errors during user creation', async () => {
      const mockError = new Error('Database connection failed');
      userService.createUser.mockRejectedValue(mockError);

      await UserController.createUser(mockReq, mockRes);

      expect(ControllerErrorHandler.handleErrorResponse).toHaveBeenCalledWith(mockRes, mockError);
    });
  });

  describe('getAllUsers', () => {
    const mockReq = {};
    const mockRes = {
      send: jest.fn(),
    };

    it('should retrieve all users successfully', async () => {
      const mockUsers = [
        { id: '1', firstName: 'John', lastName: 'Doe', email: 'john.doe@example.com' },
        { id: '2', firstName: 'Jane', lastName: 'Smith', email: 'jane.smith@example.com' },
      ];
      userService.getAllUsers.mockResolvedValue(mockUsers);

      await UserController.getAllUsers(mockReq, mockRes);

      expect(mockRes.send).toHaveBeenCalledWith(mockUsers);
    });

    it('should handle errors during retrieving users', async () => {
      const mockError = new Error('Database connection failed');
      userService.getAllUsers.mockRejectedValue(mockError);

      await UserController.getAllUsers(mockReq, mockRes);

      expect(ControllerErrorHandler.handleErrorResponse).toHaveBeenCalledWith(mockRes, mockError);
    });
  });

  describe('getUserById', () => {
    const mockReq = { params: { id: '1' } };
    const mockRes = {
      send: jest.fn(),
    };

    it('should retrieve a user by ID successfully', async () => {
      const mockUser = { id: '1', firstName: 'John', lastName: 'Doe', email: 'john.doe@example.com' };
      userService.getUserById.mockResolvedValue(mockUser);

      await UserController.getUserById(mockReq, mockRes);

      expect(mockRes.send).toHaveBeenCalledWith(mockUser);
    });

    it('should handle errors during retrieving user by ID', async () => {
      const mockError = new Error('User not found');
      userService.getUserById.mockRejectedValue(mockError);

      await UserController.getUserById(mockReq, mockRes);

      expect(ControllerErrorHandler.handleErrorResponse).toHaveBeenCalledWith(mockRes, mockError);
    });
  });

  describe('updateUserById', () => {
    const mockReq = { params: { id: '1' }, body: { firstName: 'Updated' } };
    const mockRes = {
      send: jest.fn(),
    };

    it('should update a user by ID successfully', async () => {
      const mockUpdatedUser = { id: '1', firstName: 'Updated', lastName: 'Doe', email: 'john.doe@example.com' };
      userService.updateUserById.mockResolvedValue(mockUpdatedUser);

      await UserController.updateUserById(mockReq, mockRes);

      expect(mockRes.send).toHaveBeenCalledWith(mockUpdatedUser);
    });

    it('should handle errors during updating user by ID', async () => {
      const mockError = new Error('User update failed');
      userService.updateUserById.mockRejectedValue(mockError);

      await UserController.updateUserById(mockReq, mockRes);

      expect(ControllerErrorHandler.handleErrorResponse).toHaveBeenCalledWith(mockRes, mockError);
    });
  });

  describe('deleteUserById', () => {
    const mockReq = { params: { id: '1' } };
    const mockRes = {
      send: jest.fn(),
    };

    it('should delete a user by ID successfully', async () => {
      const mockDeletedUser = { id: '1', firstName: 'John', lastName: 'Doe', email: 'john.doe@example.com' };
      userService.deleteUserById.mockResolvedValue(mockDeletedUser);

      await UserController.deleteUserById(mockReq, mockRes);

      expect(mockRes.send).toHaveBeenCalledWith(mockDeletedUser);
    });

    it('should handle errors during deleting user by ID', async () => {
      const mockError = new StandardError({
        code: UserErrorCode.USER_NOT_FOUND_ERROR,
        message: `User with id ${mockReq.params.id} not found.`,
        status: HttpStatusCode.NotFound,
      });
      userService.deleteUserById.mockResolvedValue(null);

      await UserController.deleteUserById(mockReq, mockRes);

      expect(ControllerErrorHandler.handleErrorResponse).toHaveBeenCalledWith(mockRes, mockError);
    });
  });
});
