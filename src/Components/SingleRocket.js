import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { useAddUser, useRocket } from '../Hooks/hooks-SingleRocket';

export function Rocket() {
  const { rocketId } = useParams();

  const { mutate, isLoading: isSaving } = useAddUser();
  const { isError, data, isLoading } = useRocket(rocketId);
  const [userName, setUserName] = useState('');

  if (isLoading) {
    return 'Loading...';
  }
  if (isError) {
    return <span>Error</span>;
  }

  return (
    <div>
      <div>
        <Link to="/">Back</Link>
      </div>

      <>
        <h1 className="text-center top-100 font-bold">{data.name}</h1>
        <div>
          <p>{data.description}</p>
        </div>
        <input
          className="border-black"
          onChange={(e) => setUserName(e.currentTarget.value)}
        ></input>

        <button
          disabled={isSaving}
          onClick={() =>
            mutate({ id: uuidv4(), name: userName, rocket: rocketId })
          }
        >
          Add user
        </button>
      </>
    </div>
  );
}
