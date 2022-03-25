import { gql, GraphQLClient } from 'graphql-request';
import { useMutation, useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';

const endpoint = 'https://api.spacex.land/graphql/';

const graphqlClient = new GraphQLClient(endpoint);

export function useRocket(rocketId) {
  return useQuery('rocket', async () => {
    const data = await graphqlClient.request(
      gql`
        query Rocket($id: ID!) {
          rocket(id: $id) {
            name
            description
          }
        }
      `,
      { id: rocketId },
    );

    return data.rocket;
  });
}

export const useAddUser = () => {
  const navigate = useNavigate();
  return useMutation(
    async (variables) => {
      const { insert_users } = await graphqlClient.request(
        gql`
          mutation User($id: uuid!, $name: String!, $rocket: String!) {
            insert_users(objects: { id: $id, name: $name, rocket: $rocket }) {
              returning {
                name
                rocket
              }
            }
          }
        `,
        variables,
      );

      return insert_users;
    },
    {
      onSuccess: () => {
        navigate('/users');
      },
    },
  );
};
