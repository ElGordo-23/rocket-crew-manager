import React from 'react';
import { Link } from 'react-router-dom';
import { useRockets } from '../Hooks/hooks-AllRockets';

export function Rockets({ setRocketId }) {
  const { status, data, error } = useRockets();

  return (
    <div>
      <h1 className="text-center top-100 font-bold">Rockets</h1>
      <div>
        {status === 'loading' ? (
          'Loading...'
        ) : status === 'error' ? (
          <span>Error: {error.message}</span>
        ) : (
          <>
            <div className=" grid grid-cols-2  text-center">
              {data.map((rocket) => (
                <p key={rocket.id}>
                  <Link to={`/rocket/${rocket.id}`}>{rocket.name}</Link>
                </p>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
