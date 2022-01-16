import {useState, useEffect} from 'react';

import {useParams} from 'react-router';

import styled from 'styled-components';

import {GroupsAPI, UsersAPI, BooksAPI} from '../../APILink';

import TeachingMaterialInfo from '../../components/pages/Book/BookInfo';

import {PageTitle, PageSubTitle} from '../../components/Utilities/Title';
import {PrimaryButton} from '../../components/Buttons/PrimaryButton';
import {DetailCard, DetailCardContent, DetailCardSummary, DetailCardButtons} from '../../components/Cards/DetailCard';
import {Label} from '../../components/Utilities/Card/Label';
import {EditGroupModal} from '../../components/Modals/Edit/EditGroupModal';
import {EditRelationButtonList} from '../../components/Buttons/Lists/EditRelationButtonList';

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

  const [editGroupPostData, setEditGroupPostData] = useState({
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
        name: editGroupPostData.name,
        summary: editGroupPostData.summary,
        access_key: editGroupPostData.access_key,
        user_id: editGroupPostData.user_id,
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

      <EditRelationButtonList
        onAdd={() => registerBook()}
        onDelete={() => removeBook()}
        onChange={(e) => {
          BookPostChange(e.target.value);
        }}
        label='教材名'
      >
        {Books.map((data) => (
          <option value={data.book_id} key={data.book_id}>
            {data.name}
          </option>
        ))}
      </EditRelationButtonList>

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
        <EditGroupModal
          onChange={setEditGroupPostData}
          onSave={() => EditGroupCheck()}
          postData={editGroupPostData}
          users={Users}
          onClose={() => setIsOpenModal(false)}
        />
      ) : (
        ''
      )}
    </div>
  );
};

export default GroupDetail;
