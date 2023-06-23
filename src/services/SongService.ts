import { HttpClientRequest } from "./Request";

const controller = "Songs";

export const SongService = {
  GetAllSong: async () => {
    return await HttpClientRequest(controller).getAsync("ShowAll");
  },
  GetAllSongById: async (id: string | undefined) => {
    return await HttpClientRequest(controller).getAsync(`${id}`);
  },
  AddUser: async () => {
    return await HttpClientRequest(controller).postAsync("insert");
  },
  DeleteUser: async () => {
    return await HttpClientRequest(controller).getAsync("ShowAll");
  },
};
