import path from "path";
import { app } from "electron";
import sqlite3 from "sqlite3";
import { it, expect, describe, afterEach, vi } from "vitest";
import { initDatabase } from "../src/database-modules/database-io/DatabaseInitModule.ts";

vi.mock("sqlite3", () => {
  const mockDb = {
    close: vi.fn((callback) => callback && callback(null)),
  };

  return {
    default: {
      verbose: vi.fn(),
      Database: vi.fn((dbPath, callback) => {
        if (callback) callback(null); // Simulate successful connection
        return mockDb;
      }),
    },
  };
});

vi.mock("fs", () => ({
  default: {
    existsSync: vi.fn(() => false),
    mkdirSync: vi.fn(),
  },
}));

vi.mock("path", () => ({
  default: {
    join: vi.fn((...args) => args.join("/")),
  },
}));

vi.mock("electron", () => ({
  app: {
    getPath: vi.fn(() => "/mocked/appData"),
  },
}));

describe("Creating database", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("should initialize database if it doesn't exist", () => {
    const result = initDatabase();
    expect(result).toBe("success");
  });
  it("should find metadata table in local database", async () => {
    const dbDir = app.getPath("appData") + "/oneanalytics/Local Storage/sqlite";
    const dbPath = path.join(dbDir, "myDatabase.sqlite");

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
