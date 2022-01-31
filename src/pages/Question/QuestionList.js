import {useState, useEffect} from 'react';
//import ReactDOM from "react-dom";
import {QuestionsAPI} from '../../APILink';

import QuestionInfo from '../../components/pages/Questions/QuestionInfo';
import Pagination from '../../components/Pagination/Pagination';
//import CreateGroupModal from "./CreateGroupModal";

import {SelectPerPage} from '../../components/Pagination/SelectPerPage';
import {PageTitle} from '../../components/Utilities/Title';
import {InfoCardList} from '../../components/Cards/Lists/InfoCardList';
import {PrimaryButton} from '../../components/Buttons/PrimaryButton';
import {AddButtonList} from '../../components/Buttons/Lists/AddButtonList';
import {Anchor} from '../../components/Utilities/Anchor';

import {useQuestion} from '../../hooks/useQuestion';

const QuestionList = () => {
  const {questions, setQuestions, getQuestions} = useQuestion();
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    getQuestions();
  }, []);
  const [perPage, setPerPage] = useState(5); // 1ページあたりに表示したいアイテムの数
  //const [modalVisible,setModalVisible] = useState(false);

  return (
    <div className='Body'>
      {/* <CreateGroup modalVisible={modalVisible} setModalVisible={setModalVisible}></CreateGroup> */}
      <PageTitle color='orange'>問題一覧</PageTitle>
      <Pagination setOffset={setOffset} dataleng={questions ? questions.length : 0} perPage={perPage}></Pagination>
      <AddButtonList>
        <PrimaryButton color='primary' sizeX='large' sizeY='small'>
          記述問題作成
        </PrimaryButton>
        <Anchor to='/question/create/blank' color='white'>
          <PrimaryButton color='primary' sizeX='large' sizeY='small'>
            空欄問題作成
          </PrimaryButton>
        </Anchor>
      </AddButtonList>
      <SelectPerPage perPage={perPage} setPerPage={setPerPage} />
      {questions ? (
        <InfoCardList>
          {questions.slice(offset, Number(offset) + Number(perPage)).map((data) => (
            <QuestionInfo data={data} key={data.question_id} setQuestions={setQuestions}></QuestionInfo>
          ))}
        </InfoCardList>
      ) : (
        ''
      )}
      <Pagination setOffset={setOffset} dataleng={questions ? questions.length : 0} perPage={perPage}></Pagination>
    </div>
  );
};

export default QuestionList;
