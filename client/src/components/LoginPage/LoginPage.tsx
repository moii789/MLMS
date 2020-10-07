import React, { ChangeEvent, FormEvent } from "react";
import { Link } from "react-router-dom";
import QRreader from "./QRreader/QRreader";
import { logUser, getItems } from "../../API/api";

import classes from "./LoginPage.module.css";

interface LoginPageState {
  id: string;
  showLogoutComponent: boolean;
  items: Array<Object>;
}

class LoginPage extends React.Component {
  state = {
    id: "",
    showLogoutComponent: false,
    items: [],
  };

  componentDidMount() {
    if (this.state.items.length === 0) {
      getItems((data) => this.setState({ items: data }));
    }
  }

  handleIDChange = (e: ChangeEvent<HTMLInputElement>) => {
    this.setState({ id: e.target.value });
  };

  handleScan = (data: String | null) => {
    console.log(data);
    if (data !== null) {
      this.setState({ id: data });
    }
  };

  handleLogin = (e: FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    logUser(this.state.id);
    //axios call
  };

  render() {
    return (
      <div className={classes.MainContainer}>
        <div className={classes.container}>
          <form>
            <div className={classes.formControl}>
              <input
                type="text"
                id="id"
                placeholder="ID"
                value={this.state.id}
                onChange={this.handleIDChange}
              />
            </div>
            <div className={classes.formControl}>
              <button
                type="submit"
                onClick={this.handleLogin}
                className={classes.button}
              >
                Sign In
              </button>
            </div>
            <div className={classes.formControl}>
              <Link
                to={{
                  pathname: "/register",
                  state: { id: this.state.id },
                }}
              >
                <button type="button" className={classes.button}>
                  Register
                </button>
              </Link>
            </div>
          </form>
        </div>
        <div className={classes.container}>
          <QRreader handleScan={this.handleScan.bind(this)} />
        </div>
      </div>
    );
  }
}

export default LoginPage;
