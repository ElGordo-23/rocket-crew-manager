import { gql, GraphQLClient, request } from 'graphql-request';
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import {
  QueryClient,
  QueryClientProvider,
  useMutation,
  useQuery,
  useQueryClient,
} from 'react-query';
import { v4 as uuidv4 } from 'uuid';

const endpoint = 'https://api.spacex.land/graphql/';

const queryClient = new QueryClient();

const graphqlClient = new GraphQLClient(endpoint);

export default function App() {
  const [rocketId, setRocketId] = useState('');

  return (
    <QueryClientProvider client={queryClient}>
      {rocketId !== '' ? (
        <Rocket rocketId={rocketId} setRocketId={setRocketId} />
      ) : (
        <Rockets setRocketId={setRocketId} />
      )}
      {/* <ReactQueryDevtools initialIsOpen /> */}
    </QueryClientProvider>
  );
}

function useRockets() {
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

function Rockets({ setRocketId }) {
  const queryClient = useQueryClient();
  const { status, data, error, isFetching } = useRockets();

  return (
    <div>
      <h1>Rockets</h1>
      <div>
        {status === 'loading' ? (
          'Loading...'
        ) : status === 'error' ? (
          <span>Error: {error.message}</span>
        ) : (
          <>
            <div>
              {data.map((rocket) => (
                <p key={rocket.id}>
                  <a
                    onClick={() => setRocketId(rocket.id)}
                    href="#"
                    style={
                      // We can find the existing query data here to show bold links for
                      // ones that are cached
                      queryClient.getQueryData(['rocket', rocket.id])
                        ? {
                            fontWeight: 'bold',
                            color: 'green',
                          }
                        : {}
                    }
                  >
                    {rocket.name}
                  </a>
                </p>
              ))}
            </div>
            <div>{isFetching ? 'Background Updating...' : ' '}</div>
          </>
        )}
      </div>
    </div>
  );
}

function useRocket(rocketId) {
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
    console.log(data.rocket);

    return data.rocket;
  });
}

function Rocket({ rocketId, setRocketId }) {
  const { status, data, error, isFetching } = useRocket(rocketId);

  const userId = uuidv4();

  const mutation = gql`
    mutation AddUser($name: String!, $id: UUID!, $rocket: String!) {
      insert_users(objects: { id: $id, name: "", rocket: "" }) {
        returning {
          id
          name
          rocket
        }
      }
    }
  `;

  return (
    <div>
      <div>
        <a onClick={() => setRocketId('')} href="#">
          Back
        </a>
      </div>
      {!rocketId || status === 'loading' ? (
        'Loading...'
      ) : status === 'error' ? (
        <span>Error: {error.message}</span>
      ) : (
        <>
          <h1>{data.name}</h1>
          <div>
            <p>{data.description}</p>
          </div>
          <div>{isFetching ? 'Background Updating...' : ' '}</div>
        </>
      )}
    </div>
  );
}

const rootElement = document.getElementById('root');
ReactDOM.render(<App />, rootElement);
