import { it, expect, describe, afterEach, vi } from "vitest";
import { ChooseFile } from "../src/database-modules/database-io/import-modules/ChooseFile.ts";

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
    const pick = new ChooseFile();
    expect(pick.baseName).toBe(null);
  });
});
