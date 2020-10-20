import '@brightspace-ui/core/components/icons/icon';
import '@brightspace-ui/core/components/colors/colors';
import '@brightspace-ui/core/components/button/button.js';

import { bodyStandardStyles, heading3Styles } from '@brightspace-ui/core/components/typography/styles';
import { css, html, LitElement } from 'lit-element/lit-element.js';
import { LocalizeMixin } from '@brightspace-ui/core/mixins/localize-mixin.js';
import { nothing } from 'lit-html/lit-html';

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
					display: block;
					margin-left: auto;
					margin-right: auto;
				}
				:host([hidden]) {
					display: none;
				}
				.d2l-icon-container {
					display: flex;
					justify-content: center;
					margin: 1.6rem auto 0 auto;
				}
				.d2l-header-text-container,
				.d2l-body-text-container {
					display: block;
					text-align: center;
					width: 16.5rem;
				}
				.d2l-header-text-container {
					margin: 1.2rem auto 0.3rem auto;
				}
				.d2l-body-text-container {
					margin: 0 auto 0.9rem auto;
				}
				.d2l-button-container {
					display: flex;
					justify-content: center;
					width: 100%;
				}
				d2l-icon {
					height: 100px;
					width: 100px;
				}
			`
		];
	}

	static async getLocalizeResources(langs) {
		for await (const lang of langs) {
			let translations;
			switch (lang) {
				case 'en':
					translations = await import('../lang/en.js');
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
		this._workHref = 'https://www.google.ca';
		this._discoverHref = 'https://www.d2l.ca';
	}

	render() {
		// TODO: Nav to discover & learning

		const textTemplateFactory = (discoverActive, noActivities) => {
			if (!noActivities) {
				return html`${this.localize('activitiesAvailable')}`;
			}
			return discoverActive
				? html`${this.localize('noActivitiesDiscoverActive')}`
				: html`${this.localize('noActivitiesDiscoverInactive')}`;
		};

		const buttonTemplateFactory = (discoverActive, noActivities) => {
			if (!noActivities) {
				return html `
					<d2l-button
						primary
						@click=${() => window.location.href = this._workHref}>
						${this.localize('viewAllWork')}
					</d2l-button>`;
			}
			return discoverActive
				? html`
					<d2l-button
						primary
						@click=${() => window.location.href = this._discoverHref}>
						${this.localize('goToDiscover')}
					</d2l-button>`
				: nothing;
		};

		return html`
			<div class="d2l-icon-container">
				<d2l-icon icon="tier3:search"></d2l-icon>
			</div>
			<div class="d2l-heading-3 d2l-header-text-container">
				${this.localize('nothingHere')}
			</div>
			<div class="d2l-body-standard d2l-body-text-container">
				${textTemplateFactory(this.discoverActive, this.noActivities)}
			</div>
			<div class="d2l-button-container">
				${buttonTemplateFactory(this.discoverActive, this.noActivities)}
			</div>
		`;
	}
}
customElements.define('d2l-work-to-do-empty', EmptyView);
