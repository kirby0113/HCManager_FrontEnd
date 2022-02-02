import {GroupsAPI} from '../../APILink';

export const getGroups = async () => {
  return await fetch(GroupsAPI)
    .then((res) => res.json())
    .then((json) => {
      return json;
    });
};
