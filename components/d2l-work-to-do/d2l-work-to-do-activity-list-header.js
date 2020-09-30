import '@brightspace-ui/core/components/colors/colors';
import '@brightspace-ui/core/components/status-indicator/status-indicator';

import { bodySmallStyles, heading4Styles } from '@brightspace-ui/core/components/typography/styles';
import { css, html, LitElement } from 'lit-element/lit-element';
import { LocalizeMixin } from '@brightspace-ui/core/mixins/localize-mixin';
import { constants } from './env/index';

/**
 * Provides Title and Count for associated activity usage list
 */
class ActivityListHeader extends LocalizeMixin(LitElement) {

	static get properties() {
		return {
			count: { type: Number, attribute: 'count', reflected: true },
			// TODO: Date validation - End must be after start
			endDate: { type: String, attribute: 'end-date' },
			startDate: { type: String, attribute: 'start-date' },
		};
	}

	static get styles() {
		return [
			bodySmallStyles,
			heading4Styles,
			css`
				:host {
					display: block;
				}
				:host([hidden]) {
					display: none;
				}
				#header-container {
					align-items: center;
					border-bottom: 1px solid transparent;
					border-bottom: 1px solid var(--d2l-color-mica);
					display: flex;
					justify-content: space-between;
					margin: 0, 12px, 0, 12px;
					padding-bottom: 6px;
					width: 100%;
				}
				#status {
					background-color: var(--d2l-color-carnelian-minus-1);
					border-color: var(--d2l-color-carnelian-minus-1);
					border-radius: 0.6rem;
					border-style: solid;
					border-width: 1px;
					color: white;
					cursor: default;
					display: inline-block;
					font-size: 0.6rem;
					font-weight: bold;
					line-height: 1;
					margin: 0;
					overflow: hidden;
					padding: 2px 4px 2px 4px;
					text-overflow: ellipsis;
					text-transform: uppercase;
					vertical-align: middle;
					white-space: nowrap;
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
		/** Total count for activity usage entities that match the subcategory header range. */
		this.count = 0;
		/** End date of range for activity usage entities shown in subcategory below header */
		this.endDate = '';
		/** Start date of range for activity usage entities shown in subcategory below header */
		this.startDate = '';
	}

	firstUpdated(changedProperties) {
		super.firstUpdated(changedProperties);
	}

	render() {
		return html`
			<div id="header-container">
				<p
					id="isOverdue"
					class="d2l-heading-4"
					?hidden="${!this._isOverdue}">
					${this.localize('overdue')}
				</p>
				<p
					id="dates"
					class="d2l-heading-4"
					?hidden="${this._isOverdue}">
					${this.startDate} - ${this.endDate}
				</p>
				<p id="status" class="d2l-body-small">
					${this._statusString}
				</p>
			</div>
		`;
	}

	get _isOverdue() {
		return !this.startDate && !this.endDate;
	}

	get _statusString() {
		if (this.count > constants.MaxActivityCount) {
			return [constants.MaxActivityCount, '+'].join('');
		}
		return String(this.count);
	}
}
customElements.define('d2l-work-to-do-activity-list-header', ActivityListHeader);
