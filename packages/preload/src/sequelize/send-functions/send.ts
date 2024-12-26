import { ipcRenderer } from "electron";

export function sendData(channel: string, data: any) {
  return ipcRenderer.invoke(channel, data);
}
export function openFilePicker(channel: string): Promise<string | null> {
  return ipcRenderer.invoke(channel);
}
