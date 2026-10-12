// @ts-check
import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://ariciachan.com',
  // Case-study pages haven't been migrated yet. Until they are, these
  // routes 404 locally. Add redirects here if you need them to resolve.
  redirects: {},
});
