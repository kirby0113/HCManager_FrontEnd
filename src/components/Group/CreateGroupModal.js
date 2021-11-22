import {useState, useEffect} from 'react';
import styled from 'styled-components';

import Button from '@material-ui/core/Button';

import {UsersAPI} from '../../APILink';

import {Modal} from '../Modal';
import {Overray} from '../Overray';

const InputUnit = styled.div`
  display: grid;
  grid-template-columns: max-content 1fr;
  grid-column-gap: 30px;
  padding-bottom: 30px;
`;

const CreateGroupButton = styled(Button)`
  margin-right: 20px !important;
  font-size: 18px !important;
  border: solid 2px #777;
  background-color: #ddd;
  padding: 5px 20px !important;
  box-shadow: 5px 5px 5px #00000040;
  cursor: pointer;
  position: relative;
  left: 50%;
  transform: translateX(-50%);
`;

const ModalTitle = styled.div`
  text-align: left;
  font-size: 20px;
  padding: 7px 20px;
  padding-left: 15px;
  margin-bottom: 40px;
  background: #f4f4f4; /*背景色*/
  border-left: solid 8px #ff47ac; /*左線*/
  border-bottom: solid 3px #d7d7d7; /*下線*/
`;

export const CreateGroupModal = (props) => {
  const [Users, setUsers] = useState([]);
  const [CreateGroupPostData, setCreateGroupPostData] = useState({
    name: '',
    summary: '',
    access_key: '',
    user_id: '',
  });

  useEffect(() => {
    fetch(UsersAPI) //api
      .then((res) => res.json())
      .then((json) => {
        setUsers(json);
      });
  }, []);

  const CreateGroupCheck = () => {
    if (confirm('編集を保存しますか？')) {
      CreateGroupFetch();
      props.onClose();
      // console.log(EditGroupPostData);
    }
  };

  const CreateGroupFetch = () => {};

  return (
    <div>
      <Modal>
        <ModalTitle className='ModalTitle'>編集画面</ModalTitle>
        <InputUnit>
          <label htmlFor='groupname'>グループ名</label>
          <input
            type='text'
            id='groupname'
            value={CreateGroupPostData.name}
            onChange={(e) => setCreateGroupPostData({...CreateGroupPostData, name: e.target.value})}
          ></input>
        </InputUnit>
        <InputUnit>
          <label htmlFor='username'>作成者</label>
          <select
            id='username'
            value={CreateGroupPostData.user_id}
            onChange={(e) => setCreateGroupPostData({...CreateGroupPostData, user_id: e.target.value})}
          >
            {Users.map((data) => (
              <option value={data.user_id} key={data.user_id}>
                {data.name}
              </option>
            ))}
          </select>
        </InputUnit>
        <InputUnit>
          <label htmlFor='accesskey'>アクセスキー</label>
          <input
            type='text'
            id='accesskey'
            value={CreateGroupPostData.access_key}
            onChange={(e) => setCreateGroupPostData({...CreateGroupPostData, access_key: e.target.value})}
          ></input>
        </InputUnit>
        <InputUnit>
          <label htmlFor='summary'>グループ概略</label>
          <textarea
            id='summary'
            value={CreateGroupPostData.summary}
            rows='5'
            onChange={(e) => setCreateGroupPostData({...CreateGroupPostData, summary: e.target.value})}
          ></textarea>
        </InputUnit>
        <CreateGroupButton variant='contained' color='primary' onClick={() => CreateGroupCheck()}>
          作成
        </CreateGroupButton>
      </Modal>
      <Overray onClick={props.onClose}></Overray>
    </div>
  );
};
