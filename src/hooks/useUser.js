import {useState, useEffect} from 'react';
import {GetUsers} from '../components/API/UserAPIs';

export const useUser = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    GetUsers().then((json) => {
      setUsers(json);
    });
  }, []);

  return {users, setUsers};
};
