import { it, expect, describe, afterEach, vi } from "vitest";
import { ProcessCsv } from "../src/TypeORM/database-io/import-modules/ProcessCsv.ts";

vi.mock("dialog", () => ({
  default: {
    properties: ["openFile"],
    filters: [{ name: "CSV Files", extensions: ["csv"] }],
  },
}));

vi.mock("result", () => ({
  default: {
    canceled: false,
    filePaths: 1,
  },
}));

describe("ProcessCsv File", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("file base name should be null", () => {
    const pick = new ProcessCsv();
    expect(pick.baseName).toBe(null);
  });
});
