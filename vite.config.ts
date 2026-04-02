import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import fs from "fs";

// Scan /public/blog-photos/ subfolders and build a registry of available images
function blogPhotosPlugin() {
  const virtualModuleId = "virtual:blog-photos";
  const resolvedId = "\0" + virtualModuleId;

  function scanPhotos() {
    const baseDir = path.resolve(__dirname, "public/blog-photos");
    const registry: Record<string, string[]> = {};
    if (!fs.existsSync(baseDir)) return registry;
    for (const folder of fs.readdirSync(baseDir)) {
      const folderPath = path.join(baseDir, folder);
      if (!fs.statSync(folderPath).isDirectory()) continue;
      const files = fs.readdirSync(folderPath).filter(f =>
        /\.(jpe?g|png|webp|gif|avif)$/i.test(f)
      );
      if (files.length > 0) registry[folder] = files;
    }
    return registry;
  }

  return {
    name: "blog-photos",
    resolveId(id: string) {
      if (id === virtualModuleId) return resolvedId;
    },
    load(id: string) {
      if (id === resolvedId) {
        const registry = scanPhotos();
        return `export default ${JSON.stringify(registry)};`;
      }
    },
    handleHotUpdate({ file, server }: { file: string; server: any }) {
      if (file.includes("blog-photos")) {
        const mod = server.moduleGraph.getModuleById(resolvedId);
        if (mod) return [mod];
      }
    },
  };
}

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: parseInt(process.env.PORT || "8080"),
  },
  plugins: [
    react(),
    blogPhotosPlugin(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
