import React from "react";

import { useParams } from "react-router";

import TeachingMaterialInfo from "../TeachingMaterials/TeachingMaterialInfo";

import "./GroupDetail.css";


//とりあえずダミーデータにしてます（本来はAPIから取得）
const dummyTM = [
    {
        TeachingMaterialName:"TM1",
        createdBy:"admin1",
        accesskey:"test",
        date:"dummy1",
        groupId:1
    },
    {
        TeachingMaterialName:"TM2",
        createdBy:"admin2",
        accesskey:"test",
        date:"dummy2",
        groupId:2
    },
    {
        TeachingMaterialName:"TM3",
        createdBy:"admin3",
        accesskey:"test",
        date:"dummy3",
        groupId:3
    },
    {
        TeachingMaterialName:"TM4",
        createdBy:"admin4",
        accesskey:"test",
        date:"dummy4",
        groupId:4
    },
    {
        TeachingMaterialName:"TM5",
        createdBy:"admin5",
        accesskey:"test",
        date:"dummy5",
        groupId:5
    },
];

const dummyGroup = [
    {
        id:1,
        groupName:"group1",
        createdBy:"admin1",
        accesskey:"test",
        date:"dummy1",
        overview:"これはtestグループです。\n改行テスト"
    },
    {
        id:2,
        groupName:"group2",
        createdBy:"admin2",
        accesskey:"test",
        date:"dummy2",
        overview:"これはtestグループです。"
    },
    {
        id:3,
        groupName:"group3",
        createdBy:"admin3",
        accesskey:"test",
        date:"dummy3",
        overview:"これはtestグループです。"
    },
    {
        id:4,
        groupName:"group4",
        createdBy:"admin4",
        accesskey:"test",
        date:"dummy4",
        overview:"これはtestグループです。"
    },
    {
        id:5,
        groupName:"group5",
        createdBy:"admin5",
        accesskey:"test",
        date:"dummy5",
        overview:"これはtestグループです。"
    },
];


const GroupDetail = () => {
    const param = useParams();
    const detail = dummyGroup.find(element => element.id == param["id"]);

    return (
        <div>
            <div className="GroupDetailPageTitleFrame">
                <span className="GroupDetailPageTitle">
                    グループ詳細
                </span>
            </div>

            <div class="GroupDetailFrame">
                <div className="GroupDetailTopGrid">
                    <div>
                        <span className="elementName">グループ名</span>
                        {detail.groupName}
                    </div>
                    <div>
                        <span className="elementName">作成者</span>
                        {detail.createdBy}
                    </div>
                    <div>
                        <span className="elementName">アクセスキー</span>
                        {detail.accesskey}
                    </div>
                    <div>
                        <span className="elementName">作成日</span>
                        {detail.date}
                    </div>
                </div>
                <div className="GroupDetailBottom">
                    <div>
                    <span className="elementName">グループ概略</span>
                    </div>
                    <div class="GroupDetailTextRange">{detail.overview.split(/(\n)/).map((item) => {
                        return item.match(/\n/) ? <br /> : item
                    })}</div>
                </div>
            </div>

            <div className="addTMButtonFrame">
                <span className="addTMButton" >追加</span>
                <span className="addTMsButton" >複数追加</span>
            </div>
            <div className="TMList">
                    {dummyTM.filter(element => element.groupId == param["id"]).map((data) => <TeachingMaterialInfo data={data} key={data.groupName}></TeachingMaterialInfo>)}
            </div>
        </div>
    );
}

export default GroupDetail;