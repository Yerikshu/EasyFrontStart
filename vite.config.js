import { resolve } from "path";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      "@": resolve("./src"),
    },
  },
  // 配置前端服务地址和端口
  server: {
    fs: {
      strict: false,
    },
    host: "0.0.0.0",
    port: 8889,
    // 是否开启 https
    https: false,
    //cors: true, // 默认启用并允许任何源
    //open: true, // 在服务器启动时自动在浏览器中打开应用程序
    // 设置反向代理，跨域
    proxy: {
      "/dev-api": {
        // 后台地址
        target: "http://localhost:8888",
        changeOrigin: true,
        logLevel: "debug", // 打印代理以后的地址
        rewrite: (path) => path.replace(/^\/dev-api/, ""),
      },
    },
  },
});
