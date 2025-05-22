import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		react(),
		VitePWA({
			registerType: "autoUpdate",
			injectRegister: "auto",
			strategies: "generateSW",
			manifest: {
				name: "Food for All",
				short_name: "FFA",
				start_url: "./",
				display_override: ["fullscreen", "minimal-ui"],
				display: "standalone",
				background_color: "#fff",
				description: "Food for All App.",
				theme_color: "#ffffff",
				icons: [
					{
						src: "images/logo.png",
						sizes: "192x192",
						type: "image/png",
					},
				],
			},
			workbox: {
				runtimeCaching: [
					{
						urlPattern: ({ url }) => {
							return url.pathname.includes("images");
						},
						handler: "CacheFirst",
						method: "GET",
						options: {
							cacheName: "static-assets",
							expiration: {
								maxEntries: 10,
								maxAgeSeconds: 60 * 60 * 24,
							},
							cacheableResponse: {
								statuses: [0, 200],
							},
						},
					},
					{
						urlPattern: ({ url }) => {
							return url.pathname.includes("volunteer");
						},
						handler: "CacheFirst",
						method: "GET",
						options: {
							cacheName: "volunteer-cache",
							expiration: {
								maxEntries: 10,
								maxAgeSeconds: 60 * 60 * 24,
							},
							cacheableResponse: {
								statuses: [0, 200],
							},
						},
					},
				],
			},
			devOptions: {
				enabled: true,
			},
		}),
	],
});
