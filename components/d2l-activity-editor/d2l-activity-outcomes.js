import 'd2l-activity-alignments/d2l-select-outcomes.js';
import '@brightspace-ui/core/components/button/button.js';
import '@brightspace-ui/core/components/dialog/dialog.js';
import { html } from 'lit-element/lit-element';
import { ActivityEditorMixin } from './mixins/d2l-activity-editor-mixin.js';
import { getLocalizeResources } from './localization';
import { labelStyles } from '@brightspace-ui/core/components/typography/styles.js';
import { LocalizeMixin } from '@brightspace-ui/core/mixins/localize-mixin.js';
import { MobxLitElement } from '@adobe/lit-mobx';
import { RtlMixin } from '@brightspace-ui/core/mixins/rtl-mixin.js';
import { shared as store } from './state/activity-store.js';

class ActivityOutcomes extends ActivityEditorMixin(LocalizeMixin(RtlMixin(MobxLitElement))) {

	static get properties() {
		return {
			_opened: { type: Boolean },
			_outcomesTerm: { type: String }
		};
	}

	static get styles() {
		return [labelStyles];
	}

	static async getLocalizeResources(langs) {
		return getLocalizeResources(langs, import.meta.url);
	}

	constructor() {
		super(store);

		this.addEventListener('d2l-alignment-list-added', this._onDialogAdd);
		this.addEventListener('d2l-activity-alignment-outcomes-updated', this._onOutcomeTagDeleted);
		this.addEventListener('d2l-alignment-list-cancelled', this._onDialogCancel);
	}

	_onDialogAdd() {
		this._opened = false;
	}

	_onDialogCancel() {
		this._opened = false;
	}

	_onOutcomeTagDeleted() {
		// react to a tag being deleted
	}

	async _open() {
		this._opened = true;
	}

	_renderDialogOpener(outcomesTerm) {
		return html`<d2l-button-subtle
			text="${outcomesTerm}"
			@click="${this._open}"
			h-align="text">
		</d2l-button-subtle>`;
	}

	_renderTags(outcomesTerm) {
		return html`<label class="d2l-label-text">${outcomesTerm}</label>
			<d2l-activity-alignment-tags
				href="${this.href}"
				.token="${this.token}">
			</d2l-activity-alignment-tags>`;
	}

	_getOutcomesTerm() {
		if (!this._outcomesTerm) {
			const event = new CustomEvent('d2l-request-provider', {
				detail: { key: 'd2l-provider-outcomes-term' },
				bubbles: true,
				composed: true,
				cancelable: true
			});
			this.dispatchEvent(event);

			this._outcomesTerm = event.detail.provider;
		}

		return this._outcomesTerm;
	}

	render() {
		const activity = store.get(this.href);
		if (!activity) {
			return html``;
		}

		const {
			canUpdateAlignments,
			hasAlignments
		} = activity;

		if (!canUpdateAlignments) {
			return html``;
		}

		const outcomesTerm = this._getOutcomesTerm();

		return html`
			${hasAlignments ? this._renderTags(outcomesTerm) : this._renderDialogOpener(outcomesTerm)}
			<d2l-dialog ?opened="${this._opened}">
				<d2l-select-outcomes
					href="${this.href}"
					.token="${this.token}">
				</d2l-select-outcomes>
			</d2l-dialog>
		`;
	}
}
customElements.define('d2l-activity-outcomes', ActivityOutcomes);
