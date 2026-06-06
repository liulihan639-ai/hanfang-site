import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "tailwindcss";
import autoprefixer from "autoprefixer";
import { resolve } from "path";

export default defineConfig({
  plugins: [
    react(),
    {
      name: "admin-redirect",
      apply: "serve",
      configureServer(server) {
        server.middlewares.use((req, _res, next) => {
          if (req.url === "/admin" || req.url === "/admin/" || req.url.startsWith("/admin?")) {
            req.url = "/admin.html";
          }
          next();
        });
      },
    },
  ],
  server: {
    host: true,
    port: 5173,
  },
  css: {
    postcss: {
      plugins: [tailwindcss(), autoprefixer()],
    },
  },
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        admin: resolve(__dirname, "admin.html"),
      },
    },
  },
});
