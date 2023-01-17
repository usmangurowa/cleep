import { create } from "apisauce";
import constants from "../constants";

const api = create({
  baseURL: constants.BASE_URL,
  headers: {
    Accept: "application/json",
  },
});
export default api;

export const setApiHeader = ({
  SESSION_ID,
  SIGNING_KEY,
}: {
  SESSION_ID: string;
  SIGNING_KEY: string;
}) => {
  api.setHeaders({
    "X-Session-ID": SESSION_ID,
    "X-Signing-Key": SIGNING_KEY,
  });
};
