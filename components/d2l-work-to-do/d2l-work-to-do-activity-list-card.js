import '@brightspace-ui/core/components/button/button-icon';
import '@brightspace-ui/core/components/colors/colors';
import '@brightspace-ui/core/components/icons/icon';
import '@brightspace-ui/core/components/list/list-item-content';
import '../d2l-activity-date/d2l-activity-date';
import 'd2l-organizations/components/d2l-organization-name/d2l-organization-name';
import 'd2l-organizations/components/d2l-organization-info/d2l-organization-info';

import { bodyCompactStyles, bodySmallStyles, heading3Styles } from '@brightspace-ui/core/components/typography/styles';
import { css, html, LitElement } from 'lit-element/lit-element.js';
import { ActivityUsageEntity } from 'siren-sdk/src/activities/ActivityUsageEntity';
import { ActivityAllowList } from './env';
import { EntityMixinLit } from 'siren-sdk/src/mixin/entity-mixin-lit';
import { ifDefined } from 'lit-html/directives/if-defined';
import { ListItemMixin } from '@brightspace-ui/core/components/list/list-item-mixin';
import { LocalizeMixin } from '@brightspace-ui/core/mixins/localize-mixin.js';
import { nothing } from 'lit-html';

class ActivityListCard extends ListItemMixin(EntityMixinLit(LocalizeMixin(LitElement))) {

	static get properties() {
		return {
			_hasDate: { type: Boolean },
			_hasOrgCode: { type: Boolean },
			_icon: { type: String },
			_type: { type: String },
			_organizationHref: { type: String },
		};
	}

	static get styles() {
		return [
			super.styles,
			bodyCompactStyles,
			bodySmallStyles,
			heading3Styles,
			css`
				:host {
					border: solid 1px var(--d2l-color-gypsum);
					border-radius: 6px;
					display: block;
					margin: 0.6rem 0;
					padding: 0 1.2rem 0 2.1rem;
				}
				:host([hidden]) {
					display: none;
				}
				:host([dir="rtl"]) {
					padding: 0 2.1rem 0 1.2rem;
				}
				:hover #d2l-activity-icon,
				:hover #content-top-container {
					color: var(--d2l-color-celestine);
				}
				#d2l-activity-icon {
					height: 30px;
					margin-right: 2.1rem;
					margin-top: 0.3rem;
					width: 30px;
				}
				:host([dir="rtl"]) #d2l-activity-icon {
					margin-left: 2.1rem;
					margin-right: 0;
				}
				#d2l-icon-bullet {
					color: var(--d2l-color-tungsten);
					margin-left: -0.15rem;
					margin-right: -0.15rem;
				}
				#content-top-container {
					color: var(--d2l-color-ferrite);
					margin-bottom: -0.1rem;
				}
				#content-supporting-info-container {
					-webkit-box-orient: vertical;
					color: var(--d2l-color-ferrite);
					display: block;
					display: -webkit-box;
					-webkit-line-clamp: 2;
					margin: 6px 0;
					max-width: inherit;
					overflow: hidden;
					text-overflow: ellipsis;
				}
				d2l-button-icon {
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
		this._hasDate = false;
		this._hasOrgCode = false;
		this._icon = ActivityAllowList.userAssignmentActivity.icon;
		this._type = '';
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
		this.actionHref = usage.userActivityUsageHref();
		this._organizationHref = usage.organizationHref();
		this._getActivityType(usage._entity);
	}

	render() {
		const separatorTemplate = this._type && this._hasOrgCode
			? html `<d2l-icon id="d2l-icon-bullet" icon="tier1:bullet"></d2l-icon>`
			: nothing;

		const activityIconTemplate = this._icon
			? html` <d2l-icon id="d2l-activity-icon" icon=${this._icon}></d2l-icon>`
			: nothing;

		const activityActionTemplate =
			html `
				<d2l-button-icon
					description="Navigate to activity view"
					icon="tier1:chevron-right"
					text="To activity view">
				</d2l-button-icon>
			`;

		return this._renderListItem({
			illustration: activityIconTemplate,
			content: html`
				<d2l-list-item-content id="content">
					<div id="content-top-container">
						<d2l-organization-name
							class="d2l-heading-3"
							href="${ifDefined(this._organizationHref)}"
							token="${ifDefined(this.token)}">
						</d2l-organization-name>
					</div>
					<div id="content-secondary-container" slot="secondary" class="d2l-body-small">
						<d2l-organization-info
							href="${ifDefined(this._organizationHref)}"
							token="${ifDefined(this.token)}"
							show-organization-code
							@d2l-organization-accessible=${this._handleOrgInfoChange}>
						</d2l-organization-info>
						${separatorTemplate}
						${this._type}
					</div>
					<div id="content-supporting-info-container" slot="supporting-info" class="d2l-body-compact">
						Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
					</div>
				</d2l-list-item-content>
			`,
			actions: activityActionTemplate,
		});
	}

	_getActivityType(entity) {
		if (!entity || !entity.class) {
			return;
		}

		for (const allowed in ActivityAllowList) {
			if (entity.hasClass(ActivityAllowList[allowed].class)) {
				this._icon = ActivityAllowList[allowed].icon;
				this._type = ActivityAllowList[allowed].type;
			}
		}
	}

	_handleActivityDateChange(e) {
		if (!e || !e.detail || !e.detail.date) {
			this._hasDate = false;
			return;
		}
		this._hasDate = e.detail.date && e.detail.date.length > 0 ;
	}

	_handleOrgInfoChange(e) {
		if (!e || !e.detail || !e.detail.organization || !e.detail.organization.code) {
			this._hasOrgCode = false;
			return;
		}
		this._hasOrgCode = e.detail.organization.code && e.detail.organization.code.length > 0 ;

		// Override Org Code's text-transform
		if (this._hasOrgCode) {
			const orgInfo = this.shadowRoot.querySelector('d2l-organization-info');
			if (orgInfo) {
				const orgCodeClass = orgInfo.shadowRoot.querySelector('.d2l-organization-code');
				if (orgCodeClass) {
					orgCodeClass.style.textTransform = 'none';
				}
			}
		}
	}
}
customElements.define('d2l-work-to-do-activity-list-card', ActivityListCard);
