import {useState, useEffect} from 'react';
import styled from 'styled-components';

import {EditUserModal} from '../../components/Modals/Edit/EditUserModal';
import {CreateUserModal} from '../../components/Modals/Create/CreateUserModal';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import UserPagination from '../../components/Pagination/Pagination';
import UserInfo from '../../components/pages/Users/UserInfo';
import {PrimaryButton} from '../../components/Buttons/PrimaryButton';
import {AddButtonList} from '../../components/Buttons/Lists/AddButtonList';

import {SelectPerPage} from '../../components/Pagination/SelectPerPage';
import {PageTitle} from '../../components/Utilities/Title';

import {useUser} from '../../hooks/useUser';

const UserTable = styled(TableContainer)`
  position: relative;
  left: 50%;
  transform: translateX(-50%);
  width: 80% !important;
`;

const UserList = () => {
  const {users, setUsers, selectUser, setSelectUser, getUsers, createUser, updateUser, deleteUser} = useUser();
  const [isOpenEditModal, setIsOpenEditModal] = useState(false);
  const [isOpenCreateModal, setIsOpenCreateModal] = useState(false);

  const EditUserFetch = () => {
    updateUser(selectUser).then((json) => setUsers(json));
  };

  const CreateUserFetch = () => {
    createUser(selectUser).then((json) => setUsers(json));
  };

  const OpenEditModal = (data) => {
    setSelectUser({...data, password: ''});
    setIsOpenEditModal(true);
  };

  const OpenCreateModal = () => {
    setSelectUser({
      name: '',
      mail: '',
      password: '',
      role: '',
    });
    setIsOpenCreateModal(true);
  };

  useEffect(() => {
    getUsers();
  }, []);

  const [offset, setOffset] = useState(0);
  const [perPage, setPerPage] = useState(5); // 1ページあたりに表示したいアイテムの数

  return (
    <div className='UsersBody'>
      {/* <CreateGroup modalVisible={modalVisible} setModalVisible={setModalVisible}></CreateGroup> */}

      <PageTitle color='lightGreen'>ユーザ一覧</PageTitle>

      <UserPagination setOffset={setOffset} dataleng={users ? users.length : 0} perPage={perPage}></UserPagination>

      <AddButtonList>
        <PrimaryButton onClick={() => OpenCreateModal()} sizeX='large' sizeY='small'>
          ユーザ作成
        </PrimaryButton>
        <PrimaryButton sizeX='large' sizeY='small'>
          複数
        </PrimaryButton>
      </AddButtonList>

      <SelectPerPage perPage={perPage} setPerPage={setPerPage} />

      <UserTable component={Paper}>
        <Table aria-label='simple table'>
          <TableHead>
            <TableRow>
              <TableCell>名前</TableCell>
              <TableCell align='center'>メールアドレス</TableCell>
              <TableCell align='center'>権限</TableCell>
              <TableCell align='center'>変更</TableCell>
              <TableCell align='center'>削除</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users &&
              users
                .slice(offset, offset + perPage)
                .map((data) => (
                  <UserInfo
                    data={data}
                    key={data.user_id}
                    onEdit={() => OpenEditModal(data)}
                    deleteUser={deleteUser}
                  ></UserInfo>
                ))}
          </TableBody>
        </Table>
      </UserTable>

      {isOpenEditModal && (
        <EditUserModal
          onClose={() => setIsOpenEditModal(false)}
          editData={selectUser}
          setEdit={setSelectUser}
          EditUserFetch={EditUserFetch}
        ></EditUserModal>
      )}

      {isOpenCreateModal && (
        <CreateUserModal
          onClose={() => setIsOpenCreateModal(false)}
          createData={selectUser}
          setPost={setSelectUser}
          CreateUserFetch={CreateUserFetch}
        ></CreateUserModal>
      )}
    </div>
  );
};

export default UserList;
