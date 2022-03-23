import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Rockets } from '../Components/AllRockets';
import { Rocket } from '../Components/SingleRocket';

export default function Home() {
  const [rocketId, setRocketId] = useState('');

  let navigate = useNavigate();

  return (
    <>
      {rocketId !== '' ? <Rocket /> : <Rockets setRocketId={setRocketId} />}
      <button
        onClick={() => {
          navigate('/users');
        }}
      >
        See users
      </button>
    </>
  );
}
