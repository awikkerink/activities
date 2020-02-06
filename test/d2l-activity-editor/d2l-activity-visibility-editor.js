import '../../components/d2l-activity-editor/d2l-activity-visibility-editor.js';
import { elementUpdated, expect, fixture, html } from '@open-wc/testing';
import { ActivityUsage } from '../../components/d2l-activity-editor/state/activity-usage.js';
import { shared as store } from '../../components/d2l-activity-editor/state/activity-store.js';

describe('d2l-activity-visibility-editor', function() {

	let el, href, activity;

	beforeEach(async() => {
		href = 'http://activity/1';
		activity = new ActivityUsage(href, 'token');
		activity.setDraftStatus(true);
		activity.setCanEditDraft(true);
		store.put(href, activity);

		el = await fixture(html`
			<d2l-activity-visibility-editor href=${href} token="token"></d2l-activity-visibility-editor>
		`);
	});

	afterEach(() => {
		store.clear();
	});

	describe('enabled', () => {
		it('passes accessibility test', async() => {
			await expect(el).to.be.accessible();
		});

		it('renders switch when enabled', async() => {
			expect(el.shadowRoot.querySelectorAll('d2l-switch')).to.exist;
		});
	});

	describe('disabled', () => {
		beforeEach(async() => {
			activity.setCanEditDraft(false);
			await elementUpdated(el);
		});

		it('passes accessibility test', async() => {
			await expect(el).to.be.accessible();
		});

		it('hides switch', async() => {
			expect(el.shadowRoot.querySelectorAll('d2l-switch')).to.not.exist;
		});

		it('shows label', async() => {
			expect(el.shadowRoot.querySelectorAll('div.d2l-label-text')).to.exist;
		});
	});
});
