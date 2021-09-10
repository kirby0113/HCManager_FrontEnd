import "./TeachingMaterialInfo.css";

/* TM = TeachingMaterial */

const GroupInfo = (props) => {

    return (
            <div className="TMInfoFrame">
                <div className="TMInfoGrid">
                    <div>
                        <span className="elementName">教材名</span>
                        {props.data.TeachingMaterialName}
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
                <div className="TMInfoLinkGrid">
                    <div className="TMInfoDeleteButtonFrame">
                    <span className="TMInfoDeleteButton">削除する</span>
                    </div>
                    <div className="TMInfoDetailButtonFrame">
                    <span className="TMInfoDetailButton">詳細を見る</span>
                    </div>
                </div>
            </div>
    )
}

export default GroupInfo;