import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { useRocket } from '../Hooks/hooks-SingleRocket';
import { useAddUser } from '../Hooks/hooks-SingleRocket';
import { useNavigate } from 'react-router-dom';

export function Rocket() {
  const { rocketId } = useParams();

  const { mutate, isLoading: isSaving } = useAddUser();
  const { isError, data, isLoading } = useRocket(rocketId);
  const [userName, setUserName] = useState('');

  const navigate = useNavigate();

  if (isLoading) {
    return 'Loading...';
  }
  if (isError) {
    return <span>Error</span>;
  }

  return (
    <div className="flex justify-center items-center flex-col relative gap-9 top-6">
      <div className="w-96 gap-8">
        <h1 className="text-center font-bold text-xl">{data.name}</h1>

        <div className="">
          <p>{data.description}</p>
        </div>
        <div className="flex flex-col gap-1">
          <form className="flex flex-row ">
            <div className="mt-3">
              <label className="block mb-2 text-sm font-medium text-gray-900 ">
                {' '}
                Add a Passenger
              </label>
              <input
                id="addUser"
                required
                className="block w-200 text-sm  bg-gray-50  border-2 border-black cursor-pointer  focus:outline-none mb-2"
                onChange={(e) => setUserName(e.currentTarget.value)}
              ></input>

              <button
                type="submit"
                className=" hover:bg-gray-300  font-bold py-2 px-4 border-b-4 border-r-4 border-black w-24"
                disabled={isSaving}
                onClick={() =>
                  mutate({ id: uuidv4(), name: userName, rocket: rocketId })
                }
              >
                Add
              </button>
            </div>
          </form>
          <button
            className=" hover:bg-gray-300  font-bold py-2 px-4 border-4 border-black w-24"
            onClick={() => {
              navigate('/');
            }}
          >
            <Link to="/">Back</Link>
          </button>
        </div>
      </div>
    </div>
  );
}
