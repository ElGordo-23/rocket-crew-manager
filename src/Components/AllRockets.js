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
      <h1 className="text-center font-bold text-xl uppercase">Rockets</h1>
      <div className="relative mt-4">
        <div className=" grid grid-cols-2 gap-10 items-center ">
          {data.map((rocket) => (
            <div
              className="hover:bg-gray-300  font-bold py-2 px-4 border-4 border-black w-24 text-center  h-20"
              key={rocket.id}
            >
              <Link to={`/rocket/${rocket.id}`}>{rocket.name}</Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
