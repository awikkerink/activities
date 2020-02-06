import '@d2l/switch/d2l-switch.js';
import 'd2l-colors/d2l-colors';
import { css, html } from 'lit-element/lit-element';
import { ActivityEditorMixin } from './mixins/d2l-activity-editor-mixin.js';
import { getLocalizeResources } from './localization';
import { LocalizeMixin } from '@brightspace-ui/core/mixins/localize-mixin.js';
import { MobxLitElement } from '@adobe/lit-mobx';
import { shared as store } from './state/activity-store.js';

const baseUrl = import.meta.url;
class ActivityVisibilityEditor extends (ActivityEditorMixin(LocalizeMixin(MobxLitElement))) {

	static get properties() {
		return {
			disabled: { type: Boolean },
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
		const activity = store.get(this.href);
		if (activity) {
			activity.setDraftStatus(!activity.isDraft);
		}
	}

	render() {

		const activity = store.get(this.href);
		if (!activity) {
			return html``;
		}

		const {
			isDraft,
			canEditDraft
		} = activity;

		const switchVisibilityText = (isDraft ? this.localize('hidden') : this.localize('visible'));
		const switchVisibilityTextAria = (isDraft ? this.localize('ariaHidden') : this.localize('ariaVisible'));
		const icon = (this.isDraft ? 'tier1:visibility-hide' : 'tier1:visibility-show');
		const switchEnabled = canEditDraft && !this.disabled
			? html`
				<d2l-switch
					aria-label="${switchVisibilityTextAria}"
					label-right
					.checked=${!isDraft}
					@click="${this._updateVisibility}">
						<div class="d2l-label-text">
							<d2l-icon icon=${icon}></d2l-icon>
							${switchVisibilityText}
						</div>
				</d2l-switch>
			`
			: html`
				<div class="d2l-label-text">
					<d2l-icon icon=${icon}></d2l-icon>
					${switchVisibilityText}
				</div>
			`;

		return switchEnabled;
	}

	updated(changedProperties) {
		super.updated(changedProperties);

		if ((changedProperties.has('href') || changedProperties.has('token')) &&
			this.href && this.token) {
			super._fetch(() => store.fetch(this.href, this.token));
		}
	}
}
customElements.define('d2l-activity-visibility-editor', ActivityVisibilityEditor);
