import UserService from '../../services/user.service.js';
import UserModel from '../../models/user.model.js';
import { UserErrorCode } from '../../resources/user.resource.js';
import { HttpStatusCode } from '../../utils/httpstatus.js';
import StandardError from '../../utils/standard_error.js';

jest.mock('../../models/user.model.js'); // Mocking UserModel

describe('UserService', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('createUser', () => {
    it('should create a new user', async () => {
      const mockUserData = {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com'
      };
      const mockUser = {
        id: '1',
        ...mockUserData
      };
      UserModel.save.mockResolvedValue(mockUser); // Mocking save method of UserModel

      const createdUser = await UserService.createUser(mockUserData);
      expect(createdUser).toEqual(mockUser);
    });
  });

  describe('getAllUsers', () => {
    it('should retrieve all users', async () => {
      const mockUsers = [
        {
          id: '1',
          firstName: 'John',
          lastName: 'Doe',
          email: 'john.doe@example.com'
        },
        {
          id: '2',
          firstName: 'Jane',
          lastName: 'Smith',
          email: 'jane.smith@example.com'
        }
      ];
      UserModel.getAllUsers.mockResolvedValue(mockUsers); // Mocking getAllUsers method

      const users = await UserService.getAllUsers();
      expect(users).toEqual(mockUsers);
    });
  });

  describe('getUserById', () => {
    it('should retrieve a user by ID', async () => {
      const mockUserId = '1';
      const mockUser = {
        id: mockUserId,
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com'
      };
      UserModel.getUserById.mockResolvedValue(mockUser); // Mocking getUserById method

      const user = await UserService.getUserById(mockUserId);
      expect(user).toEqual(mockUser);
    });

    it('should throw UserNotFoundError if user is not found', async () => {
      const mockUserId = '999';
      UserModel.getUserById.mockResolvedValue(null); // Simulating user not found

      await expect(UserService.getUserById(mockUserId)).rejects.toThrow(
        StandardError
      );
      await expect(UserService.getUserById(mockUserId)).rejects.toMatchObject({
        code: UserErrorCode.USER_NOT_FOUND_ERROR,
        status: HttpStatusCode.NotFound
      });
    });
  });

  describe('updateUserById', () => {
    it('should update a user by ID', async () => {
      const mockUserId = '1';
      const mockUpdates = { firstName: 'Updated' };
      const mockUpdatedUser = {
        id: mockUserId,
        firstName: 'Updated',
        lastName: 'Doe',
        email: 'john.doe@example.com'
      };
      UserModel.findIdAndUpdate.mockResolvedValue(mockUpdatedUser); // Mocking findIdAndUpdate method

      const updatedUser = await UserService.updateUserById(
        mockUserId,
        mockUpdates
      );
      expect(updatedUser).toEqual(mockUpdatedUser);
    });

    it('should throw UserNotFoundError if user is not found', async () => {
      const mockUserId = '999';
      const mockUpdates = { firstName: 'Updated' };
      UserModel.findIdAndUpdate.mockResolvedValue(null); // Simulating user not found

      await expect(
        UserService.updateUserById(mockUserId, mockUpdates)
      ).rejects.toThrow(StandardError);
      await expect(
        UserService.updateUserById(mockUserId, mockUpdates)
      ).rejects.toMatchObject({
        code: UserErrorCode.USER_NOT_FOUND_ERROR,
        status: HttpStatusCode.NotFound
      });
    });

    it('should throw USER_UPDATE_ERROR if updates contain invalid fields', async () => {
      const mockUserId = '1';
      const mockUpdates = { invalidField: 'Updated' };

      await expect(
        UserService.updateUserById(mockUserId, mockUpdates)
      ).rejects.toThrow(StandardError);
      await expect(
        UserService.updateUserById(mockUserId, mockUpdates)
      ).rejects.toMatchObject({
        code: UserErrorCode.USER_UPDATE_ERROR,
        status: HttpStatusCode.BadRequest
      });
    });
  });
});
