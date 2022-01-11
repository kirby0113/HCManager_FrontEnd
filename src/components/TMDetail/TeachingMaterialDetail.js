import {useEffect, useState} from 'react';
import styled from 'styled-components';

import {useParams} from 'react-router';

import QuestionInfo from '../Questions/QuestionInfo';

import Button from '@material-ui/core/Button';

import {Modal} from '../Modal';
import {Overray} from '../Overray';
import {PageTitle, PageSubTitle} from '../Title';

import {BooksAPI, UsersAPI, QuestionsAPI} from '../../APILink';

import './TeachingMaterialDetail.css';

const InputUnit = styled.div`
  display: grid;
  grid-template-columns: max-content 1fr;
  grid-column-gap: 30px;
  padding-bottom: 30px;
`;

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

const TeachingMaterialDetail = () => {
  const param = useParams();

  const [Book, setBook] = useState();
  const [createdBy, setCreatedBy] = useState();
  const [questionInBook, setQuestionInBook] = useState(); //Bookに登録されてる問題
  const [Questions, setQuestions] = useState(); //全ての問題
  const [Users, setUsers] = useState(); //Formで使用

  const [isOpenModal, setIsOpenModal] = useState(false);

  const [QuestionPostBody, setQuestionPostBody] = useState({
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({book_id: param['id'], question_id: 1}),
  });

  const [EditBookPostData, setEditBookPostData] = useState({
    name: '',
    summary: '',
    access_key: '',
    user_id: '',
  });

  const getQuestionInBook = () => {
    if (typeof Book !== 'undefined') {
      fetch(BooksAPI + '/' + param['id'] + '/questions') //api
        .then((res) => res.json())
        .then((json) => {
          if (Array.isArray(json)) {
            setQuestionInBook(json);
          } else {
            setQuestionInBook([]);
          }
        });
    }
  };

  const registerQuestion = () => {
    fetch(BooksAPI + '/addRecord', {...QuestionPostBody, method: 'POST'}) //api groups/addBook
      .then((response) => response.json())
      .then((data) => {
        console.log('Success:', data);
        getQuestionInBook();
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  const removeQuestion = () => {
    fetch(BooksAPI + '/removeRecord', {...QuestionPostBody, method: 'DELETE'}) //api groups/addBook
      .then((response) => response)
      .then((data) => {
        console.log('Success:', data);
        getQuestionInBook();
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  const QuestionPostChange = (id) => {
    setQuestionPostBody({
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({book_id: param['id'], question_id: id}),
    });
  };

  const getBookDataFetch = () => {
    fetch(BooksAPI + '/' + param['id']) //api
      .then((res) => res.json())
      .then((json) => {
        setBook(json);
        setEditBookPostData({
          name: json.name,
          summary: json.summary,
          access_key: json.access_key,
          user_id: json.user_id,
        });
      });
  };

  useEffect(() => {
    getBookDataFetch();
  }, []);

  useEffect(() => {
    fetch(UsersAPI) //api
      .then((res) => res.json())
      .then((json) => {
        setUsers(json);
      });
  }, []);

  useEffect(() => {
    //Groupデータ更新時に作成者名を取得
    if (typeof Book !== 'undefined') {
      fetch(UsersAPI + '/' + Book.user_id) //api
        .then((res) => res.json())
        .then((json) => {
          setCreatedBy(json.name);
        });
    }
  }, [Book]);

  useEffect(() => {
    //Groupデータ更新時に紐づけされてる問題を取得
    getQuestionInBook();
  }, [Book]);

  useEffect(() => {
    //Groupデータ更新時に紐づけされてる問題を取得
    if (typeof Book !== 'undefined') {
      fetch(QuestionsAPI) //api
        .then((res) => res.json())
        .then((json) => {
          if (Array.isArray(json)) {
            setQuestions(json);
          } else {
            setQuestions([]);
          }
        });
    }
  }, [Book]);

  const EditBookFetch = () => {
    //Group編集用Fetch
    fetch(BooksAPI + '/' + param['id'], {
      method: 'PUT',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        name: EditBookPostData.name,
        summary: EditBookPostData.summary,
        access_key: EditBookPostData.access_key,
        user_id: EditBookPostData.user_id,
      }),
    }) //api
      .then((res) => res)
      .then(() => {
        getBookDataFetch();
      });
  };

  const EditBookCheck = () => {
    if (confirm('編集を保存しますか？')) {
      EditBookFetch();
      setIsOpenModal(false);
      // console.log(EditGroupPostData);
    }
  };

  return (
    <div>
      <PageTitle color='red'>教材詳細</PageTitle>
      <div className='editTMDetailButtonFrame'>
        <Button
          variant='contained'
          color='secondary'
          className='editTMDetailButton'
          onClick={() => setIsOpenModal(true)}
        >
          編集
        </Button>
      </div>

      {Book ? (
        <div class='TMDetailFrame'>
          <div className='TMDetailTopGrid'>
            <div>
              <span className='elementName'>教材名</span>
              {Book.name}
            </div>
            <div>
              <span className='elementName'>作成者</span>
              {createdBy}
            </div>
            <div>
              <span className='elementName'>アクセスキー</span>
              {Book.access_key}
            </div>
            <div>
              <span className='elementName'>作成日</span>
              {Book.created_at}
            </div>
          </div>
          <div className='TMDetailBottom'>
            <div>
              <span className='elementName'>教材詳細情報</span>
            </div>
            <div class='TMDetailTextRange'>
              {Book.summary.split(/(\n)/).map((item) => {
                return item.match(/\n/) ? <br /> : item;
              })}
            </div>
          </div>
        </div>
      ) : (
        ''
      )}
      <PageSubTitle color='orange'>教材内問題一覧</PageSubTitle>
      <div className='QuestionButtonsFrame'>
        <select
          onChange={(e) => {
            QuestionPostChange(e.target.value);
          }}
        >
          {Questions
            ? Questions.map((data) => (
                <option value={data.question_id} key={data.question_id}>
                  {data.name}
                </option>
              ))
            : ''}
        </select>
        <Button variant='contained' color='primary' className='addTMButton' onClick={() => registerQuestion()}>
          追加
        </Button>
        <Button variant='contained' color='secondary' className='addTMsButton' onClick={() => removeQuestion()}>
          削除
        </Button>
      </div>

      {questionInBook ? (
        <div className='QuestionList'>
          {questionInBook.map((data) => {
            console.log(data);
            return <QuestionInfo data={data.question} key={data.question_id}></QuestionInfo>;
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

                <InputUnit>
                  <label htmlFor='groupname'>教材名</label>
                  <input
                    type='text'
                    id='groupname'
                    value={EditBookPostData.name}
                    onChange={(e) => setEditBookPostData({...EditBookPostData, name: e.target.value})}
                  ></input>
                </InputUnit>
                <InputUnit>
                  <label htmlFor='username'>作成者</label>
                  <select
                    id='username'
                    value={EditBookPostData.user_id}
                    onChange={(e) => setEditBookPostData({...EditBookPostData, user_id: e.target.value})}
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
                    value={EditBookPostData.access_key}
                    onChange={(e) => setEditBookPostData({...EditBookPostData, access_key: e.target.value})}
                  ></input>
                </InputUnit>
                <InputUnit>
                  <label htmlFor='summary'>教材詳細情報</label>
                  <textarea
                    id='summary'
                    value={EditBookPostData.summary}
                    rows='5'
                    onChange={(e) => setEditBookPostData({...EditBookPostData, summary: e.target.value})}
                  ></textarea>
                </InputUnit>
                <EditGroupButton
                  variant='contained'
                  color='primary'
                  onClick={() => {
                    EditBookCheck();
                  }}
                >
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

export default TeachingMaterialDetail;
