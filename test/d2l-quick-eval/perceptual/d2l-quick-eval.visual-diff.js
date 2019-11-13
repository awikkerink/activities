const puppeteer = require('puppeteer');
const VisualDiff = require('@brightspace-ui/visual-diff');

describe('d2l-quick-eval', function() {

	const visualDiff = new VisualDiff('quick-eval', __dirname);

	let browser, page;

	before(async() => {
		browser = await puppeteer.launch();
		page = await browser.newPage();
		await page.setViewport({width: 800, height: 800, deviceScaleFactor: 2});
		await page.goto(`${visualDiff.getBaseUrl()}/test/d2l-quick-eval/perceptual/d2l-quick-eval.visual-diff.html`, {waitUntil: ['networkidle0', 'load']});
		await page.bringToFront();
	});

	after(() => browser.close());

	const LANGUAGES = ['ar', 'de', 'en', 'es', 'fi', 'fr', 'ja', 'ko', 'nl', 'pt', 'sv', 'tr', 'zh-tw', 'zh'];
	[
		'submissions-view',
		'activities-view',
		'rtl',
	].forEach((name) => {
		it(name, async function() {
			const rect = await visualDiff.getRect(page, `#${name}`);
			await visualDiff.screenshotAndCompare(page, this.test.fullTitle(), { clip: rect });
		});
	});

	LANGUAGES.forEach((name, index) => {
		it(name, async function() {
			const htmlHandle = await page.$('html');
			await htmlHandle.evaluate((e,attrName)=>{e.setAttribute("lang", attrName)}, name);
			await htmlHandle.dispose();
			const rect = await visualDiff.getRect(page, `#lang`);
			await visualDiff.screenshotAndCompare(page, this.test.fullTitle(), { clip: rect });
		});
	});

});
