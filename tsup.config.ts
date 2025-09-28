import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/**/*"],
  // sourcemap: true,
  clean: true,
  format: "esm",
  bundle: false,
  target: "esnext",
  minify:true
  
  // watch: true,
});
