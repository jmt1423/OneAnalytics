import { app } from "electron";
import { dialog } from "electron";
import { createMigrator } from "../umzug/createTable.js";
import path from "path";
import fs from "fs";
import Papa from "papaparse";
import log from "electron-log";

export class SqlizeFileHandlers {
  public filePath: string | undefined = undefined;
  public baseName: string | null = null;
  public fileContent: string | null = null;
  public migrator1: any;

  getFilePath() {
    return this.filePath;
  }

  getBaseName() {
    return this.baseName;
  }

  getFileContent() {
    return this.fileContent;
  }
  setMigrator(migrator: any) {
    this.migrator1 = migrator;
  }
  getMigrator() {
    return this.migrator1;
  }

  public async pickFile(): Promise<void> {
    const result = await dialog.showOpenDialog({
      properties: ["openFile"],
      filters: [{ name: "CSV Files", extensions: ["csv"] }],
    });

    if (result.canceled || result.filePaths.length === 0) {
      log.warn("No file selected");
      return;
    }

    this.filePath = result.filePaths[0];
    this.baseName = path.basename(this.filePath);

    log.info(`File selected: ${this.baseName} at path: (${this.filePath})`);
  }

  runInitialMigration() {
    try {
      const { migrator, sequelize } = createMigrator(
        app.getPath("appData") +
          "/oneanalytics/Local Storage/sqlite/myDatabase.sqlite",
      );
      this.migrator1 = migrator;
    } catch (error) {
      log.error("error running migration: ", error);
    }
    (async () => {
      await this.getMigrator().up();
    })();
  }

  public async processCsv(): Promise<void> {
    if (!this.filePath) {
      log.warn("No file selected for processing");
      return;
    }

    fs.readFile(this.filePath, "utf8", (err, data) => {
      if (err) {
        console.log("cannot read file: " + err);
        return "Error cannot read file";
      }
      Papa.parse(data, {
        dynamicTyping: true,
        complete: (result) => {
          log.info("First 10 rows: ", result.data.slice(0, 10));
          log.info("Total rows read: ", result.data.length);
          log.info("Metadata: ", result.meta);
          this.runInitialMigration();
          // (async () => {
          //   const sequelize = new Sequelize({
          //     dialect: "sqlite",
          //     storage:
          //       app.getPath("appData") +
          //       "/oneanalytics/Local Storage/sqlite/myDatabase.sqlite",
          //   });
          //   const queryInterface = sequelize.getQueryInterface();
          //
          //   try {
          //     await initialUp({ context: queryInterface });
          //     console.log("Migration executed manually.");
          //   } catch (error) {
          //     console.error("Error executing migration:", error);
          //   }
          // })();
        },
      });
    });
  }
}
