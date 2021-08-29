import React from "react";
import Header from "./components/Header";
import GroupBody from "./components/Group/Body";
import UsersBody from "./components/Users/Body";
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
          </ul>
        </nav>
        <Header></Header>
        <Switch>
          <Route path="/group">
            <Group></Group>
          </Route>
          <Route path="/users">
            <Users />
          </Route>
          <Route path="/">
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

export default App;