import "./GroupInfo.css";


const GroupInfo = (props) => {

    return (
            <div className="GroupInfoFrame">
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
                    <span className="GroupInfoDeleteButton">削除する</span>
                    </div>
                    <div className="GroupInfoDetailButtonFrame">
                    <span className="GroupInfoDetailButton">詳細を見る</span>
                    </div>
                </div>
            </div>
    )
}

export default GroupInfo;