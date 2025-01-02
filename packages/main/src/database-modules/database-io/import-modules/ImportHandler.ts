import { ipcMain } from "electron";
import { ChooseFile } from "./ChooseFile.js";
import { parse } from "./ProcessCsv.js";

export const chooseFile = new ChooseFile();

export function registerImportHandlers() {
  ipcMain.handle("dialog:openFile", async () => {
    await chooseFile.pickFile();

    return chooseFile.getBaseName();
  });

  ipcMain.handle("submit:dataset", async (event, description: string) => {
    parse(description);
  });
}
