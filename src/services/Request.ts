import axios, { HttpStatusCode } from "axios";
import GlobalConstant from "constants/GlobalConstant";
// import { ApiResponse } from "types/ApiResponse"; chưa dùng đến

// const baseUrl = "http://localhost:8083/api";
const baseUrl =
  "http://ec2-3-106-133-27.ap-southeast-2.compute.amazonaws.com:8080";

const axiosInstance = axios.create({
  baseURL: baseUrl,
  timeout: GlobalConstant.REQUEST_TIMEOUT,
  headers: {
    "Content-Type": "application/json",
    Accept: "*/*",
    "Access-Control-Allow-Origin": "*",
    // Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6WyJhZG1pbmlzdHJhdG9yQGlyc3ZpZXRuYW0uY29tIiwiUFlYSVMiLCIwMi8xMy8yMDIzIDA0OjQzOjA5IiwiMjAyMzAzMTMiXSwibmJmIjoxNjc2MjYzMzg5LCJleHAiOjE2Nzg2ODI1ODksImlhdCI6MTY3NjI2MzM4OX0.H8fldq4AknYQD5HUGWIjae1R_euC537mlrh9UCFreuE"
  },
});

// const axiosRequestFileInstance = axios.create({
//   baseURL: baseUrl,
//   timeout: GlobalConstant.REQUEST_TIMEOUT,
//   headers: {
//     Accept: "application/json, text/plain, */*",
//     Authorization: "",
//   },
// });

const composeUri = (controller: string, action: string, obj: any) => {
  try {
    let arr = [];
    let controllerName = "";
    if (controller !== "") {
      controllerName = "/" + controller;
    }
    if (obj === null || obj === undefined) {
      return controllerName + "/" + action;
    }
    for (let key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        arr.push(key + "=" + encodeURIComponent(obj[key]));
      }
    }
    return controllerName + "/" + action + "?" + arr.join("&");
  } catch (error) {
    throw error;
  }
};

export const HttpClientRequest = (controller: string) => {
  return {
    getAsync: async (action: string, params?: any): Promise<any> => {
      try {
        let uri = composeUri(controller, action, params);
        return await axiosInstance
          .get(uri, params)
          .then((response) => {
            if (response.status === HttpStatusCode.Ok) {
              return response.data as any;
            }
          })
          .catch((error) => {
            if (error.response) {
              return error.response;
            }
            throw error;
          });
      } catch (e) {
        throw e;
      }
    },

    postAsync: async (action: string, params?: any): Promise<any> => {
      try {
        let uri = composeUri(controller, action, params);

        return await axiosInstance
          .post(uri, params, {
            headers: {},
          })
          .then((response) => {
            if (response.status === HttpStatusCode.Ok) {
              return response.data;
            }
          })
          .catch((error) => {
            if (error.response) {
              return error.response;
            }
            throw error;
          });
      } catch (error) {
        throw error;
      }
    },

    deleteAsync: async (action: string, params?: any): Promise<any> => {
      try {
        let uri = composeUri(controller, action, params);
        return await axiosInstance
          .delete(uri, params)
          .then((response) => {
            if (response.status === HttpStatusCode.Ok) {
              return response.data as any;
            }
          })
          .catch((error) => {
            if (error.response) {
              return error.response;
            }
            throw error;
          });
      } catch (e) {
        throw e;
      }
    },

    putAsync: async (action: string, params?: any): Promise<any> => {
      try {
        let uri = composeUri(controller, action, params);
        return await axiosInstance
          .put(uri, params)
          .then((response) => {
            if (response.status === HttpStatusCode.Ok) {
              return response.data as any;
            }
          })
          .catch((error) => {
            if (error.response) {
              return error.response;
            }
            throw error;
          });
      } catch (e) {
        throw e;
      }
    },
  };
};
