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
