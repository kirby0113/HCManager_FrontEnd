import React,{useState} from "react";
//import ReactDOM from "react-dom";


import QuestionInfo from "./TeachingMaterialInfo";
import Pagination from "./Pagination";
//import CreateGroupModal from "./CreateGroupModal";

import "./TeachingMaterials.css";




const dummyData = [
    {
        TeachingMaterialName:"TM1",
        createdBy:"admin1",
        accesskey:"test",
        date:"dummy1"
    },
    {
        TeachingMaterialName:"TM2",
        createdBy:"admin2",
        accesskey:"test",
        date:"dummy2"
    },
    {
        TeachingMaterialName:"TM3",
        createdBy:"admin3",
        accesskey:"test",
        date:"dummy3"
    },
    {
        TeachingMaterialName:"TM4",
        createdBy:"admin4",
        accesskey:"test",
        date:"dummy4"
    },
    {
        TeachingMaterialName:"TM5",
        createdBy:"admin5",
        accesskey:"test",
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
            <div className="TMPageTitleFrame">
            <span className="TMPageTitle">
                教材一覧
            </span>
            </div>
            <Pagination setOffset={setOffset} dataleng={dummyData.length} perPage={perPage}></Pagination>
            <div className="addTMButtonFrame">
            <span className="addTMButton" >追加</span>
            <span className="addTMsButton" >複数追加</span>
            </div>
            <div className="TMList">
            {dummyData.slice(offset,offset + perPage).map((data) => <QuestionInfo data={data} key={data.groupName}></QuestionInfo>)}
            </div>
            <Pagination setOffset={setOffset} dataleng={dummyData.length} perPage={perPage}></Pagination>
        </div>
    );
}

export default Questions;