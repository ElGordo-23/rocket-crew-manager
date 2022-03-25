import { Link } from 'react-router-dom';
import { Rockets } from '../Components/AllRockets';

export default function Home() {
  return (
    <div
      className="flex flex-col justify-center items-center gap-4 relative
      top-6 "
    >
      <Rockets />
      <div className="hover:bg-gray-300  font-bold py-2 px-4 border-4 border-black w-24 h-24 text-center ">
        <Link to="/users">All Passengers</Link>
      </div>
    </div>
  );
}
