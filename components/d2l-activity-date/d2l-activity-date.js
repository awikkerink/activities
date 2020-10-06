import { css, html, LitElement } from 'lit-element/lit-element.js';
import { formatDate, formatTime } from '@brightspace-ui/intl/lib/dateTime.js';
import { ActivityUsageEntity } from 'siren-sdk/src/activities/ActivityUsageEntity';
import { EntityMixinLit } from 'siren-sdk/src/mixin/entity-mixin-lit';
import { LocalizeMixin } from '@brightspace-ui/core/mixins/localize-mixin.js';
import { nothing } from 'lit-html/lit-html';

class D2LActivityDate extends EntityMixinLit(LocalizeMixin(LitElement)) {

	static get properties() {
		return {
			format: { type: String, attribute: 'format' },
			includeTime: { type: Boolean, attribute: 'include-time' },
			_date: { type: Object }
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
				.d2l-activity-date-text {
					display: inline;
					vertical-align: bottom;
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
		this.format = 'MMMM d';
		this.includeTime = false;
		this._dateString = '';
		this._setEntityType(ActivityUsageEntity);
	}

	set _entity(entity) {
		if (this._entityHasChanged(entity)) {
			this._onActivityUsageChange(entity);
			super._entity = entity;
			this.requestUpdate();
		}
	}

	_onActivityUsageChange(usage) {
		this._date = this.getActivityDate(usage);
	}

	render() {
		const str = this.setActivityDateString(this._date, this.format, this.includeTime);

		const activityDateTemplate = str
			? html `<div class="d2l-activity-date-text">${str}</div>`
			: nothing;

		return activityDateTemplate;
	}

	getActivityDate(usage) {
		const date = {};
		const dueDate = usage && usage.dueDate();
		const endDate = usage && usage.endDate();
		date.date = dueDate || endDate;

		if (!date.date) {
			return;
		}

		date.date === endDate ? date.type = 'endDate' : date.type = 'dueDate';
		date.date = new Date(date.date);
		return date;
	}

	setActivityDateString(date, format, includeTime) {
		if (!date) return;

		let dateString;
		if (includeTime) {
			date.type = [date.type, 'Timed'].join('');
			dateString = this.localize(
				date.type,
				'date', formatDate(date.date, { format: format }),
				'time', formatTime(date.date)
			);
		} else {
			dateString = this.localize(
				date.type,
				'date', formatDate(date.date, { format: format }),
			);
		}

		const eventDetails = {
			bubbles: true,
			composed: false,
			detail: {
				date: dateString.length > 0 && dateString
			}
		};
		this.dispatchEvent(new CustomEvent('d2l-activity-date-changed', eventDetails));

		return dateString;
	}
}
customElements.define('d2l-activity-date', D2LActivityDate);
