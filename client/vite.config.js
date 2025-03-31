import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "http://127.0.0.1:9000", // Backend API URL
        changeOrigin: true,
        secure: false, // Set to false if using self-signed SSL
      },
    },
  },
});
