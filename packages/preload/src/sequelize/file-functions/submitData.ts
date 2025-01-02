import { ipcRenderer } from "electron";

export function submitDataset(
  channel: string,
  description: string,
): Promise<string | null> {
  console.log(description);
  return ipcRenderer.invoke(channel, description);
}
