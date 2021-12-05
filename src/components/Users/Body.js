import {useState, useEffect} from 'react';

import {GetUsers, EditUser, CreateUser} from '../API/UserAPIs';

import Button from '@material-ui/core/Button';

import {EditUserModal} from './EditUserModal';
import {CreateUserModal} from './CreateUserModal';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import UserPagination from './Pagination';
import UserInfo from './UserInfo';

import './Body.css';

const Body = () => {
  const [Users, setUsers] = useState([]);
  const [isOpenEditModal, setIsOpenEditModal] = useState(false);
  const [isOpenCreateModal, setIsOpenCreateModal] = useState(false);
  const [UserPost, setUserPost] = useState({
    user_id: '',
    name: '',
    mail: '',
    password: '',
    role: '',
  });
  const [passwordPost, setPasswordPost] = useState('');

  const EditUserFetch = () => {
    EditUser(UserPost, passwordPost).then((json) => setUsers(json));
  };

  const CreateUserFetch = () => {
    CreateUser(UserPost, passwordPost).then((json) => setUsers(json));
  };

  const OpenEditModal = (editdata) => {
    setUserPost(editdata);
    setPasswordPost('');
    setIsOpenEditModal(true);
  };

  const OpenCreateModal = () => {
    setUserPost({
      name: '',
      mail: '',
      password: '',
      role: '',
    });
    setPasswordPost('');
    setIsOpenCreateModal(true);
  };

  const UpdateUsers = () => {
    GetUsers().then((json) => setUsers(json));
  };

  useEffect(() => {
    UpdateUsers();
  }, [EditUser]);

  const [offset, setOffset] = useState(0);
  const perPage = 5; // 1ページあたりに表示したいアイテムの数

  return (
    <div className='UsersBody'>
      {/* <CreateGroup modalVisible={modalVisible} setModalVisible={setModalVisible}></CreateGroup> */}

      <div className='UsersPageTitleFrame'>
        <span className='UsersPageTitle'>ユーザー一覧</span>
      </div>

      <div className='UserCreateButtons'>
        <Button variant='contained' color='primary' className='CreateUserButton' onClick={() => OpenCreateModal()}>
          ユーザ作成
        </Button>
        {/* <Button variant='contained' color='primary' className='CreateUsersButton'>
          複数
        </Button> */}
      </div>

      <UserPagination setOffset={setOffset} dataleng={Users ? Users.length : 0} perPage={perPage}></UserPagination>

      <TableContainer className='UserTable' component={Paper}>
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
            {Users
              ? Users.slice(offset, offset + perPage).map((data) => (
                  <UserInfo
                    data={data}
                    key={data.user_id}
                    onEdit={(editdata) => OpenEditModal(editdata)}
                    UpdateUsers={UpdateUsers}
                  ></UserInfo>
                ))
              : ''}
          </TableBody>
        </Table>
      </TableContainer>

      {isOpenEditModal ? (
        <EditUserModal
          onClose={() => setIsOpenEditModal(false)}
          editData={UserPost}
          setEdit={setUserPost}
          setPassword={setPasswordPost}
          password={passwordPost}
          EditUserFetch={EditUserFetch}
        ></EditUserModal>
      ) : (
        ''
      )}

      {isOpenCreateModal ? (
        <CreateUserModal
          onClose={() => setIsOpenCreateModal(false)}
          createData={UserPost}
          setPost={setUserPost}
          setPassword={setPasswordPost}
          password={passwordPost}
          CreateUserFetch={CreateUserFetch}
        ></CreateUserModal>
      ) : (
        ''
      )}
    </div>
  );
};

export default Body;
