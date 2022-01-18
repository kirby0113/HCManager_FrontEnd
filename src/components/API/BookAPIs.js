import {BooksAPI} from '../../APILink';

export const GetBooks = async () => {
  return await fetch(BooksAPI) //api
    .then((res) => res.json())
    .then((json) => {
      // console.log(json);
      return json;
    });
};

export const getBook = async (id) => {
  //id指定で1データ取る
  return await fetch(BooksAPI + '/' + id) //api
    .then((res) => res.json())
    .then((json) => {
      return json;
    });
};

export const CreateBook = (jsonData) => {
  return fetch(BooksAPI, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      name: jsonData.name,
      summary: jsonData.summary,
      access_key: jsonData.access_key,
      user_id: jsonData.user_id,
    }),
  }).then(() => GetBooks());
};
