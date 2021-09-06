import React,{useState} from "react";
//import ReactDOM from "react-dom";


import QuestionInfo from "./QuestionInfo";
import Pagination from "./Pagination";
//import CreateGroupModal from "./CreateGroupModal";

import "./Questions.css";




const dummyData = [
    {
        questionName:"group1",
        createdBy:"admin1",
        questionType:"test",
        date:"dummy1"
    },
    {
        questionName:"group2",
        createdBy:"admin2",
        questionType:"test",
        date:"dummy2"
    },
    {
        questionName:"group3",
        createdBy:"admin3",
        questionType:"test",
        date:"dummy3"
    },
    {
        questionName:"group4",
        createdBy:"admin4",
        questionType:"test",
        date:"dummy4"
    },
    {
        questionName:"group5",
        createdBy:"admin5",
        questionType:"test",
        date:"dummy5"
    },
];

// const CreateGroup = (props) => {
//     return ReactDOM.createPortal(
//         <CreateGroupModal modalVisible={props.modalVisible} setModalVisible={props.setModalVisible}></CreateGroupModal>,
//         document.getElementById("modal-creategroup")
//     );
// }


const Questions = () => {

    const [offset,setOffset] = useState(0);
    const perPage = 2; // 1ページあたりに表示したいアイテムの数
    //const [modalVisible,setModalVisible] = useState(false);

    return (
        <div className="Body">
            {/* <CreateGroup modalVisible={modalVisible} setModalVisible={setModalVisible}></CreateGroup> */}
            <div className="QuestionPageTitleFrame">
            <span className="QuestionPageTitle">
                問題一覧
            </span>
            </div>
            <Pagination setOffset={setOffset} dataleng={dummyData.length} perPage={perPage}></Pagination>
            <div className="addQuestionButtonFrame">
            <span className="addQuestionButton" >追加</span>
            <span className="addQuestionsButton" >複数追加</span>
            </div>
            <div className="QuestionList">
            {dummyData.slice(offset,offset + perPage).map((data) => <QuestionInfo data={data} key={data.groupName}></QuestionInfo>)}
            </div>
            <Pagination setOffset={setOffset} dataleng={dummyData.length} perPage={perPage}></Pagination>
        </div>
    );
}

export default Questions;