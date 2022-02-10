import {GroupsAPI, UsersAPI} from '../../APILink';

export const getUser = async (id) => {
  //id指定で1データ取る
  return await fetch(UsersAPI + '/' + id) //api
    .then((res) => res.json())
    .then((json) => {
      return json;
    });
};
export const getUsers = async () => {
  //全ユーザー取得
  return await fetch(UsersAPI) //api
    .then((res) => res.json())
    .then((json) => {
      // console.log(json);
      return json;
    });
};

export const createUser = (jsonData) => {
  //ユーザー作成
  return fetch(UsersAPI, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      name: jsonData.name,
      mail: jsonData.mail,
      role: jsonData.role,
      password: jsonData.password,
    }),
  });
};

export const editUser = async (jsonData) => {
  //ユーザー編集
  return fetch(UsersAPI + '/' + jsonData.user_id, {
    method: 'PUT',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      name: jsonData.name,
      mail: jsonData.mail,
      role: jsonData.role,
      password: jsonData.password,
    }),
  });
};

export const deleteUser = async (id) => {
  return await fetch(UsersAPI + '/' + id, {
    method: 'DELETE',
  }) //api
    .then((res) => res);
};
