import { defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";
import react from "@vitejs/plugin-react";

// Add PWA configuration
const pwaConfig = {
  registerType: "autoUpdate",
  includeAssets: ["logo-color.svg"],
  workbox: {
    globPatterns: ["**/*.{js,css,html,png,jpg,gif,svg}"], // Include your asset types
    navigateFallback: "/", // The fallback for client-side routing
    navigateFallbackAllowlist: [/^(?!\/__).*/], // Allowlist for navigateFallback
    runtimeCaching: [
      {
        urlPattern: /\.(png|jpg|gif|svg)$/, // Define the regex pattern for your assets
        handler: "StaleWhileRevalidate", // Caching strategy
      },
    ],
  },
  manifest: {
    name: "Bankco admin Dashboard",
    short_name: "Bankco",
    description: "bankco Admin Dashboard",
    start_url: "/",
    display: "standalone",
    background_color: "#23262B",
    theme_color: "#16A34A",
    icons: [
      {
        src: "/logo-192x192.png",
        sizes: "192x192",
        purpose: "any maskable",
      },
      {
        src: "/logo-512x512.png",
        sizes: "512x512",
        purpose: "maskable any",
      },
    ],
  },
};

// https://vitejs.dev/config/
export default defineConfig({
  basename: "/",
  plugins: [react(), VitePWA(pwaConfig)],
});
