import axios from "axios";

const baseURL = "http://localhost:8000/";

export const registerUser = (data: RegisterPageState) => {
  if (data.VisitorType === "visitor") {
    delete data["StudentID"];
  }
  return axios.post(baseURL + "register", JSON.stringify(data), {
    headers: { "Access-Control-Allow-Origin": "*" },
  });
  //needs to return status of 201(created) or
  //400(bad request) //JSON Data doesnt matter
};

export const logUser = (id: String) => {
  return axios
    .get(baseURL + `login?id=${id}`, {
      headers: { "Access-Control-Allow-Origin": "*" },
    })
    .catch((err) => console.log(err));
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
    .catch((err) => console.log(err));
  //response status should be 200(OK), but we dont use this so it doesn;t matter
  //will send an array of strings(itemName)
};
