import 'd2l-datetime-picker/d2l-datetime-picker';
import 'd2l-tooltip/d2l-tooltip';
import { css, html } from 'lit-element/lit-element';
import { ActivityEditorMixin } from './mixins/d2l-activity-editor-mixin.js';
import { getLocalizeResources } from './localization';
import { LocalizeMixin } from '@brightspace-ui/core/mixins/localize-mixin.js';
import { MobxLitElement } from '@adobe/lit-mobx';
import { shared as store } from './state/activity-store.js';

class ActivityDueDateEditor extends ActivityEditorMixin(LocalizeMixin(MobxLitElement)) {

	static get properties() {
		return {
			_overrides: { type: Object },
			_isFirstLoad: { type: Boolean }
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
		this._isFirstLoad = true;
	}

	_onDatetimePickerDatetimeCleared() {
		store.get(this.href).setDueDate('');
	}

	_onDatetimePickerDatetimeChanged(e) {
		store.get(this.href).setDueDate(e.detail.toISOString());
	}

	dateTemplate(date, canEdit, errorTerm) {
		//TODO: Ugly hacked-in error tooltips can probably be removed when we have date pickers with proper error styling
		return html`
			<div id="datetime-picker-container" ?hidden="${!canEdit}">
				<d2l-datetime-picker
					hide-label
					name="date"
					id="date"
					date-label="${this.localize('dueDate')}"
					time-label="${this.localize('dueTime')}"
					datetime="${date}"
					overrides="${this._overrides}"
					placeholder="${this.localize('noDueDate')}"
					aria-invalid="${errorTerm ? 'true' : 'false'}"
					@d2l-datetime-picker-datetime-changed="${this._onDatetimePickerDatetimeChanged}"
					@d2l-datetime-picker-datetime-cleared="${this._onDatetimePickerDatetimeCleared}">
				</d2l-datetime-picker>
				${errorTerm ? html`
					<d2l-tooltip
						id="score-tooltip"
						for="date"
						position="bottom"
					>
						${errorTerm}
					</d2l-tooltip>
				` : null}
			</div>
		`;
	}

	_getErrorLangterm(errorType) {
		if (!errorType) {
			return null;
		}

		if (errorType.includes('end-due-start-date-error')) {
			return this.localize('dueBetweenStartEndDate');
		}

		if (errorType.includes('start-after-end-date-error') || errorType.includes('start-after-due-date-error')) {
			return this.localize('dueAfterStartDate');
		}

		if (errorType.includes('end-before-start-date-error') || errorType.includes('end-before-due-date-error')) {
			return this.localize('dueBeforeEndDate');
		}

		return null;
	}

	render() {
		const activity = store.get(this.href);
		let dueDate, canEditDates, errorTerm;

		// We have to render with null values for dueDate initially due to issues with
		// how the d2l-datetime-picker converts between the date & datetime attributes.
		// If we delay rendering until we have a valid datetime, the d2l-datetime-picker
		// overwrites the datetime attribute with an emptydate.
		// Don't want to mess with the datetime picker...
		// Tried passing an invalid date attribute to force it to use our datetime attribute
		// but the 2-way data binding with the vaadin date picker always overrides it
		// Will be able to fix when we have a new data time component.
		if (!activity || this._isFirstLoad) {
			dueDate = null;
			canEditDates = false;
			errorTerm = null;
		} else {
			dueDate = activity.dueDate;
			canEditDates = activity.canEditDates;
			errorTerm = this._getErrorLangterm(activity.errorType);
		}

		return html`
			${this.dateTemplate(dueDate, canEditDates, errorTerm)}
		`;
	}

	firstUpdated() {
		super.firstUpdated();
		this._isFirstLoad = false;
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
