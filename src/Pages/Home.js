import { useNavigate } from 'react-router-dom';
import { Rockets } from '../Components/AllRockets';

export default function Home() {
  let navigate = useNavigate();

  return (
    <div className="">
      <Rockets />
      <button
        onClick={() => {
          navigate('/users');
        }}
      >
        See Passengers
      </button>
    </div>
  );
}
