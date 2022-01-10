import {useState, useEffect} from 'react';
//import ReactDOM from "react-dom";
import {QuestionsAPI} from '../../APILink';

import Button from '@material-ui/core/Button';

import QuestionInfo from './QuestionInfo';
import Pagination from './Pagination';
//import CreateGroupModal from "./CreateGroupModal";

import './Questions.css';

import {SelectPerPage} from '../SelectPerPage';

// const CreateGroup = (props) => {
//     return ReactDOM.createPortal(
//         <CreateGroupModal modalVisible={props.modalVisible} setModalVisible={props.setModalVisible}></CreateGroupModal>,
//         document.getElementById("modal-creategroup")
//     );
// }

const Questions = () => {
  const [offset, setOffset] = useState(0);
  const [Questions, setQuestions] = useState();

  useEffect(() => {
    fetch(QuestionsAPI) //api
      .then((res) => res.json())
      .then((json) => {
        setQuestions(json);
        console.log(json);
      });
  }, []);
  const [perPage, setPerPage] = useState(5); // 1ページあたりに表示したいアイテムの数
  //const [modalVisible,setModalVisible] = useState(false);

  return (
    <div className='Body'>
      {/* <CreateGroup modalVisible={modalVisible} setModalVisible={setModalVisible}></CreateGroup> */}
      <div className='QuestionPageTitleFrame'>
        <span className='QuestionPageTitle'>問題一覧</span>
      </div>
      <Pagination setOffset={setOffset} dataleng={Questions ? Questions.length : 0} perPage={perPage}></Pagination>
      <div className='addQuestionButtonFrame'>
        <Button color='primary' variant='contained' className='addQuestionButton'>
          追加
        </Button>
        <Button color='primary' variant='contained' className='addQuestionsButton'>
          複数追加
        </Button>
      </div>
      <SelectPerPage perPage={perPage} setPerPage={setPerPage} />
      {Questions ? (
        <div className='QuestionList'>
          {Questions.slice(offset, offset + perPage).map((data) => (
            <QuestionInfo data={data} key={data.question_id}></QuestionInfo>
          ))}
        </div>
      ) : (
        ''
      )}
      <Pagination setOffset={setOffset} dataleng={Questions ? Questions.length : 0} perPage={perPage}></Pagination>
    </div>
  );
};

export default Questions;
