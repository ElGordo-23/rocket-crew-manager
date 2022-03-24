import { useNavigate } from 'react-router-dom';
import { Rockets } from '../Components/AllRockets';

export default function Home() {
  let navigate = useNavigate();

  return (
    <>
      <Rockets />
      <button
        className="object-center"
        onClick={() => {
          navigate('/users');
        }}
      >
        See users
      </button>
    </>
  );
}
