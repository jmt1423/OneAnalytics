// import {versions} from './versions.js';
import { ipcRenderer } from "electron";

export function sendData(channel: string, data: any) {
  return ipcRenderer.invoke(channel, data);
}

// export { sha256sum, sendData };
