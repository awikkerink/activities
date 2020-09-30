import '@brightspace-ui/core/components/icons/icon';
import '@brightspace-ui/core/components/colors/colors';
import '@brightspace-ui/core/components/button/button.js';

import { bodyStandardStyles, heading3Styles } from '@brightspace-ui/core/components/typography/styles';
import { css, html, LitElement } from 'lit-element/lit-element.js';
import { LocalizeMixin } from '@brightspace-ui/core/mixins/localize-mixin.js';

const ICON_T3_SEARCH = 'tier3:search';
const ICON_T3_COMPLETE = 'tier3:course-progress-complete';

class EmptyView extends LocalizeMixin(LitElement) {

	static get properties() {
		return {
			discoverActive: { type: Boolean, attribute: 'discover-active' },
			noActivities: { type: Boolean, attribute: 'no-activities', }
		};
	}

	static get styles() {
		return [
			heading3Styles,
			bodyStandardStyles,
			css`
				:host {
					display: inline-block;
				}
				:host([hidden]) {
					display: none;
				}
				:host([dir=rtl]) .d2l-activity-details {
					margin-left: 0;
					margin-right: 0.6rem;
				}
				.d2l-icon-container {
					margin: 24px auto;
					position: relative;
					width: 100px; /* Need to update for actual max-min media query */
				}
				d2l-icon {
					height: 100%;
					width: 100%;
				}
				.d2l-header-text-container,
				.d2l-body-text-container {
					display: block;
					text-align: center;
					width: 15.5rem;
				}
				.d2l-header-text-container {
					margin: 12px auto 6px auto;
				}
				.d2l-body-text-container {
					margin: 0 auto 18px auto;
				}
				.d2l-button-container {
					display: flex;
					justify-content: center;
					width: 100%;
				}
`
		];
	}

	static async getLocalizeResources(langs) {
		for await (const lang of langs) {
			let translations;
			switch (lang) {
				case 'en':
					translations = await import('../locales/en.js');
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

		this.discoverActive = false;
		this.noActivities = false;
	}

	render() {
		// TODO: Nav to discover & learning
		const buttonTemplate = this.noActivities ?
			html `
				<d2l-button ?hidden="${!this.discoverActive}" primary>
					${this.localize('go_to_discover')}
				</d2l-button>`
			: html `
				<d2l-button primary>
					${this.localize('view_all_learning')}
				</d2l-button>
			`;

		return html`
			<div class="container">
				<div class="icon-container">
					<d2l-icon ?hidden="${this.noActivities}" icon="${ICON_T3_COMPLETE}"></d2l-icon>
					<d2l-icon ?hidden="${!this.noActivities}" icon="${ICON_T3_SEARCH}"></d2l-icon>
				</div>
				<p class="d2l-heading-3 header-text-container">
					${this.displayHeader}
				</p>
				<p class="d2l-body-standard body-text-container">
					${this.displayBody}
				</p>
				<div class="button-container">
					${buttonTemplate}
				</div>
			</div>
		`;
	}

	get displayBody() {
		if (!this.noActivities) {
			return this.localize('activities_available');
		} else if (this.discoverActive) {
			return this.localize('no_activities_discover_active');
		} else {
			return this.localize('no_activities_discover_inactive');
		}
	}

	get displayHeader() {
		return this.noActivities ? this.localize('theres_nothing_here') : this.localize('all_done');
	}

}
customElements.define('empty-view', EmptyView);
