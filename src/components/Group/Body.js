import {useState, useEffect} from 'react';
import ReactDOM from 'react-dom';

import Button from '@material-ui/core/Button';

import GroupInfo from './GroupInfo';
import Pagination from './Pagination';
import CreateGroupModal from './CreateGroupModal';

import {GroupsAPI} from '../../APILink';

import './Body.css';

const CreateGroup = (props) => {
  return ReactDOM.createPortal(
    <CreateGroupModal modalVisible={props.modalVisible} setModalVisible={props.setModalVisible}></CreateGroupModal>,
    document.getElementById('modal-creategroup')
  );
};

const Body = () => {
  const [offset, setOffset] = useState(0);
  const [Groups, setGroups] = useState();
  const perPage = 2; // 1ページあたりに表示したいアイテムの数
  const [modalVisible, setModalVisible] = useState(false);

  const getGroups = () => {
    fetch(GroupsAPI) //api
      .then((res) => res.json())
      .then((json) => {
        setGroups(json);
      });
  };

  useEffect(() => {
    getGroups();
  }, []);

  Groups ? console.log(Groups) : '';

  return (
    <div className='Body'>
      <CreateGroup modalVisible={modalVisible} setModalVisible={setModalVisible}></CreateGroup>
      <div className='PageTitleFrame'>
        <span className='PageTitle'>グループ一覧</span>
      </div>
      {Groups ? <Pagination setOffset={setOffset} dataleng={Groups.length} perPage={perPage}></Pagination> : ''}
      <div className='addGroupButtonFrame'>
        <Button
          variant='contained'
          color='primary'
          className='addGroupButton'
          onClick={() => {
            setModalVisible(true);
          }}
        >
          グループ追加
        </Button>
      </div>

      {Groups ? (
        <div className='GroupList'>
          {Groups.slice(offset, offset + perPage).map((data) => (
            <GroupInfo data={data} key={data.group_id} setGroups={setGroups}></GroupInfo>
          ))}
        </div>
      ) : (
        ''
      )}
      {Groups ? <Pagination setOffset={setOffset} dataleng={Groups.length} perPage={perPage}></Pagination> : ''}
    </div>
  );
};

export default Body;
