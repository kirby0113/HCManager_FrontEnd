import {useContext} from 'react';
import {GroupContext} from '../contexts/GroupContext';

import {
  getGroups as getGroupsAPI,
  getGroup as getGroupAPI,
  createGroup as createGroupAPI,
} from '../components/API/GroupAPIs';
import {ErrorContext} from '../contexts/ErrorContext';

export const useGroup = () => {
  const {groups, setGroups, selectGroup, setSelectGroup} = useContext(GroupContext);
  const {error, setError, isOpenError, setIsOpenError} = useContext(ErrorContext);

  const getGroups = async () => {
    return await getGroupsAPI().then((json) => {
      if (json.status === 'success') {
        setGroups(json.content);
      }
      return json;
    });
  };

  const getGroup = async (id) => {
    return await getGroupAPI(id).then((json) => {
      if (json.status === 'fail') {
        setIsOpenError(true);
        setError(json.content);
      } else {
        setGroups(json.content);
      }
    });
  };

  const createGroup = async (data) => {
    return await createGroupAPI(data).then(() => getGroups());
  };

  const deleteGroup = () => {};

  const updateGroup = () => {};

  const selectGroupInit = () => {
    setSelectGroup({name: '', summary: '', access_key: '', user_id: ''});
  };

  return {
    groups,
    setGroups,
    selectGroup,
    selectGroupInit,
    setSelectGroup,
    getGroups,
    getGroup,
    createGroup,
    deleteGroup,
    updateGroup,
  };
};
