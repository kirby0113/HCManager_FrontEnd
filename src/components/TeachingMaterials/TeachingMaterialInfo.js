import "./TeachingMaterialInfo.css";

import Card from "@material-ui/core/Card";


import Button from "@material-ui/core/Button";

/* TM = TeachingMaterial */

const GroupInfo = (props) => {

    return (
            <Card className="TMInfoFrame">
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
                    <Button variant="contained" color="secondary" className="TMInfoDeleteButton">削除する</Button>
                    </div>
                    <div className="TMInfoDetailButtonFrame">
                    <Button variant="contained" color="primary" className="TMInfoDetailButton">詳細を見る</Button>
                    </div>
                </div>
            </Card>
    )
}

export default GroupInfo;