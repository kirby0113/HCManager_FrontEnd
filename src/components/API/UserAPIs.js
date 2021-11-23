import {GroupsAPI, UsersAPI} from '../../APILink';

export const GetUser = (id) => {
  //id指定で1データ取る
  fetch(GroupsAPI + '/' + id) //api
    .then((res) => res.json())
    .then((json) => {
      return json;
    });
};
export const GetUsers = () => {
  //全ユーザー取得
  return fetch(UsersAPI) //api
    .then((res) => res.json())
    .then((json) => {
      //   console.log(json);
      return json;
    });
};

export const CreateUser = (jsondata) => {
  //ユーザー作成
  fetch(UsersAPI, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(jsondata),
  }).then(() => GetUser());
};

export const EditUser = async (jsondata, password) => {
  //ユーザー編集
  return fetch(UsersAPI + '/' + jsondata.user_id, {
    method: 'PUT',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      name: jsondata.name,
      mail: jsondata.mail,
      role: jsondata.role,
      password: password,
    }),
  }).then(() => GetUsers());
};
