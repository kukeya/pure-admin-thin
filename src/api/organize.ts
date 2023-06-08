import { http } from "@/utils/http";
import { baseUrlApi } from "./utils";

export const getMyOrganize = () => {
  return http.request<any>("get", baseUrlApi("user/organize/all/me"));
};

export const getAllOrganize = () => {
  return http.request<any>("get", baseUrlApi("organize/list"));
};

export const createOrganize = (data?: object) => {
  return http.request<any>("post", baseUrlApi("user/organize/create/apply"), {
    data
  });
};

export const applyOrganize = (data?: object) => {
  return http.request<any>("post", baseUrlApi("user/organize/apply"), {
    data
  });
};

export const getMember = (id?: number) => {
  const params = id ? { id } : undefined;
  return http.request<any>("get", baseUrlApi("organize/user/list"), { params });
};
