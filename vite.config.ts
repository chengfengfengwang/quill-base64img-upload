// vite.config.js
import { resolve } from "path";
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";

export default defineConfig({
  build: {
    lib: {
      // Could also be a dictionary or array of multiple entry points
      entry: resolve(__dirname, "src/main.ts"),
      name: "quill-base64img-upload",
      formats: ["es", "umd"],
      // the proper extensions will be added
      fileName: "quill-base64img-upload",
    },
    rollupOptions: {
      // make sure to externalize deps that shouldn't be bundled
      // into your library
      external: ["quill"],
      output: {
        // Provide global variables to use in the UMD build
        // for externalized deps
        globals: {
          quill: "Quill",
        },
      },
    },
  },
  plugins: [dts({ insertTypesEntry: true })],
});
