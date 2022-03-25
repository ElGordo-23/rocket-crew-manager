import React from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import { useGetUserById } from '../Hooks/hooks-Users';

export function SingleUser() {
  const { userId } = useParams();

  const { data: user, isLoading, isError } = useGetUserById(userId);

  console.log(user);

  const navigate = useNavigate();

  if (isLoading) {
    return 'Loading...';
  }
  if (isError) {
    return <span>Error</span>;
  }

  return (
    <div className="flex justify-center items-center flex-col relative gap-9 top-6">
      <div className="flex flex-col gap-1">
        <h1 className="text-center font-bold text-xl">{user.name}</h1>

        <button
          className=" hover:bg-gray-300  font-bold py-2 px-4 border-4 border-black w-24"
          onClick={() => {
            navigate('/users');
          }}
        >
          Back
        </button>
      </div>
    </div>
  );
}
