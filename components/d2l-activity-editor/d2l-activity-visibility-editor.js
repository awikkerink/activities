import '@d2l/switch/d2l-switch.js';
import 'd2l-colors/d2l-colors';
import { css, html } from 'lit-element/lit-element';
import { getLocalizeResources } from './localization';
import { LocalizeMixin } from '@brightspace-ui/core/mixins/localize-mixin.js';
import storeName from './state-mobxs/store-name.js';
import { connect } from './mobxs-connect-mixin.js';
import { ActivityEditorMixin } from './d2l-activity-editor-mixin.js';
import { MobxLitElement } from '@adobe/lit-mobx';

const baseUrl = import.meta.url;

class ActivityVisibilityEditor extends connect(ActivityEditorMixin(LocalizeMixin(MobxLitElement))) {

	static storeName = storeName;

	static get properties() {
		return {
			disabled: { type: Boolean },
			_activity: { type: Object }
		};
	}

	static get styles() {
		return css`
			:host {
				display: block;
			}
			:host([hidden]) {
				display: none;
			}
			d2l-switch .d2l-label-text {
				color: var(--d2l-color-ferrite);
				font-weight: normal;
			}
		`;
	}

	static async getLocalizeResources(langs) {
		return getLocalizeResources(langs, baseUrl);
	}

	constructor() {
		super();
		this.disabled = false;
	}

	_updateVisibility() {
		this._activity.setDraftStatus(!this._activity.isDraft);
	}

	updated(changedProperties) {
		super.updated(changedProperties);

		if ((changedProperties.has('href') || changedProperties.has('token')) &&
			this.href && this.token) {
			this._activity = this.store.fetchActivity(this.href, this.token, this.autoSave);
		}
	}

	render() {
		if (!this._activity) {
			return html``;
		}

		const {
			isDraft,
			canEditDraft,
			dueDate
		} = this._activity;

		const switchVisibilityText = (isDraft ? this.localize('hidden') : this.localize('visible'));
		const icon = (isDraft ? 'tier1:visibility-hide' : 'tier1:visibility-show');
		const switchEnabled = canEditDraft && !this.disabled
			? html`
					<d2l-switch
						aria-label="${switchVisibilityText}"
						label-right
						.checked=${!isDraft}
						@click="${this._updateVisibility}">
							<div class="d2l-label-text">
								<d2l-icon icon=${icon}></d2l-icon>
								${switchVisibilityText}-${dueDate}
							</div>
					</d2l-switch>
				`
			: html`
					<div d2l-label-text>
						<d2l-icon icon=${icon}></d2l-icon>
						${switchVisibilityText}-${dueDate}
					</div>
				`;

		return switchEnabled;
	}
}

customElements.define('d2l-activity-visibility-editor', ActivityVisibilityEditor);