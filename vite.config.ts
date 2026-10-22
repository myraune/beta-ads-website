import { defineConfig, loadEnv, type Plugin } from "vite";
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

// Serve the Vercel functions in /api during `vite dev`, using the same Web
// Request/Response handlers Vercel calls in production (export GET/POST).
function apiDevPlugin(): Plugin {
  return {
    name: "api-dev",
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        const match = req.url?.match(/^\/api\/([a-z0-9-]+)/);
        if (!match) return next();
        const file = path.resolve(__dirname, `api/${match[1]}.ts`);
        if (!fs.existsSync(file)) return next();
        try {
          const mod = await server.ssrLoadModule(file);
          const handler = mod[req.method || "GET"];
          if (!handler) { res.statusCode = 405; return res.end(); }
          const chunks: Buffer[] = [];
          for await (const c of req) chunks.push(c as Buffer);
          const request = new Request(`http://${req.headers.host}${req.url}`, {
            method: req.method,
            headers: req.headers as Record<string, string>,
            body: chunks.length ? Buffer.concat(chunks) : undefined,
          });
          const response: Response = await handler(request);
          res.statusCode = response.status;
          response.headers.forEach((v, k) => res.setHeader(k, v));
          res.end(Buffer.from(await response.arrayBuffer()));
        } catch (e) {
          server.config.logger.error(String(e));
          res.statusCode = 500;
          res.end();
        }
      });
    },
  };
}

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Server-only secrets (.env.local) for the /api handlers; the client still only sees VITE_*.
  Object.assign(process.env, loadEnv(mode, process.cwd(), ""));
  return {
  server: {
    host: "::",
    port: parseInt(process.env.PORT || "8080"),
  },
  plugins: [
    react(),
    blogPhotosPlugin(),
    apiDevPlugin(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  };
});
