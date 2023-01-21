import api from ".";
import constants from "../constants";
import storage from "../storage";

export const createSession = (signing_key: string) =>
  new Promise((resolve, reject) => {
    api
      .post("/session/create", { signing_key })
      .then((response) => {
        if (response.ok) {
          resolve(response.data);
        } else {
          reject(response.problem);
        }
      })
      .catch((error) => {
        reject(error);
      });
  });

export const hasSession = () => {
  return storage.contains(constants.SESSION_ID_IDENTIFIER);
};

export const checkSession = ({
  session_id,
  signing_key,
}: {
  session_id: string;
  signing_key: string;
}) => {
  return new Promise((resolve, reject) => {
    api
      .post("/session/check", { session_id, signing_key })
      .then((response) => {
        if (response.ok) {
          resolve(response.data);
        } else {
          reject(response.data);
        }
      })
      .catch((error) => {
        reject(error);
      });
  });
};
