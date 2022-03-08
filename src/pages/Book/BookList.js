import {useState, useEffect} from 'react';

import {useBook, useBookPost} from '../../hooks/useBook';
import {useUser} from '../../hooks/useUser';
import {usePagination} from '../../hooks/usePagination';

import BookInfo from '../../components/pages/Book/BookInfo';
import Pagination from '../../components/Pagination/Pagination';
import {CreateTeachingMaterialModal} from '../../components/Modals/Create/CreateBookModal';
import {SelectPerPage} from '../../components/Pagination/SelectPerPage';
import {PageTitle} from '../../components/Utilities/Title';
import {InfoCardList} from '../../components/Cards/Lists/InfoCardList';
import {PrimaryButton} from '../../components/Buttons/PrimaryButton';
import {AddButtonList} from '../../components/Buttons/Lists/AddButtonList';
import {LoadingWindow} from '../../components/Utilities/Loading';
import {Breadcrumbs} from '../../components/Breadcrumbs';
import {useContext} from 'react';
import {AuthContext} from '../../contexts/AuthContext';
import {Redirect} from 'react-router';

const BookList = () => {
  const {authData} = useContext(AuthContext);

  if (!authData) {
    return <Redirect to='/' />;
  }
  const {books, createBook, getBooks} = useBook();
  const {perPage, setPerPage, offset, setOffset} = usePagination();
  const {users} = useUser();
  const {bookPost, setBookPost} = useBookPost();
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setOffset(0);
    setLoading(true);
    getBooks().then(() => setLoading(false));
  }, []);

  return loading ? (
    <LoadingWindow />
  ) : (
    <div className='Body'>
      <PageTitle color='pink'>教材一覧</PageTitle>
      <Breadcrumbs />
      <Pagination setOffset={setOffset} dataleng={books ? books.length : 0} perPage={perPage}></Pagination>
      <AddButtonList>
        <PrimaryButton variant='contained' onClick={() => setModalVisible(true)} sizeX='large' sizeY='small'>
          追加
        </PrimaryButton>
        <PrimaryButton variant='contained' sizeX='large' sizeY='small'>
          複数追加
        </PrimaryButton>
      </AddButtonList>
      <SelectPerPage perPage={perPage} setPerPage={setPerPage} />
      {books ? (
        <InfoCardList>
          {books.slice(offset, Number(offset) + Number(perPage)).map((data) => (
            <BookInfo data={data} key={data.book_id}></BookInfo>
          ))}
        </InfoCardList>
      ) : (
        ''
      )}
      <Pagination setOffset={setOffset} dataleng={books ? books.length : 0} perPage={perPage}></Pagination>
      {modalVisible ? (
        <CreateTeachingMaterialModal
          BookPost={bookPost}
          setBookPost={setBookPost}
          onClose={() => setModalVisible(false)}
          Users={users}
          createBookFetch={() => createBook(bookPost)}
        ></CreateTeachingMaterialModal>
      ) : (
        ''
      )}
    </div>
  );
};

export default BookList;
