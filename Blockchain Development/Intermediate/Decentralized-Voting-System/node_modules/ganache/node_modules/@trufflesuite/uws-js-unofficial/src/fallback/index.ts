import {
  RecognizedString,
  TemplatedApp,
  us_listen_socket,
} from "../../docs/index";
import { HttpContext } from "./http-context";
import JsTemplatedApp from "./templated-app";

export const _cfg = (arg: RecognizedString) => {};

export const us_listen_socket_close = (listenSocket: HttpContext) => {
  return listenSocket.close();
};

export const us_socket_local_port = (listenSocket: HttpContext) => {
  if (!listenSocket) throw new Error("Invalid listen socket");
  const address = listenSocket.address();
  if (address) {
    return address.port;
  } else {
    return null;
  }
};

/**
 * Maximum delay allowed until an HTTP connection is terminated due to
 * outstanding request or rejected data (slow loris protection)
 */
const HTTP_IDLE_TIMEOUT_S = 10 as const;

export function App<UserData>(): TemplatedApp {
  return new JsTemplatedApp<UserData>();
}

export default {
  App,
  us_listen_socket_close,
  _cfg,
};
