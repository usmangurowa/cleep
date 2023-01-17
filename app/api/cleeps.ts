import api from ".";
import constants from "../constants";
import storage from "../storage";

export const getCleeps = () => {
  return new Promise((resolve, reject) => {
    api
      .get("/cleeps")
      .then((response) => {
        if (response.ok) {
          resolve(response.data);
        } else {
          reject(response);
        }
      })
      .catch((error) => {
        reject(error);
      });
  });
};
