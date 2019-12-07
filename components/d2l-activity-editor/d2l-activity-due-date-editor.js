import 'd2l-datetime-picker/d2l-datetime-picker';
import { css, html, LitElement } from 'lit-element/lit-element';
import { connect } from './connect-mixin.js';
import { ActivityEditorMixin } from './d2l-activity-editor-mixin.js';
import { getLocalizeResources } from './localization';
import { LocalizeMixin } from '@brightspace-ui/core/mixins/localize-mixin.js';
import reducer, { fetchEntity, updateDueDate, selectActivityEntity, selectActivity } from './state/activity-usage.js';

class ActivityDueDateEditor extends connect(ActivityEditorMixin(LocalizeMixin(LitElement))) {

	static get properties() {
		return {
			_date: { type: String },
			_entity: { type: Object },
			_overrides: { type: Object }
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
		`;
	}

	static async getLocalizeResources(langs) {
		return getLocalizeResources(langs, import.meta.url);
	}

	constructor() {
		super();
		this._date = '';
		this._overrides = document.documentElement.dataset.intlOverrides || '{}';
	}

	get _reducers() {
		return reducer;
	}

	_mapStateToProps(state) {
		const activity = selectActivity(state, this.href, this.token);
		return activity ? {
			_date: activity.dueDate,
			_entity: selectActivityEntity(state, this.href, this.token)
		} : {};
	}

	_mapDispatchToProps(dispatch) {
		return {
			_fetchEntity: () => dispatch(fetchEntity(this.href, this.token)),
			_updateDueDate: (date) => dispatch(updateDueDate({href: this.href, token: this.token, date}))
		}
	}

	updated(changedProperties) {
		super.updated(changedProperties);

		if ((changedProperties.has('href') || changedProperties.has('token')) &&
			this.href && this.token) {
			this._fetchEntity();
		}
	}

	_onDatetimePickerDatetimeCleared() {
		this._updateDueDate('');
	}

	_onDatetimePickerDatetimeChanged(e) {
		if (e.detail.isSame(this._date)) {
			return;
		}
		this._updateDueDate(e.detail.toISOString());
	}

	render() {
		if (!this._entity) {
			return html``;
		}

		return html`
			<div id="datetime-picker-container">
				<d2l-datetime-picker
					?disabled="${!this._entity.canEditDueDate()}"
					hide-label
					name="date"
					id="date"
					date-label="${this.localize('dueDate')}"
					time-label="${this.localize('dueTime')}"
					datetime="${this._date}"
					overrides="${this._overrides}"
					placeholder="${this.localize('noDueDate')}"
					@d2l-datetime-picker-datetime-changed="${this._onDatetimePickerDatetimeChanged}"
					@d2l-datetime-picker-datetime-cleared="${this._onDatetimePickerDatetimeCleared}">
				</d2l-datetime-picker>
			</div>
		`;
	}

}
customElements.define('d2l-activity-due-date-editor', ActivityDueDateEditor);
