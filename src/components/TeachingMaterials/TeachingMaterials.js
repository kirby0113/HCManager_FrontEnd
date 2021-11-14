import React,{useState} from "react";
import ReactDOM from "react-dom";

import Button from "@material-ui/core/Button";

import TeachingMaterialInfo from "./TeachingMaterialInfo";
import Pagination from "./Pagination";
import CreateTeachingMaterialModal from "./CreateTeachingMaterialModal";

import "./TeachingMaterials.css";




const dummyData = [
    {
        id:"1",
        TeachingMaterialName:"TM1",
        createdBy:"admin1",
        accesskey:"test",
        date:"dummy1",
        groupId:1
    },
    {
        id:"2",
        TeachingMaterialName:"TM2",
        createdBy:"admin2",
        accesskey:"test",
        date:"dummy2",
        groupId:2
    },
    {
        id:"3",
        TeachingMaterialName:"TM3",
        createdBy:"admin3",
        accesskey:"test",
        date:"dummy3",
        groupId:3
    },
    {
        id:"4",
        TeachingMaterialName:"TM4",
        createdBy:"admin4",
        accesskey:"test",
        date:"dummy4",
        groupId:4
    },
    {
        id:"5",
        TeachingMaterialName:"TM5",
        createdBy:"admin5",
        accesskey:"test",
        date:"dummy5",
        groupId:5
    },
];

const CreateTeachingMaterial = (props) => {
    return ReactDOM.createPortal(
        <CreateTeachingMaterialModal modalVisible={props.modalVisible} setModalVisible={props.setModalVisible}></CreateTeachingMaterialModal>,
        document.getElementById("modal-creategroup")
    );
}


const Questions = () => {

    const [offset,setOffset] = useState(0);
    const perPage = 2; // 1ページあたりに表示したいアイテムの数
    const [modalVisible,setModalVisible] = useState(false);

    return (
        <div className="Body">
            <CreateTeachingMaterial modalVisible={modalVisible} setModalVisible={setModalVisible}></CreateTeachingMaterial>
            <div className="TMPageTitleFrame">
            <span className="TMPageTitle">
                教材一覧
            </span>
            </div>
            <Pagination setOffset={setOffset} dataleng={dummyData.length} perPage={perPage}></Pagination>
            <div className="addTMButtonFrame">
            <Button variant="contained" color="primary" className="addTMButton" >追加</Button>
            <Button variant="contained" color="primary" className="addTMsButton" >複数追加</Button>
            </div>
            <div className="TMList">
            {dummyData.slice(offset,offset + perPage).map((data) => <TeachingMaterialInfo data={data} key={data.groupName}></TeachingMaterialInfo>)}
            </div>
            <Pagination setOffset={setOffset} dataleng={dummyData.length} perPage={perPage}></Pagination>
        </div>
    );
}

export default Questions;