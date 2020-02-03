import 'd2l-datetime-picker/d2l-datetime-picker';
import { css, html } from 'lit-element/lit-element';
import { ActivityEditorMixin } from './mixins/d2l-activity-editor-mixin.js';
import { getLocalizeResources } from './localization';
import { LocalizeMixin } from '@brightspace-ui/core/mixins/localize-mixin.js';
import { MobxLitElement } from '@adobe/lit-mobx';
import { shared as store } from './state/activity-store.js';

class ActivityDueDateEditor extends ActivityEditorMixin(LocalizeMixin(MobxLitElement)) {

	static get properties() {
		return {
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
		this._overrides = document.documentElement.dataset.intlOverrides || '{}';
	}

	_onDatetimePickerDatetimeCleared() {
		store.get(this.href).setDueDate('');
	}

	_onDatetimePickerDatetimeChanged(e) {
		store.get(this.href).setDueDate(e.detail.toISOString());
	}

	dateTemplate(date) {
		return html`
			<div id="datetime-picker-container">
				<d2l-datetime-picker
					hide-label
					name="date"
					id="date"
					date-label="${this.localize('dueDate')}"
					time-label="${this.localize('dueTime')}"
					datetime="${date}"
					overrides="${this._overrides}"
					placeholder="${this.localize('noDueDate')}"
					@d2l-datetime-picker-datetime-changed="${this._onDatetimePickerDatetimeChanged}"
					@d2l-datetime-picker-datetime-cleared="${this._onDatetimePickerDatetimeCleared}">
				</d2l-datetime-picker>
			</div>
		`;
	}

	render() {
		const activity = store.get(this.href);
		if (!activity) {
			return html``;
		}

		const {
			dueDate,
			canEditDueDate
		} = activity;

		if (!canEditDueDate) {
			// TODO Should we be rendering a date value label if you cannot edit?
			// The current data picker does not support disabled
			// The availability dates have been coded to be hidden when cannot edit
			return html``;
		}

		return html`
			${this.dateTemplate(dueDate)}
		`;
	}

	updated(changedProperties) {
		super.updated(changedProperties);

		if ((changedProperties.has('href') || changedProperties.has('token')) &&
			this.href && this.token) {
			super._fetch(() => store.fetch(this.href, this.token));
		}
	}

}
customElements.define('d2l-activity-due-date-editor', ActivityDueDateEditor);
