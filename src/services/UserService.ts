import { HttpClientRequest } from "./Request";

const controller = "Users";

export const UserService = {
  GetUserById: async (id: string | undefined) => {
    return await HttpClientRequest(controller).getAsync(`show/${id}`);
  },
  GetListUser: async () => {
    return await HttpClientRequest(controller).getAsync("ShowAll");
  },
};
