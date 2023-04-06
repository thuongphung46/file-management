import { HttpClientRequest } from "./Request";
import http from "./http-common";

const baseUrl = process.env.REACT_APP_API_ENDPOINT;
const controller = "File";
export const UploadService = {
  UploadInfo: async (version?: string) => {
    return await HttpClientRequest(controller).getAsync("GetFilesByVersion", {
      Version: version,
    });
  },
  DeleteFile: async (
    version?: string,
    file_type?: string,
    upload_id?: string,
    file_name?: string
  ) => {
    return await HttpClientRequest(controller).postAsync(
      `DeleteFile/Versions/${version}/Type/${file_type}/Code/${upload_id}/Name/${file_name}`
    );
  },
  UploadFile: (
    version: string,
    file: File,
    type_file: string,
    onUploadProgress: (progressEvent: any) => void // <-- change the type here
  ): Promise<any> => {
    const formData = new FormData();
    formData.append("file", file);

    return http.post(
      `${baseUrl}/File/UploadFile/Versions/${version}/Type/${type_file}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        onUploadProgress,
      }
    );
  },
};
//=====================
