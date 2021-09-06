import "./QuestionInfo.css";


const GroupInfo = (props) => {

    return (
            <div className="QuestionInfoFrame">
                <div className="QuestionInfoGrid">
                    <div>
                        <span className="elementName">問題名</span>
                        {props.data.questionName}
                    </div>
                    <div>
                        <span className="elementName">作成者</span>
                        {props.data.createdBy}
                    </div>
                    <div>
                        <span className="elementName">問題形式</span>
                        {props.data.questionType}
                    </div>
                    <div>
                        <span className="elementName">作成日</span>
                        {props.data.date}
                    </div>
                </div>
                <div className="QuestionInfoLinkGrid">
                    <div className="QuestionInfoDeleteButtonFrame">
                    <span className="QuestionInfoDeleteButton">削除する</span>
                    </div>
                    <div className="QuestionInfoDetailButtonFrame">
                    <span className="QuestionInfoDetailButton">詳細を見る</span>
                    </div>
                </div>
            </div>
    )
}

export default GroupInfo;