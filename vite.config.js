import { defineConfig } from 'vite';

// GitHub Pages uses a repository subpath; local and other hosts keep the root.
export default defineConfig({
  base: process.env.PAGES_BASE || '/',
});
