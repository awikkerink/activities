const puppeteer = require('puppeteer');
const VisualDiff = require('@brightspace-ui/visual-diff');

describe('d2l-quick-eval-action-dismiss-dialog', function() {

	const visualDiff = new VisualDiff('action-dismiss-dialog', __dirname);

	let browser, page;

	before(async() => {
		browser = await puppeteer.launch();
		page = await browser.newPage();
		await page.setViewport({width: 900, height: 800, deviceScaleFactor: 2});
		await page.goto(`${visualDiff.getBaseUrl()}/test/d2l-quick-eval/perceptual/d2l-quick-eval-action-dismiss-dialog.visual-diff.html`, {waitUntil: ['networkidle0', 'load']});
		await page.bringToFront();
	});

	after(() => browser.close());

	function open() {
		return page.evaluate(async() => {
			const dialog = document.querySelector('#default d2l-quick-eval-action-dismiss-dialog');
			const d2lDialog = dialog.shadowRoot.querySelector('d2l-dialog');
			dialog.open();
			// This seems to allow us to delay until after the animations finish.
			await d2lDialog.updateComplete;
		});
	}

	it('default', async function() {
		await open();
		const rect = await visualDiff.getRect(page, '#default');
		await visualDiff.screenshotAndCompare(page, this.test.fullTitle(), { clip: rect });
	});

	it('forever', async function() {
		await open();
		await page.evaluate(() => {
			const dialog = document.querySelector('#default d2l-quick-eval-action-dismiss-dialog');
			const forever = dialog.shadowRoot.querySelectorAll('input')[1];
			forever.click();
		});
		const rect = await visualDiff.getRect(page, '#default');
		await visualDiff.screenshotAndCompare(page, this.test.fullTitle(), { clip: rect });
	});

	it('specific-date', async function() {
		await open();
		await page.evaluate(() => {
			const dialog = document.querySelector('#default d2l-quick-eval-action-dismiss-dialog');
			const specDate = dialog.shadowRoot.querySelectorAll('input')[0];
			specDate.click();
		});
		const rect = await visualDiff.getRect(page, '#default');
		await visualDiff.screenshotAndCompare(page, this.test.fullTitle(), { clip: rect });
	});
});
