import { HttpClientRequest } from "./Request";
const controller = "Version";

const Versions = async () => {
  return await HttpClientRequest(controller).getAsync("GetListVersion");
};

const VersionInfo = async (version?: string) => {
  return await HttpClientRequest(controller).getAsync("GetVersionDetails", {
    Version: version,
  });
};
const DeleteVersion = async (version?: string) => {
  return await HttpClientRequest(controller).postAsync("Deleteversion", {
    version: version,
  });
};
const AddNewVersion = async (
  version: string,
  app_version: string,
  build_version: string,
  previous_version: string
) => {
  return await HttpClientRequest(controller).postAsync("AddNewVersion", {
    version: version,
    app_version: app_version,
    build_version: build_version,
    previous_version: previous_version,
  });
};

const VersionService = {
  DeleteVersion: DeleteVersion,
  AddNewVersion: AddNewVersion,
  Versions: Versions,
  VersionInfo: (version_id?: string) => VersionInfo(version_id),
};

export { VersionService };
