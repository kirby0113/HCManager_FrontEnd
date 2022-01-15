import {useState, useEffect} from 'react';
import {BooksAPI} from '../../APILink';

import TeachingMaterialInfo from './TeachingMaterialInfo';
import Pagination from '../Pagination';
import {CreateTeachingMaterialModal} from './CreateTeachingMaterialModal';
import {SelectPerPage} from '../SelectPerPage';
import {PageTitle} from '../Utilities/Title';
import {InfoCardList} from '../Cards/Lists/InfoCardList';
import {PrimaryButton} from '../Buttons/PrimaryButton';
import {AddButtonList} from '../Buttons/Lists/AddButtonList';

import {GetUsers} from '../API/UserAPIs';
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
      <AddButtonList>
        <PrimaryButton variant='contained' onClick={() => setModalVisible(true)} sizeX='large' sizeY='small'>
          追加
        </PrimaryButton>
        <PrimaryButton variant='contained' sizeX='large' sizeY='small'>
          複数追加
        </PrimaryButton>
      </AddButtonList>
      <SelectPerPage perPage={perPage} setPerPage={setPerPage} />
      {Books ? (
        <InfoCardList>
          {Books.slice(offset, Number(offset) + Number(perPage)).map((data) => (
            <TeachingMaterialInfo data={data} key={data.books_id} getBook={getBookFetch}></TeachingMaterialInfo>
          ))}
        </InfoCardList>
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
