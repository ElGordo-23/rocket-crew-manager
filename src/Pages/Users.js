import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useRockets } from '../Hooks/hooks-AllRockets';
import { useUsers } from '../Hooks/hooks-Users';

export default function Users() {
  const { data: rocketsData } = useRockets();

  let navigate = useNavigate();

  const { data: users, isLoading } = useUsers();

  if (isLoading) {
    return 'Loading...';
  }

  return (
    <div className="flex justify-center items-center flex-col relative gap-9 top-6">
      <h1 className="text-center font-bold text-xl">Passengers</h1>
      <div className="flex justify-center items-center">
        <div>
          <div className="flex flex-row realtive gap-10">
            <select
              className=" w-250 text-sm  bg-gray-50  border-2 border-black cursor-pointer mb-2"
              onChange={(e) => {
                navigate(`/users/rocket/${e.currentTarget.value}`);
              }}
            >
              <option>Select a Rocket</option>
              {rocketsData.map((rocket) => (
                <option value={rocket.id}>{rocket.id}</option>
              ))}
            </select>
            <div className="grid grid-cols-2 lg:grid-cols-4 ">
              {users.map((user) => (
                <div key={user.id} className="cursor-pointer hover:bg-gray-300">
                  <Link to={`/users/${user.id}`}>
                    <p>{user.name}</p>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
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
