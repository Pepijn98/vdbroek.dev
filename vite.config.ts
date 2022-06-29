import { defineConfig } from "vite";
import path from "path";
import vue from "@vitejs/plugin-vue";
import vuetify from "vite-plugin-vuetify";

export default defineConfig({
    base: process.env.NODE_ENV === "development" ? "/beta/" : "/",
    plugins: [
        vue(),
        vuetify()
    ],
    resolve: {
        alias: {
            "~": path.resolve(__dirname, "./src"),
            "@": path.resolve(__dirname, "/")
        }
    }
});
