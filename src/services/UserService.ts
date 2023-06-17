import { HttpClientRequest } from "./Request";

const controller = "Users";

export const UserService = {
  // Servers: async () => {
  //   return await HttpClientRequest(controller).getAsync("GetListDbByServer");
  // },
  GetListUser: async () => {
    return await HttpClientRequest(controller).getAsync("ShowAll");
  },
};
