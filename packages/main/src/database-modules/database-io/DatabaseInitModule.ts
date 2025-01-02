import log from "electron-log";
import { app } from "electron";
import sqlite3 from "sqlite3";
import path from "path";
import fs from "fs";
import { error } from "console";

export function initDatabase() {
  sqlite3.verbose();

  const dbDir = app.getPath("appData") + "/oneanalytics/Local Storage/sqlite";
  const dbPath = path.join(dbDir, "myDatabase.sqlite");

  if (!fs.existsSync(dbPath)) {
    try {
      fs.mkdirSync(dbDir, { recursive: true });
      log.info("Created Sqlte database at: " + dbDir);
    } catch (err) {
      log.error("Error creating database: " + err);
      return;
    }

    const db = new sqlite3.Database(dbPath, (err) => {
      if (err) {
        log.error("Could not open database: " + err);
      } else {
        log.info("Connected to sqlite3 at: " + dbPath);
      }
    });

    db.serialize(() => {
      const createTable = `
      CREATE TABLE IF NOT EXISTS metadata(
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      table_name TEXT NOT NULL UNIQUE,
      description TEXT NOT NULL
      );
      `;

      db.run(createTable, (err) => {
        if (err) {
          log.error("Error creating database", err);
        } else {
          log.info("Metadata table created successfully");
        }
      });
    });

    db.close((err) => {
      if (err) {
        log.error("Error closing database connection");
      } else {
        log.info("Created and closed connection to database");
      }
    });
    return "success";
  }
}
