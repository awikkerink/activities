module.exports = {
	verbose: true,
	testMatch: [
		'**/__tests__/**/*.[jt]s?(x)',
		'**/?(*.)+(spec).[tj]s?(x)'
	],
	transformIgnorePatterns: [
		'node_modules/(?!(siren-sdk|d2l-polymer-siren-behaviors|d2l-fetch)/)'
	],
};
