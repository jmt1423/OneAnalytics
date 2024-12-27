import { ipcMain } from "electron";
import { ProcessCsv } from "./ProcessCsv.js";

export function registerImportHandlers() {
  const processCsv = new ProcessCsv();

  ipcMain.handle("dialog:openFile", async () => {
    await processCsv.pickFile();

    return processCsv.getBaseName();
  });
}
