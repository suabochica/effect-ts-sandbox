/// <reference types="vitest" />
import path from "path"
import { defineConfig } from "vite"

export default defineConfig({
  test: {
    include: ["./test/**/*.test.ts"],
    globals: true,
  },
  resolve: {
    alias: {
      "http-and-schema/test": path.join(__dirname, "test"),
      "http-and-schema/": path.join(__dirname, "src"),
    },
  },
})