import React, { useState, ChangeEvent, FormEvent } from "react";

import QRreader from "../../LoginPage/QRreader/QRreader";

import classes from "./LoginForm.module.css";

interface LoginFormProps {
  handleLogin: (data: UserLoginInfo) => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ handleLogin }) => {
  const [email, setEmail] = useState("");
  const [userId, setUserId] = useState("");

  const onEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const onUserIdChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUserId(e.target.value);
  };

  const loginHandler = (e: FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    handleLogin({ email, userId });
    setEmail("");
    setUserId("");
  };

  const handleScan = (data: string | null) => {
    if (data !== null) {
      setUserId(data);
    }
  };

  return (
    <div className={classes.formContainer}>
      <form>
        <input
          type="text"
          value={email}
          onChange={onEmailChange}
          placeholder="Email"
        />
        <input
          type="password"
          value={userId}
          onChange={onUserIdChange}
          placeholder="UserID"
        />
        <button type="submit" value="Login" onClick={loginHandler}>
          Login
        </button>
      </form>
      <QRreader handleScan={handleScan} />
    </div>
  );
};

export default LoginForm;
