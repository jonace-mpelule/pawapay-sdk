import { defineConfig } from "tsdown";

export default defineConfig({
  entry: ["./src/index.ts"],
  clean: true,
  format: "cjs",
  dts: true,
  sourcemap: true,
  minify: true,
  target: "es2022",
  outDir: "dist",
});
