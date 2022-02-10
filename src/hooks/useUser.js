import {useState, useEffect, useContext} from 'react';
import {
  getUsers as getUsersAPI,
  getUser as getUserAPI,
  createUser as createUserAPI,
  editUser,
} from '../components/API/UserAPIs';

import {UserContext} from '../contexts/UserContext';

export const useUser = () => {
  const {users, setUsers, selectUser, setSelectUser} = useContext(UserContext);

  const updateUser = async (data) => {
    return await editUser(data).then(() => {
      return getUsers();
    });
  };

  const deleteUser = () => {};

  const createUser = async (data) => {
    return await createUserAPI(data).then(() => {
      return getUsers();
    });
  };

  const getUser = async (id) => {
    return await getUserAPI(id);
  };

  const getUsers = async () => {
    return await getUsersAPI().then((json) => {
      setUsers(json);
      return json;
    });
  };

  const initSelectUser = () => {
    setSelectUser({
      name: '',
      mail: '',
      password: '',
      role: '',
    });
  };

  return {
    users,
    setUsers,
    selectUser,
    setSelectUser,
    initSelectUser,
    updateUser,
    deleteUser,
    createUser,
    getUser,
    getUsers,
  };
};
