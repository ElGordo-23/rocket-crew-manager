import { gql, request } from 'graphql-request';
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';

const endpoint = 'https://api.spacex.land/graphql/';

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

export function Rockets({ setRocketId, setRocketName }) {
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
                  <Link to={`/rocket/${rocket.id}`}>{rocket.name}</Link>
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
