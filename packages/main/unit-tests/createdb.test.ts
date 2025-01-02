import sqlite3 from "sqlite3";
import { it, expect, describe, afterEach, vi } from "vitest";

describe("Creating database", () => {
  it("should find metadata table in local database", async () => {
    const dbPath =
      "/home/jt/.config/oneanalytics/Local Storage/sqlite/myDatabase.sqlite";
    const queryDatabase = (
      db: sqlite3.Database,
      query: string,
    ): Promise<any> => {
      return new Promise((resolve, reject) => {
        db.get(query, (err, row) => {
          if (err) {
            reject(err);
          } else {
            resolve(row);
          }
        });
      });
    };

    const db = new sqlite3.Database(dbPath, sqlite3.OPEN_READWRITE, (err) => {
      if (err) {
        throw new Error(`sqliite test: cannot connect = ${err.message}`);
      }
    });

    try {
      const query =
        "SELECT name FROM sqlite_master WHERE type='table' AND name='metadata';";
      const row = await queryDatabase(db, query);

      expect(row).toBeDefined();
      expect(row.name).toBe("metadata");
    } catch (error) {
      throw error;
    } finally {
      db.close();
    }
  });
});
