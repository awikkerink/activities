/* eslint-env node, es6 */

'use strict';

var fs = require('fs');
var path = require('path');
const {exec, spawn} = require('child_process');

const LANG_PATH = path.resolve("components/d2l-quick-eval/lang");


const traverseJSONDir = (pathName, cb) => {
	fs.readdirSync(pathName)
		.filter((x)=>path.extname(x)==".json")
		.map(x=> path.resolve(pathName, x))
		.forEach(cb);
}

function sortObject(obj) {
    return Object.keys(obj).sort().reduce(function (result, key) {
        result[key] = obj[key];
        return result;
    }, {});
}

function addJsonLangTerm(langKey, langPhrase, filePath) {
	const parsedJSON = JSON.parse(fs.readFileSync(filePath));
	parsedJSON[langKey] = langPhrase;
	const sortedObject = sortObject(Object.assign({}, parsedJSON));
	fs.writeFileSync(filePath, JSON.stringify(sortedObject, null, 3).replace(/": "/g, '" : "')+"\n");
}

function removeJsonLangTerm(langKey, filePath) {
	const parsedJSON = JSON.parse(fs.readFileSync(filePath));
	delete parsedJSON[langKey]
	fs.writeFileSync(filePath, JSON.stringify(parsedJSON, null, 3).replace(/": "/g, '" : "')+"\n");
}

function CLIAppendLangTerm(langKey, langPhrase){
	if (!langPhrase) throw "add the lang term that you want to add/modify and the content of the lang term"
	traverseJSONDir(LANG_PATH, addJsonLangTerm.bind(null, langKey, langPhrase));
	// CLIExecuteBuild();
}

function CLIRemoveLangTerm(langKey){
	if (!langKey) throw "add the lang term that you want to remove"
	traverseJSONDir(LANG_PATH, removeJsonLangTerm.bind(null, langKey));
}

function CLISyncJsonFiles(){
	const enJsonFile = path.resolve(LANG_PATH, "en.json");
	const jaJsonFile = path.resolve(LANG_PATH, "ja.json");
	const parsedEnJson = JSON.parse(fs.readFileSync(enJsonFile));
	const parsedJaJson = JSON.parse(fs.readFileSync(jaJsonFile));

	// check for new terms
	console.log("checking en.json for new or removed lang terms");
	Object.keys(parsedEnJson).forEach((key)=>{
		if (!parsedJaJson.hasOwnProperty(key)) {
			CLIAppendLangTerm(key, parsedEnJson[key]);
		}
	});

	// check for removed terms
	console.log("checking en.json for new or removed lang terms");
	Object.keys(parsedJaJson).forEach((key)=>{
		if (!parsedEnJson.hasOwnProperty(key)) {
			CLIRemoveLangTerm(key);
		}
	});
}

// function CLIExecuteBuild(){
//  const child = spawn('npm run build');
//
// 	child.on('exit', (code, signal) => {
// 		console.log(`child process exited with code ${code} and signal ${signal}`);
// 	});
// 	child.stdout.on('data', (data) => {
// 		console.log(`child stdout:\n${data}`);
// 	});
// 	child.stderr.on('data', (data) => {
// 		console.error(`child stderr:\n${data}`);
// 	});
// }

console.log("this code runs!");
()=> {
	throw "but this code never runs";

	const params = process.argv.slice(2);
	const [command, langKey, langPhrase] = params;

	var something = false;

	console.log("starting params...", process.argv);
	switch (command) {
		case "sync":
			console.log("syncing...");
			// CLISyncJsonFiles();
			something = true;
			break;
			break;
		case "add":
		case "change": // add and change do the same thing, but easier in terms of usability
			console.log("add or changing...");
			// CLIAppendLangTerm(langKey, langPhrase);
			break;
		case "remove":
			console.log("removing...");
			// CLIRemoveLangTerm(langKey, langPhrase);
			break;
		default:
			if (!something) console.log("how is this running?");
			throw "invalid command";
	}
}
