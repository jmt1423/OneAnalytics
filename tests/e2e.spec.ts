import type { ElectronApplication, JSHandle } from "playwright";
import { _electron as electron } from "playwright";
import { expect, test as base } from "@playwright/test";
import type { BrowserWindow } from "electron";
import { globSync } from "glob";
import { platform } from "node:process";
import log from "electron-log";

process.env.PLAYWRIGHT_TEST = "true";

// Declare the types of your fixtures.
type TestFixtures = {
  electronApp: ElectronApplication;
  electronVersions: NodeJS.ProcessVersions;
};

const test = base.extend<TestFixtures>({
  electronApp: [
    async ({}, use) => {
      /**
       * Executable path depends on root package name!
       */
      let executablePattern = "dist/*/oneanalytics{,.*}";
      if (platform === "darwin") {
        executablePattern += "/Contents/*/oneanalytics";
      }

      const [executablePath] = globSync(executablePattern);
      if (!executablePath) {
        throw new Error("App Executable path not found");
      }

      const electronApp = await electron.launch({
        executablePath: executablePath,
      });

      electronApp.on("console", (msg) => {
        if (msg.type() === "error") {
          console.error(`[electron][${msg.type()}] ${msg.text()}`);
        }
      });

      await use(electronApp);

      // This code runs after all the tests in the worker process.
      await electronApp.close();
    },
    { scope: "worker", auto: true } as any,
  ],

  page: async ({ electronApp }, use) => {
    const page = await electronApp.firstWindow();
    // capture errors
    page.on("pageerror", (error) => {
      console.error(error);
    });
    // capture console messages
    page.on("console", (msg) => {
      console.log(msg.text());
    });

    await page.waitForLoadState("load");
    await use(page);
  },

  electronVersions: async ({ electronApp }, use) => {
    await use(await electronApp.evaluate(() => process.versions));
  },
});

test("Entry window state", async ({ electronApp, page }) => {
  const window: JSHandle<BrowserWindow> = await electronApp.browserWindow(page);
  const windowState = await window.evaluate(
    (
      mainWindow,
    ): Promise<{
      isVisible: boolean;
      isCrashed: boolean;
    }> => {
      const getState = () => ({
        isVisible: mainWindow.isVisible(),
        isCrashed: mainWindow.webContents.isCrashed(),
      });

      return new Promise((resolve) => {
        /**
         * The main window is created hidden, and is shown only when it is ready.
         * See {@link ../packages/main/src/mainWindow.ts} function
         */
        if (mainWindow.isVisible()) {
          resolve(getState());
        } else {
          mainWindow.once("ready-to-show", () => resolve(getState()));
        }
      });
    },
  );

  expect(windowState.isCrashed, "The app has crashed").toEqual(false);
  expect(windowState.isVisible, "The main window was not visible").toEqual(
    true,
  );
});
test.describe("Login Page content", async () => {
  test("Should have One Logo", async ({ page }) => {
    const element = page.getByTitle("OneLogo");
    await expect(element).toBeVisible();
    console.log(page.url());
  });
  test("should have a login button", async ({ page }) => {
    const element = page.getByText("Log In");
    await expect(element).toBeVisible();
  });
});
test.describe("Home page content", async () => {
  test("Should have sidebar", async ({ page }) => {
    const currentUrl = page.url(); // e.g., file:///path/to/app/index.html
    const baseUrl = currentUrl.split("#")[0]; // Extract everything before the hash

    // Construct the target URL with HashRouter
    const targetUrl = `${baseUrl}#/home`;

    // Navigate to the /home route
    await page.goto(targetUrl, { waitUntil: "load" });

    // Perform assertions
    const element = page.getByText("Datasets");
    await expect(element).toBeVisible();
  });
});

test.describe("Preload context should be exposed", async () => {
  test.describe(`processing csv should be exposed`, async () => {
    test("with same type`", async ({ page }) => {
      const type = await page.evaluate(
        () => typeof globalThis[btoa("openFilePicker")],
      );
      expect(type).toEqual("function");
    });
  });
});
