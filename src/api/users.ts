import axios, { AxiosResponse } from 'axios';
import { User } from '../types/User';

const BASE_URL = 'https://635017b9df22c2af7b630c3e.mockapi.io/api/v1/users';

// Fetch all users from the API
export const getUsers = async (): Promise<User[]> => {
  try {
    const response: AxiosResponse<User[]> = await axios.get(BASE_URL);
    if (response && response.data) {
      return response.data;
    } else {
      throw new Error('Invalid response from API');
    }
  } catch (error) {
    throw new Error(`Failed to fetch users: ${(error as Error).message}`);
  }
};

// Create a new user in the API
export const createUser = async (user: User): Promise<User> => {
  try {
    const response: AxiosResponse<User> = await axios.post(BASE_URL, user);
    if (response && response.data) {
      return response.data;
    } else {
      throw new Error('Invalid response from API');
    }
  } catch (error) {
    throw new Error(`Failed to create user: ${(error as Error).message}`);
  }
};

// Update an existing user in the API
export const updateUser = async (user: User): Promise<User> => {
  try {
    const response: AxiosResponse<User> = await axios.put(`${BASE_URL}/${user.id}`, user);
    if (response && response.data) {
      return response.data;
    } else {
      throw new Error('Invalid response from API');
    }
  } catch (error) {
    throw new Error(`Failed to update user: ${(error as Error).message}`);
  }
};

// Delete an existing user from the API
export const deleteUser = async (id: string): Promise<void> => {
  try {
    await axios.delete(`${BASE_URL}/${id}`);
  } catch (error) {
    throw new Error(`Failed to delete user: ${(error as Error).message}`);
  }
};

// Fetch a user by ID from the API
export const getUserById = async (id: string): Promise<User> => {
  try {
    const response: AxiosResponse<User> = await axios.get(`${BASE_URL}/${id}`);
    if (response && response.data) {
      return response.data;
    } else {
      throw new Error('Invalid response from API');
    }
  } catch (error) {
    throw new Error(`Failed to fetch user by ID: ${(error as Error).message}`);
  }
};
