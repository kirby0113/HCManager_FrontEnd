import {useState, useEffect} from 'react';

import Button from '@material-ui/core/Button';

import GroupInfo from './GroupInfo';
import Pagination from './Pagination';

import {GroupsAPI} from '../../APILink';

import {CreateGroupModal} from './CreateGroupModal';

import './Body.css';

const Body = () => {
  const [offset, setOffset] = useState(0);
  const [Groups, setGroups] = useState();
  const perPage = 2; // 1ページあたりに表示したいアイテムの数
  const [modalVisible, setModalVisible] = useState(false);
  const [CreateGroupPostData, setCreateGroupPostData] = useState({
    name: '',
    summary: '',
    access_key: '',
    user_id: '',
  });

  useEffect(() => {
    fetch(GroupsAPI) //api
      .then((res) => res.json())
      .then((json) => {
        setGroups(json);
      });
  }, []);

  return (
    <div>
      <div className='Body'>
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
              <GroupInfo data={data} key={data.group_id}></GroupInfo>
            ))}
          </div>
        ) : (
          ''
        )}
        {Groups ? <Pagination setOffset={setOffset} dataleng={Groups.length} perPage={perPage}></Pagination> : ''}
      </div>
      {modalVisible ? (
        <CreateGroupModal
          onClose={() => setModalVisible(false)}
          PostData={CreateGroupPostData}
          setPostData={setCreateGroupPostData}
        ></CreateGroupModal>
      ) : (
        ''
      )}
    </div>
  );
};

export default Body;
