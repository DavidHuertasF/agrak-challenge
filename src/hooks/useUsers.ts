import { useMutation, useQuery, useQueryClient } from 'react-query';
import { createUser, deleteUser, getUsers, updateUser } from '../api/users';
import { User } from '../types/User';

export const useUsers = () => {
  const queryClient = useQueryClient(); // initialize the query client

  // useQuery hook to fetch the list of users from the API and set it to the users state
  const { data: users = [], isLoading } = useQuery<User[]>('users', getUsers);

  // useMutation hook to create a new user and update the users list in the cache
  const createUserMutation = useMutation(createUser, {
    onSuccess: (data) => {
      queryClient.setQueryData<User[]>('users', (existingUsers) => [
        ...(existingUsers || []),
        data,
      ]);
    },
  });

  // useMutation hook to update an existing user and update the users list in the cache
  const updateUserMutation = useMutation(updateUser, {
    onSuccess: (data) => {
      queryClient.setQueryData<User[]>('users', (existingUsers) => {
        if (!existingUsers) {
          return [];
        }
        const index = existingUsers.findIndex((user) => user.id === data.id);
        if (index === -1) {
          return existingUsers;
        }
        existingUsers[index] = data;
        return [...existingUsers];
      });
    },
  });

  // useMutation hook to delete an existing user and invalidate the users query to update the UI
  const deleteUserMutation = useMutation(deleteUser, {
    onSuccess: () => {
      queryClient.invalidateQueries('users');
    },
  });

  // return the users list, loading status, and the create/update/delete user functions
  return {
    users,
    isLoading,
    createUser: createUserMutation.mutateAsync,
    updateUser: updateUserMutation.mutateAsync,
    deleteUser: deleteUserMutation.mutateAsync,
  };
};

export * from './useUsers';
