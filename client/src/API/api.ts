import axios from "axios";

const baseURL = "http://localhost:8000/";

export const registerUser = (data: RegisterPageState) => {
  if (data.VisitorType === "visitor") {
    delete data["StudentID"];
  }
  return axios.post(baseURL + "register", JSON.stringify(data), {
    headers: { "Access-Control-Allow-Origin": "*" },
  });
};

export const logUser = (id: String) => {
  return axios
    .get(baseURL + `login?id=${id}`)
    .catch((err) => console.log(err)); //{logging-out, id }
};

export const getItems = async (done: (data: Array<Object>) => void) => {
  const items = await axios.get(baseURL + "items");
  done(items.data);
};
