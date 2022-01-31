import {useState, useEffect, useContext} from 'react';
import {GetUsers, getUser as getUserAPI} from '../components/API/UserAPIs';

import {UserContext} from '../contexts/UserContext';

export const useUser = () => {
  const {users, setUsers} = useContext(UserContext);

  const updateUser = () => {};

  const deleteUser = () => {};

  const createUser = () => {};

  const getUser = async (id) => {
    return await getUserAPI(id);
  };

  useEffect(() => {
    GetUsers().then((json) => {
      setUsers(json);
    });
  }, []);

  return {users, setUsers, updateUser, deleteUser, createUser, getUser};
};

export const useUserPost = () => {
  const [userPost, setUserPost] = useState({name: '', mail: '', password: '', role: ''});
};
