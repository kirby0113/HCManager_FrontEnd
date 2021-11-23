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
      console.log(json);
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

export const EditUer = (jsondata, id) => {
  //ユーザー編集
  fetch(UsersAPI + '/' + id, {
    method: 'PUT',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(jsondata),
  }).then(() => GetUser());
};
