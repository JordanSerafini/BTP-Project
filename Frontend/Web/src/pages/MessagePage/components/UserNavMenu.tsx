import { useEffect, useState } from 'react';
import messagerieApi from '../../../utils/functions/messagerie.function';
import { User } from '../types/user.interface';
import { Group } from '../types/group.interface';


interface UserNavMenuProps {
    setCurrentGroup: (group: Group) => void;
}

function UserNavMenu({setCurrentGroup}: UserNavMenuProps) {

    const [users, setUsers] = useState<User[]>([]);
    const [groups, setGroups] = useState<Group[]>([]);
    const [content, setContent] = useState<string>('users');

    const fetchUsers = async () => {
        try {
            const users = await messagerieApi.getAllUsers();
            setUsers(users);
        } catch (error) {
            console.error("Error fetching users:", error);
        }
    }

    const fetchGroups = async () => {
        try {
            const groups = await messagerieApi.getUserGroups();
            setGroups(groups);
        } catch (error) {
            console.error("Error fetching groups:", error);
        }
    }

    useEffect(() => {
        fetchUsers();
        fetchGroups();
    }, []);

    console.log(users);
  return (
    <div>
      <div>
        <button onClick={() => setContent('users')}>Utilisateurs</button>
        <button onClick={() => setContent('groups')}>Groupes</button>
      </div>
      <div>
        {content === 'users' && (
          <ul>
            {users.map((user) => (
              <li key={user._id}>
                {user.username}
              </li>
            ))}
          </ul>
        )}
        {content === 'groups' && (
          <ul>
            {groups.map((group) => (
              <li key={group._id}>
                <button>{group.name}</button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}

export default UserNavMenu