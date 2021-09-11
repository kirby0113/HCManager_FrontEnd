import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";



//一覧ページ等
import Home from "./components/Home/Home";
import Header from "./components/Header";
import Navigation from "./components/Navigation";
import GroupBody from "./components/Group/Body";
import UsersBody from "./components/Users/Body";
import QuestionsBody from "./components/Questions/Questions";
import TeachingMaterialsBody from "./components/TeachingMaterials/TeachingMaterials";

//詳細ページ
import GroupDetail from "./components/GroupDetail/GroupDetail";

import 'bootstrap/dist/css/bootstrap.min.css';


const App = () => {
    return (
      <Router>
        <div>

          <Header></Header>
          <Navigation></Navigation>
          <Switch>

            {/* 一覧ページのルーティング */}
            <Route exact path="/group">
              <Group></Group>
            </Route>
            <Route exact path="/users">
              <Users />
            </Route>
            <Route exact path="/questions">
              <Questions />
            </Route>
            <Route exact path="/teachingMaterials">
              <TeachingMaterials />
            </Route>
            <Route exact path="/">
              <Home />
            </Route>

            {/* 詳細ページのルーティング */}

            <Route render = {() => <GroupDetail/>
            } path="/group/detail/:id(\d+)"/>

          </Switch>
        </div>
      </Router>
    );
}

  function Group() {
    return <div>
            <GroupBody></GroupBody>
    </div>;
  }
  
  function Users() {
    return <UsersBody></UsersBody>;
  }

  function Questions() {
    return <QuestionsBody></QuestionsBody>
  }
  function TeachingMaterials(){
    return <TeachingMaterialsBody></TeachingMaterialsBody>
  }

export default App;