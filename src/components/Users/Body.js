import React,{useState} from "react";


import UserPagination from "./Pagination";
import UserInfo from "./UserInfo";

import "./Body.css";

const UserDummyData = [
    {
        UserName:"test1",
        Email:"test@test.com",
        Authority:"student",
    },
    {
        UserName:"testtest2",
        Email:"test@test.com",
        Authority:"student",
    },
    {
        UserName:"test3",
        Email:"test@test.com",
        Authority:"student",
    },
    {
        UserName:"test4test",
        Email:"test@test.com",
        Authority:"Professor",
    },
    {
        UserName:"test5",
        Email:"test@testtestest.com",
        Authority:"student",
    },
    {
        UserName:"test6",
        Email:"test@test.com",
        Authority:"Admin",
    },
];


const Body = () => {

    // const CreateGroup = (props) => {
    //     return ReactDOM.createPortal(
    //         <CreateGroupModal modalVisible={props.modalVisible} setModalVisible={props.setModalVisible}></CreateGroupModal>,
    //         document.getElementById("modal-creategroup")
    //     );
    // }
    
    const [offset,setOffset] = useState(0);
    const perPage = 5; // 1ページあたりに表示したいアイテムの数
   // const [modalVisible,setModalVisible] = useState(false);

    return <div className="UsersBody">
                {/* <CreateGroup modalVisible={modalVisible} setModalVisible={setModalVisible}></CreateGroup> */}

                <div className="UsersPageTitleFrame">
                    <span className="UsersPageTitle">
                        ユーザー一覧
                    </span>

                    <UserPagination setOffset={setOffset} dataleng={UserDummyData.length} perPage={perPage}></UserPagination>

                    <table border="1"className="UserList">
                        <tr>
                            <th>名前</th>
                            <th>メールアドレス</th>
                            <th>権限</th>
                            <th>変更</th>
                            <th>削除</th>
                        </tr>
                    {UserDummyData.slice(offset,offset + perPage).map((data) => <UserInfo data={data} key={data.UserName}></UserInfo>)}
                    </table>
                </div>
    </div>
}

export default Body;