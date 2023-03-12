import { defineConfig } from "astro/config";
import { ecsstatic } from "@acab/ecsstatic/vite";

// https://astro.build/config
import tailwind from "@astrojs/tailwind";
import solidJs from "@astrojs/solid-js";

// https://astro.build/config
export default defineConfig({
	integrations: [tailwind(), solidJs()],
	vite: {
		plugins: [ecsstatic()],
	},
});
