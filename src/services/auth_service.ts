import axios from "axios";
import { HttpClientRequest } from "./Request";
import { clearToken } from "common/function";

const controller = "Authentication";
interface Auth {
  UserName: string;
  Password: string;
}
const AuthService = {
  register: (username: string, email: string, password: string) => {
    return axios.post("signup", {
      username,
      email,
      password,
    });
  },

  Login: async (Params: Auth) => {
    return await HttpClientRequest(controller)
      .postAsync("Login", Params)
      .then((response) => {
        if (response.msg_code === 200) {
          return response;
        }
        return response;
      })
      .catch((err) => {
        console.log(err);
      });
  },

  logout: () => {
    localStorage.removeItem("user");
    clearToken();
  },
};
export { AuthService };
