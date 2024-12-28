import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  optimizeDeps: {
    include: ["@nextui-org/react", "@nextui-org/theme"],
  },

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "../"),
      "@features": path.resolve(__dirname, "./src/features"),
      "@routes": path.resolve(__dirname, "./src/app/routes"),
      "@components": path.resolve(__dirname, "./src/components"),
    },
  },
  plugins: [react()],
});
