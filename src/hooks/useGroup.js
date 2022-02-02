import {useState, useContext} from 'react';
import {GroupContext} from '../contexts/GroupContext';

import {
  getGroups as getGroupsAPI,
  getGroup as getGroupAPI,
  createGroup as createGroupAPI,
} from '../components/API/GroupAPIs';

export const useGroup = () => {
  const {groups, setGroups, selectGroup, setSelectGroup} = useContext(GroupContext);

  const getGroups = async () => {
    return await getGroupsAPI().then((json) => {
      setGroups(json);
      return json;
    });
  };

  const getGroup = async (id) => {
    return await getGroupAPI(id);
  };

  const createGroup = async (data) => {
    return await createGroupAPI(data).then(() => getGroups());
  };

  const deleteGroup = () => {};

  const updateGroup = () => {};

  return {groups, setGroups, selectGroup, setSelectGroup, getGroups, getGroup, createGroup, deleteGroup, updateGroup};
};
