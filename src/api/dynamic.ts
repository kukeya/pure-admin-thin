import { http } from "@/utils/http";
import { baseUrlApi } from "./utils";

export const getDynamic = () => {
  return http.request<any>("get", baseUrlApi("post/user/query/me"));
};

export const pubDynamic = (data?: object) => {
  return http.request<any>("post", baseUrlApi("post/user/publish"), { data });
};
