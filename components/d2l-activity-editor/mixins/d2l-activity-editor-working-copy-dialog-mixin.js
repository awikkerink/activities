import { ActivityEditorDialogMixin } from './d2l-activity-editor-dialog-mixin';
import { ActivityEditorMixin } from '../mixins/d2l-activity-editor-mixin';
import { ActivityEditorWorkingCopyMixin } from '../mixins/d2l-activity-editor-working-copy-mixin';
import { AsyncContainerMixin } from '@brightspace-ui/core/mixins/async-container/async-container-mixin.js';

export const ActivityEditorWorkingCopyDialogMixin = superclass => class extends ActivityEditorMixin(ActivityEditorDialogMixin(AsyncContainerMixin(ActivityEditorWorkingCopyMixin(superclass)))) {

	static get properties() {
		return {
			dialogHref: { type: String }
		};
	}

	constructor(store) {
		super(store);
		this.checkoutOnLoad = true;
		this.dialogHref = '';
	}

	async checkinDialog(e) {
		const result = await this.checkin(this.store, this.dialogHref);
		if (result) {
			this.closeDialog(e);
		}
	}

	async closeDialog(e) {
		this.handleClose(e);
	}

	async openDialog(e) {
		const dialog = this.shadowRoot.querySelector('d2l-dialog');
		dialog && dialog.resetAsyncState();
		this.dialogHref = '';
		this.resetWorkingCopyProps();

		this.open(e);

		const dialogHref = await this.checkout(this.store, this.checkedOutHref);
		if (!dialogHref) return;
		this.dialogHref = dialogHref;
	}
};
