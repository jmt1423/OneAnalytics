import * as exports from "./index.js";
import { contextBridge } from "electron";

// const isExport = (key: string): key is keyof typeof exports => Object.hasOwn(exports, key);
//
// for (const exportsKey in exports) {
//   if (isExport(exportsKey)) {
//     contextBridge.exposeInMainWorld(btoa(exportsKey), exports[exportsKey]);
//   }
// }

for (const key in exports) {
  contextBridge.exposeInMainWorld(key, exports[key as keyof typeof exports]);
}
// Re-export for tests
export * from "./index.js";
