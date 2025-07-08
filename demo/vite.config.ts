import { svelte } from "@sveltejs/vite-plugin-svelte";
import { svelteInspector } from "@sveltejs/vite-plugin-svelte-inspector";
import tailwindcss from "@tailwindcss/vite";
import path from "path";
import { defineConfig } from "vite";
import checker from "vite-plugin-checker";

export default defineConfig({
  logLevel: "info",
  plugins: [
    // tsconfigPaths(),
    svelte(),
    svelteInspector({
      toggleKeyCombo: "alt-x",
      showToggleButton: "always",
      toggleButtonPos: "bottom-left"
    }),
    tailwindcss(),
    /**
     * https://vite-plugin-checker.netlify.app/
     */
    checker({
      typescript: true
      // eslint: {
      //   lintCommand: "eslint . --ext .svelte,.ts"
      // }
    })
  ],
  build: {
    reportCompressedSize: true
  },
  resolve: {
    alias: {
      "@mateothegreat/svelte-quiz-kit": path.resolve(__dirname, "../src/index.ts"),
      $lib: path.resolve(__dirname, "../src/lib"),
      $ui: path.resolve(__dirname, "../src/lib/components/ui"),
      $components: path.resolve(__dirname, "../src/components/ui")
    }
  }
  // optimizeDeps: {
  //   exclude: ["@mateothegreat/svelte5-modal-manager"]
  // }
});
