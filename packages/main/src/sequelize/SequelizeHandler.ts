import { ipcMain } from "electron";

export function registerSqlizeHandlers() {
  ipcMain.handle("create-database", async (_event, filePath: string) => {
    console.log("creating database with name: " + filePath);
    return { success: true };
  });
}
