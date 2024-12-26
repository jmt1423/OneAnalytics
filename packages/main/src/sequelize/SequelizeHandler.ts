import { dialog, ipcMain } from "electron";
import path from "path";
import csv from "csv-parser";
import fs from "fs";

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
    console.log(result.filePaths[0]);
    const results: any = [];
    fs.createReadStream(result.filePaths[0])
      .pipe(csv())
      .on("data", (data) => {
        results.push(data);
      })
      .on("end", () => {
        console.log(results);
      });

    return path.basename(result.filePaths[0]);
  });
}
