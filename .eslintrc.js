module.exports = {
	env: {
		browser: true,
		es2021: true,
		node: true,
	},
	extends: [
		"eslint:recommended",
		"plugin:vue/essential",
		"plugin:@typescript-eslint/recommended",
		"@nuxtjs/eslint-config-typescript",
		"prettier",
	],
	overrides: [],
	parserOptions: {
		ecmaVersion: "latest",
		sourceType: "module",
		parser: "@typescript-eslint/parser",
	},
	plugins: ["vue", "@typescript-eslint"],
	rules: {},
};
