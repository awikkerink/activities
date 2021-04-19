import '../../../../components/d2l-activity-editor/d2l-activity-content-editor/html-file/d2l-activity-content-file-detail.js';
import { expect, fixture, html } from '@open-wc/testing';
import { ContentHtmlFile } from '../../../../components/d2l-activity-editor/d2l-activity-content-editor/html-file/state/content-html-file.js';
import { shared as htmlFileStore } from '../../../../components/d2l-activity-editor/d2l-activity-content-editor/html-file/state/content-html-file-store.js';
import { runConstructor } from '@brightspace-ui/core/tools/constructor-test-helper.js';

describe('d2l-activity-content-html-file-detail', function() {

	let href, token, contentItem;

	async function loadComponent() {
		htmlFileStore.put(href, contentItem);
		return await fixture(
			html`
				<d2l-activity-content-html-file-detail
					.href=${href}
					.token="${token}"
				>
				</d2l-activity-content-html-file-detail>
			`
		);
	}

	beforeEach(async() => {
		href = 'http://test-html-file-href.com';
		token = 'token';
		contentItem = new ContentHtmlFile(href, token);
	});

	afterEach(async() => {
		htmlFileStore.clear();
	});

	it('should construct', async() => {
		await loadComponent();
		runConstructor('d2l-activity-content-html-file-detail');
	});

	it('passes accessibility test', async() => {
		const el = await loadComponent();
		await expect(el).to.be.accessible();
	});
});
