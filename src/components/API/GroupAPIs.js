import {GroupsAPI} from '../../APILink';

import {
  createGroupErrorCatch,
  getGroupErrorCatch,
  getCollectionsErrorCatch,
  getGroupsErrorCatch,
  addCollectionErrorCatch,
} from './error/Group';

class GroupError extends Error {
  constructor(response) {
    super(`${response.status} for ${response.url}`);
    this.name = 'GroupError';
    this.status = response.status;
  }
}

export const getGroups = async () => {
  return await fetch(GroupsAPI)
    .then((res) => {
      if (!res.ok) {
        throw new GroupError(res);
      }
      return res.json();
    })
    .then((json) => {
      return {status: 'success', content: json};
    })
    .catch((error) => {
      console.error(error);
      if (error.status === undefined) {
        return getGroupsErrorCatch(-1);
      } else {
        return getGroupsErrorCatch(error.status);
      }
    });
};

export const getGroup = async (id) => {
  return await fetch(GroupsAPI + `${id}`)
    .then((res) => {
      if (!res.ok) {
        throw new GroupError(res);
      }
      return res.json();
    })
    .then((json) => {
      return {status: 'success', content: json};
    })
    .catch((error) => {
      console.error(error);
      if (error.status === undefined) {
        return getGroupErrorCatch(-1);
      } else {
        return getGroupErrorCatch(error.status);
      }
    });
};

export const createGroup = async (data) => {
  return await fetch(GroupsAPI, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      name: data.name,
      summary: data.summary,
      access_key: data.access_key,
      user_id: data.user_id,
    }),
  })
    .then((res) => {
      if (!res.ok) {
        throw new GroupError(res);
      }
      return res.json();
    })
    .then((json) => {
      return {status: 'success', content: json};
    })
    .catch((error) => {
      console.error(error);
      if (error.status === undefined) {
        return createGroupErrorCatch(-1);
      } else {
        return createGroupErrorCatch(error.status);
      }
    });
};

export const getCollections = async (id) => {
  return await fetch(`${GroupsAPI}/${id}/books`)
    .then((res) => {
      if (!res.ok) {
        throw new GroupError(res);
      }
      return res.json();
    })
    .then((json) => {
      console.log(json[0].name);
      return {status: 'success', content: json};
    })
    .catch((error) => {
      console.error(error);
      if (error.status === undefined) {
        return getCollectionsErrorCatch(-1);
      } else {
        return getCollectionsErrorCatch(error.status);
      }
    });
};

export const addCollection = async (data) => {
  console.log(data);
  return await fetch(`${GroupsAPI}/addBook`, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      group_id: data.group_id,
      book_id: data.book_id,
    }),
  })
    .then((res) => {
      if (!res.ok) {
        throw new GroupError(res);
      }
    })
    .then(() => {
      return {status: 'success', content: 'クラス内教材追加に成功しました！'};
    })
    .catch((error) => {
      console.error(error);
      if (error.status === undefined) {
        return addCollectionErrorCatch(-1);
      } else {
        return addCollectionErrorCatch(error.status);
      }
    });
};
