import { io, SocketOptions } from "socket.io-client";
import constants from "../constants";
const socket = ({
  sessionID,
  signingKey,
}: {
  sessionID: string;
  signingKey: string;
}) => {
  return io(`${constants.BASE_URL}`, {
    autoConnect: true,
    transports: ["websocket", "polling"],
    reconnectionAttempts: 3,
    query: {
      session_id: sessionID,
      signing_key: signingKey,
    },
  });
};

export default socket;
