import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],

  server: {
    host: "127.0.0.1", // localhost 대신 127.0.0.1 사용 강제
    port: 5173, // 포트 고정
  },
});
