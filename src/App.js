import React from "react";
import Header from "./components/Header";
import GroupBody from "./components/Group/Body";
import UsersBody from "./components/Users/Body";
import QuestionsBody from "./components/Questions/Questions";
import TeachingMaterialsBody from "./components/TeachingMaterials/TeachingMaterials";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";

import 'bootstrap/dist/css/bootstrap.min.css';


const App = () => {
    return (
      <Router>
        <div>
          <nav>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/group">group</Link>
              </li>
              <li>
                <Link to="/users">Users</Link>
              </li>
              <li>
                <Link to="/questions">Questions</Link>
              </li>
              <li>
                <Link to="/teachingMaterials">TeachingMaterials</Link>
              </li>
            </ul>
          </nav>
          <Header></Header>
          <Switch>
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
          </Switch>
        </div>
      </Router>
    );
}

function Home() {
    return <h2>Home</h2>;
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