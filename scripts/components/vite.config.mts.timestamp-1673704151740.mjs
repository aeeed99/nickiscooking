// vite.config.mts
import path from "node:path";
import { defineConfig } from "file:///Users/nick/mason/programming/kitchendb/scripts/components/node_modules/.pnpm/vite@4.0.4/node_modules/vite/dist/node/index.js";
import solidPlugin from "file:///Users/nick/mason/programming/kitchendb/scripts/components/node_modules/.pnpm/vite-plugin-solid@2.5.0_solid-js@1.6.6+vite@4.0.4/node_modules/vite-plugin-solid/dist/esm/index.mjs";
import fs from "node:fs/promises";
var __vite_injected_original_dirname = "/Users/nick/mason/programming/kitchendb/scripts/components";
var outputDir = path.join(__vite_injected_original_dirname, "..", "..", "static", "components");
var entrypoints = [];
for (const file of await fs.readdir(path.join(__vite_injected_original_dirname, "src"))) {
  console.log(file);
  if (file[0] === file[0].toUpperCase() && ![".$_"].includes(file[0])) {
    entrypoints.push(path.join("src", file));
  }
}
var vite_config_default = defineConfig({
  plugins: [solidPlugin()],
  server: {
    port: 3e3
  },
  build: {
    target: "es2015",
    emptyOutDir: true,
    rollupOptions: {
      input: entrypoints,
      output: {
        entryFileNames: "[name].js",
        dir: outputDir,
        globals: {
          window: "window"
        }
      }
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcubXRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiL1VzZXJzL25pY2svbWFzb24vcHJvZ3JhbW1pbmcva2l0Y2hlbmRiL3NjcmlwdHMvY29tcG9uZW50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiL1VzZXJzL25pY2svbWFzb24vcHJvZ3JhbW1pbmcva2l0Y2hlbmRiL3NjcmlwdHMvY29tcG9uZW50cy92aXRlLmNvbmZpZy5tdHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL1VzZXJzL25pY2svbWFzb24vcHJvZ3JhbW1pbmcva2l0Y2hlbmRiL3NjcmlwdHMvY29tcG9uZW50cy92aXRlLmNvbmZpZy5tdHNcIjtpbXBvcnQgcGF0aCBmcm9tICdub2RlOnBhdGgnO1xuaW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSAndml0ZSc7XG5pbXBvcnQgc29saWRQbHVnaW4gZnJvbSAndml0ZS1wbHVnaW4tc29saWQnO1xuaW1wb3J0IGZzIGZyb20gJ25vZGU6ZnMvcHJvbWlzZXMnXG5cbmNvbnN0IG91dHB1dERpciA9IHBhdGguam9pbihfX2Rpcm5hbWUsICcuLicsICcuLicsICdzdGF0aWMnLCAnY29tcG9uZW50cycpO1xuXG5jb25zdCBlbnRyeXBvaW50czogc3RyaW5nW10gPSBbXVxuZm9yIChjb25zdCBmaWxlIG9mIGF3YWl0IGZzLnJlYWRkaXIocGF0aC5qb2luKF9fZGlybmFtZSwgJ3NyYycpKSkge1xuICBjb25zb2xlLmxvZyhmaWxlKTtcbiAgLy8gQ2FwaXRhbGl6ZWQgZmlsZXMgYXJlIGV4cG9ydGVkLlxuICBpZiAoZmlsZVswXSA9PT0gZmlsZVswXS50b1VwcGVyQ2FzZSgpICYmICFbJy4kXyddLmluY2x1ZGVzKGZpbGVbMF0pKSB7XG4gICAgZW50cnlwb2ludHMucHVzaChwYXRoLmpvaW4oJ3NyYycsIGZpbGUpKTtcbiAgfVxufTtcblxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcbiAgcGx1Z2luczogW3NvbGlkUGx1Z2luKCldLFxuICBzZXJ2ZXI6IHtcbiAgICBwb3J0OiAzMDAwLFxuICB9LFxuICBidWlsZDoge1xuICAgIHRhcmdldDogJ2VzMjAxNScsXG4gICAgZW1wdHlPdXREaXI6IHRydWUsXG4gICAgcm9sbHVwT3B0aW9uczoge1xuICAgICAgaW5wdXQ6IGVudHJ5cG9pbnRzLFxuICAgICAgb3V0cHV0OiB7XG4gICAgICAgIGVudHJ5RmlsZU5hbWVzOiAnW25hbWVdLmpzJyxcbiAgICAgICAgZGlyOiBvdXRwdXREaXIsXG4gICAgICAgIGdsb2JhbHM6IHtcbiAgICAgICAgICB3aW5kb3c6ICd3aW5kb3cnXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH0sXG59KTtcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBa1csT0FBTyxVQUFVO0FBQ25YLFNBQVMsb0JBQW9CO0FBQzdCLE9BQU8saUJBQWlCO0FBQ3hCLE9BQU8sUUFBUTtBQUhmLElBQU0sbUNBQW1DO0FBS3pDLElBQU0sWUFBWSxLQUFLLEtBQUssa0NBQVcsTUFBTSxNQUFNLFVBQVUsWUFBWTtBQUV6RSxJQUFNLGNBQXdCLENBQUM7QUFDL0IsV0FBVyxRQUFRLE1BQU0sR0FBRyxRQUFRLEtBQUssS0FBSyxrQ0FBVyxLQUFLLENBQUMsR0FBRztBQUNoRSxVQUFRLElBQUksSUFBSTtBQUVoQixNQUFJLEtBQUssT0FBTyxLQUFLLEdBQUcsWUFBWSxLQUFLLENBQUMsQ0FBQyxLQUFLLEVBQUUsU0FBUyxLQUFLLEVBQUUsR0FBRztBQUNuRSxnQkFBWSxLQUFLLEtBQUssS0FBSyxPQUFPLElBQUksQ0FBQztBQUFBLEVBQ3pDO0FBQ0Y7QUFFQSxJQUFPLHNCQUFRLGFBQWE7QUFBQSxFQUMxQixTQUFTLENBQUMsWUFBWSxDQUFDO0FBQUEsRUFDdkIsUUFBUTtBQUFBLElBQ04sTUFBTTtBQUFBLEVBQ1I7QUFBQSxFQUNBLE9BQU87QUFBQSxJQUNMLFFBQVE7QUFBQSxJQUNSLGFBQWE7QUFBQSxJQUNiLGVBQWU7QUFBQSxNQUNiLE9BQU87QUFBQSxNQUNQLFFBQVE7QUFBQSxRQUNOLGdCQUFnQjtBQUFBLFFBQ2hCLEtBQUs7QUFBQSxRQUNMLFNBQVM7QUFBQSxVQUNQLFFBQVE7QUFBQSxRQUNWO0FBQUEsTUFDRjtBQUFBLElBQ0Y7QUFBQSxFQUNGO0FBQ0YsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
