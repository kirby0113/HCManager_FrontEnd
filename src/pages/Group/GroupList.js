import {useState, useEffect} from 'react';

import {useGroup} from '../../hooks/useGroup';
import {usePagination} from '../../hooks/usePagination';

import GroupInfo from '../../components/pages/Group/GroupInfo';
import Pagination from '../../components/Pagination/Pagination';

import {CreateGroupModal} from '../../components/Modals/Create/CreateGroupModal';

import {SelectPerPage} from '../../components/Pagination/SelectPerPage';
import {PageTitle} from '../../components/Utilities/Title';
import {PrimaryButton} from '../../components/Buttons/PrimaryButton';
import {AddButtonList} from '../../components/Buttons/Lists/AddButtonList';
import {InfoCardList} from '../../components/Cards/Lists/InfoCardList';

import {LoadingWindow} from '../../components/Utilities/Loading';
import {Breadcrumbs} from '../../components/Breadcrumbs';
import {useContext} from 'react';
import {AuthContext} from '../../contexts/AuthContext';
import {Redirect} from 'react-router';

const GroupList = () => {
  const {groups, setGroups, selectGroup, selectGroupInit, setSelectGroup, getGroups, createGroup} = useGroup();
  const {perPage, setPerPage, offset, setOffset} = usePagination();
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(true);
  const {authData} = useContext(AuthContext);

  if (!authData) {
    return <Redirect to='/' />;
  }

  useEffect(() => {
    setOffset(0);
    setLoading(true);
    getGroups().then(() => setLoading(false));
  }, []);

  const openCreateModal = () => {
    selectGroupInit();
    setModalVisible(true);
  };

  return (
    <div className='Body'>
      {loading ? (
        <LoadingWindow></LoadingWindow>
      ) : (
        <div>
          <PageTitle color='lightBlue'>グループ一覧</PageTitle>
          <Breadcrumbs />
          {groups ? <Pagination setOffset={setOffset} dataleng={groups.length} perPage={perPage}></Pagination> : ''}
          <AddButtonList>
            <PrimaryButton sizeX='large' sizeY='small' onClick={() => openCreateModal()}>
              グループ追加
            </PrimaryButton>
          </AddButtonList>
          <SelectPerPage perPage={perPage} setPerPage={setPerPage} />

          {groups && (
            <InfoCardList>
              {groups.slice(offset, Number(offset) + Number(perPage)).map((data) => (
                <GroupInfo data={data} key={data.group_id} setGroups={setGroups}></GroupInfo>
              ))}
            </InfoCardList>
          )}
          {groups && <Pagination setOffset={setOffset} dataleng={groups.length} perPage={perPage}></Pagination>}
          {modalVisible && (
            <CreateGroupModal
              onClose={() => setModalVisible(false)}
              PostData={selectGroup}
              setPostData={setSelectGroup}
              CreateGroupFetch={() => createGroup(selectGroup)}
            ></CreateGroupModal>
          )}
        </div>
      )}
    </div>
  );
};

export default GroupList;
