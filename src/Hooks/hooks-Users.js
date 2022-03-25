import request, { gql } from 'graphql-request';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useNavigate } from 'react-router-dom';

const endpoint = 'https://api.spacex.land/graphql/';

export function useUsers() {
  return useQuery('users', async () => {
    const data = await request(
      endpoint,
      gql`
        query {
          users {
            id
            name
            rocket
          }
        }
      `,
    );

    return data.users;
  });
}

export function useUsersOnSelectedRocket(selectedRocket, queryOptions) {
  return useQuery(
    'usersOnRocket',
    async () => {
      const data = await request(
        endpoint,
        gql`
          query UsersOnRocket($rocket: String!) {
            users(where: { rocket: { _eq: $rocket } }) {
              name
              id
            }
          }
        `,
        { rocket: selectedRocket },
      );

      return data.users;
    },
    queryOptions,
  );
}

export const useDeleteUser = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation(
    async (variables) => {
      const { delete_users } = await request(
        endpoint,
        gql`
          mutation DeleteUserById($userId: uuid!) {
            delete_users(where: { id: { _eq: $userId } }) {
              returning {
                id
              }
            }
          }
        `,
        variables,
      );

      return delete_users;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('users');
        navigate('/users');
      },
    },
  );
};

export function useGetUserById(userId) {
  return useQuery('userById', async () => {
    const user = await request(
      endpoint,
      gql`
        query GetSingleUser($id: uuid!) {
          users(where: { id: { _eq: $id } }) {
            name
            id
            rocket
          }
        }
      `,
      { id: userId },
    );

    return user.users;
  });
}

export const useDeleteAllUsersOnRocket = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation(
    async (variables) => {
      const { delete_users } = await request(
        endpoint,
        gql`
          mutation DeleteUserById($rocketId: String!) {
            delete_users(where: { rocket: { _eq: $rocketId } }) {
              returning {
                id
              }
            }
          }
        `,
        variables,
      );

      return delete_users;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('users');
        navigate('/users');
      },
    },
  );
};
