import axios from "axios";
import { HttpClientRequest } from "./Request";
import { getToken } from "common/function";

const controller = "Songs";
const baseUrl =
  "http://ec2-3-106-133-27.ap-southeast-2.compute.amazonaws.com:8080/api";
// const baseUrl = "http://localhost:8083/api";
const token_admin = getToken();

export const SongService = {
  GetAllSong: async () => {
    return await HttpClientRequest(controller).getAsync("ShowAll");
  },
  GetAllSongById: async (id: string | undefined) => {
    return await HttpClientRequest(controller).getAsync(`${id}`);
  },
  UploadSong: (
    image: File,
    song: File,
    name: string,
    category: string
    // creator: string | undefined
  ): Promise<any> => {
    const formData = new FormData();
    debugger;
    if (token_admin !== null) {
      formData.append("image", image);
      formData.append("name", name);
      formData.append("song", song);
      formData.append("category", category);
      formData.append("creator", token_admin);
    }

    return axios.post(`${baseUrl}/Songs/insertbyadmin`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Accept: "*/*",
        "Access-Control-Allow-Origin": "*",
      },
    });
  },
  DeleteSong: async (id: string | undefined) => {
    return await HttpClientRequest(controller).deleteAsync(`delete`, {
      id: id,
    });
  },
};
