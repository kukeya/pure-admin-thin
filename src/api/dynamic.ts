import { http } from "@/utils/http";
import { baseUrlApi } from "./utils";

export const getDynamic = () => {
  return http.request<any>("get", baseUrlApi("post/user/query/me"));
};
