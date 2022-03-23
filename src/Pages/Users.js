import { gql, request } from 'graphql-request';
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';

const endpoint = 'https://api.spacex.land/graphql/';

function useUsers() {
  return useQuery('users', async () => {
    const data = await request(
      endpoint,
      gql`
        query {
          users {
            name
            rocket
          }
        }
      `,
    );
    console.log(data);

    return data.users;
  });
}

export default function Users() {
  const { status, data, error, isFetching } = useUsers();

  let navigate = useNavigate();

  return (
    <div>
      <h1>Users</h1>
      <div>
        {status === 'loading' ? (
          'Loading...'
        ) : status === 'error' ? (
          <span>Error: {error.message}</span>
        ) : (
          <>
            <div>
              {data.map((user) => (
                <p key={user.id}>
                  <a>{user.name}</a>
                </p>
              ))}
            </div>
            <div>{isFetching ? 'Background Updating...' : ' '}</div>
          </>
        )}
      </div>
      <button
        onClick={() => {
          navigate('/');
        }}
      >
        Back
      </button>
    </div>
  );
}
