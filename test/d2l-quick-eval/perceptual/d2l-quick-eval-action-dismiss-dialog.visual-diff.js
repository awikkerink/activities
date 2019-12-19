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

	async function waitForOpen(element) {
		await page.evaluate((element) => {
			return new Promise((resolve) => {
				const el = document.querySelector(element);
				const onEnd = function() {
					el.removeEventListener('d2l-dialog-open', onEnd);
					resolve();
				};
				el.addEventListener('d2l-dialog-open', onEnd);
				el.open();
			});
		}, element);
	}

	async function waitForClose(element) {
		await page.evaluate((element) => {
			return new Promise((resolve) => {
				const el = document.querySelector(element);
				const onEnd = function() {
					el.removeEventListener('d2l-dialog-close', onEnd);
					resolve();
				};
				el.addEventListener('d2l-dialog-close', onEnd);
				el.shadowRoot.querySelector('d2l-dialog')._close();
			});
		}, element);
	}

	it('default', async function() {
		await waitForOpen('#default d2l-quick-eval-action-dismiss-dialog');
		const rect = await visualDiff.getRect(page, '#default');
		await visualDiff.screenshotAndCompare(page, this.test.fullTitle(), { clip: rect });
		await waitForClose('#default d2l-quick-eval-action-dismiss-dialog');
	});

	it('forever', async function() {
		await waitForOpen('#default d2l-quick-eval-action-dismiss-dialog');
		await page.evaluate(() => {
			const dialog = document.querySelector('#default d2l-quick-eval-action-dismiss-dialog');
			const forever = dialog.shadowRoot.querySelectorAll('input')[1];
			forever.click();
		});
		const rect = await visualDiff.getRect(page, '#default');
		await visualDiff.screenshotAndCompare(page, this.test.fullTitle(), { clip: rect });
		await waitForClose('#default d2l-quick-eval-action-dismiss-dialog');
	});

	it('specific-date', async function() {
		await waitForOpen('#default d2l-quick-eval-action-dismiss-dialog');
		await page.evaluate(() => {
			const dialog = document.querySelector('#default d2l-quick-eval-action-dismiss-dialog');
			const specDate = dialog.shadowRoot.querySelectorAll('input')[0];
			specDate.click();
		});
		const rect = await visualDiff.getRect(page, '#default');
		await visualDiff.screenshotAndCompare(page, this.test.fullTitle(), { clip: rect });
		await waitForClose('#default d2l-quick-eval-action-dismiss-dialog');
	});
});
