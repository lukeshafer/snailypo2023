module.exports = {
	trailingComma: "es5",
	printWidth: 80,
	bracketSameLine: true,
	useTabs: true,
	plugins: [
		require.resolve("prettier-plugin-astro"),
		require.resolve("prettier-plugin-tailwind"),
	],
};
