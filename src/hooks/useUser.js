import {useState, useEffect} from 'react';
import {GetUsers, getUser as getUserAPI} from '../components/API/UserAPIs';

export const useUser = () => {
  const [users, setUsers] = useState([{user_id: '', name: ''}]);

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
