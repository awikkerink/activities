import '@brightspace-ui/core/components/colors/colors';
import '@brightspace-ui/core/components/icons/icon';
import '@brightspace-ui/core/components/list/list-item-content';
import '../d2l-activity-date/d2l-activity-date';
import 'd2l-organizations/components/d2l-organization-name/d2l-organization-name';
import 'd2l-organizations/components/d2l-organization-info/d2l-organization-info';

import { css, html, LitElement } from 'lit-element/lit-element.js';
import { ActivityUsageEntity } from 'siren-sdk/src/activities/ActivityUsageEntity';
import { ActivityAllowList } from './env';
import { EntityMixinLit } from 'siren-sdk/src/mixin/entity-mixin-lit';
import { ifDefined } from 'lit-html/directives/if-defined';
import { ListItemMixin } from '@brightspace-ui/core/components/list/list-item-mixin';
import { LocalizeMixin } from '@brightspace-ui/core/mixins/localize-mixin.js';
import { nothing } from 'lit-html';

class ActivityListPane extends ListItemMixin(EntityMixinLit(LocalizeMixin(LitElement))) {

	static get properties() {
		return {
			_hasDate: { type: Boolean },
			_hasOrgCode: { type: Boolean },
			_icon: { type: String },
			_organizationHref: { type: String },
		};
	}

	static get styles() {
		return [
			super.styles,
			css`
				:host {
					display: block;
				}
				:host([hidden]) {
					display: none;
				}
				:hover #d2l-activity-icon,
				:hover #d2l-organization-name {
					color: var(--d2l-color-celestine);
				}
				#d2l-activity-icon {
					margin-top: 0.2rem;
				}
				#d2l-organization-name {
					color: var(--d2l-color-ferrite);
				}
				#d2l-icon-bullet {
					color: var(--d2l-color-tungsten);
					margin-left: -0.15rem;
					margin-right: -0.15rem;
				}
				#content-bottom-container {
					color: var(--d2l-color-tungsten);
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
		this._icon = this._getActivityIcon(usage._entity);
	}

	render() {
		const separatorTemplate = this._hasDate && this._hasOrgCode
			? html `<d2l-icon id="d2l-icon-bullet" icon="tier1:bullet"></d2l-icon>`
			: nothing;

		const activityIconTemplate = this._icon
			? html` <d2l-icon id="d2l-activity-icon" icon=${this._icon}></d2l-icon>`
			: nothing;

		return this._renderListItem({
			illustration: activityIconTemplate,
			content: html`
				<d2l-list-item-content id="content">
					<div id="content-top-container">
						<d2l-organization-name
							id="d2l-organization-name"
							href="${ifDefined(this._organizationHref)}"
							token="${ifDefined(this.token)}">
						</d2l-organization-name>
					</div>
					<div id="content-bottom-container" slot="secondary">
						<d2l-activity-date
							href="${ifDefined(this.href)}"
							token="${ifDefined(this.token)}"
							@d2l-activity-date-changed=${this._handleActivityDateChange}>
						</d2l-activity-date>
						${separatorTemplate}
					<d2l-organization-info
							href="${ifDefined(this._organizationHref)}"
							token="${ifDefined(this.token)}"
							show-organization-code
							@d2l-organization-accessible=${this._handleOrgInfoChange}>
						</d2l-organization-info>
					</div>
				</d2l-list-item-content>
			`,
			actions: nothing
		});
	}

	_getActivityIcon(entity) {
		if (!entity || !entity.class) {
			return;
		}

		for (const allowed in ActivityAllowList) {
			if (entity.hasClass(ActivityAllowList[allowed].class)) {
				return ActivityAllowList[allowed].icon;
			}
		}

		return ActivityAllowList.userAssignmentActivity.icon;
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
customElements.define('d2l-work-to-do-activity-list-pane', ActivityListPane);
