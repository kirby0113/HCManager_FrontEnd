import {GroupsAPI} from '../../APILink';

export const getGroups = async () => {
  return await fetch(GroupsAPI)
    .then((res) => res.json())
    .then((json) => {
      return json;
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
