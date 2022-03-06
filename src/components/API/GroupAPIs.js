import {GroupsAPI} from '../../APILink';

import {getGroupsErrorCatch} from './error/Group';

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
      console.error('ログイン失敗', error);
      if (error.status === undefined) {
        return getGroupsErrorCatch(-1);
      } else {
        return getGroupsErrorCatch(error.status);
      }
    });
};

export const getGroup = async (id) => {
  return await fetch(GroupsAPI + `${id}`)
    .then((res) => res.json())
    .then((json) => json);
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
  }).then((res) => {
    if (res.errors || res.error) {
      throw new Error('GroupCreateError');
    }
  });
};
