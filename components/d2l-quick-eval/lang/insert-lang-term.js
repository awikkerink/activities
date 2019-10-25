/* eslint-env node, es6 */

'use strict';

var fs = require('fs');
var path = require('path');

const LANG_PATH = path.resolve("components/d2l-quick-eval/lang");


const traverseJSONDir = (pathName, cb) => {
	fs.readdirSync(pathName)
		.filter((x)=>path.extname(x)==".json")
		.map(x=> path.resolve(pathName, x))
		.forEach(cb);
}

function appendLangTerm(langKey, langPhrase){
	traverseJSONDir(LANG_PATH, addJsonLangTerm.bind(null, langKey, langPhrase));
}

function removeLangTerm(langKey){
	traverseJSONDir(LANG_PATH, removeJsonLangTerm.bind(null, langKey));
}

function addJsonLangTerm(langKey, langPhrase, filePath) {
	const parsedJSON = JSON.parse(fs.readFileSync(filePath));
	parsedJSON[langKey] = langPhrase;
	fs.writeFileSync(filePath, JSON.stringify(parsedJSON, null, 3).replace(/": "/g, '" : "')+"\n");
}

function removeJsonLangTerm(langKey, filePath) {
	const parsedJSON = JSON.parse(fs.readFileSync(filePath));
	delete parsedJSON[langKey]
	fs.writeFileSync(filePath, JSON.stringify(parsedJSON, null, 3).replace(/": "/g, '" : "')+"\n");
}

const params = process.argv.slice(2);
if (params.length < 2){
	throw "add the lang term that you want to add/modify and the content of the lang term"
}

const [command, langKey, langPhrase] = params;

switch (command) {
	case "add":
		appendLangTerm(langKey, langPhrase);
		break;
	case "remove":
		removeLangTerm(langKey, langPhrase);
		break;
	case "change": // add and change do the same thing, but easier in terms of usability
		appendLangTerm(langKey, langPhrase);
		break;
	default:
		throw "invalid command"
}
