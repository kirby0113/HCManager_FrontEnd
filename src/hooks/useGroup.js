import {useContext} from 'react';
import {GroupContext} from '../contexts/GroupContext';

import {
  getGroups as getGroupsAPI,
  getGroup as getGroupAPI,
  createGroup as createGroupAPI,
  getCollections as getCollectionsAPI,
  addCollection as addCollectionAPI,
  removeCollection as removeCollectionAPI,
} from '../components/API/GroupAPIs';
import {ErrorContext} from '../contexts/ErrorContext';

export const useGroup = () => {
  const {groups, setGroups, selectGroup, setSelectGroup} = useContext(GroupContext);
  const {setError, setIsOpenError} = useContext(ErrorContext);

  const getGroups = async () => {
    return await getGroupsAPI().then((json) => {
      if (json.status === 'fail') {
        setIsOpenError(true);
        setError(json.content);
      } else {
        setGroups(json.content);
      }
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
    return await createGroupAPI(data).then((json) => {
      if (json.status === 'fail') {
        setIsOpenError(true);
        setError(json.content);
      }
      getGroups();
    });
  };

  const deleteGroup = () => {};

  const updateGroup = () => {};

  const getCollections = async (id) => {
    return await getCollectionsAPI(id).then((json) => {
      if (json.status === 'fail') {
        setIsOpenError(true);
        setError(json.content);
        return {status: 'fail', content: []};
      } else {
        return json;
      }
    });
  };

  const addCollection = async (data) => {
    if (data.group_id === '' || data.book_id === '') {
      setIsOpenError(true);
      setError('追加したい教材を選択してください。');
      return {status: 'fail', content: '教材を選択してください。'};
    }
    return await addCollectionAPI(data).then(async (json) => {
      if (json.status === 'fail') {
        setIsOpenError(true);
        setError(json.content);
      }
      return await getCollections(data.group_id);
    });
  };

  const removeCollection = async (data) => {
    if (data.group_id === '' || data.book_id === '') {
      setIsOpenError(true);
      setError('削除したい教材を選択してください。');
      return {status: 'fail', content: '教材を選択してください。'};
    }
    return await removeCollectionAPI(data).then(async (json) => {
      if (json.status === 'fail') {
        setIsOpenError(true);
        setError(json.content);
      }
      return await getCollections(data.group_id);
    });
  };

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
    getCollections,
    addCollection,
    removeCollection,
  };
};
