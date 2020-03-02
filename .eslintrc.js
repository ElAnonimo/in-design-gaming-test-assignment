module.exports = {
	"parser": "babel-eslint",
	"plugins": ["react"],
	"extends": [
		"eslint:recommended",
		"plugin:react/recommended"
	],
	"settings": {
		"react": {
			"version": "detect"
		}
	},
	"parserOptions": {
		"ecmaFeatures": {
			"jsx": true
		}
	},
	"env": {
		"browser": true
	}
};
