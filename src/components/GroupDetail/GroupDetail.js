import {useState, useEffect} from 'react';

import {useParams} from 'react-router';

import styled from 'styled-components';

import {GroupsAPI, UsersAPI, BooksAPI} from '../../APILink';

import TeachingMaterialInfo from '../pages/Book/BookInfo';

import Button from '@material-ui/core/Button';

import './GroupDetail.css';

import {Overray} from '../Overray';
import {Modal} from '../Modals/Modal';
import {PageTitle, PageSubTitle} from '../Utilities/Title';
import {InputBox} from '../Forms/InputBox';
import {UserSelectBox} from '../Forms/SelectBox';
import {TextArea} from '../Forms/TextArea';
import {PrimaryButton} from '../Buttons/PrimaryButton';
import {DetailCard, DetailCardContent, DetailCardSummary, DetailCardButtons} from '../Cards/DetailCard';
import {Label} from '../Utilities/Card/Label';

const EditGroupButton = styled(Button)`
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

const GroupDetailCard = styled(DetailCard)`
  padding-top: 30px;
`;

const GroupDetail = () => {
  const param = useParams();

  const [GroupData, setGroupData] = useState();
  const [CreatedBy, setCreatedBy] = useState();
  const [BooksInGroup, setBooksInGroup] = useState([]); //Groupに対応したBooksを入れておく
  const [Books, setBooks] = useState([]); //全てのBooksを入れておく
  const [Users, setUsers] = useState(); //Formで使用

  const [isOpenModal, setIsOpenModal] = useState(false);

  const [BookPostBody, setBookPostBody] = useState({
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({group_id: param['id'], book_id: '1'}),
  });

  const [EditGroupPostData, setEditGroupPostData] = useState({
    name: '',
    summary: '',
    access_key: '',
    user_id: '',
  });

  const getBookInGroup = () => {
    if (typeof GroupData !== 'undefined') {
      fetch(GroupsAPI + '/' + param['id'] + '/books') //api
        .then((res) => res.json())
        .then((json) => {
          // console.log(json);
          if (Array.isArray(json)) {
            setBooksInGroup(json);
          } else {
            setBooksInGroup([json]);
          }
        });
    }
  };

  useEffect(() => {
    fetch(UsersAPI) //api
      .then((res) => res.json())
      .then((json) => {
        setUsers(json);
      });
  }, []);

  const registerBook = () => {
    fetch(GroupsAPI + '/addBook', BookPostBody) //api groups/addBook
      .then((response) => response.json())
      .then((data) => {
        console.log('Success:', data);
        getBookInGroup();
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  const removeBook = () => {
    fetch(GroupsAPI + '/removeBook', BookPostBody) //api groups/removeBook
      .then((response) => response)
      .then((data) => {
        console.log('Success:', data);
        getBookInGroup();
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  const BookPostChange = (id) => {
    setBookPostBody({
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({group_id: param['id'], book_id: id}),
    });
    // console.log(BookPostBody);
  };

  const EditGroupFetch = () => {
    //Group編集用Fetch
    fetch(GroupsAPI + '/' + param['id'], {
      method: 'PUT',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        name: EditGroupPostData.name,
        summary: EditGroupPostData.summary,
        access_key: EditGroupPostData.access_key,
        user_id: EditGroupPostData.user_id,
      }),
    }) //api
      .then((res) => res.json())
      .then(() => {
        GroupDataFetch();
      });
  };

  const EditGroupCheck = () => {
    if (confirm('編集を保存しますか？')) {
      EditGroupFetch();
      setIsOpenModal(false);
      // console.log(EditGroupPostData);
    }
  };

  const GroupDataFetch = () => {
    fetch(GroupsAPI + '/' + param['id']) //api
      .then((res) => res.json())
      .then((json) => {
        setGroupData(json);
        // console.log(json);
        setEditGroupPostData({
          name: json.name,
          summary: json.summary,
          access_key: json.access_key,
          user_id: json.user_id,
        });
      });
  };

  useEffect(() => {
    //最初にGroupデータを取得
    GroupDataFetch();
  }, []);

  useEffect(() => {
    //Groupデータ更新時に作成者名を取得
    if (typeof GroupData !== 'undefined') {
      fetch(UsersAPI + '/' + GroupData.user_id) //api
        .then((res) => res.json())
        .then((json) => {
          setCreatedBy(json.name);
        });
    }
  }, [GroupData]);

  useEffect(() => {
    //Groupデータ更新時にグループに対応した教材を取得
    getBookInGroup();
  }, [GroupData]);

  useEffect(() => {
    //Groupデータ更新時に全ての教材を取得（教材登録などに使う）
    if (typeof GroupData !== 'undefined') {
      fetch(BooksAPI) //api
        .then((res) => res.json())
        .then((json) => {
          //console.log(json);
          if (Array.isArray(json)) {
            setBooks(json);
          } else {
            setBooks([json]);
          }
        });
    }
  }, [GroupData]);

  return (
    <div>
      <PageTitle color='blue'>グループ詳細</PageTitle>
      <GroupDetailCard>
        {GroupData ? (
          <DetailCardContent>
            <div>
              <Label>グループ名</Label>
              {GroupData.name}
            </div>
            <div>
              <Label>作成者</Label>
              {CreatedBy ? CreatedBy : ''}
            </div>
            <div>
              <Label>アクセスキー</Label>
              {GroupData.access_key}
            </div>
            <div>
              <Label>作成日</Label>
              {GroupData.created_at}
            </div>
          </DetailCardContent>
        ) : (
          ''
        )}
        <DetailCardSummary title='グループ概略' text={GroupData ? GroupData.summary : ''} />
        <DetailCardButtons>
          <PrimaryButton color='secondary' sizeX='large' sizeY='small' onClick={() => setIsOpenModal(true)}>
            編集
          </PrimaryButton>
        </DetailCardButtons>
      </GroupDetailCard>

      <PageSubTitle>グループ内教材一覧</PageSubTitle>

      <div className='TMEditButtonFrameInGroup'>
        <select
          onChange={(e) => {
            BookPostChange(e.target.value);
          }}
        >
          {Books.map((data) => (
            <option value={data.book_id} key={data.book_id}>
              {data.name}
            </option>
          ))}
        </select>
        <Button variant='contained' color='primary' className='addTMButton' onClick={registerBook}>
          追加
        </Button>
        <Button variant='contained' color='secondary' className='addTMsButton' onClick={removeBook}>
          削除
        </Button>
      </div>
      {BooksInGroup ? (
        <div className='TMList'>
          {BooksInGroup.map((data) => {
            console.log(data);
            return <TeachingMaterialInfo data={data.book} key={data.book_id}></TeachingMaterialInfo>;
          })}
        </div>
      ) : (
        ''
      )}

      {/* Modal*/}
      {isOpenModal ? (
        <div>
          <Modal>
            {Users ? (
              <div>
                <ModalTitle className='ModalTitle'>編集画面</ModalTitle>

                <InputBox
                  type='text'
                  label='グループ名'
                  id='groupname'
                  value={EditGroupPostData.name}
                  onChange={(e) => setEditGroupPostData({...EditGroupPostData, name: e.target.value})}
                />

                <UserSelectBox
                  id='username'
                  value={EditGroupPostData.user_id}
                  label='作成者'
                  options={Users}
                  onChange={(e) => setEditGroupPostData({...EditGroupPostData, user_id: e.target.value})}
                />

                <InputBox
                  type='text'
                  label='アクセスキー'
                  id='accesskey'
                  value={EditGroupPostData.access_key}
                  onChange={(e) => setEditGroupPostData({...EditGroupPostData, access_key: e.target.value})}
                />

                <TextArea
                  id='summary'
                  value={EditGroupPostData.summary}
                  label='グループ概略'
                  rows='5'
                  onChange={(e) => setEditGroupPostData({...EditGroupPostData, summary: e.target.value})}
                />

                <EditGroupButton variant='contained' color='primary' onClick={() => EditGroupCheck()}>
                  保存
                </EditGroupButton>
              </div>
            ) : (
              ''
            )}
          </Modal>
          <Overray onClick={() => setIsOpenModal(false)}></Overray>
        </div>
      ) : (
        ''
      )}
    </div>
  );
};

export default GroupDetail;
