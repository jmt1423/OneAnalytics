import Papa, { ParseResult } from "papaparse";
import fs from "fs";
import log from "electron-log";
import { chooseFile } from "./ImportHandler.js";

export function parse(description: string) {
  const filePath = chooseFile.getFilePath();

  if (!filePath) {
    log.error("File path is null, cannot parse anything");
    return;
  }

  const fileContent = fs.readFileSync(filePath, "utf8");

  Papa.parse(fileContent, {
    header: true,
    skipEmptyLines: true,
    dynamicTyping: true,
    complete: (result) => {
      log.info("Csv Successfull Parsed", result.data.slice(0, 10));
      log.error(result.errors);
      insertDataset(result);
      log.info("dataset description", description);
    },
    error: (error: any) => {
      log.error("Error parsing  CSV: ", error);
    },
  });
}

function insertDataset(result: ParseResult<unknown>) {}
