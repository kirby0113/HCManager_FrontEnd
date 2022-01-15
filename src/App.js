// API GitHubリンク: https://github.com/HIT-matsumotolab/HelloC_API

import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

//一覧ページ等
import Home from './components/Home/Home';
import Header from './components/Header';
import GroupList from './pages/Group/GroupList';
import UsersBody from './components/Users/Body';
import QuestionsBody from './components/Questions/Questions';
import BookList from './pages/Book/BookList';

//詳細ページ
import GroupDetail from './components/GroupDetail/GroupDetail';
import TeachingMaterialDetail from './components/TMDetail/TeachingMaterialDetail';

import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  return (
    <Router>
      <MuiThemeProvider>
        <div>
          <Header></Header>
          <Switch>
            {/* 一覧ページのルーティング */}
            <Route exact path='/group'>
              <GroupList />
            </Route>
            <Route exact path='/users'>
              <Users />
            </Route>
            <Route exact path='/questions'>
              <Questions />
            </Route>
            <Route exact path='/teachingMaterials'>
              <BookList />
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

function Users() {
  return <UsersBody></UsersBody>;
}

function Questions() {
  return <QuestionsBody></QuestionsBody>;
}

export default App;
