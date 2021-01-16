import '../../../components/d2l-activity-editor/d2l-activity-attachments/d2l-activity-attachments-editor.js';
import { elementUpdated, expect, fixture, html } from '@open-wc/testing';
import { AttachmentCollection } from '../../../components/d2l-activity-editor/d2l-activity-attachments/state/attachment-collection.js';
import { shared as store } from '../../../components/d2l-activity-editor/d2l-activity-attachments/state/attachment-collections-store.js';

describe('d2l-activity-attachments-picker', function() {

	let el, href, collection;

	beforeEach(async() => {
		href = 'http://activity/1';
		collection = new AttachmentCollection(href, 'token');
		collection.setCanAddFile(true);
		collection.setCanAddLink(true);
		collection.setCanAddGoogleDriveLink(true);
		collection.setCanAddOneDriveLink(true);
		collection.setCanRecordVideo(true);
		collection.setCanRecordAudio(true);
		store.put(href, collection);

		el = await fixture(html`
			<d2l-activity-attachments-picker skeleton="false" href=${href} token="token"></d2l-activity-attachments-picker>
		`);
	});

	afterEach(() => {
		store.clear();
	});

	describe('all picker buttons enabled', () => {
		it('passes accessibility test', async() => {
			await expect(el).to.be.accessible();
		});
		it('renders buttons', async() => {
			const a = el.shadowRoot.querySelector('d2l-activity-attachments-picker-presentational').shadowRoot;
			expect(el, 'picker').to.not.be.null;
			expect(el.shadowRoot.querySelector('d2l-activity-attachments-picker-presentational'), 'picker-presentational').to.not.be.null;
			expect(el.shadowRoot.querySelector('d2l-activity-attachments-picker-presentational').shadowRoot.querySelector('div.d2l-button-container'), '.d2l-button-container').to.not.be.null;

			if (el.shadowRoot.querySelector('d2l-activity-attachments-picker-presentational').shadowRoot.querySelector('div.d2l-button-container') === null) {
				expect(el.shadowRoot.querySelector('d2l-activity-attachments-picker-presentational').shadowRoot.querySelectorAll('div').length, `there should be > 2 divs + \n ${a}`).to.equal(2);
			}
			expect(el.shadowRoot.querySelector('d2l-activity-attachments-picker-presentational').shadowRoot.querySelector('div.d2l-button-container').querySelectorAll('d2l-button-icon').length, '5 attachements').to.equal(5);
			expect(el.shadowRoot.querySelector('d2l-activity-attachments-picker-presentational').shadowRoot.querySelector('div.d2l-button-container-right').querySelectorAll('d2l-button-subtle').length, 'audio & video btns').to.equal(2);
		});
	});

	describe('file button disabled', () => {
		beforeEach(async() => {
			collection.setCanAddFile(false);
			await elementUpdated(el);
		});

		it('passes accessibility test', async() => {
			await expect(el).to.be.accessible();
		});

		it('hides file button', async() => {
			expect(el, 'picker').to.not.be.null;
			expect(el.shadowRoot.querySelector('d2l-activity-attachments-picker-presentational'), 'picker-presentational').to.not.be.null;
			expect(el.shadowRoot.querySelector('d2l-activity-attachments-picker-presentational').shadowRoot.querySelectorAll('div').length, 'there should be > 2 divs').to.equal(2);
			expect(el.shadowRoot.querySelector('d2l-activity-attachments-picker-presentational').shadowRoot.querySelector('div.d2l-button-container').querySelector('d2l-button-icon#add-file-button')).to.have.attr('hidden');
		});
	});

	describe('events fire when files uploaded', () => {
		it('fires file uploaded events when files uploaded', (done) => {
			const files = [];
			el.addEventListener('d2l-activity-attachments-picker-files-uploaded', (e) => {
				expect(e.detail.files).to.equal(files);
				done();
			});
			D2L.ActivityEditor.FileUploadDialogCallback(files);
		});
	});
});
