import {useState, useEffect} from 'react';
import {BooksAPI} from '../../APILink';
import Button from '@material-ui/core/Button';

import TeachingMaterialInfo from './TeachingMaterialInfo';
import Pagination from '../Pagination';
import {CreateTeachingMaterialModal} from './CreateTeachingMaterialModal';
import {SelectPerPage} from '../SelectPerPage';
import {PageTitle} from '../Title';

import {GetUsers} from '../API/UserAPIs';

import './TeachingMaterials.css';
import {CreateBook} from '../API/BookAPIs';

const Questions = () => {
  const [offset, setOffset] = useState(0);
  const [perPage, setPerPage] = useState(5); // 1ページあたりに表示したいアイテムの数
  const [modalVisible, setModalVisible] = useState(false);
  const [Books, setBooks] = useState([]);
  const [Users, setUsers] = useState([]); //Formで使用
  const [BookPost, setBookPost] = useState({
    name: '',
    summary: '',
    access_key: '',
    user_id: '',
  });

  const getBookFetch = () => {
    fetch(BooksAPI) //api
      .then((res) => res.json())
      .then((json) => {
        setBooks(json);
        console.log(json);
      });
  };
  useEffect(() => {
    getBookFetch();
  }, []);

  useEffect(async () => {
    setUsers(await GetUsers());
  }, []);

  const CreateBookFetch = () => {
    CreateBook(BookPost).then((json) => setBooks(json));
  };

  return (
    <div className='Body'>
      <PageTitle color='pink'>教材一覧</PageTitle>
      <Pagination setOffset={setOffset} dataleng={Books ? Books.length : 0} perPage={perPage}></Pagination>
      <div className='addTMButtonFrame'>
        <Button variant='contained' color='primary' className='addTMButton' onClick={() => setModalVisible(true)}>
          追加
        </Button>
        <Button variant='contained' color='primary' className='addTMsButton'>
          複数追加
        </Button>
      </div>
      <SelectPerPage perPage={perPage} setPerPage={setPerPage} />
      {Books ? (
        <div className='TMList'>
          {Books.slice(offset, Number(offset) + Number(perPage)).map((data) => (
            <TeachingMaterialInfo data={data} key={data.books_id} getBook={getBookFetch}></TeachingMaterialInfo>
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
