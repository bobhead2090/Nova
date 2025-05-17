import { defineConfig } from "vite";

export default defineConfig({
  root: "public",          // serve files from public/
  build: {
    outDir: "../dist",     // build output goes to dist folder at root
    emptyOutDir: true,     // clear dist folder before build
  },
  server: {
    fs: {
      allow: [".."],       // allow serving files from one level up (root)
    },
  },
});
