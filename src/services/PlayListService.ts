import axios from "axios";
import { HttpClientRequest } from "./Request";

const controller = "Playlists";
const baseUrl = "http://localhost:8083/api";

export const PlayListService = {
  GetPlayList: async () => {
    return await HttpClientRequest(controller).getAsync("ShowAll");
  },
  AddPlayList: async (id: string, name: string) => {
    const formData = new FormData();
    formData.append("creator", id);
    formData.append("name", name);
    return axios.post(`${baseUrl}/Playlists/insert`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Accept: "*/*",
        "Access-Control-Allow-Origin": "*",
      },
    });
  },
  //http://localhost:8083/api/Playlists/delete/1
  DeletePlayList: async (id: string | undefined) => {
    return await HttpClientRequest(controller).deleteAsync(`delete`, {
      id: id,
    });
  },
};
