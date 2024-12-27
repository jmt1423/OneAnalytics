import { ipcMain } from "electron";
import { SqlizeFileHandlers } from "./ImportModule.js";

export function registerFileHandlers() {
  const fileHandler = new SqlizeFileHandlers();

  ipcMain.handle("create-database", async (_event, filePath: string) => {
    console.log("creating database with name: " + filePath);
    return { success: true };
  });

  ipcMain.handle("dialog:openFile", async () => {
    await fileHandler.pickFile();

    return fileHandler.getBaseName();
  });

  ipcMain.handle("process-file", async () => {
    await fileHandler.processCsv();
  });
}
