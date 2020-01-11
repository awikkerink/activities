/* eslint-env node, es6 */

'use strict';

require('babel-register')({
	presets: ['env'],
});

const del = require('del');
const gulp = require('gulp');
const ejs = require('gulp-ejs');
const rename = require('gulp-rename');
const mergeStream = require('merge-stream');
const requireDir = require('require-dir');

const sergeDirectories = require('./activities.serge.json').filter((sgDir)=> sgDir.name === 'quickEval_EXPERIMENTAL');
const template = './templates/lang-mixin.ejs';
const buildSeries = ['clean'];
const cleanSeries = [];

sergeDirectories.forEach((sergeComponent) => {
	const langFileNames = [];
	let localeResources = requireDir(sergeComponent.source_dir, {
		mapKey: (value, baseName)=> {
			langFileNames.push(baseName);
			return Object.keys(value)[0];
		},
		mapValue: (value)=> {
			return value[Object.keys(value)[0]];
		}});

	localeResources = Object.keys(localeResources).reduce((acc, langFile)=> {
		if (langFile === 'LangEn') {
			acc.LangEn = localeResources.LangEn;
		} else {
			acc[langFile] = Object.keys(localeResources.LangEn).reduce((subAcc, key) => {
				subAcc[key] = localeResources[langFile][key] || localeResources.LangEn[key];
				return subAcc;
			}, {});
		}
		return acc;
	}, {});

	const config = {
		dest: sergeComponent.source_dir,
		localeFiles: Object.keys(localeResources).map((lang, index) => ({
			filename: langFileNames[index],
			data: {
				lang: lang.replace('-', ''),
				name: sergeComponent.name,
				properLang: lang.charAt(0).toUpperCase() + lang.slice(1).replace('-', ''),
				resources: JSON.stringify(localeResources[lang], null, '\t\t\t').replace(/'/g, '\\\'').replace(/"/g, '\'').replace(/\n\}/g, '\n\t\t}'),
				comment: 'This file is auto-generated. Do not modify.'
			}
		}))
	};

	const options = {
		client: true,
		strict: true,
		root: sergeComponent.source_dir,
		localsName: 'data'
	};

	buildSeries.push(() => {
		return mergeStream(config.localeFiles.map(({ filename, data }) =>
			gulp.src(template)
				.pipe(ejs(data, options))
				.pipe(rename({
					basename: filename,
					extname: '.js'
				}))
				.pipe(gulp.dest(options.root)))
		);
	});

	cleanSeries.push(() => del([options.root]));

});

gulp.task('clean', gulp.series(cleanSeries));
gulp.task('build', gulp.series(buildSeries));
