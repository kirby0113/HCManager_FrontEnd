import "./GroupInfo.css";
import styled from 'styled-components';

import {
  Link,
} from "react-router-dom";

import Card from "@material-ui/core/Card";


import Button from "@material-ui/core/Button";

const StyledLink = styled(Link)`
text-decoration:none;
color:#000;
font-size:16px;
letter-spacing:1.4px;
"&:hover":{
  text-decoration:none;
}
`


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
                    <StyledLink to={"/group/detail/".concat(props.data.id)}>
                    <Button variant="contained" color="primary" className="GroupInfoDetailButton">詳細を見る</Button>
                    </StyledLink>
                    </div>
                </div>
            </Card>
    )
}

export default GroupInfo;