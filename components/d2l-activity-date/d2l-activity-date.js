import { css, html, LitElement } from 'lit-element/lit-element.js';
import { formatDate, formatTime } from '@brightspace-ui/intl/lib/dateTime.js';
import { ActivityUsageEntity } from 'siren-sdk/src/activities/ActivityUsageEntity';
import { EntityMixinLit } from 'siren-sdk/src/mixin/entity-mixin-lit';
import { LocalizeMixin } from '@brightspace-ui/core/mixins/localize-mixin.js';
import { nothing } from 'lit-html/lit-html';

class D2LActivityDate extends EntityMixinLit(LocalizeMixin(LitElement)) {

	static get properties() {
		return {
			/** Indicates if component should display pre-string (eg: 'Ends on') or just the date alone */
			dateOnly: { type: Boolean, attribute: 'date-only' },
			/** Indicates format of date to display - based on formatDate function from dateTime lib */
			format: { type: String, attribute: 'format' },
			/** Indicates if component should render time of due/end date */
			includeTime: { type: Boolean, attribute: 'include-time' },
			/** Usage entity associated with the activity for rendering */
			_usage: { type: Object }
		};
	}

	static get styles() {
		return [
			css`
				:host {
					display: inline;
				}
				:host([hidden]) {
					display: none;
				}
			`
		];
	}

	static async getLocalizeResources(langs) {
		for await (const lang of langs) {
			let translations;
			switch (lang) {
				case 'en':
					translations = await import('./lang/en');
					break;
			}

			if (translations && translations.val) {
				return {
					language: lang,
					resources: translations.val
				};
			}
		}

		return null;
	}

	constructor() {
		super();
		this.dateOnly = false;
		this.format = 'MMMM d';
		this.includeTime = false;
		this._setEntityType(ActivityUsageEntity);
	}

	set _entity(entity) {
		if (this._entityHasChanged(entity)) {
			this._usage = entity;
			super._entity = entity;
		}
	}

	render() {
		if (!this._date) {
			return nothing;
		}

		const template = this.dateOnly
			? this.localize(
				`onlyDate${this.includeTime ? 'Timed' : ''}`,
				'date', formatDate(this._date, { format: this.format }),
				'time', this.includeTime && formatTime(this._date)
			)
			: this.localize(
				this._type,
				'date', formatDate(this._date, { format: this.format }),
				'time', this.includeTime && formatTime(this._date)
			);

		return html`${template}`;
	}

	get _date() {
		const dateString = this._usage
			&& this._usage.dueDate()
			|| this._usage.endDate();

		return dateString ? new Date(dateString) : dateString;
	}

	get _type() {
		return this._usage.dueDate()
			? this.includeTime
				? 'dueDateTimed'
				: 'dueDate'
			: this.includeTime
				? 'endDateTimed'
				: 'endDate';
	}
}
customElements.define('d2l-activity-date', D2LActivityDate);
