import {useEffect, useState} from 'react';

import {Redirect, useParams} from 'react-router';

import QuestionInfo from '../../components/pages/Questions/QuestionInfo';

import {PageTitle, PageSubTitle} from '../../components/Utilities/Title';
import {InfoCardList} from '../../components/Cards/Lists/InfoCardList';
import {Label} from '../../components/Utilities/Card/Label';
import {DetailCard, DetailCardButtons, DetailCardContent, DetailCardSummary} from '../../components/Cards/DetailCard';
import {PrimaryButton} from '../../components/Buttons/PrimaryButton';
import {EditRelationButtonList} from '../../components/Buttons/Lists/EditRelationButtonList';
import {EditBookModal} from '../../components/Modals/Edit/EditBookModal';
import {LoadingWindow} from '../../components/Utilities/Loading';

import {useUser} from '../../hooks/useUser';
import {useBookPost, useBook, useBookRecodePost} from '../../hooks/useBook';
import {useQuestion} from '../../hooks/useQuestion';

import {getBook} from '../../components/API/BookAPIs';
import {getQuestions} from '../../components/API/QuestionAPIs';
import {Breadcrumbs} from '../../components/Breadcrumbs';
import {AuthContext} from '../../contexts/AuthContext';
import {useContext} from 'react';

const BookDetail = () => {
  const {authData} = useContext(AuthContext);

  if (!authData) {
    return <Redirect to='/' />;
  }
  const param = useParams();
  const {users, getUser} = useUser();
  const {updateBook, addRecode, removeRecode, getRecodes} = useBook();
  const {bookPost, setBookPost} = useBookPost();
  const {bookRecodePost, setBookRecodePost} = useBookRecodePost(param['id']);
  const [loading, setLoading] = useState(true);
  const [Book, setBook] = useState();
  const [createdBy, setCreatedBy] = useState();
  const [questionInBook, setQuestionInBook] = useState(); //Bookに登録されてる問題
  const {questions, setQuestions} = useQuestion();
  const [isOpenModal, setIsOpenModal] = useState(false);

  const getQuestionInBook = () => {
    getRecodes(param['id']).then((json) => setQuestionInBook(json));
  };

  useEffect(() => {
    getBook(param.id)
      .then(async (json) => {
        setBook(json);
        setBookPost({
          name: json.name,
          summary: json.summary,
          access_key: json.access_key,
          user_id: json.user_id,
        });
        return await getUser(json.user_id).then((json) => setCreatedBy(json.name));
      })
      .then(() => getQuestions().then((json) => setQuestions(json)))
      .then(() => setLoading(false));
  }, []);

  useEffect(() => {
    //Groupデータ更新時に紐づけされてる問題を取得
    getQuestionInBook();
  }, [Book]);

  const EditBookCheck = () => {
    if (confirm('編集を保存しますか？')) {
      updateBook(param.id, bookPost).then((json) => {
        setBook(json);
        getUser(json.user_id).then((json) => setCreatedBy(json.name));
      });
      setIsOpenModal(false);
    }
  };

  return loading ? (
    <LoadingWindow />
  ) : (
    <div>
      <PageTitle color='red'>教材詳細</PageTitle>
      <Breadcrumbs />
      {Book ? (
        <DetailCard>
          <DetailCardContent>
            <div>
              <Label>教材名</Label>
              {Book.name}
            </div>
            <div>
              <Label>作成者</Label>
              {createdBy}
            </div>
            <div>
              <Label>アクセスキー</Label>
              {Book.access_key}
            </div>
            <div>
              <Label>作成日</Label>
              {Book.created_at}
            </div>
          </DetailCardContent>
          <DetailCardSummary title='教材詳細情報' text={Book ? Book.summary : ''} />
          <DetailCardButtons>
            <PrimaryButton color='secondary' sizeX='large' sizeY='small' onClick={() => setIsOpenModal(true)}>
              編集
            </PrimaryButton>
          </DetailCardButtons>
        </DetailCard>
      ) : (
        ''
      )}
      <PageSubTitle color='orange'>教材内問題一覧</PageSubTitle>

      <EditRelationButtonList
        onAdd={() => addRecode(bookRecodePost).then((json) => setQuestionInBook(json))}
        onDelete={() => removeRecode(bookRecodePost).then((json) => setQuestionInBook(json))}
        onChange={(e) => {
          setBookRecodePost({
            book_id: param['id'],
            question_id: e.target.value,
          });
        }}
        label='教材名'
      >
        {questions
          ? questions.map((data) => (
              <option value={data.question_id} key={data.question_id}>
                {data.name}
              </option>
            ))
          : ''}
      </EditRelationButtonList>

      {questionInBook ? (
        <InfoCardList>
          {questionInBook.map((data) => {
            return <QuestionInfo data={data.question} key={data.question_id}></QuestionInfo>;
          })}
        </InfoCardList>
      ) : (
        ''
      )}

      {/* Modal*/}
      {isOpenModal ? (
        <EditBookModal
          onChange={setBookPost}
          onSave={EditBookCheck}
          users={users}
          postData={bookPost}
          onClose={() => setIsOpenModal(false)}
        />
      ) : (
        ''
      )}
    </div>
  );
};

export default BookDetail;
