import React,{useState} from "react";
import ReactPaginate from 'react-paginate';

import GroupInfo from "./GroupInfo"
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


const Body = () => {

    const handlePageChange = (data) => {
        let page_number = data['selected']; // クリックした部分のページ数が{selected: 2}のような形で返ってくる
        setOffset(page_number*perPage); // offsetを変更し、表示開始するアイテムの番号を変更
    }

    const [offset,setOffset] = useState(0);
    const perPage = 1; // 1ページあたりに表示したいアイテムの数

    return (
        <div className="Body">
            <ReactPaginate
            style={{ marginTop: 10, marginBottom: 100 }}
            pageCount={Math.ceil(dummyData.length/perPage)} // 全部のページ数。端数の場合も考えて切り上げに。
            marginPagesDisplayed={5}
            pageRangeDisplayed={10}
            onPageChange={handlePageChange}
            containerClassName='pagination'
            pageClassName='page-item'
            pageLinkClassName='page-link'
            activeClassName='active'
            previousLabel='<'
            nextLabel='>'
            previousClassName='page-item'
            nextClassName='page-item'
            previousLinkClassName='page-link'
            nextLinkClassName='page-link'
            disabledClassName='disabled'
            breakLabel='...'
            breakClassName='page-item'
            breakLinkClassName='page-link'
            />
            <div className="GroupList">
            {dummyData.slice(offset,offset + perPage).map((data) => <GroupInfo data={data}></GroupInfo>)}
            </div>
        </div>
    );
}

export default Body;