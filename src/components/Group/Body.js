import React,{useState} from "react";
import ReactDOM from "react-dom";


import GroupInfo from "./GroupInfo";
import Pagination from "./Pagination";
import CreateGroupModal from "./CreateGroupModal";

import "./Body.css"


const dummyData = [
    {
        groupName:"group1",
        createdBy:"admin1",
        accesskey:"test",
        date:"dummy1"
    },
    {
        groupName:"group2",
        createdBy:"admin2",
        accesskey:"test",
        date:"dummy2"
    },
    {
        groupName:"group3",
        createdBy:"admin3",
        accesskey:"test",
        date:"dummy3"
    },
    {
        groupName:"group4",
        createdBy:"admin4",
        accesskey:"test",
        date:"dummy4"
    },
    {
        groupName:"group5",
        createdBy:"admin5",
        accesskey:"test",
        date:"dummy5"
    },
];

const CreateGroup = (props) => {
    return ReactDOM.createPortal(
        <CreateGroupModal modalVisible={props.modalVisible} setModalVisible={props.setModalVisible}></CreateGroupModal>,
        document.getElementById("modal-creategroup")
    );
}


const Body = () => {

    const [offset,setOffset] = useState(0);
    const perPage = 2; // 1ページあたりに表示したいアイテムの数
    const [modalVisible,setModalVisible] = useState(false);

    return (
        <div className="Body">
            <CreateGroup modalVisible={modalVisible} setModalVisible={setModalVisible}></CreateGroup>
            <div className="PageTitleFrame">
            <span className="PageTitle">
                グループ一覧
            </span>
            </div>
            <Pagination setOffset={setOffset} dataleng={dummyData.length} perPage={perPage}></Pagination>
            <div className="addGroupButtonFrame">
            <span className="addGroupButton" onClick={ () => {setModalVisible(true)}}>グループ追加</span>
            </div>
            <div className="GroupList">
            {dummyData.slice(offset,offset + perPage).map((data) => <GroupInfo data={data} key={data.groupName}></GroupInfo>)}
            </div>
            <Pagination setOffset={setOffset} dataleng={dummyData.length} perPage={perPage}></Pagination>
        </div>
    );
}

export default Body;