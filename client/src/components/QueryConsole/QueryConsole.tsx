import React from "react";
import classes from "./QueryConsole.module.css";

import LoginForm from "./LoginForm/LoginForm";
import QueryComponent from "./QueryComponent/QueryComponent";

import { loginUser } from "../../API/api";

class QueryConsole extends React.Component {
  state = {
    token: "",
    display_item: "loginForm",
  };

  componentDidMount() {
    if (this.state.token !== "") {
      this.setState({ display_item: "queryConsole" });
    }
  }

  handleLogin = (data: UserLoginInfo) => {
    loginUser(data, (token) => {
      this.setState({ token, display_item: "queryConsole" });
    });
  };

  render() {
    let toDisplay = null;
    switch (this.state.display_item) {
      case "loginForm":
        toDisplay = <LoginForm handleLogin={this.handleLogin.bind(this)} />;
        break;
      case "queryConsole":
        toDisplay = <QueryComponent token={this.state.token} />;
        break;
    }
    return <div className={classes.MainContainer}>{toDisplay}</div>;
  }
}

export default QueryConsole;
