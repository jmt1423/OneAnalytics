// import { sha256sum } from "./nodeCrypto.js";
// import { versions } from "./versions.js";
import { ipcRenderer } from "electron";

// function send(channel: string, message: string) {
//   return ipcRenderer.invoke(channel, message);
// }
function sendData(channel: string, data: any) {
  return ipcRenderer.invoke(channel, data);
}

export { sendData };
