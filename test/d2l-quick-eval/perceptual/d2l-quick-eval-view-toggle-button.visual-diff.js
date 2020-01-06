const puppeteer = require('puppeteer');
const VisualDiff = require('@brightspace-ui/visual-diff');

describe('d2l-quick-eval-view-toggle-button', function() {

	const visualDiff = new VisualDiff('view-toggle-button', __dirname);

	let browser, page;

	before(async() => {
		browser = await puppeteer.launch();
		page = await browser.newPage();
		await page.setViewport({width: 900, height: 800, deviceScaleFactor: 2});
		await page.goto(`${visualDiff.getBaseUrl()}/test/d2l-quick-eval/perceptual/d2l-quick-eval-view-toggle-button.visual-diff.html`, {waitUntil: ['networkidle0', 'load']});
		await page.bringToFront();
	});

	after(() => browser.close());

	['basic', 'right', 'left', 'selected'].forEach((name) => {
		describe(name, () => {
			[ 'normal', 'hover', 'focus', 'click' ].forEach((state) => {
				it(state, async function() {
					const selector = `#${name} d2l-quick-eval-view-toggle-button`;
					switch (state) {
						case 'hover':
							await page.hover(selector);
							break;
						case 'focus':
							await page.focus(selector);
							break;
						case 'click':
							await page.click(selector);
							break;
					}
					const rect = await visualDiff.getRect(page, `#${name}`);
					await visualDiff.screenshotAndCompare(page, this.test.fullTitle(), { clip: rect });
				});
			});
		});
	});

});
