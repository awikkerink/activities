import { ActivityEditorDialogMixin } from './d2l-activity-editor-dialog-mixin';
import { ActivityEditorMixin } from '../mixins/d2l-activity-editor-mixin';
import { findComposedAncestor } from '@brightspace-ui/core/helpers/dom.js';
import { getFirstFocusableDescendant } from '@brightspace-ui/core/helpers/focus.js';

export const ActivityEditorWorkingCopyDialogMixin = superclass => class extends ActivityEditorMixin(ActivityEditorDialogMixin(superclass)) {

	static get properties() {
		return {
			dialogHref: { type: String }
		};
	}

	constructor(store) {
		super();
		this.checkoutOnLoad = true;
		this.dialogHref = '';
		this.store = store;
	}

	async checkinDialog(e, skipValidatingInputs) {
		const entity = this.store.get(this.dialogHref);
		if (!entity) return;

		if (!skipValidatingInputs) {
			const isValid = await this._verifyAllInputsValid();
			if (!isValid) {
				return;
			}
		}

		entity.checkin(this.store);
		this.closeDialog(e);
	}

	async closeDialog(e) {
		this.dialogHref = '';
		this.handleClose(e);
	}

	async openDialog(e) {
		const entity = this.store.get(this.checkedOutHref);
		if (!entity) return;

		this.dialogHref = await entity.checkout(this.store, true);

		this.open(e);
	}

	async save() {
		const entity = this.store.get(this.checkedOutHref);
		if (!entity) return;

		await entity.checkin(this.store);
	}

	async _focusOnInvalid() {
		const isAriaInvalid = node => node.getAttribute('aria-invalid') === 'true' && node.getClientRects().length > 0 && !this._hasSkipAlertAncestor(node);
		await this.updateComplete;
		const el = getFirstFocusableDescendant(this, true, isAriaInvalid);
		if (el) {
			el.focus();
			return true;
		}
		return false;
	}

	_hasSkipAlertAncestor(node) {
		return null !== findComposedAncestor(node, elm => elm && elm.hasAttribute && elm.hasAttribute('skip-alert'));
	}

	async _verifyAllInputsValid() {
		const isInvalid = await this._focusOnInvalid();
		if (isInvalid) {
			return false;
		}

		return true;
	}
};
