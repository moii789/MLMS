import axios from "axios";

const baseURL = "http://localhost:8000/";

export const registerUser = (data: RegisterPageState) => {
  if (data.VisitorType === "visitor") {
    delete data["StudentID"];
  }
  return axios.post(baseURL + "accounts/register", JSON.stringify(data), {
    headers: { "Access-Control-Allow-Origin": "*" },
  });
};

export const logUser = (id: String) => {
  return axios
    .get(baseURL + `accounts/login?id:${id}`, {
      headers: { "Access-Control-Allow-Origin": "*" },
    })
    .catch((err) => console.log(err)); //{logging-out, id }
};

export const getItems = async (done: (data: Array<ItemType>) => void) => {
  const items = await axios
    .get(baseURL + "items", {
      headers: { "Access-Control-Allow-Origin": "*" },
    })
    .catch((err) => console.log(err));
  if (items) {
    done(items.data);
  }
};

export const submitItems = (id: String, items: Array<ItemType>) => {
  axios
    .post(baseURL + "items", JSON.stringify({ id, items }), {
      headers: { "Access-Control-Allow-Origin": "*" },
    })
    .catch((err) => console.log(err));
};
