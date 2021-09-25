import "./GroupInfo.css";

import Card from "@material-ui/core/Card";


import Button from "@material-ui/core/Button";


const GroupInfo = (props) => {

    return (
            <Card className="GroupInfoFrame">
                <div className="GroupInfoGrid">
                    <div>
                        <span className="elementName">グループ名</span>
                        {props.data.groupName}
                    </div>
                    <div>
                        <span className="elementName">作成者</span>
                        {props.data.createdBy}
                    </div>
                    <div>
                        <span className="elementName">アクセスキー</span>
                        {props.data.accesskey}
                    </div>
                    <div>
                        <span className="elementName">作成日</span>
                        {props.data.date}
                    </div>
                </div>

                <div className="GroupInfoLinkGrid">
                    <div className="GroupInfoDeleteButtonFrame">
                    <Button variant="contained" color="secondary" className="GroupInfoDeleteButton">削除する</Button>
                    </div>
                    <div className="GroupInfoDetailButtonFrame">
                    <Button variant="contained" color="primary" className="GroupInfoDetailButton" href={"/group/detail/".concat(props.data.id)}>詳細を見る</Button>
                    </div>
                </div>
            </Card>
    )
}

export default GroupInfo;