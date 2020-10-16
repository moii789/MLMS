import axios from "axios";

import {
  userNotRegistered,
  itemSubmitted,
  registrationSuccess,
  registrationFailed,
  invalidLogin,
  querySaved,
  querySaveError,
  queryError,
  loginError,
} from "../notifications/notifications";

const baseURL = "http://localhost:8000/";

export const registerUser = (data: RegisterPageState) => {
  if (data.VisitorType === "visitor") {
    delete data["StudentID"];
  }
  return axios
    .post(baseURL + "register", JSON.stringify(data), {
      headers: { "Access-Control-Allow-Origin": "*" },
    })
    .then((res) => {
      setTimeout(() => registrationSuccess(), 3000);
    })
    .catch((err) => {
      setTimeout(() => registrationFailed(), 3000);
    });
  //needs to return status of 201(created) or
  //400(bad request) //JSON Data doesnt matter
};

export const logUser = (id: String) => {
  return axios
    .get(baseURL + `login?id=${id}`, {
      headers: { "Access-Control-Allow-Origin": "*" },
    })
    .catch((err) => {
      if (!err) return;
      console.log(err.response);
      if (err.response.data.message === "user not registered") {
        userNotRegistered();
      }
    });
  //JSON data should be {id:id,message:"logging out"}
  //if logging in response can be empty or {message:"logging in"}
};

export const getItems = async (done: (data: string[]) => void) => {
  const items = await axios
    .get(baseURL + "items", {
      headers: { "Access-Control-Allow-Origin": "*" },
    })
    .catch((err) => console.log(err));
  if (items) {
    done(items.data.items);
  }
  //JSON data should be {items:[item1Name,item2Name...]}//all string
};

export const submitItems = (id: String, items: string[]) => {
  axios
    .post(baseURL + "items", JSON.stringify({ id, items }), {
      headers: { "Access-Control-Allow-Origin": "*" },
    })
    .then((res) => {
      if (res.data.success) {
        itemSubmitted();
      }
    })
    .catch((err) => console.log(err));
  //response status should be 200(OK), but we dont use this so it doesn;t matter
  //will send an array of strings(itemName)
};

export const loginUser = (
  data: UserLoginInfo,
  done: (token: string) => void
) => {
  if (data.email.trim() === "" || data.userId.trim() === "") {
    return loginError();
  }
  return axios
    .post(baseURL + "token", JSON.stringify(data), {
      headers: { "Access-Control-Allow-Origin": "*" },
    })
    .then((res) => {
      done(res.data.token);
    })
    .catch((err) => {
      loginError();
      if (err.response.status === 401) {
        invalidLogin();
      }
    });
};

export const getSavedQueries = (token: string) => {
  return axios.get(baseURL + `getsavedqueries?token=${token}`, {
    headers: { "Access-Control-Allow-Origin": "*" },
  });
};

export const getQuery = (token: string, sql: string) => {
  return axios
    .get(baseURL + `query?token=${token}&sql=${sql}`, {
      headers: { "Access-Control-Allow-Origin": "*" },
    })
    .catch((err) => {
      console.log(err);
      queryError();
    });
};

export const saveQuery = (token: string, query: any) => {
  axios
    .post(baseURL + "savequery", JSON.stringify({ token, query }), {
      headers: { "Access-Control-Allow-Origin": "*" },
    })
    .then((res) => {
      querySaved();
    })
    .catch((err) => {
      querySaveError();
      console.log(err);
    });
};
