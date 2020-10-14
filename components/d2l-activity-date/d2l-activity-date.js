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
		this._setEntityType(ActivityUsageEntity);
	}

	set _entity(entity) {
		if (this._entityHasChanged(entity)) {
			this._onActivityUsageChange(entity);
			super._entity = entity;
		}
	}

	_onActivityUsageChange(usage) {
		this._date = this._getActivityDate(usage);
	}

	render() {
		const stringFactory = (date, format, includeTime) => {
			const type = includeTime ? `${date.type}Timed` : date.type;
			return this.localize(
				type,
				'date', formatDate(date.date, { format: format }),
				'time', includeTime && formatTime(date.date));
		};

		return this._date
			? html `${stringFactory(this._date, this.format, this.includeTime)}`
			: nothing;
	}

	_getActivityDate(usage) {
		const date = {};
		date.date = usage
			&& usage.dueDate()
			|| usage.endDate();

		if (!date.date) return;

		date.type = usage.dueDate() ? 'dueDate' : 'endDate';
		date.date = new Date(date.date);
		return date;
	}
}
customElements.define('d2l-activity-date', D2LActivityDate);
