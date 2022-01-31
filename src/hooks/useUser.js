import {useState, useEffect, useContext} from 'react';
import {getUsers as getUsersAPI, getUser as getUserAPI} from '../components/API/UserAPIs';

import {UserContext} from '../contexts/UserContext';

export const useUser = () => {
  const {users, setUsers} = useContext(UserContext);

  const updateUser = () => {};

  const deleteUser = () => {};

  const createUser = () => {};

  const getUser = async (id) => {
    return await getUserAPI(id);
  };

  const getUsers = async () => {
    return await getUsersAPI().then((json) => {
      setUsers(json);
      return json;
    });
  };

  useEffect(() => {
    getUsers();
  }, []);

  return {users, setUsers, updateUser, deleteUser, createUser, getUser, getUsers};
};

export const useUserPost = () => {
  const [userPost, setUserPost] = useState({name: '', mail: '', password: '', role: ''});
};
