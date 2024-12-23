# One Analytics Project

![Build Status](https://github.com/jmt1423/OneAnalytics/actions/workflows/ci.yml/badge.svg)
![Last Commit](https://img.shields.io/github/last-commit/jmt1423/OneAnalytics)
![Electron Version](https://img.shields.io/github/package-json/dependency-version/jmt1423/OneAnalytics/electron)
![React Version](https://img.shields.io/github/package-json/dependency-version/jmt1423/OneAnalytics/react)
![Node.js Version](https://img.shields.io/badge/node-%3E%3D23.0.0-blue)

This is my data visualization software build with electron-builder, Vite, and React.

End-to-End testing with playwright

No data tracking, all data is owned by the user. This is free to use and seeks to be a simpler version of Apache Echarts and Tableau.

## Get started with development

1. Just clone this repo.
2. Go to project folder and run `npm install`.
3. Start application in development mode by `npm start`.
4. Compile executable by `npm run compile`.
 
That's it!

## Features

### Electron

- Uses the latest electron version with all the latest security patches.
- The architecture of the application is built according to the security [guides](https://www.electronjs.org/docs/tutorial/security) and best practices.
- The latest version of the [electron-builder] is used to package the application.

### Automatic tests

- End-to-end are placed in the root [`tests`](tests) directory and use [playwright].
- You may write any unit tests inside each package and use whatever you need.

### Continuous Integration

- The configured workflow will check the types for each push and PR.
- Code signing supported. See [code-signing documentation](https://www.electron.build/code-signing.html).

### Auto-update

Each time you push changes to the `main` branch,
the [`ci`](.github/workflows/ci.yml) workflow starts to create and deploy a new application version with then will be downloaded and applied by each app instance.

## Project Structure

The project is designed as monorepo where each part of the application is an independent package.
Each package could have own tech stack, tests, dependencies, frameworks, etc.
All internal names are prefixed by `@vite-electron-builder/*`.

### Packages with building tools:

- [`packages/integrate-renderer`](packages/integrate-renderer) - A helper package that is not included in the runtime.
  It is used in `npm run init` to configure a new interface package.
- [`packages/electron-versions`](packages/electron-versions) - A set of helper functions to get the versions of internal components bundled within Electron.

### Packages with app logic:

- [`packages/main`](packages/main) - Implementation of Electron's [**main script**](https://www.electronjs.org/docs/tutorial/quick-start#create-the-main-script-file).
- [`packages/preload`](packages/preload) - Implementation of Electron's [**preload scripts**](https://www.electronjs.org/docs/latest/tutorial/tutorial-preload).

## How It works

However, this is designed to use all power of ES modules.
You can import anything from `preload` in `renderer`.
All the data will quietly throw through the `electron.contextBridge.exposeInMainWorld()`,
so you don't need to worry about it.

```ts
// preload/src/index.ts
import {readFile} from 'node:fs/promises';

// Encapsulate types if you use typescript
interface UserData {
  prop: string
}

// Will call `electron.contextBridge.exposeInMainWorld('getUserData', getUserData)`
export function getUserData(): Promise<UserData> {
  return readFile('/path/to/file/in/user/filesystem.json', {encoding: 'utf8'}).then(JSON.parse);
}
```

Now you can import and call the method in renderer

```ts
// renderer/src/anywere/component.ts
import {getUserData} from '@vite-electron-builder/preload'

// Method will came from exposed context
// const userData = globalThis['getUserData']
const userData = await getUserData()
```

### Working with Electron API

Although the preload has access to all of Node.js API, it **still runs in the BrowserWindow context**, so only limited
electron modules are available in it.

```mermaid
sequenceDiagram
renderer->>+preload: Read data from file system
preload->>-renderer: Data
renderer->>preload: Maximize window
activate preload
preload-->>main: Invoke IPC command
activate main
main-->>preload: IPC response
deactivate main
preload->>renderer: Window maximized
deactivate preload
```

### Modes and Environment Variables

All environment variables are set as part of the `import.meta`, so you can access them vie the following
way: `import.meta.env`.

> [!NOTE]
> you must add all the environment variables to the [`ImportMetaEnv` in `types/env.d.ts`](types/env.d.ts).

The mode option is used to specify the value of `import.meta.env.MODE` and the corresponding environment variables files
that need to be loaded.

By default, there are two modes:

- `production` is used by default
- `development` is used by `npm start` script

When running the build script, the environment variables are loaded from the following files in your project root:

```
.env                # loaded in all cases
.env.local          # loaded in all cases, ignored by git
.env.[mode]         # only loaded in specified env mode
.env.[mode].local   # only loaded in specified env mode, ignored by git
```

> [!WARNING]
> To prevent accidentally leaking env variables to the client, only variables prefixed with `VITE_` are exposed to your
> Vite-processed code.

For example, let's take the following `.env` file:

```
DB_PASSWORD=foobar
VITE_SOME_KEY=123
```

Only `VITE_SOME_KEY` will be exposed as `import.meta.env.VITE_SOME_KEY` to your client source code, but `DB_PASSWORD`
will not.

> [!TIP]
> You can change that prefix or add another. See [`envPrefix`](https://vitejs.dev/config/shared-options.html#envprefix).

### NPM Scripts

```sh
npm start
```
Start application in development more with hot-reload.

---
```sh
npm run build
```
Runs the `build` command in all workspaces if present.

---
```sh
npm run compile
```
First runs the `build` script,
then compiles the project into executable using `electron-builder` with the specified configuration.

---
```sh
npm run compile -- --dir -c.asar=false
```
Same as `npm run compile` but pass to `electron-builder` additional parameters to disable asar archive and installer
creating.
Useful for debugging compiled application.

---
```sh
npm run test
```
Executes end-to-end tests on **compiled app** using Playwright.

---
```sh
npm run typecheck
```
Runs the `typecheck` command in all workspaces if present.

---
```sh
npm run create-renderer
```
Initializes a new Vite project named `renderer`. Basically same as `npm create vite`.

---
```sh
npm run integrate-renderer
```
Starts the integration process of the renderer using the Vite Electron builder.

---
```sh
npm run init
```
Set up the initial environment by creating a new renderer, integrating it, and installing the necessary packages.

## Contribution

[vite]: https://github.com/vitejs/vite/

[electron]: https://github.com/electron/electron

[electron-builder]: https://github.com/electron-userland/electron-builder

[playwright]: https://playwright.dev
