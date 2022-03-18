import {useState, useEffect} from 'react';

import {Redirect, useParams} from 'react-router';

import styled from 'styled-components';

import {GroupsAPI, UsersAPI, BooksAPI} from '../../APILink';

import BookInfo from '../../components/pages/Book/BookInfo';

import {PageTitle, PageSubTitle} from '../../components/Utilities/Title';
import {PrimaryButton} from '../../components/Buttons/PrimaryButton';
import {DetailCard, DetailCardContent, DetailCardSummary, DetailCardButtons} from '../../components/Cards/DetailCard';
import {Label} from '../../components/Utilities/Card/Label';
import {EditGroupModal} from '../../components/Modals/Edit/EditGroupModal';
import {EditRelationButtonList} from '../../components/Buttons/Lists/EditRelationButtonList';
import {Breadcrumbs} from '../../components/Breadcrumbs';
import {useContext} from 'react';
import {AuthContext} from '../../contexts/AuthContext';
import {useGroup, useGroupPost} from '../../hooks/useGroup';
import {InfoCardList} from '../../components/Cards/Lists/InfoCardList';
import {ErrorMessage, ErrorMessageWrapper} from '../../components/Utilities/ErrorMessage';
import {ErrorContext} from '../../contexts/ErrorContext';
import {useBook} from '../../hooks/useBook';
import {useUser} from '../../hooks/useUser';

const GroupDetailCard = styled(DetailCard)`
  padding-top: 30px;
`;

const GroupDetail = () => {
  const {authData} = useContext(AuthContext);

  if (!authData) {
    return <Redirect to='/' />;
  }

  const param = useParams();

  const [CreatedBy, setCreatedBy] = useState();
  const [BooksInGroup, setBooksInGroup] = useState([]); //Groupに対応したBooksを入れておく
  const [Users, setUsers] = useState(); //Formで使用
  const {error, setError, isOpenError, setIsOpenError} = useContext(ErrorContext);
  const {books, setBooks, getBooks} = useBook();
  const {getUser} = useUser();
  const {selectGroup, setSelectGroup, getGroup, getCollections, addCollection, removeCollection} = useGroup();
  const {groupPost, setGroupPost, groupPostInit} = useGroupPost();

  const [isOpenModal, setIsOpenModal] = useState(false);

  const [BookPostBody, setBookPostBody] = useState({group_id: param['id'], book_id: ''});

  useEffect(() => {
    fetch(UsersAPI) //api
      .then((res) => res.json())
      .then((json) => {
        setUsers(json);
      });
  }, []);

  const registerBook = () => {
    addCollection(BookPostBody).then((json) => {
      if (json.status === 'success') {
        setBooksInGroup(json.content);
      }
    });
  };

  const removeBook = () => {
    removeCollection(BookPostBody).then((json) => {
      if (json.status === 'success') {
        setBooksInGroup(json.content);
      }
    });
  };

  const BookPostChange = (id) => {
    setBookPostBody({group_id: param['id'], book_id: id});
  };

  const EditGroupFetch = () => {
    //Group編集用Fetch
    fetch(GroupsAPI + '/' + param['id'], {
      method: 'PUT',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        name: groupPost.name,
        summary: groupPost.summary,
        access_key: groupPost.access_key,
        user_id: groupPost.user_id,
      }),
    }) //api
      .then((res) => res.json())
      .then(() => {
        getGroup(param['id']).then((json) => {
          if (json.status === 'success') {
            setSelectGroup(json.content);
            groupPostInit(json.content);
          }
        });
      });
  };

  const EditGroupCheck = () => {
    if (confirm('編集を保存しますか？')) {
      EditGroupFetch();
      setIsOpenModal(false);
      // console.log(EditGroupPostData);
    }
  };

  useEffect(() => {
    //最初にGroupデータと関連教材を取得
    getGroup(param['id'])
      .then((json) => {
        if (json.status === 'success') {
          setSelectGroup(json.content);
          groupPostInit(json.content);
        }
      })
      .then(() => {
        getBooks();
      });
  }, []);

  useEffect(() => {
    //Groupデータ更新時に作成者名を取得
    if (typeof selectGroup !== 'undefined') {
      getUser(selectGroup.user_id).then((json) => {
        setCreatedBy(json.content.name);
      });
    }

    getCollections(param['id']).then((json) => {
      if (json.status === 'success') {
        setBooksInGroup(json.content);
      }
    });
  }, [selectGroup]);

  return (
    <div>
      <PageTitle color='blue'>グループ詳細</PageTitle>
      <Breadcrumbs />
      <GroupDetailCard>
        {selectGroup && (
          <DetailCardContent>
            <div>
              <Label>グループ名</Label>
              {selectGroup.name}
            </div>
            <div>
              <Label>作成者</Label>
              {CreatedBy ? CreatedBy : ''}
            </div>
            <div>
              <Label>アクセスキー</Label>
              {selectGroup.access_key}
            </div>
            <div>
              <Label>作成日</Label>
              {selectGroup.created_at}
            </div>
          </DetailCardContent>
        )}
        <DetailCardSummary title='グループ概略' text={selectGroup && selectGroup.summary} />
        <DetailCardButtons>
          <PrimaryButton
            color='secondary'
            sizeX='large'
            sizeY='small'
            onClick={() => {
              setIsOpenModal(true);
              setGroupPost(selectGroup);
            }}
          >
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
        <option value='' key=''></option>
        {books.map((data) => (
          <option value={data.book_id} key={data.book_id}>
            {data.name}
          </option>
        ))}
      </EditRelationButtonList>

      {BooksInGroup && (
        <InfoCardList>
          {BooksInGroup.map((data) => {
            console.log(data);
            return <BookInfo data={data.book} key={data.book_id}></BookInfo>;
          })}
        </InfoCardList>
      )}

      {isOpenModal && (
        <EditGroupModal
          onChange={setGroupPost}
          onSave={() => EditGroupCheck()}
          postData={groupPost}
          users={Users}
          onClose={() => setIsOpenModal(false)}
        />
      )}

      <ErrorMessageWrapper isOpen={isOpenError}>
        <ErrorMessage text={error} onClose={() => setIsOpenError(false)} />
      </ErrorMessageWrapper>
    </div>
  );
};

export default GroupDetail;
