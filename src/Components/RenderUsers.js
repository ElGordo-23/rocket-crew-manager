import { Link, useParams } from 'react-router-dom';
import { useUsersOnSelectedRocket } from '../Hooks/hooks-Users';

export function UsersOnRocket() {
  const { rocketId } = useParams();

  const {
    data: usersOnRocket,
    isLoading: loadingUsers,
    refetch,
  } = useUsersOnSelectedRocket(rocketId, { enabled: !!rocketId });
  return (
    <div>
      {rocketId}
      {usersOnRocket.map((user) => (
        <ul>
          <Link to={`/users/${user.id}`}>
            <li key={user.id} className="cursor-pointer hover:bg-gray-300">
              {user.name}
            </li>
          </Link>
        </ul>
      ))}
    </div>
  );
}
