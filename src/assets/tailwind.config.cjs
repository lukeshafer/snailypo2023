const defaultTheme = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
	theme: {
		fontFamily: {
			sans: ["Sniglet", ...defaultTheme.fontFamily.sans],
		},
		extend: {},
	},
	plugins: [],
};
