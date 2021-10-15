import { findComposedAncestor } from '@brightspace-ui/core/helpers/dom.js';
import { getFirstFocusableDescendant } from '@brightspace-ui/core/helpers/focus.js';

export const ActivityEditorWorkingCopyMixin = superclass => class extends superclass {

	static get properties() {
		return {
			/**
			 * Error term to display (either serverErrorTerm or validationErrorTerm)
			 */
			errorTerm: { type: String },
			/**
			 * If there is an error on the page (client and/or server side).
			 */
			isError: { type: Boolean },
			/**
			 * If there is a save attempt in progress. After being enabled, it will only disable on validation or save error.
			 */
			isSaving: { type: Boolean },
			/**
			 * Error term to display on server save error.
			 */
			serverErrorTerm: { type: String },
			/**
			 * Error term to display on input validation error.
			 */
			validationErrorTerm: { type: String }
		};
	}

	constructor(store) {
		super(store);
		this.errorTerm = '';
		this.isError = false;
		this.isSaving = false;
	}

	async checkin(store, href) {
		const entity = store.get(href);
		if (!entity) return;

		this.isSaving = true;
		this.isError = false;

		const inputsValid = await this._verifyAllInputsValid();
		if (!inputsValid) {
			this.isError = true;
			this.isSaving = false;
			this.errorTerm = this.validationErrorTerm;
			return;
		}

		// Refetch entity in case presence of the check in action has changed
		await entity.fetch(true);

		try {
			await entity.checkin(store);
		} catch (e) {
			this.isError = true;
			this.errorTerm = this.serverErrorTerm;
			this.isSaving = false;
			return;
		}

		return true;
	}

	checkout(store, href) {
		const entity = store.get(href);
		if (!entity) return;
		return entity.checkout(store, true);
	}

	resetWorkingCopyProps() {
		this.errorTerm = '';
		this.isError = false;
		this.isSaving = false;
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
