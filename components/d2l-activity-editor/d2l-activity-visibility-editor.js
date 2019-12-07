import '@d2l/switch/d2l-switch.js';
import 'd2l-colors/d2l-colors';
import { css, html, LitElement } from 'lit-element/lit-element';
import { getLocalizeResources } from './localization';
import { LocalizeMixin } from '@brightspace-ui/core/mixins/localize-mixin.js';
import reducer, { fetchEntity, updateVisibility, selectActivityEntity, selectActivity } from './state/activity-usage.js';
import { connect } from './connect-mixin.js';
import { ActivityEditorMixin } from './d2l-activity-editor-mixin.js';

const baseUrl = import.meta.url;

class ActivityVisibilityEditor extends connect(ActivityEditorMixin(LocalizeMixin(LitElement))) {

	static get properties() {
		return {
			_isDraft: { type: Boolean },
			_entity: { type: Object }
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
		this._isDraft = false;
	}

	get _reducers() {
		return reducer;
	}

	_mapStateToProps(state) {
		const activity = selectActivity(state, this.href, this.token);
		return activity ? {
			_isDraft: activity.isDraft,
			_entity: selectActivityEntity(state, this.href, this.token)
		} : {};
	}

	_mapDispatchToProps(dispatch) {
		return {
			_fetchEntity: () => dispatch(fetchEntity(this.href, this.token)),
			_updateVisibility: () => dispatch(updateVisibility({href: this.href, token: this.token, isDraft: !this._isDraft}))
		}
	}

	updated(changedProperties) {
		super.updated(changedProperties);

		if ((changedProperties.has('href') || changedProperties.has('token')) &&
			this.href && this.token) {
			this._fetchEntity(this.href, this.token);
		}
	}

	render() {
		if (!this._entity) {
			return html``;
		}

		const switchVisibilityText = (this._isDraft ? this.localize('hidden') : this.localize('visible'));
		const icon = (this._isDraft ? 'tier1:visibility-hide' : 'tier1:visibility-show');

		return html`
			<div ?hidden=${!this._entity.canEditDraft()}>
				<d2l-switch
					aria-label="${switchVisibilityText}"
					label-right
					.checked=${!this._isDraft}
					@click="${this._updateVisibility}">
						<div class="d2l-label-text">
							<d2l-icon icon=${icon}></d2l-icon>
							${switchVisibilityText}
						</div>
				</d2l-switch>
			</div>
			<div d2l-label-text ?hidden=${this._entity.canEditDraft()}>
				<d2l-icon icon=${icon}></d2l-icon>
				${switchVisibilityText}
			</div>
		`;
	}

}
customElements.define('d2l-activity-visibility-editor', ActivityVisibilityEditor);
