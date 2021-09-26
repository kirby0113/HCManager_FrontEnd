import "./TeachingMaterialInfo.css";

import Card from "@material-ui/core/Card";

import styled from 'styled-components';

import {
  Link,
} from "react-router-dom";

const StyledLink = styled(Link)`
text-decoration:none;
color:#000;
font-size:16px;
letter-spacing:1.4px;
"&:hover":{
  text-decoration:none;
}
`


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
                    <StyledLink to={"/TeachingMaterial/detail/".concat(props.data.id)}>
                    <Button variant="contained" color="primary" className="TMInfoDetailButton">詳細を見る</Button>
                    </StyledLink>
                    </div>
                </div>
            </Card>
    )
}

export default GroupInfo;