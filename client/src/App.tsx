import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import ReactNotifications from "react-notifications-component";

import "react-notifications-component/dist/theme.css";
import RegisterPage from "./components/RegisterPage/RegisterPage";
import LoginPage from "./components/LoginPage/LoginPage";

function App() {
  return (
    <Router>
      <ReactNotifications />
      <Switch>
        <Route path="/register" component={RegisterPage} />
        <Route path="/" component={LoginPage} />
      </Switch>
    </Router>
  );
}

export default App;
