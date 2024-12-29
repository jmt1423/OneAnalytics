/// <reference types="vitest/config" />

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vite.dev/config/
export default defineConfig(() => ({
  optimizeDeps: {
    include: ["@nextui-org/react", "@nextui-org/theme"],
  },
  test: {
    include: ["unit-tests/**/*.test.ts"], // Include unit test files
    globals: true, // Enable global test APIs like describe/test
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
}));
