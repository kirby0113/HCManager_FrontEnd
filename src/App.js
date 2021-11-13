import React, {useEffect} from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import {UsersAPI} from './APILink';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

//一覧ページ等
import Home from './components/Home/Home';
import Header from './components/Header';
import GroupBody from './components/Group/Body';
import UsersBody from './components/Users/Body';
import QuestionsBody from './components/Questions/Questions';
import TeachingMaterialsBody from './components/TeachingMaterials/TeachingMaterials';

//詳細ページ
import GroupDetail from './components/GroupDetail/GroupDetail';
import TeachingMaterialDetail from './components/TMDetail/TeachingMaterialDetail';

import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  useEffect(() => {
    fetch(UsersAPI) //api
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
      });
  }, []);

  return (
    <Router>
      <MuiThemeProvider>
        <div>
          <Header></Header>
          <Switch>
            {/* 一覧ページのルーティング */}
            <Route exact path='/group'>
              <Group></Group>
            </Route>
            <Route exact path='/users'>
              <Users />
            </Route>
            <Route exact path='/questions'>
              <Questions />
            </Route>
            <Route exact path='/teachingMaterials'>
              <TeachingMaterials />
            </Route>
            <Route exact path='/'>
              <Home />
            </Route>

            {/* 詳細ページのルーティング */}

            <Route render={() => <GroupDetail />} path='/group/detail/:id(\d+)' />

            <Route render={() => <TeachingMaterialDetail />} path='/TeachingMaterial/detail/:id(\d+)' />
          </Switch>
        </div>
      </MuiThemeProvider>
    </Router>
  );
};

function Group() {
  return (
    <div>
      <GroupBody></GroupBody>
    </div>
  );
}

function Users() {
  return <UsersBody></UsersBody>;
}

function Questions() {
  return <QuestionsBody></QuestionsBody>;
}
function TeachingMaterials() {
  return <TeachingMaterialsBody></TeachingMaterialsBody>;
}

export default App;
