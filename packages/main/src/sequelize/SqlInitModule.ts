import log from "electron-log";
import { app } from "electron";
import sqlite3 from "sqlite3";
import path from "path";
import fs from "fs";

export function initDatabase() {
  sqlite3.verbose();

  const dbDir = app.getPath("appData") + "/oneanalytics/Local Storage/sqlite";
  const dbPath = path.join(dbDir, "myDatabase.sqlite");

  if (!fs.existsSync(dbDir)) {
    try {
      fs.mkdirSync(dbDir, { recursive: false });
      log.info("Created database directory: " + dbDir);
    } catch (err) {
      log.warn("did not create, already exists or failed: ", err);
      return;
    }
  }

  const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
      log.error("Could not open database: " + err);
    } else {
      log.info("Connected to sqlite3 database at: " + dbPath);
    }
  });

  db.close((err) => {
    if (err) {
      log.error("Error closing database: " + err);
    } else {
      log.info("Created and closed database successfully");
    }
  });
}
