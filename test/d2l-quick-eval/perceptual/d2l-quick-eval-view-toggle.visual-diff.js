const puppeteer = require('puppeteer');
const VisualDiff = require('@brightspace-ui/visual-diff');

describe('d2l-quick-eval-view-toggle', function() {

	const visualDiff = new VisualDiff('view-toggle', __dirname);

	let browser, page;

	before(async() => {
		browser = await puppeteer.launch();
		page = await browser.newPage();
		await page.setViewport({width: 900, height: 800, deviceScaleFactor: 2});
		await page.goto(`${visualDiff.getBaseUrl()}/test/d2l-quick-eval/perceptual/d2l-quick-eval-view-toggle.visual-diff.html`, {waitUntil: ['networkidle0', 'load']});
		await page.bringToFront();
	});

	after(() => browser.close());

	async function ss(test) {
		const rect = await visualDiff.getRect(page, '#default');
		await visualDiff.screenshotAndCompare(page, test.test.fullTitle(), { clip: rect });
	}

	function buttonSelector(selected) {
		if (selected) {
			return 'button[selected]';
		}
		return 'button:not([selected])';
	}

	it('default', async function() {
		await ss(this);
	});

	['hover', 'focus'].forEach((state) => {
		[true, false].forEach((selected) => {
			it(`${selected ? '' : 'in'}active-${state}`, async function() {
				await helpers[state](page, buttonSelector(selected));
				await ss(this);
				await helpers.reset(page);
			});
		});
	});

	it('change-selection', async function() {
		await page.evaluate(function() {
			const toggle = document.querySelector('#default d2l-quick-eval-view-toggle');
			toggle.shadowRoot.querySelector('button:not([selected])').click();
		});
		await ss(this);
	});

	const helpers = {
		hover: async function(page, selector) {
			const pos = await page.evaluate((selector) => {
				const toggle = document.querySelector('#default d2l-quick-eval-view-toggle');
				const button = toggle.shadowRoot.querySelector(selector);
				const {top, left} = button.getBoundingClientRect();
				return {top, left};
			}, selector);
			await page.mouse.move(pos.left + 5, pos.top + 5);
		},
		focus: async function(page, selector) {
			await page.evaluate((selector) => {
				const toggle = document.querySelector('#default d2l-quick-eval-view-toggle');
				toggle.shadowRoot.querySelector(selector).focus();
			}, selector);
		},
		reset: async function(page) {
			await page.evaluate(() => {
				document.activeElement.blur();
			});
			await page.mouse.move(0, 0);
		}
	};
});
