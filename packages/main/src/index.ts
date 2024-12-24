import type { AppInitConfig } from "./AppInitConfig.js";
import { createModuleRunner } from "./ModuleRunner.js";
import { disallowMultipleAppInstance } from "./modules/SingleInstanceApp.js";
import { createWindowManagerModule } from "./modules/WindowManager.js";
import { terminateAppOnLastWindowClose } from "./modules/ApplicationTerminatorOnLastWindowClose.js";
import { hardwareAccelerationMode } from "./modules/HardwareAccelerationModule.js";
import { autoUpdater } from "./modules/AutoUpdater.js";
import { allowInternalOrigins } from "./modules/BlockNotAllowdOrigins.js";
import { allowExternalUrls } from "./modules/ExternalUrls.js";
import { BrowserWindow, ipcMain } from "electron";
// import { chromeDevToolsExtension } from "./modules/ChromeDevToolsExtension.js";

function getCurrentPage() {
  const browserWindow = BrowserWindow.getFocusedWindow();
  if (!browserWindow) {
    console.log("no focused window");
  }
  const currURL = browserWindow?.webContents.getURL();
  console.log("Current URL: " + currURL);
}
export async function initApp(initConfig: AppInitConfig) {
  ipcMain.handle("read-csv", async (_event, filePath: string) => {
    console.log("read-csv called file:" + filePath);
    getCurrentPage();
    return { success: true };
  });
  const moduleRunner = createModuleRunner()
    .init(
      createWindowManagerModule({
        initConfig,
        // openDevTools: import.meta.env.DEV,
      }),
    )
    .init(disallowMultipleAppInstance())
    .init(terminateAppOnLastWindowClose())
    .init(hardwareAccelerationMode({ enable: false }))
    .init(autoUpdater())

    // Install DevTools extension if needed
    // .init(chromeDevToolsExtension({ extension: "REACT_DEVELOPER_TOOLS" }))
    // Security
    .init(
      allowInternalOrigins(
        new Set(
          initConfig.renderer instanceof URL
            ? [initConfig.renderer.origin]
            : [],
        ),
      ),
    )
    .init(
      allowExternalUrls(
        new Set(
          initConfig.renderer instanceof URL
            ? [
                "https://vite.dev",
                "https://developer.mozilla.org",
                "https://solidjs.com",
                "https://qwik.dev",
                "https://lit.dev",
                "https://react.dev",
                "https://preactjs.com",
                "https://www.typescriptlang.org",
                "https://vuejs.org",
              ]
            : [],
        ),
      ),
    );

  await moduleRunner;
}
