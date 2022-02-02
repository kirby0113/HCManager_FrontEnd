import {useState, useContext} from 'react';
import {GroupContext} from '../contexts/GroupContext';

export const useGroup = () => {
  const {groups, setGroups, selectGroup, setSelectGroup} = useContext(GroupContext);

  const getGroups = () => {};

  const getGroup = () => {};

  const registerGroup = () => {};

  const deleteGroup = () => {};

  const updateGroup = () => {};

  return {groups, setGroups, selectGroup, setSelectGroup, getGroups, getGroup, registerGroup, deleteGroup, updateGroup};
};
