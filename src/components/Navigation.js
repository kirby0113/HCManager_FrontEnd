import React from "react";
import styled from 'styled-components';

import {
  Link,
} from "react-router-dom";


import "./Navigation.css";

const StyledLink = styled(Link)`
text-decoration:none;
color:#fff;
font-size:16px;
letter-spacing:1.4px;
"&:hover":{
  text-decoration:none;
}
`

const Navigation = () => {
    return (
          <nav className="Navigation">
            <ul className="NavigationList">
            <StyledLink to="/">
                <li className="NavigationUnit">
                    <span >TOP</span>
                </li>
              </StyledLink>
              <StyledLink to="/group">
                <li className="NavigationUnit">
                    <span >グループ一覧</span>
                </li>
              </StyledLink>
              <StyledLink to="/users">
                <li className="NavigationUnit">
                    <span >ユーザ一覧</span>
                </li>
              </StyledLink>
              <StyledLink to="/questions">
                <li className="NavigationUnit">
                    <span >問題一覧</span>
                </li>
              </StyledLink>
              <StyledLink to="/teachingMaterials">
                <li className="NavigationUnit">
                    <span >教材一覧</span>
                </li>
              </StyledLink>
            </ul>
        </nav>
    )
}

export default Navigation;