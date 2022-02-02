import {useState, useEffect} from 'react';

import {useGroup} from '../../hooks/useGroup';

import GroupInfo from '../../components/pages/Group/GroupInfo';
import Pagination from '../../components/Pagination/Pagination';

import {GroupsAPI} from '../../APILink';

import {CreateGroupModal} from '../../components/Modals/Create/CreateGroupModal';

import {SelectPerPage} from '../../components/Pagination/SelectPerPage';
import {PageTitle} from '../../components/Utilities/Title';
import {PrimaryButton} from '../../components/Buttons/PrimaryButton';
import {AddButtonList} from '../../components/Buttons/Lists/AddButtonList';
import {InfoCardList} from '../../components/Cards/Lists/InfoCardList';

const GroupList = () => {
  const {groups, setGroups, selectGroup, selectGroupInit, setSelectGroup, getGroups, createGroup} = useGroup();
  const [offset, setOffset] = useState(0);
  const [perPage, setPerPage] = useState(5);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    getGroups();
  }, []);

  const openCreateModal = () => {
    selectGroupInit();
    setModalVisible(true);
  };

  return (
    <div className='Body'>
      <PageTitle color='lightBlue'>グループ一覧</PageTitle>
      {groups ? <Pagination setOffset={setOffset} dataleng={groups.length} perPage={perPage}></Pagination> : ''}
      <AddButtonList>
        <PrimaryButton sizeX='large' sizeY='small' onClick={() => openCreateModal()}>
          グループ追加
        </PrimaryButton>
      </AddButtonList>
      <SelectPerPage perPage={perPage} setPerPage={setPerPage} />

      {groups ? (
        <InfoCardList>
          {groups.slice(offset, Number(offset) + Number(perPage)).map((data) => (
            <GroupInfo data={data} key={data.group_id} setGroups={setGroups}></GroupInfo>
          ))}
        </InfoCardList>
      ) : (
        ''
      )}
      {groups ? <Pagination setOffset={setOffset} dataleng={groups.length} perPage={perPage}></Pagination> : ''}
      {modalVisible ? (
        <CreateGroupModal
          onClose={() => setModalVisible(false)}
          PostData={selectGroup}
          setPostData={setSelectGroup}
          CreateGroupFetch={() => createGroup(selectGroup)}
        ></CreateGroupModal>
      ) : (
        ''
      )}
    </div>
  );
};

export default GroupList;
