import {useState, useEffect} from 'react';

import {
  getBooks as getBooksAPI,
  getBook as getBookAPI,
  createBook as createBookAPI,
  deleteBook as deleteBookAPI,
  checkBookInQuestions,
} from '../components/API/BookAPIs';

export const useBook = () => {
  const [books, setBooks] = useState();

  const getBooks = () => {
    getBooksAPI().then((json) => setBooks(json));
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

  const updateBook = () => {};

  const getBook = async (id) => {
    return await getBookAPI(id);
  };

  useEffect(() => {
    getBooks();
  }, []);

  return {books, setBooks, createBook, deleteBook, updateBook, getBook};
};

export const useBookPost = () => {
  const [bookPost, setBookPost] = useState({name: '', summary: '', access_key: '', user_id: ''});
};
