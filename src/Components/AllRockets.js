import React from 'react';
import { Link } from 'react-router-dom';
import { useRockets } from '../Hooks/hooks-AllRockets';

export function Rockets() {
  const { isLoading, data } = useRockets();

  if (isLoading) {
    return 'Loading...';
  }

  return (
    <div className="flex flex-col">
      <h1 className="text-center top-100 font-bold uppercase">Rockets</h1>
      <div>
        <div className=" grid grid-cols-2 gap-10 text-center ">
          {data.map((rocket) => (
            <p className="bg-sky-400 w-32 h-8 font-semibold " key={rocket.id}>
              <Link to={`/rocket/${rocket.id}`}>{rocket.name}</Link>
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}
