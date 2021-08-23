import "./GroupInfo.css";

const GroupInfo = (props) => {

    return (
        <div className="GroupInfoFrame">
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
    )
}

export default GroupInfo;