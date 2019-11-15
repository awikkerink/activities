import '@d2l/switch/d2l-switch.js';
import 'd2l-colors/d2l-colors';
import { css, html, LitElement } from 'lit-element/lit-element';
import { ActivityUsageEntity } from 'siren-sdk/src/activities/ActivityUsageEntity';
import { EntityMixinLit } from 'siren-sdk/src/mixin/entity-mixin-lit';
import { getLocalizeResources } from './localization';
import { LocalizeMixin } from '@brightspace-ui/core/mixins/localize-mixin.js';
import { SaveStatusMixin } from './save-status-mixin';

const baseUrl = import.meta.url;
class ActivityVisibilityEditor extends SaveStatusMixin(EntityMixinLit(LocalizeMixin(LitElement))) {

	static get properties() {
		return {
			_isDraft: { type: Boolean },
			_icon: { type: String },
			_overrides: { type: Object },
			_switchVisibilityText: { type: String },
			_canEditDraft: {type: Boolean }
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
		this._setEntityType(ActivityUsageEntity);
		this._isDraft = false;
		this._overrides = document.documentElement.dataset.intlOverrides || '{}';
	}

	set _entity(entity) {
		if (this._entityHasChanged(entity)) {
			this._onActivityUsageChange(entity);
		}

		super._entity = entity;
	}

	_onActivityUsageChange(activityUsage) {
		if (activityUsage) {
			this._isDraft = activityUsage.isDraft();
			this._switchText = (this._isDraft ? this.localize('hidden') : this.localize('visible'));
			this._icon = (this._isDraft ? 'tier1:visibility-hide' : 'tier1:visibility-show');
			this._canEditDraft = activityUsage.canEditDraft();
		}
	}

	_updateVisibility() {
		this.wrapSaveAction(super._entity.setDraftStatus(!this._isDraft));
	}

	render() {
		return html`
			<div ?hidden=${!this._canEditDraft}>
				<d2l-switch
					aria-label="${this._switchText}"
					label-right
					.checked=${!this._isDraft}
					@click="${this._updateVisibility}">
						<div class="d2l-label-text">
							<d2l-icon icon=${this._icon}></d2l-icon>
							${this._switchText}
						</div>
				</d2l-switch>
			</div>
			<div d2l-label-text ?hidden=${this._canEditDraft}>
				<d2l-icon icon=${this._icon}></d2l-icon>
				${this._switchText}
			</div>
		`;
	}

}
customElements.define('d2l-activity-visibility-editor', ActivityVisibilityEditor);
