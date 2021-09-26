import "./QuestionInfo.css";

import Card from "@material-ui/core/Card";


import Button from "@material-ui/core/Button";


const QuestionInfo = (props) => {

    return (
            <Card className="QuestionInfoFrame">
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
                    <Button variant="contained" color="secondary" className="QuestionInfoDeleteButton">削除する</Button>
                    </div>
                    <div className="QuestionInfoDetailButtonFrame">
                    <Button variant="contained" color="primary" className="QuestionInfoDetailButton">詳細を見る</Button>
                    </div>
                </div>
            </Card>
    )
}

export default QuestionInfo;