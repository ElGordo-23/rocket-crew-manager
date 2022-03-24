import { gql, request } from 'graphql-request';
import { useQuery } from 'react-query';

const endpoint = 'https://api.spacex.land/graphql/';

export function useRockets() {
  return useQuery('rockets', async () => {
    const gqlData = await request(
      endpoint,
      gql`
        query {
          rockets {
            name
            id
            description
            country
          }
        }
      `,
    );
    return gqlData.rockets;
  });
}
