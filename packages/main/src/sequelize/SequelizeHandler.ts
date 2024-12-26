import { dialog, ipcMain } from "electron";
import path from "path";
import fs from "fs";
import Papa from "papaparse";

export function registerSqlizeHandlers() {
  ipcMain.handle("create-database", async (_event, filePath: string) => {
    console.log("creating database with name: " + filePath);
    return { success: true };
  });

  ipcMain.handle("dialog:openFile", async () => {
    const result = await dialog.showOpenDialog({
      properties: ["openFile"],
      filters: [{ name: "CSV Files", extensions: ["csv"] }],
    });
    if (result.canceled || result.filePaths.length === 0) {
      return null;
    }

    fs.readFile(result.filePaths[0], "utf8", (err, data) => {
      if (err) {
        console.log("cannot read file: " + err);
        return;
      }
      Papa.parse(data, {
        dynamicTyping: true,
        complete: (result) => {
          console.log(result.data.slice(0, 10));
          console.log(result.data.length);
          console.log(result.meta);
        },
      });
    });

    return path.basename(result.filePaths[0]);
  });
}
