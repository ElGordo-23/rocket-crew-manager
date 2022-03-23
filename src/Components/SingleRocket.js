import { gql, GraphQLClient } from 'graphql-request';
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react';
import { useMutation, useQuery } from 'react-query';
import { Link, useParams } from 'react-router-dom';

const endpoint = 'https://api.spacex.land/graphql/';

const graphqlClient = new GraphQLClient(endpoint);

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

    return data.rocket;
  });
}

const useAddUser = () => {
  return useMutation(async (variables) => {
    const { insert_users } = await graphqlClient.request(
      gql`
        mutation User($name: String!, $rocket: String!) {
          insert_users(objects: { name: $name, rocket: $rocket }) {
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
  });
};

export function Rocket() {
  const { rocketId } = useParams();

  const { mutate, isLoading: isSaving } = useAddUser();
  const { isError, data, isLoading } = useRocket(rocketId);
  const [userName, setUserName] = useState('');

  if (isLoading) {
    return 'Loading...';
  }
  if (isError) {
    return <span>Error</span>;
  }

  return (
    <div>
      <div>
        <Link to="/">Back</Link>
      </div>

      <>
        <h1>{data.name}</h1>
        <div>
          <p>{data.description}</p>
        </div>
        <input onChange={(e) => setUserName(e.currentTarget.value)}></input>

        <button
          disabled={isSaving}
          onClick={() => mutate({ name: userName, rocket: rocketId })}
        >
          Add user
        </button>
      </>
    </div>
  );
}
