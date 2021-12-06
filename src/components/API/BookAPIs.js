import {BooksAPI} from '../../APILink';

export const GetBooks = async () => {
  return await fetch(BooksAPI) //api
    .then((res) => res.json())
    .then((json) => {
      // console.log(json);
      return json;
    });
};

export const CreateBook = (jsondata) => {
  return fetch(BooksAPI, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      name: jsondata.name,
      summary: jsondata.summary,
      access_key: jsondata.access_key,
      user_id: jsondata.user_id,
    }),
  }).then(() => GetBooks());
};
