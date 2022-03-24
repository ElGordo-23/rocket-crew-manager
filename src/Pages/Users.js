import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
      return usersOnRocket.map((user) => (
        <ul>
          <li key={user.id}>{user.name}</li>
          <button onClick={() => mutate({ userId: user.id })}>
            Delete User
          </button>
        </ul>
      ));
    }
  }

  function AllUsers() {
    return users.map((user) => (
      <p key={user.id}>
        <p>{user.name}</p>
      </p>
    ));
  }

  return (
    <div>
      <h1>Passengers</h1>
      <div>
        {status === 'loading' ? (
          'Loading...'
        ) : status === 'error' ? (
          <span>Error</span>
        ) : (
          <>
            <div>
              <select
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
              {selectedRocket === '' ? <AllUsers /> : <UsersOnRocket />}
            </div>
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
      <button
        onClick={() => {
          setSelectedRocket('');
        }}
      >
        Show All Users
      </button>
    </div>
  );
}
