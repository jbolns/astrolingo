// @ts-check
import { defineConfig } from 'astro/config';

import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
	site: "http://localhost:4321/",

	integrations: [mdx(), sitemap()],

	i18n: {
		defaultLocale: "en",
		locales: ["en", "es", "fi"],
		routing: {
			prefixDefaultLocale: false
		},
		fallback: {
      es: "en",
      fi: "en"
    }
	}

});
