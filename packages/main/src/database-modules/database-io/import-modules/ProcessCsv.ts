import Papa from "papaparse";
import { dialog } from "electron";
import path from "path";
import log from "electron-log";
import fs from "fs";

export class ProcessCsv {
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

    this.parseCsv(this.filePath);
  }

  private parseCsv(filePath: string) {
    const fileContent = fs.readFileSync(filePath, "utf8");

    Papa.parse(fileContent, {
      header: true,
      skipEmptyLines: true,
      dynamicTyping: true,
      complete: (result) => {
        log.info("Csv Successfull Parsed", result.data.slice(0, 10));
        log.error(result.errors);
      },
      error: (error: any) => {
        log.error("Error parsing  CSV: ", error);
      },
    });
  }
}
