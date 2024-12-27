import { registerFileHandlers } from "./FileHandler.js";
import { initDatabase } from "./SqlInitModule.js";

export function initDatabaseIO() {
  initDatabase();
  registerFileHandlers();
}
