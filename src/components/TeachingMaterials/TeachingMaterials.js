import {useState} from 'react';
import ReactDOM from 'react-dom';
import {BooksAPI} from '../../APILink';
import Button from '@material-ui/core/Button';

import TeachingMaterialInfo from './TeachingMaterialInfo';
import Pagination from './Pagination';
import CreateTeachingMaterialModal from './CreateTeachingMaterialModal';

import './TeachingMaterials.css';
import {useEffect} from 'react';

const CreateTeachingMaterial = (props) => {
  return ReactDOM.createPortal(
    <CreateTeachingMaterialModal
      modalVisible={props.modalVisible}
      setModalVisible={props.setModalVisible}
    ></CreateTeachingMaterialModal>,
    document.getElementById('modal-creategroup')
  );
};

const Questions = () => {
  const [offset, setOffset] = useState(0);
  const perPage = 2; // 1ページあたりに表示したいアイテムの数
  const [modalVisible, setModalVisible] = useState(false);
  const [Books, setBooks] = useState();
  useEffect(() => {
    fetch(BooksAPI) //api
      .then((res) => res.json())
      .then((json) => {
        setBooks(json);
        console.log(json);
      });
  }, []);

  return (
    <div className='Body'>
      <CreateTeachingMaterial modalVisible={modalVisible} setModalVisible={setModalVisible}></CreateTeachingMaterial>
      <div className='TMPageTitleFrame'>
        <span className='TMPageTitle'>教材一覧</span>
      </div>
      <Pagination setOffset={setOffset} dataleng={Books ? Books.length : 0} perPage={perPage}></Pagination>
      <div className='addTMButtonFrame'>
        <Button variant='contained' color='primary' className='addTMButton'>
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
    </div>
  );
};

export default Questions;
