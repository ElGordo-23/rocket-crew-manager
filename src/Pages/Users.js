import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useRockets } from '../Hooks/hooks-AllRockets';
import {
  useDeleteUser,
  useUsers,
  useUsersOnSelectedRocket,
} from '../Hooks/hooks-Users';

export default function Users() {
  const { status, data: users } = useUsers();

  const { data: rocketsData } = useRockets();

  const [selectedRocket, setSelectedRocket] = useState('');

  const {
    data: usersOnRocket,
    isLoading: loadingUsers,
    refetch,
  } = useUsersOnSelectedRocket(selectedRocket);

  const { mutate } = useDeleteUser();

  let navigate = useNavigate();

  function UsersOnRocket() {
    if (loadingUsers) {
      return <div>Loading...</div>;
    } else {
      return (
        <div>
          {usersOnRocket.map((user) => (
            <ul>
              <li key={user.id}>{user.name}</li>
              <button onClick={() => mutate({ userId: user.id })}>
                Delete User
              </button>
            </ul>
          ))}
        </div>
      );
    }
  }

  function AllUsers() {
    return (
      <div className="grid grid-cols-4">
        {users.map((user) => (
          <div key={user.id} className="cursor-pointer hover:bg-gray-300">
            <p>
              <Link to={`/users/${user.id}`}>{user.name}</Link>
            </p>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center flex-col relative gap-9 top-6">
      <h1 className="text-center font-bold text-xl">Passengers</h1>
      <div className="flex justify-center items-center">
        {status === 'loading' ? (
          'Loading...'
        ) : status === 'error' ? (
          <span>Error</span>
        ) : (
          <>
            <div>
              <div className="flex flex-row realtive gap-10">
                <select
                  className="block w-200 text-sm  bg-gray-50  border-2 border-black cursor-pointer  focus:outline-none mb-2"
                  onChange={(e) => {
                    setSelectedRocket(e.currentTarget.value);
                    refetch();
                  }}
                >
                  <option>Select a Rocket</option>
                  {rocketsData.map((rocket) => (
                    <option value={rocket.id}>{rocket.id}</option>
                  ))}
                </select>
                <button
                  className="block w-200 text-sm  bg-gray-50  border-2 border-black cursor-pointer  focus:outline-none mb-2"
                  onClick={() => {
                    setSelectedRocket('');
                  }}
                >
                  Show All Users
                </button>
              </div>
              {selectedRocket === '' ? <AllUsers /> : <UsersOnRocket />}
            </div>
          </>
        )}
      </div>
      <button
        className=" hover:bg-gray-300  font-bold py-2 px-4 border-4 border-black w-24"
        onClick={() => {
          navigate('/');
        }}
      >
        Back
      </button>
    </div>
  );
}
