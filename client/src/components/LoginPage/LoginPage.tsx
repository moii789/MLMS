import React, { ChangeEvent, FormEvent } from "react";
import { Link } from "react-router-dom";

import QRreader from "./QRreader/QRreader";
import Items from "../Items/Items";
import { logUser, getItems, submitItems } from "../../API/api";

import classes from "./LoginPage.module.css";

interface LoginPageState {
  id: string;
  showLogoutComponent: boolean;
  items: Array<ItemType>;
}

class LoginPage extends React.Component<{}, LoginPageState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      id: "",
      showLogoutComponent: false,
      items: [],
    };
  }

  componentDidMount() {
    if (this.state.items.length === 0) {
      getItems((data) => this.setState({ items: data }));
    }
  }

  handleIDChange = (e: ChangeEvent<HTMLInputElement>) => {
    this.setState({ id: e.target.value });
  };

  handleScan = (data: string | null) => {
    console.log(data);
    if (data !== null) {
      this.setState({ id: data });
    }
  };

  toggleItemClick: ToggleItem = (selectedItem) => {
    if (this.state.items.length > 0) {
      const newItems = this.state.items.map((item) => {
        if (item === selectedItem) {
          return {
            ...item,
            selected: !item.selected,
          };
        }
        return item;
      });
      this.setState({ items: newItems });
    }
  };

  handleItemSubmit: HandleItemSubmit = (e: FormEvent<HTMLButtonElement>) => {
    const toSend: ItemType[] = [];
    this.state.items.forEach((ele) => {
      if (ele.selected) {
        toSend.push(ele);
      }
    });
    submitItems(this.state.id, toSend);
    this.setState({ id: "", showLogoutComponent: false });
  };

  //to fix: maybe needs ID to be sent from the backend...
  handleLogin = (e: FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    logUser(this.state.id).then((res) => {
      console.log(this.state.id);
      if (res && res.data === "logging out") {
        this.setState({ showLogoutComponent: true });
      }
    });
    this.setState({ id: "" });
  };

  render() {
    return (
      <React.Fragment>
        {this.state.showLogoutComponent ? (
          <Items
            itemList={this.state.items}
            toggleItem={this.toggleItemClick}
            handleItemSubmit={this.handleItemSubmit}
          />
        ) : null}
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
      </React.Fragment>
    );
  }
}

export default LoginPage;
