import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
	clearScreen: false,
	plugins: [react()],
	server: {
		port: 8000,
	},
	build: {
		target: ["chrome100", "edge100", "safari15", "firefox100"],
		rollupOptions: {
			output: {
				manualChunks: (id) => {
					if (
						id.includes("/node_modules/react/") ||
						id.includes("/node_modules/react-dom/")
					) {
						return "react";
					}
					return;
				},
			},
		},
	},
});
