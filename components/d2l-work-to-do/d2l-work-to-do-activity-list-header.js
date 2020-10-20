import '@brightspace-ui/core/components/colors/colors';
import '@brightspace-ui/core/components/status-indicator/status-indicator';

import { bodySmallStyles, heading4Styles } from '@brightspace-ui/core/components/typography/styles';
import { css, html, LitElement } from 'lit-element/lit-element';
import { LocalizeMixin } from '@brightspace-ui/core/mixins/localize-mixin';
import { Constants, Config } from './env';
import { formatDate } from '@brightspace-ui/intl/lib/dateTime.js';

/**
 * Provides Title and Count for associated activity usage list
 */
class ActivityListHeader extends LocalizeMixin(LitElement) {

	static get properties() {
		return {
			/** Total count for activity usage entities that match the subcategory header range. */
			count: { type: Number, attribute: 'count' },
			/** Represents if corresponding entities are overdue or upcoming */
			isOverdue: { type: Boolean, attribute: 'overdue' },
		};
	}

	static get styles() {
		return [
			bodySmallStyles,
			heading4Styles,
			css`
				:host {
					border-bottom: 1px solid var(--d2l-color-mica);
					display: flex;
					justify-content: space-between;
					padding-bottom: 0.3rem;

				}
				:host([hidden]) {
					display: none;
				}
				#status {
					background-color: var(--d2l-color-carnelian-minus-1);
					border: 1px solid var(--d2l-color-carnelian-minus-1);
					border-radius: 0.6rem;
					color: white;
					display: inline-block;
					font-size: 0.6rem;
					font-weight: bold;
					height: fit-content;
					line-height: 1;
					margin: auto 0;
					padding: 2px 4px 2px 4px;
					vertical-align: middle;
				}
				.d2l-heading-4 {
					margin: auto 0;
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
		this.count = 0;
		this.isOverdue = false;
	}

	render() {
		const headerTextTemplate = html`
			<div
				id="d2l-work-to-do-list-header-text"
				class="d2l-heading-4">
					${this._headerText}
			</div>`;

		return html`
				${headerTextTemplate}
				<div id="status" class="d2l-body-small">
					${this._statusString}
				</div>
		`;
	}

	get _statusString() {
		return this.count > Constants.MaxActivityCount
			? `${Constants.MaxActivityCount}+`
			: `${this.count}`;
	}

	get _headerText() {
		if (this.isOverdue) {
			return this.localize('overdue');
		}

		const now = new Date();
		const endDate = new Date(now.getFullYear(), now.getMonth(), now.getDate() + Config.FUTURE_DAY_LIMIT, 23, 59, 59, 999);
		const startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0, 0);

		const startDay = formatDate(startDate, { format: 'd' });
		const startMonth = formatDate(startDate, { format: 'MMM' });
		const endDay = formatDate(endDate, { format: 'd' });
		const endMonth = formatDate(endDate, { format: 'MMM' });

		return this.localize(
			'dateHeader',
			'startMonth', startMonth,
			'startDay', startDay,
			'endMonth', endMonth,
			'endDay', endDay
		);
	}
}
customElements.define('d2l-work-to-do-activity-list-header', ActivityListHeader);
