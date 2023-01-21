import { io } from "socket.io-client";
import constants from "../constants";
const socket = io(`${constants.BASE_URL}`, {
  autoConnect: true,
});
export default socket;
