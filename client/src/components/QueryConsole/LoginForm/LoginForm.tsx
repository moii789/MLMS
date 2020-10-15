import React, { useState, ChangeEvent, FormEvent } from "react";

import classes from "./LoginForm.module.css";

interface LoginFormProps {
  handleLogin: (data: UserLoginInfo) => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ handleLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const onUsernameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const onPasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const loginHandler = (e: FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    handleLogin({ username, password });
    setUsername("");
    setPassword("");
  };

  return (
    <div className={classes.formContainer}>
      <form>
        <input
          type="text"
          value={username}
          onChange={onUsernameChange}
          placeholder="username"
        />
        <input
          type="password"
          value={password}
          onChange={onPasswordChange}
          placeholder="password"
        />
        <button type="submit" value="Login" onClick={loginHandler}>
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
