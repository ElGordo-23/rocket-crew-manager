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
        <div className="flex-col">
          <div>
            <p>{data.description}</p>
          </div>
          <form className="relative">
            <div className="md-6">
              <label
                for="addUser"
                className="block mb-2 text-sm font-medium text-gray-900 "
              >
                {' '}
                Add Passenger
              </label>
              <input
                id="addUser"
                required
                className="block w-200 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 cursor-pointer dark:text-gray-400 focus:outline-none focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                onChange={(e) => setUserName(e.currentTarget.value)}
              ></input>

              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-r-4 border-blue-700 hover:border-blue-500 rounded"
                disabled={isSaving}
                onClick={() =>
                  mutate({ id: uuidv4(), name: userName, rocket: rocketId })
                }
              >
                Add
              </button>
            </div>
          </form>
        </div>
      </>
    </div>
  );
}
