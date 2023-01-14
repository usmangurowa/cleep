import { create } from "apisauce";
import constants from "../constants";

const api = create({
  baseURL: constants.BASE_URL,
  headers: {
    Accept: "application/json",
  },
});
export default api;

export const setApiHeader = (token: string) => {
  api.setHeader("Authorization", `Bearer ${token}`);
};
