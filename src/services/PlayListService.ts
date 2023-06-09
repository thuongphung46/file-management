import axios from "axios";
import { getToken } from "common/function";
import { HttpClientRequest } from "./Request";

const controller = "Playlists";
// const baseUrl = "http://localhost:8083/api";
const baseUrl =
  "http://ec2-3-106-133-27.ap-southeast-2.compute.amazonaws.com:8080/api";
const token_admin = getToken();
export const PlayListService = {
  GetPlayList: async () => {
    return await HttpClientRequest(controller).getAsync("ShowAll");
  },
  GetListSongPlaylist: async (id: string) => {
    return await HttpClientRequest(controller).getAsync(`show/${id}`);
  },
  AddPlayList: async (name: string) => {
    const formData = new FormData();
    if (token_admin !== null) {
      formData.append("creator", token_admin);
      formData.append("name", name);
    }

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
  //http://localhost:8083/api/Playlists/addsongtoplaylist?song=1&playlist=7
  AddSongToPlayList: async (song: string, playlist: string) => {
    return await HttpClientRequest(controller).putAsync(`addsongtoplaylist`, {
      song: song,
      playlist: playlist,
    });
  },
};
