import React,{useState} from "react";

import Button from "@material-ui/core/Button";

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';




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
                </div>

                <div className="UserCreateButtons">
                    <Button variant="contained" color="primary" className="CreateUserButton">
                        新しく
                    </Button>
                    <Button variant="contained" color="primary" className="CreateUsersButton">
                        複数
                    </Button>
                </div>

                <UserPagination setOffset={setOffset} dataleng={UserDummyData.length} perPage={perPage}></UserPagination>

                <TableContainer className="UserTable" component={Paper} >
                <Table aria-label="simple table">
                    <TableHead>
                    <TableRow>
                        <TableCell>名前</TableCell>
                        <TableCell align="center">メールアドレス</TableCell>
                        <TableCell align="center">権限</TableCell>
                        <TableCell align="center">変更</TableCell>
                        <TableCell align="center">削除</TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {UserDummyData.slice(offset,offset + perPage).map((data) => <UserInfo data={data} key={data.UserName}></UserInfo>)}
                    </TableBody>
                </Table>
                </TableContainer>

    </div>
}

export default Body;