import { defineConfig } from "vite";
import path from "path";
import glob from "glob";
import injectHTML from "vite-plugin-html-inject";
import FullReload from "vite-plugin-full-reload";

export default defineConfig(({ command }) => {
    return {
        define: {
            [command === "serve" ? "global" : "_global"]: {},
        },
        base: "/goit-js-hw-10/",
        root: "src/public",
        publicDir: false,
        resolve: {
            alias: {
                "/css": path.resolve(__dirname, "src/css"),
                "/js": path.resolve(__dirname, "src/js"),
                "/img": path.resolve(__dirname, "src/img"),
                "/partials": path.resolve(__dirname, "src/partials"),
            },
        },
        server: {
            fs: {
                allow: [
                    path.resolve(__dirname, "src"),
                    path.resolve(__dirname),
                ],
            },
        },
        build: {
            sourcemap: true,
            outDir: "../../dist",
            rollupOptions: {
                input: glob.sync("./src/public/*.html"),
                output: {
                    manualChunks(id) {
                        if (id.includes("node_modules")) {
                            return "vendor";
                        }
                    },
                    entryFileNames: "commonHelpers.js",
                },
            },
        },
        plugins: [
            injectHTML({
                root: path.resolve(__dirname, "src"),
            }),
            FullReload(["../**/*.html"]),
        ],
    };
});
