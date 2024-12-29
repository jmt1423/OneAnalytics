import { ipcRenderer } from "electron";

export function openFilePicker(channel: string): Promise<string | null> {
  return ipcRenderer.invoke(channel);
}
