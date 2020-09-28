import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import RegisterPage from "./components/RegisterPage/RegisterPage";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/login"></Route>
        <Route path="/register">
          <RegisterPage />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
