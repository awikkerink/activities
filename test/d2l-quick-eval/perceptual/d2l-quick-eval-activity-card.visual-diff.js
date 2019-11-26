const puppeteer = require('puppeteer');
const VisualDiff = require('@brightspace-ui/visual-diff');

describe('d2l-quick-eval-activity-card', function() {

	const visualDiff = new VisualDiff('activity-card', __dirname);

	let browser, page;

	before(async() => {
		browser = await puppeteer.launch();
		page = await browser.newPage();
		await page.setViewport({width: 900, height: 800, deviceScaleFactor: 2});
		await page.goto(`${visualDiff.getBaseUrl()}/test/d2l-quick-eval/perceptual/d2l-quick-eval-activity-card.visual-diff.html`, {waitUntil: ['networkidle0', 'load']});
		await page.bringToFront();
	});

	after(() => browser.close());

	[
		'quiz',
		'assignment',
		'discussion',
		'no-completed',
		'rtl',
		'indicator-pressed',
		'publish-all-disabled',
	].forEach((name) => {
		it(name, async function() {
			const rect = await visualDiff.getRect(page, `#${name}`); 
			await visualDiff.screenshotAndCompare(page, this.test.fullTitle(), { clip: rect });
		});
	});

	it('hovered', async function() {
		page.hover('#hovered');
		await page.waitFor(2000);
		const rect = await visualDiff.getRect(page, '#hovered');
		await visualDiff.screenshotAndCompare(page, this.test.fullTitle(), { clip: rect });
	});

	it('tablet-viewport', async function() {
		await page.setViewport({width: 899, height: 800, deviceScaleFactor: 2});
		const rect = await visualDiff.getRect(page, '#tablet-viewport');
		await visualDiff.screenshotAndCompare(page, this.test.fullTitle(), { clip: rect });
	});

	it('mobile-viewport', async function() {
		await page.setViewport({width: 524, height: 800, deviceScaleFactor: 2});
		const rect = await visualDiff.getRect(page, '#mobile-viewport');
		await visualDiff.screenshotAndCompare(page, this.test.fullTitle(), { clip: rect });
	});

});
