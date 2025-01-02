import Papa from "papaparse";
import { dialog } from "electron";
import path from "path";
import log from "electron-log";
import fs from "fs";

export class ChooseFile {
  public filePath: string | null = null;
  public baseName: string | null = null;
  public fileContent: string | null = null;

  getFilePath() {
    return this.filePath;
  }

  getBaseName() {
    return this.baseName;
  }

  getFileContent() {
    return this.fileContent;
  }

  public async pickFile(): Promise<void> {
    const result = await dialog.showOpenDialog({
      properties: ["openFile"],
      filters: [{ name: "CSV Files", extensions: ["csv"] }],
    });

    if (result.canceled || result.filePaths.length === 0) {
      log.warn("No File selected");
      return;
    }

    this.filePath = result.filePaths[0];
    this.baseName = path.basename(this.filePath);

    log.info(`File selected: ${this.baseName} at path ${this.filePath}`);
  }
}
