import { initDatabase } from "./DatabaseInitModule.js";
import { registerImportHandlers } from "./import-modules/ImportHandler.js";

export function initCreateDatabaseOps() {
  initDatabase();
  registerImportHandlers();
}
