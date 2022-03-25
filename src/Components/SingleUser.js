import React from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import { useGetUserById, useDeleteUser } from '../Hooks/hooks-Users';

export function SingleUser() {
  const { userId } = useParams();

  const { data: user, isLoading, isError } = useGetUserById(userId);

  const { mutate } = useDeleteUser();

  const navigate = useNavigate();

  if (isLoading) {
    return 'Loading...';
  }
  if (isError) {
    return <span>Error</span>;
  }

  return (
    <div className="flex justify-center items-center flex-col relative gap-9 top-6">
      <h1 className="text-center font-bold text-xl">{user[0].name}</h1>
      <p>Ridin' on Rocket: {user[0].rocket}</p>

      <button
        className=" hover:bg-red-700  font-bold py-2 px-4 border-4 border-black w-24"
        onClick={() => mutate({ userId: user[0].id })}
      >
        Delete
      </button>
      <button
        className=" hover:bg-gray-300  font-bold py-2 px-4 border-4 border-black w-24"
        onClick={() => {
          navigate('/users');
        }}
      >
        Back
      </button>
    </div>
  );
}
