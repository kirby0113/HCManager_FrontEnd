import {useState, useEffect} from 'react';

import {
  getBooks as getBooksAPI,
  getBook as getBookAPI,
  createBook as createBookAPI,
  deleteBook as deleteBookAPI,
} from '../components/API/BookAPIs';

export const useBook = () => {
  const [books, setBooks] = useState();

  const getBooks = () => {
    getBooksAPI().then((json) => setBooks(json));
  };

  const createBook = (postData) => {
    createBookAPI(postData).then((json) => {
      setBooks(json);
    });
  };

  const deleteBook = (id) => {
    deleteBookAPI(id).then((json) => {
      setBooks(json);
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
