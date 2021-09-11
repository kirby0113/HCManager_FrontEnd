import React from "react";


import "./Navigation.css";

const Navigation = () => {
    return (
          <nav className="Navigation">
            <ul className="NavigationList">
            <a href="/" className="NavigationAnc">
                <li className="NavigationUnit">
                    <span >TOP</span>
                </li>
              </a>
              <a href="/group" className="NavigationAnc">
                <li className="NavigationUnit">
                    <span >グループ一覧</span>
                </li>
              </a>
              <a href="./users" className="NavigationAnc">
                <li className="NavigationUnit">
                    <span >ユーザ一覧</span>
                </li>
              </a>
              <a href="./questions" className="NavigationAnc">
                <li className="NavigationUnit">
                    <span >問題一覧</span>
                </li>
              </a>
              <a href="./teachingMaterials" className="NavigationAnc">
                <li className="NavigationUnit">
                    <span >教材一覧</span>
                </li>
              </a>
            </ul>
        </nav>
    )
}

export default Navigation;