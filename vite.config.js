import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "tailwindcss";
import autoprefixer from "autoprefixer";
import fs from "fs";
import path from "path";

export default defineConfig({
  plugins: [
    react(),
    {
      name: "admin-html-fix",
      configureServer(server) {
        return () => {
          server.middlewares.use((req, res, next) => {
            if (req.url.startsWith("/admin")) {
              const adminPath = path.resolve(__dirname, "public", "admin", "index.html");
              if (fs.existsSync(adminPath)) {
                const content = fs.readFileSync(adminPath, "utf-8");
                res.setHeader("Content-Type", "text/html; charset=utf-8");
                res.end(content);
                return;
              }
            }
            next();
          });
        };
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
});
