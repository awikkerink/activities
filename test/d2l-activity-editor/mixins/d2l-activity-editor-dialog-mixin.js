import { defineCE, expect, fixture } from '@open-wc/testing';
import { ActivityEditorDialogMixin } from '../../../components/d2l-activity-editor/mixins/d2l-activity-editor-dialog-mixin.js';

const editor = defineCE(
	class extends ActivityEditorDialogMixin(HTMLElement) {
	}
);

describe('d2l-activity-editor-dialog-mixin', function() {
	it('handles opening a dialog', async() => {
		const el = await fixture(`<${editor}></${editor}>`);
		el.open();

		expect(el.opened).to.be.true;
	});

	it('handles closing a dialog', async() => {
		const el = await fixture(`<${editor}></${editor}>`);
		el.handleClose();

		expect(el.opened).to.be.false;
	});
});
