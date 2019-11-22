/* eslint-env node, es6 */

'use strict';

const fs = require('fs');
const path = require('path');

const LANG_PATH = path.resolve('components/d2l-quick-eval/lang');

const traverseJSONDir = (pathName, cb) => {
	fs.readdirSync(pathName)
		.filter((x) => path.extname(x) === '.json')
		.map(x => path.resolve(pathName, x))
		.forEach(cb);
};

function sortObject(obj) {
	return Object.keys(obj).sort().reduce(function(result, key) {
		result[key] = obj[key];
		return result;
	}, {});
}

function addJsonLangTerm(langKey, langPhrase, filePath) {
	const parsedJSON = JSON.parse(fs.readFileSync(filePath));
	parsedJSON[langKey] = langPhrase;
	const sortedObject = sortObject(Object.assign({}, parsedJSON));
	fs.writeFileSync(filePath, JSON.stringify(sortedObject, null, 3).replace(/": "/g, '" : "') + '\n');
}

function removeJsonLangTerm(langKey, filePath) {
	const parsedJSON = JSON.parse(fs.readFileSync(filePath));
	delete parsedJSON[langKey];
	fs.writeFileSync(filePath, JSON.stringify(parsedJSON, null, 3).replace(/": "/g, '" : "') + '\n');
}

function CLIAppendLangTerm(langKey, langPhrase) {
	if (!langPhrase) throw 'add the lang term that you want to add/modify and the content of the lang term';
	traverseJSONDir(LANG_PATH, addJsonLangTerm.bind(null, langKey, langPhrase));
}

function CLIRemoveLangTerm(langKey) {
	if (!langKey) throw 'add the lang term that you want to remove';
	traverseJSONDir(LANG_PATH, removeJsonLangTerm.bind(null, langKey));
}

function CLISyncJsonFiles() {
	const enJsonFile = path.resolve(LANG_PATH, 'en.json');
	const jaJsonFile = path.resolve(LANG_PATH, 'ja.json');
	const parsedEnJson = JSON.parse(fs.readFileSync(enJsonFile));
	const parsedJaJson = JSON.parse(fs.readFileSync(jaJsonFile));

	// check for new terms
	Object.keys(parsedEnJson).forEach((key) => {
		if (!parsedJaJson.hasOwnProperty(key)) {
			CLIAppendLangTerm(key, parsedEnJson[key]);
		}
	});

	// check for removed terms
	Object.keys(parsedJaJson).forEach((key) => {
		if (!parsedEnJson.hasOwnProperty(key)) {
			CLIRemoveLangTerm(key);
		}
	});
}

const params = process.argv.slice(2);
const [command, langKey, langPhrase] = params;
switch (command) {
	case 'sync':
		CLISyncJsonFiles();
		break;
	case 'add':
	case 'change': // add and change do the same thing, but easier in terms of usability
		CLIAppendLangTerm(langKey, langPhrase);
		break;
	case 'remove':
		CLIRemoveLangTerm(langKey, langPhrase);
		break;
	default:
		throw 'invalid command';
}
