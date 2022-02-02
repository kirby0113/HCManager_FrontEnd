import {useState} from 'react';

export const useGroup = () => {
  const [groups, setGroups] = useState();

  const getGroups = () => {};

  const getGroup = () => {};

  const registerGroup = () => {};

  const deleteGroup = () => {};

  const updateGroup = () => {};

  return {groups, setGroups, getGroups, getGroup, registerGroup, deleteGroup, updateGroup};
};
