import {useState, useEffect} from 'react';

import {
  getBooks as getBooksAPI,
  getBook as getBookAPI,
  createBook as createBookAPI,
  updateBook as updateBookAPI,
  deleteBook as deleteBookAPI,
  addRecode as addRecodeAPI,
  removeRecode as removeRecodeAPI,
  getRecodes as getRecodesAPI,
  checkBookInQuestions,
  getRecodes,
} from '../components/API/BookAPIs';

export const useBook = () => {
  const [books, setBooks] = useState();

  const getBooks = async () => {
    return await getBooksAPI().then((json) => {
      return json;
    });
  };

  const createBook = (postData) => {
    createBookAPI(postData).then((json) => {
      console.log(json);
      setBooks(json);
    });
  };

  const deleteBook = async (id, name) => {
    if (await checkBookInQuestions(id)) {
      alert('問題が登録されているため、削除できません。');
      return;
    }
    if (!confirm('教材名：' + name + ' 本当に削除しますか？')) {
      return;
    }
    deleteBookAPI(id).then(() => {
      window.location.reload(); //404がどうしても返されるので強制的にリロードしてます
    });
  };

  const updateBook = async (id, postData) => {
    return await updateBookAPI(id, postData);
  };

  const getBook = async (id) => {
    return await getBookAPI(id);
  };

  /* 教材内問題の登録・削除用 */

  const addRecode = async (postData) => {
    return await addRecodeAPI(postData);
  };

  const removeRecode = async (postData) => {
    return await removeRecodeAPI(postData);
  };

  const getRecode = async (id) => {
    return await getRecodes(id);
  };

  return {books, setBooks, getBooks, createBook, deleteBook, updateBook, getBook, addRecode, removeRecode, getRecode};
};

/* Bookの編集・作成用のFormフック */

export const useBookPost = () => {
  const [bookPost, setBookPost] = useState({name: '', summary: '', access_key: '', user_id: ''});

  return {bookPost, setBookPost};
};

export const useBookRecodePost = (id) => {
  const [bookRecodePost, setBookRecodePost] = useState({book_id: id, question_id: 1});

  return {bookRecodePost, setBookRecodePost};
};
