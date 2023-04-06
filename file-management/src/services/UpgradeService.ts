import { HttpClientRequest } from "./Request";

const controller = "Version";
const controller2 = "File";

export const Upgrade = {
  GetProcessVersion: async () => {
    return await HttpClientRequest(controller).getAsync("GetListDbByServer");
  },
  ProcessVersion: async (
    version: string | undefined,
    company_info: string[]
  ) => {
    return await HttpClientRequest(controller).postAsync("ProcessVersion", {
      version: version,
      company_info: company_info,
    });
  },
  GetFileStatusByCompany: async (version: string, CompanyName: string) => {
    return await HttpClientRequest(controller2).getAsync(
      "GetFileStatusByCompany",
      {
        Version: version,
        CompanyName: CompanyName,
      }
    );
  },
};
