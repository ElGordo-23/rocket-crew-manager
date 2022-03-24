import request, { gql } from 'graphql-request';
import { useMutation, useQuery, useQueryClient } from 'react-query';

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

export function useUsersOnSelectedRocket(selectedRocket) {
  return useQuery('usersOnRocket', async () => {
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

    console.log(data.users);

    return data.users;
  });
}

export const useDeleteUser = () => {
  const queryClient = useQueryClient();

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
      },
    },
  );
};
