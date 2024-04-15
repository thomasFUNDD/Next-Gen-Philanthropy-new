import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';
import postcssImport from 'postcss-import';
import tailwindcss from 'tailwindcss';

export default defineConfig({
    logLevel: 'info', // Add this line to set verbose logging

    plugins: [
        laravel({
            input: [
                'resources/js/app/app.jsx', // Update this line
                'resources/css/app.css',
            ],
            refresh: true,
        }),
        react(),
    ],
    css: {
        postcss: {
            plugins: [
                postcssImport(),
                tailwindcss(),
            ],
        },
    },
});