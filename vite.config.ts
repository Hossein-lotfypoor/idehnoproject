import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [tailwindcss(), reactRouter(), tsconfigPaths()],
  base: '/idehno-view/', // 👈 این خط را دقیقاً اضافه کنید (نام مخزن شما)
  publicDir: "public",
  server: {
    fs: {
      strict: false,
    },
  },
});
