import {useState, useEffect} from 'react';

import GroupInfo from './GroupInfo';
import Pagination from '../Pagination';

import {GroupsAPI} from '../../APILink';

import {CreateGroupModal} from './CreateGroupModal';

import {SelectPerPage} from '../SelectPerPage';
import {PageTitle} from '../Title';
import {PrimaryButton} from '../Buttons/PrimaryButton';
import {ButtonList} from '../Buttons/ButtonList';
import {InfoCardList} from '../Cards/Lists/InfoCardList';

const Body = () => {
  const [offset, setOffset] = useState(0);
  const [Groups, setGroups] = useState();
  const [perPage, setPerPage] = useState(5);
  const [modalVisible, setModalVisible] = useState(false);
  const [CreateGroupPostData, setCreateGroupPostData] = useState({
    name: '',
    summary: '',
    access_key: '',
    user_id: '',
  });

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

  const CreateGroupFetch = () => {
    fetch(GroupsAPI, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        name: CreateGroupPostData.name,
        summary: CreateGroupPostData.summary,
        access_key: CreateGroupPostData.access_key,
        user_id: CreateGroupPostData.user_id,
      }),
    }).then(() => getGroups());
  };

  return (
    <div className='Body'>
      <PageTitle color='lightBlue'>グループ一覧</PageTitle>
      {Groups ? <Pagination setOffset={setOffset} dataleng={Groups.length} perPage={perPage}></Pagination> : ''}
      <ButtonList>
        <PrimaryButton
          variant='contained'
          className='addGroupButton'
          sizeX='large'
          sizeY='small'
          onClick={() => {
            setModalVisible(true);
          }}
        >
          グループ追加
        </PrimaryButton>
      </ButtonList>
      <SelectPerPage perPage={perPage} setPerPage={setPerPage} />

      {Groups ? (
        <InfoCardList>
          {Groups.slice(offset, Number(offset) + Number(perPage)).map((data) => (
            <GroupInfo data={data} key={data.group_id} setGroups={setGroups}></GroupInfo>
          ))}
        </InfoCardList>
      ) : (
        ''
      )}
      {Groups ? <Pagination setOffset={setOffset} dataleng={Groups.length} perPage={perPage}></Pagination> : ''}
      {modalVisible ? (
        <CreateGroupModal
          onClose={() => setModalVisible(false)}
          PostData={CreateGroupPostData}
          setPostData={setCreateGroupPostData}
          CreateGroupFetch={CreateGroupFetch}
        ></CreateGroupModal>
      ) : (
        ''
      )}
    </div>
  );
};

export default Body;
