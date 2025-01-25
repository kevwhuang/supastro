import compression from 'astro-compressor';
import { defineConfig } from 'astro/config';
import { loadEnv } from 'vite';
import netlify from '@astrojs/netlify';
import pwa from '@vite-pwa/astro';
import react from '@astrojs/react';
import robots from 'astro-robots-txt';
import sentry from '@sentry/astro';
import sitemap from '@astrojs/sitemap';
import ssl from '@vitejs/plugin-basic-ssl';

const env = loadEnv('production', process.cwd(), '');

const manifest = {
    background_color: 'white',
    description: 'Supabase + Astro',
    display: 'standalone',
    icons: [
        {
            purpose: 'any',
            sizes: '192x192',
            src: '/pwa-192x192.png',
            type: 'image/png',
        }, {
            purpose: 'any',
            sizes: '512x512',
            src: '/pwa-512x512.png',
            type: 'image/png',
        }, {
            purpose: 'maskable',
            sizes: '512x512',
            src: '/pwa-maskable-512x512.png',
            type: 'image/png',
        },
    ],
    name: 'Supastro',
    orientation: 'any',
    short_name: 'Supastro',
    theme_color: 'white',
};

const astro = defineConfig({
    adapter: netlify({ cacheOnDemandPages: true }),
    integrations: [
        ssl(),
        react({ include: ['**/*.tsx'] }),
        sentry({
            dsn: env.SENTRY_DSN,
            sourceMapsUploadOptions: {
                authToken: env.SENTRY_AUTH_TOKEN,
                project: 'supastro',
                telemetry: false,
            },
        }),
        robots(),
        sitemap({ lastmod: new Date }),
        pwa({
            includeAssets: ['apple-touch-icon-180x180.png', 'favicon.ico', 'favicon.svg'],
            manifest,
            registerType: 'autoUpdate',
        }),
        compression(),
    ],
    output: 'server',
    site: 'https://supastro.netlify.app',
});

export default astro;
