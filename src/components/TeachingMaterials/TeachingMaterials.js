import {useState, useEffect} from 'react';
import {BooksAPI} from '../../APILink';
import Button from '@material-ui/core/Button';

import TeachingMaterialInfo from './TeachingMaterialInfo';
import Pagination from './Pagination';
import {CreateTeachingMaterialModal} from './CreateTeachingMaterialModal';

import {GetUsers} from '../API/UserAPIs';

import './TeachingMaterials.css';
import {CreateBook} from '../API/BookAPIs';

const Questions = () => {
  const [offset, setOffset] = useState(0);
  const perPage = 2; // 1ページあたりに表示したいアイテムの数
  const [modalVisible, setModalVisible] = useState(false);
  const [Books, setBooks] = useState([]);
  const [Users, setUsers] = useState([]); //Formで使用
  const [BookPost, setBookPost] = useState({
    name: '',
    summary: '',
    access_key: '',
    user_id: '',
  });
  useEffect(() => {
    fetch(BooksAPI) //api
      .then((res) => res.json())
      .then((json) => {
        setBooks(json);
        console.log(json);
      });
  }, []);

  useEffect(async () => {
    setUsers(await GetUsers());
  }, []);

  const CreateBookFetch = () => {
    CreateBook(BookPost).then((json) => setBooks(json));
  };

  return (
    <div className='Body'>
      <div className='TMPageTitleFrame'>
        <span className='TMPageTitle'>教材一覧</span>
      </div>
      <Pagination setOffset={setOffset} dataleng={Books ? Books.length : 0} perPage={perPage}></Pagination>
      <div className='addTMButtonFrame'>
        <Button variant='contained' color='primary' className='addTMButton' onClick={() => setModalVisible(true)}>
          追加
        </Button>
        <Button variant='contained' color='primary' className='addTMsButton'>
          複数追加
        </Button>
      </div>
      {Books ? (
        <div className='TMList'>
          {Books.slice(offset, offset + perPage).map((data) => (
            <TeachingMaterialInfo data={data} key={data.books_id}></TeachingMaterialInfo>
          ))}
        </div>
      ) : (
        ''
      )}
      <Pagination setOffset={setOffset} dataleng={Books ? Books.length : 0} perPage={perPage}></Pagination>
      {modalVisible ? (
        <CreateTeachingMaterialModal
          BookPost={BookPost}
          setBookPost={setBookPost}
          onClose={() => setModalVisible(false)}
          Users={Users}
          CreateBookFetch={CreateBookFetch}
        ></CreateTeachingMaterialModal>
      ) : (
        ''
      )}
    </div>
  );
};

export default Questions;
