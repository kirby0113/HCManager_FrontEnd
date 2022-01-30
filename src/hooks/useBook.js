import {useState, useEffect} from 'react';

import {getBooks, getBook as getBookAPI} from '../components/API/BookAPIs';

export const useBook = () => {
  const [books, setBooks] = useState();

  useEffect(() => {
    getBooks().then((json) => setBooks(json));
  }, []);

  const createBook = () => {};
  const deleteBook = () => {};
  const updateBook = () => {};
  const getBook = async (id) => {
    return await getBookAPI(id);
  };

  return {books, setBooks, createBook, deleteBook, updateBook, getBook};
};

export const useBookPost = () => {
  const [bookPost, setBookPost] = useState({name: '', summary: '', access_key: '', user_id: ''});
};
