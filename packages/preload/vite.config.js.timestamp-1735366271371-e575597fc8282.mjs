// packages/preload/vite.config.js
import { resolveModuleExportNames } from "file:///home/jont/Documents/OneAnalytics/node_modules/mlly/dist/index.mjs";
import { getChromeMajorVersion } from "file:///home/jont/Documents/OneAnalytics/packages/electron-versions/index.js";
var __vite_injected_original_import_meta_url = "file:///home/jont/Documents/OneAnalytics/packages/preload/vite.config.js";
var vite_config_default = (
  /**
  * @type {import('vite').UserConfig}
  * @see https://vitejs.dev/config/
  */
  {
    build: {
      ssr: true,
      sourcemap: "inline",
      outDir: "dist",
      target: `chrome${getChromeMajorVersion()}`,
      assetsDir: ".",
      lib: {
        entry: ["src/exposed.ts", "virtual:browser.js"]
      },
      rollupOptions: {
        output: [
          {
            // ESM preload scripts must have the .mjs extension
            // https://www.electronjs.org/docs/latest/tutorial/esm#esm-preload-scripts-must-have-the-mjs-extension
            entryFileNames: "[name].mjs"
          }
        ]
      },
      emptyOutDir: true,
      reportCompressedSize: false
    },
    plugins: [mockExposed(), handleHotReload()]
  }
);
function mockExposed() {
  const virtualModuleId = "virtual:browser.js";
  const resolvedVirtualModuleId = "\0" + virtualModuleId;
  return {
    name: "electron-main-exposer",
    resolveId(id) {
      if (id.endsWith(virtualModuleId)) {
        return resolvedVirtualModuleId;
      }
    },
    async load(id) {
      if (id === resolvedVirtualModuleId) {
        const exportedNames = await resolveModuleExportNames("./src/index.ts", {
          url: __vite_injected_original_import_meta_url
        });
        return exportedNames.reduce((s, key) => {
          return s + (key === "default" ? `export default globalThis['${btoa(key)}'];
` : `export const ${key} = globalThis['${btoa(key)}'];
`);
        }, "");
      }
    }
  };
}
function handleHotReload() {
  let rendererWatchServer = null;
  return {
    name: "@vite-electron-builder/preload-process-hot-reload",
    config(config, env) {
      if (env.mode !== "development") {
        return;
      }
      const rendererWatchServerProvider = config.plugins.find((p) => p.name === "@vite-electron-builder/renderer-watch-server-provider");
      if (!rendererWatchServerProvider) {
        throw new Error("Renderer watch server provider not found");
      }
      rendererWatchServer = rendererWatchServerProvider.api.provideRendererWatchServer();
      return {
        build: {
          watch: {}
        }
      };
    },
    writeBundle() {
      if (!rendererWatchServer) {
        return;
      }
      rendererWatchServer.ws.send({
        type: "full-reload"
      });
    }
  };
}
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsicGFja2FnZXMvcHJlbG9hZC92aXRlLmNvbmZpZy5qcyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIi9ob21lL2pvbnQvRG9jdW1lbnRzL09uZUFuYWx5dGljcy9wYWNrYWdlcy9wcmVsb2FkXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCIvaG9tZS9qb250L0RvY3VtZW50cy9PbmVBbmFseXRpY3MvcGFja2FnZXMvcHJlbG9hZC92aXRlLmNvbmZpZy5qc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vaG9tZS9qb250L0RvY3VtZW50cy9PbmVBbmFseXRpY3MvcGFja2FnZXMvcHJlbG9hZC92aXRlLmNvbmZpZy5qc1wiO2ltcG9ydCB7cmVzb2x2ZU1vZHVsZUV4cG9ydE5hbWVzfSBmcm9tICdtbGx5JztcbmltcG9ydCB7Z2V0Q2hyb21lTWFqb3JWZXJzaW9ufSBmcm9tICdAdml0ZS1lbGVjdHJvbi1idWlsZGVyL2VsZWN0cm9uLXZlcnNpb25zJztcblxuZXhwb3J0IGRlZmF1bHQgLyoqXG4gKiBAdHlwZSB7aW1wb3J0KCd2aXRlJykuVXNlckNvbmZpZ31cbiAqIEBzZWUgaHR0cHM6Ly92aXRlanMuZGV2L2NvbmZpZy9cbiAqL1xuKHtcbiAgYnVpbGQ6IHtcbiAgICBzc3I6IHRydWUsXG4gICAgc291cmNlbWFwOiAnaW5saW5lJyxcbiAgICBvdXREaXI6ICdkaXN0JyxcbiAgICB0YXJnZXQ6IGBjaHJvbWUke2dldENocm9tZU1ham9yVmVyc2lvbigpfWAsXG4gICAgYXNzZXRzRGlyOiAnLicsXG4gICAgbGliOiB7XG4gICAgICBlbnRyeTogWydzcmMvZXhwb3NlZC50cycsICd2aXJ0dWFsOmJyb3dzZXIuanMnXSxcbiAgICB9LFxuICAgIHJvbGx1cE9wdGlvbnM6IHtcbiAgICAgIG91dHB1dDogW1xuICAgICAgICB7XG4gICAgICAgICAgLy8gRVNNIHByZWxvYWQgc2NyaXB0cyBtdXN0IGhhdmUgdGhlIC5tanMgZXh0ZW5zaW9uXG4gICAgICAgICAgLy8gaHR0cHM6Ly93d3cuZWxlY3Ryb25qcy5vcmcvZG9jcy9sYXRlc3QvdHV0b3JpYWwvZXNtI2VzbS1wcmVsb2FkLXNjcmlwdHMtbXVzdC1oYXZlLXRoZS1tanMtZXh0ZW5zaW9uXG4gICAgICAgICAgZW50cnlGaWxlTmFtZXM6ICdbbmFtZV0ubWpzJyxcbiAgICAgICAgfSxcbiAgICAgIF0sXG4gICAgfSxcbiAgICBlbXB0eU91dERpcjogdHJ1ZSxcbiAgICByZXBvcnRDb21wcmVzc2VkU2l6ZTogZmFsc2UsXG4gIH0sXG4gIHBsdWdpbnM6IFttb2NrRXhwb3NlZCgpLCBoYW5kbGVIb3RSZWxvYWQoKV0sXG59KTtcblxuXG4vKipcbiAqIFRoaXMgcGx1Z2luIGNyZWF0ZXMgYSBicm93c2VyIChyZW5kZXJlcikgdmVyc2lvbiBvZiBgcHJlbG9hZGAgcGFja2FnZS5cbiAqIEJhc2ljYWxseSwgaXQganVzdCByZWFkIGFsbCBub21pbmFscyB5b3UgZXhwb3J0ZWQgZnJvbSBwYWNrYWdlIGFuZCBkZWZpbmUgaXQgYXMgZ2xvYmFsVGhpcyBwcm9wZXJ0aWVzXG4gKiBleHBlY3RpbmcgdGhhdCByZWFsIHZhbHVlcyB3ZXJlIGV4cG9zZWQgYnkgYGVsZWN0cm9uLmNvbnRleHRCcmlkZ2UuZXhwb3NlSW5NYWluV29ybGQoKWBcbiAqXG4gKiBFeGFtcGxlOlxuICogYGBgdHNcbiAqIC8vIGluZGV4LnRzXG4gKiBleHBvcnQgY29uc3Qgc29tZVZhciA9ICdteS12YWx1ZSc7XG4gKiBgYGBcbiAqXG4gKiBPdXRwdXRcbiAqIGBgYGpzXG4gKiAvLyBfdmlydHVhbF9icm93c2VyLm1qc1xuICogZXhwb3J0IGNvbnN0IHNvbWVWYXIgPSBnbG9iYWxUaGlzWzxoYXNoPl0gLy8gJ215LXZhbHVlJ1xuICogYGBgXG4gKi9cbmZ1bmN0aW9uIG1vY2tFeHBvc2VkKCkge1xuICBjb25zdCB2aXJ0dWFsTW9kdWxlSWQgPSAndmlydHVhbDpicm93c2VyLmpzJztcbiAgY29uc3QgcmVzb2x2ZWRWaXJ0dWFsTW9kdWxlSWQgPSAnXFwwJyArIHZpcnR1YWxNb2R1bGVJZDtcblxuICByZXR1cm4ge1xuICAgIG5hbWU6ICdlbGVjdHJvbi1tYWluLWV4cG9zZXInLFxuICAgIHJlc29sdmVJZChpZCkge1xuICAgICAgaWYgKGlkLmVuZHNXaXRoKHZpcnR1YWxNb2R1bGVJZCkpIHtcbiAgICAgICAgcmV0dXJuIHJlc29sdmVkVmlydHVhbE1vZHVsZUlkO1xuICAgICAgfVxuICAgIH0sXG4gICAgYXN5bmMgbG9hZChpZCkge1xuICAgICAgaWYgKGlkID09PSByZXNvbHZlZFZpcnR1YWxNb2R1bGVJZCkge1xuICAgICAgICBjb25zdCBleHBvcnRlZE5hbWVzID0gYXdhaXQgcmVzb2x2ZU1vZHVsZUV4cG9ydE5hbWVzKCcuL3NyYy9pbmRleC50cycsIHtcbiAgICAgICAgICB1cmw6IGltcG9ydC5tZXRhLnVybCxcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBleHBvcnRlZE5hbWVzLnJlZHVjZSgocywga2V5KSA9PiB7XG4gICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIHMgK1xuICAgICAgICAgICAgKGtleSA9PT0gJ2RlZmF1bHQnXG4gICAgICAgICAgICAgID8gYGV4cG9ydCBkZWZhdWx0IGdsb2JhbFRoaXNbJyR7YnRvYShrZXkpfSddO1xcbmBcbiAgICAgICAgICAgICAgOiBgZXhwb3J0IGNvbnN0ICR7a2V5fSA9IGdsb2JhbFRoaXNbJyR7YnRvYShrZXkpfSddO1xcbmApXG4gICAgICAgICAgKTtcbiAgICAgICAgfSwgJycpO1xuICAgICAgfVxuICAgIH0sXG4gIH07XG59XG5cblxuLyoqXG4gKiBJbXBsZW1lbnQgRWxlY3Ryb24gd2VidmlldyByZWxvYWQgd2hlbiBzb21lIGZpbGUgd2FzIGNoYW5nZWRcbiAqIEByZXR1cm4ge2ltcG9ydCgndml0ZScpLlBsdWdpbn1cbiAqL1xuZnVuY3Rpb24gaGFuZGxlSG90UmVsb2FkKCkge1xuICAvKiogQHR5cGUge2ltcG9ydCgndml0ZScpLlZpdGVEZXZTZXJ2ZXJ8bnVsbH0gKi9cbiAgbGV0IHJlbmRlcmVyV2F0Y2hTZXJ2ZXIgPSBudWxsO1xuXG4gIHJldHVybiB7XG4gICAgbmFtZTogJ0B2aXRlLWVsZWN0cm9uLWJ1aWxkZXIvcHJlbG9hZC1wcm9jZXNzLWhvdC1yZWxvYWQnLFxuXG4gICAgY29uZmlnKGNvbmZpZywgZW52KSB7XG4gICAgICBpZiAoZW52Lm1vZGUgIT09ICdkZXZlbG9wbWVudCcpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBjb25zdCByZW5kZXJlcldhdGNoU2VydmVyUHJvdmlkZXIgPSBjb25maWcucGx1Z2lucy5maW5kKHAgPT4gcC5uYW1lID09PSAnQHZpdGUtZWxlY3Ryb24tYnVpbGRlci9yZW5kZXJlci13YXRjaC1zZXJ2ZXItcHJvdmlkZXInKTtcbiAgICAgIGlmICghcmVuZGVyZXJXYXRjaFNlcnZlclByb3ZpZGVyKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignUmVuZGVyZXIgd2F0Y2ggc2VydmVyIHByb3ZpZGVyIG5vdCBmb3VuZCcpO1xuICAgICAgfVxuXG4gICAgICByZW5kZXJlcldhdGNoU2VydmVyID0gcmVuZGVyZXJXYXRjaFNlcnZlclByb3ZpZGVyLmFwaS5wcm92aWRlUmVuZGVyZXJXYXRjaFNlcnZlcigpO1xuXG4gICAgICByZXR1cm4ge1xuICAgICAgICBidWlsZDoge1xuICAgICAgICAgIHdhdGNoOiB7fSxcbiAgICAgICAgfSxcbiAgICAgIH07XG4gICAgfSxcblxuICAgIHdyaXRlQnVuZGxlKCkge1xuICAgICAgaWYgKCFyZW5kZXJlcldhdGNoU2VydmVyKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgcmVuZGVyZXJXYXRjaFNlcnZlci53cy5zZW5kKHtcbiAgICAgICAgdHlwZTogJ2Z1bGwtcmVsb2FkJyxcbiAgICAgIH0pO1xuICAgIH0sXG4gIH07XG59XG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQXdVLFNBQVEsZ0NBQStCO0FBQy9XLFNBQVEsNkJBQTRCO0FBRHdLLElBQU0sMkNBQTJDO0FBRzdQLElBQU87QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEVBSU47QUFBQSxJQUNDLE9BQU87QUFBQSxNQUNMLEtBQUs7QUFBQSxNQUNMLFdBQVc7QUFBQSxNQUNYLFFBQVE7QUFBQSxNQUNSLFFBQVEsU0FBUyxzQkFBc0IsQ0FBQztBQUFBLE1BQ3hDLFdBQVc7QUFBQSxNQUNYLEtBQUs7QUFBQSxRQUNILE9BQU8sQ0FBQyxrQkFBa0Isb0JBQW9CO0FBQUEsTUFDaEQ7QUFBQSxNQUNBLGVBQWU7QUFBQSxRQUNiLFFBQVE7QUFBQSxVQUNOO0FBQUE7QUFBQTtBQUFBLFlBR0UsZ0JBQWdCO0FBQUEsVUFDbEI7QUFBQSxRQUNGO0FBQUEsTUFDRjtBQUFBLE1BQ0EsYUFBYTtBQUFBLE1BQ2Isc0JBQXNCO0FBQUEsSUFDeEI7QUFBQSxJQUNBLFNBQVMsQ0FBQyxZQUFZLEdBQUcsZ0JBQWdCLENBQUM7QUFBQSxFQUM1QztBQUFBO0FBb0JBLFNBQVMsY0FBYztBQUNyQixRQUFNLGtCQUFrQjtBQUN4QixRQUFNLDBCQUEwQixPQUFPO0FBRXZDLFNBQU87QUFBQSxJQUNMLE1BQU07QUFBQSxJQUNOLFVBQVUsSUFBSTtBQUNaLFVBQUksR0FBRyxTQUFTLGVBQWUsR0FBRztBQUNoQyxlQUFPO0FBQUEsTUFDVDtBQUFBLElBQ0Y7QUFBQSxJQUNBLE1BQU0sS0FBSyxJQUFJO0FBQ2IsVUFBSSxPQUFPLHlCQUF5QjtBQUNsQyxjQUFNLGdCQUFnQixNQUFNLHlCQUF5QixrQkFBa0I7QUFBQSxVQUNyRSxLQUFLO0FBQUEsUUFDUCxDQUFDO0FBQ0QsZUFBTyxjQUFjLE9BQU8sQ0FBQyxHQUFHLFFBQVE7QUFDdEMsaUJBQ0UsS0FDQyxRQUFRLFlBQ0wsOEJBQThCLEtBQUssR0FBRyxDQUFDO0FBQUEsSUFDdkMsZ0JBQWdCLEdBQUcsa0JBQWtCLEtBQUssR0FBRyxDQUFDO0FBQUE7QUFBQSxRQUV0RCxHQUFHLEVBQUU7QUFBQSxNQUNQO0FBQUEsSUFDRjtBQUFBLEVBQ0Y7QUFDRjtBQU9BLFNBQVMsa0JBQWtCO0FBRXpCLE1BQUksc0JBQXNCO0FBRTFCLFNBQU87QUFBQSxJQUNMLE1BQU07QUFBQSxJQUVOLE9BQU8sUUFBUSxLQUFLO0FBQ2xCLFVBQUksSUFBSSxTQUFTLGVBQWU7QUFDOUI7QUFBQSxNQUNGO0FBRUEsWUFBTSw4QkFBOEIsT0FBTyxRQUFRLEtBQUssT0FBSyxFQUFFLFNBQVMsdURBQXVEO0FBQy9ILFVBQUksQ0FBQyw2QkFBNkI7QUFDaEMsY0FBTSxJQUFJLE1BQU0sMENBQTBDO0FBQUEsTUFDNUQ7QUFFQSw0QkFBc0IsNEJBQTRCLElBQUksMkJBQTJCO0FBRWpGLGFBQU87QUFBQSxRQUNMLE9BQU87QUFBQSxVQUNMLE9BQU8sQ0FBQztBQUFBLFFBQ1Y7QUFBQSxNQUNGO0FBQUEsSUFDRjtBQUFBLElBRUEsY0FBYztBQUNaLFVBQUksQ0FBQyxxQkFBcUI7QUFDeEI7QUFBQSxNQUNGO0FBRUEsMEJBQW9CLEdBQUcsS0FBSztBQUFBLFFBQzFCLE1BQU07QUFBQSxNQUNSLENBQUM7QUFBQSxJQUNIO0FBQUEsRUFDRjtBQUNGOyIsCiAgIm5hbWVzIjogW10KfQo=
