import type { Config } from "tailwindcss";
// Tailwind v4 uses `import` instead of require()
// Also: no theme.extend — everything goes under `theme`
export default {
	darkMode: "class",

	content: [
		"./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/components/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/app/**/*.{js,ts,jsx,tsx,mdx}",
	],

	theme: {},
} satisfies Config;
