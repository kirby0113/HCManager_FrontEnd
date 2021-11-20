import {useState, useEffect} from 'react';

import {useParams} from 'react-router';

import {GroupsAPI, UsersAPI, BooksAPI} from '../../APILink';

import TeachingMaterialInfo from '../TeachingMaterials/TeachingMaterialInfo';

import Button from '@material-ui/core/Button';

import './GroupDetail.css';

//とりあえずダミーデータにしてます（本来はAPIから取得）
// const dummyTM = [
//   {
//     TeachingMaterialName: 'TM1',
//     createdBy: 'admin1',
//     accesskey: 'test',
//     date: 'dummy1',
//     groupId: 1,
//   },
//   {
//     TeachingMaterialName: 'TM2',
//     createdBy: 'admin2',
//     accesskey: 'test',
//     date: 'dummy2',
//     groupId: 2,
//   },
//   {
//     TeachingMaterialName: 'TM3',
//     createdBy: 'admin3',
//     accesskey: 'test',
//     date: 'dummy3',
//     groupId: 3,
//   },
//   {
//     TeachingMaterialName: 'TM4',
//     createdBy: 'admin4',
//     accesskey: 'test',
//     date: 'dummy4',
//     groupId: 4,
//   },
//   {
//     TeachingMaterialName: 'TM5',
//     createdBy: 'admin5',
//     accesskey: 'test',
//     date: 'dummy5',
//     groupId: 5,
//   },
// ];

const GroupDetail = () => {
  const param = useParams();

  const [GroupData, setGroupData] = useState();
  const [CreatedBy, setCreatedBy] = useState();
  const [BooksInGroup, setBooksInGroup] = useState([]); //Groupに対応したBooksを入れておく
  const [Books, setBooks] = useState([]); //全てのBooksを入れておく

  const [BookPostBody, setBookPostBody] = useState({
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({group_id: param['id'], book_id: '1'}),
  });

  const getBookInGroup = () => {
    if (typeof GroupData !== 'undefined') {
      fetch(GroupsAPI + '/' + param['id'] + '/Books') //api
        .then((res) => res.json())
        .then((json) => {
          console.log(json);
          if (Array.isArray(json)) {
            setBooksInGroup(json);
          } else {
            setBooksInGroup([json]);
          }
        });
    }
  };

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
    console.log(BookPostBody);
  };

  useEffect(() => {
    //最初にGroupデータを取得
    fetch(GroupsAPI + '/' + param['id']) //api
      .then((res) => res.json())
      .then((json) => {
        setGroupData(json);
        console.log(json);
      });
  }, []);

  useEffect(() => {
    //Groupデータ更新時に作成者名を取得
    if (typeof GroupData !== 'undefined') {
      fetch(UsersAPI + '/' + param['id']) //api
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
      <div className='GroupDetailPageTitleFrame'>
        <span className='GroupDetailPageTitle'>グループ詳細</span>
      </div>

      <div className='editGroupDetailButtonFrame'>
        <Button variant='contained' color='secondary' className='editGroupDetailButton'>
          編集
        </Button>
      </div>
      <div class='GroupDetailFrame'>
        {GroupData ? (
          <div className='GroupDetailTopGrid'>
            <div>
              <span className='elementName'>グループ名</span>
              {GroupData.name}
            </div>
            <div>
              <span className='elementName'>作成者</span>
              {CreatedBy ? CreatedBy : ''}
            </div>
            <div>
              <span className='elementName'>アクセスキー</span>
              {GroupData.access_key}
            </div>
            <div>
              <span className='elementName'>作成日</span>
              {GroupData.created_at}
            </div>
          </div>
        ) : (
          ''
        )}
        <div className='GroupDetailBottom'>
          <div>
            <span className='elementName'>グループ概略</span>
          </div>
          {GroupData ? (
            <div class='GroupDetailTextRange'>
              {GroupData.summary.split(/(\n)/).map((item) => {
                return item.match(/\n/) ? <br /> : item;
              })}
            </div>
          ) : (
            ''
          )}
        </div>
      </div>

      <div className='GroupDetailPageTitleFrame-sub'>
        <span className='GroupDetailPageTitle-sub'>グループ内教材一覧</span>
      </div>

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
          {BooksInGroup.map((data) => (
            <TeachingMaterialInfo data={data.book} key={data.book.book_id}></TeachingMaterialInfo>
          ))}
        </div>
      ) : (
        ''
      )}
    </div>
  );
};

export default GroupDetail;
