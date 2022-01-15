import {useState, useEffect} from 'react';
//import ReactDOM from "react-dom";
import {QuestionsAPI} from '../../APILink';

import QuestionInfo from './QuestionInfo';
import Pagination from '../Pagination';
//import CreateGroupModal from "./CreateGroupModal";

import {SelectPerPage} from '../SelectPerPage';
import {PageTitle} from '../Utilities/Title';
import {InfoCardList} from '../Cards/Lists/InfoCardList';
import {PrimaryButton} from '../Buttons/PrimaryButton';
import {AddButtonList} from '../Buttons/Lists/AddButtonList';

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
      <PageTitle color='orange'>問題一覧</PageTitle>
      <Pagination setOffset={setOffset} dataleng={Questions ? Questions.length : 0} perPage={perPage}></Pagination>
      <AddButtonList>
        <PrimaryButton color='primary' sizeX='large' sizeY='small'>
          追加
        </PrimaryButton>
        <PrimaryButton color='primary' sizeX='large' sizeY='small'>
          複数追加
        </PrimaryButton>
      </AddButtonList>
      <SelectPerPage perPage={perPage} setPerPage={setPerPage} />
      {Questions ? (
        <InfoCardList>
          {Questions.slice(offset, Number(offset) + Number(perPage)).map((data) => (
            <QuestionInfo data={data} key={data.question_id}></QuestionInfo>
          ))}
        </InfoCardList>
      ) : (
        ''
      )}
      <Pagination setOffset={setOffset} dataleng={Questions ? Questions.length : 0} perPage={perPage}></Pagination>
    </div>
  );
};

export default Questions;
