import { Link } from 'react-router-dom';
import { Rockets } from '../Components/AllRockets';

export const Home = () => {
  return (
    <div
      className="flex flex-col justify-center items-center gap-4 relative
      top-6 "
    >
      <Rockets />
      <Link to="/users">
        <div className="hover:bg-gray-300  font-bold py-2 px-4 border-4 border-black h-24 w-32 text-center cursor-pointer">
          All Passengers
        </div>
      </Link>
    </div>
  );
};
