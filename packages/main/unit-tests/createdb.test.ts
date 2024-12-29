import { it, expect, describe, afterEach, vi } from "vitest";
import { initDatabase } from "../src/TypeORM/database-io/DatabaseInitModule";

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
});
