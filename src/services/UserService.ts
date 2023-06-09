import { HttpClientRequest } from "./Request";
import axios from "axios";

const controller = "Users";
// const baseUrl = "http://localhost:8083/api";
const baseUrl =
  "http://ec2-3-106-133-27.ap-southeast-2.compute.amazonaws.com:8080/api";

export const UserService = {
  GetUserById: async (id: string | undefined) => {
    return await HttpClientRequest(controller).getAsync(`show/${id}`);
  },
  GetListUser: async () => {
    return await HttpClientRequest(controller).getAsync("ShowAll");
  },
  AddUser: (
    image: File,
    name: string,
    username: string,
    password: string // <-- change the type here
  ): Promise<any> => {
    const formData = new FormData();
    formData.append("image", image);
    formData.append("name", name);
    formData.append("username", username);
    formData.append("password", password); // <-- change the type here

    return axios.post(`${baseUrl}/Users/insert`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Accept: "*/*",
        "Access-Control-Allow-Origin": "*",
      },
    });
  },
  DeleteUser: async (id: string | undefined) => {
    return await HttpClientRequest(controller).deleteAsync(`delete`, {
      id: id,
    });
  },
  UpdateUser: async (
    id: string | undefined,
    name: string,
    username: string,
    password: string
  ) => {
    return await HttpClientRequest(controller).deleteAsync(`update/${id}`, {
      name: name,
      userName: username,
      password: password,
    });
  },
};
