import {useEffect, useState} from 'react';

import {useParams} from 'react-router';

import QuestionInfo from '../Questions/QuestionInfo';

import Button from '@material-ui/core/Button';

import {BooksAPI, UsersAPI, QuestionsAPI} from '../../APILink';

import './TeachingMaterialDetail.css';

const TeachingMaterialDetail = () => {
  const param = useParams();

  const [Book, setBook] = useState();
  const [createdBy, setCreatedBy] = useState();
  const [questionInBook, setQuestionInBook] = useState(); //Bookに登録されてる問題
  const [Questions, setQuestions] = useState(); //全ての問題

  const [QuestionPostBody, setQuestionPostBody] = useState({
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({book_id: param['id'], question_id: '1'}),
  });

  const getQuestionInBook = () => {
    if (typeof Book !== 'undefined') {
      fetch(BooksAPI + '/' + param['id'] + '/questions') //api
        .then((res) => res.json())
        .then((json) => {
          console.log(json);
          if (Array.isArray(json)) {
            setQuestionInBook(json);
          } else {
            setQuestionInBook([json]);
          }
          console.log(questionInBook);
        });
    }
  };

  const registerQuestion = () => {
    fetch(BooksAPI + '/addRecord', QuestionPostBody) //api groups/addBook
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
    fetch(BooksAPI + '/removeRecord', QuestionPostBody) //api groups/addBook
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

  useEffect(() => {
    //最初にGroupデータを取得
    fetch(BooksAPI + '/' + param['id']) //api
      .then((res) => res.json())
      .then((json) => {
        setBook(json);
        console.log(json);
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
            setQuestions([json]);
          }
        });
    }
  }, [Book]);

  return (
    <div>
      <div className='TMDetailPageTitleFrame'>
        <span className='TMDetailPageTitle'>教材詳細</span>
      </div>
      <div className='editTMDetailButtonFrame'>
        <Button variant='contained' color='secondary' className='editTMDetailButton'>
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
      <div className='TMDetailPageTitleFrame-sub'>
        <span className='TMDetailPageTitle-sub'>教材内問題一覧</span>
      </div>
      <div className='addQuestionButtonFrame'>
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
        <Button variant='contained' color='primary' className='addTMsButton' onClick={() => removeQuestion()}>
          削除
        </Button>
      </div>

      {questionInBook ? (
        <div className='QuestionList'>
          {questionInBook.map((data) => (
            <QuestionInfo data={data.question} key={data.question_id}></QuestionInfo>
          ))}
        </div>
      ) : (
        ''
      )}
    </div>
  );
};

export default TeachingMaterialDetail;
