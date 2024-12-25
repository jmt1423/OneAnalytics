import { ipcRenderer } from "electron";

export function sendData(channel: string, data: any) {
  return ipcRenderer.invoke(channel, data);
}
