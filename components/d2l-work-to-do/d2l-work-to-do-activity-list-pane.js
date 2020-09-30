import '@brightspace-ui/core/components/icons/icon';
import '@brightspace-ui/core/components/colors/colors';
import '@brightspace-ui/core/components/list/list-item-content';
import '../d2l-activity-date/d2l-activity-date';
import 'd2l-organizations/components/d2l-organization-name/d2l-organization-name';
import 'd2l-organizations/components/d2l-organization-info/d2l-organization-info';
import 'd2l-organizations/components/d2l-organization-date/d2l-organization-date';

import { bodyCompactStyles, bodySmallStyles } from '@brightspace-ui/core/components/typography/styles';
import { css, html, LitElement } from 'lit-element/lit-element.js';
import { ActivityUsageEntity } from 'siren-sdk/src/activities/ActivityUsageEntity';
import { constants } from './env';
import { EntityMixinLit } from 'siren-sdk/src/mixin/entity-mixin-lit';
import { ifDefined } from 'lit-html/directives/if-defined';
import { ListItemMixin } from '@brightspace-ui/core/components/list/list-item-mixin';
import { LocalizeMixin } from '@brightspace-ui/core/mixins/localize-mixin.js';

class ActivityListPane extends ListItemMixin(EntityMixinLit(LocalizeMixin(LitElement))) {

	static get properties() {
		return {
			_dateTerm: { type: String },
			_icon: { type: String },
			_organizationHref: { type: String },
		};
	}

	static get styles() {
		return [
			super.styles,
			bodyCompactStyles,
			bodySmallStyles,
			css`
				:host {
					display: inline-block;
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
		this._organizationHref = usage.organizationHref();
	}

	render() {
		return this._renderListItem({
			illustration: html`
				<div class="d2l-activity-icon-container">
					<d2l-icon icon=${ifDefined(this._icon)}></d2l-icon>
					<d2l-icon icon="tier2:assignments"></d2l-icon>
				</div>
			`,
			content: html`
				<d2l-list-item-content id="content">
					<div id="content-top-container">
						<d2l-organization-name
							href="${ifDefined(this._organizationHref)}"
							token="${ifDefined(this.token)}">
						</d2l-organization-name>
					</div>
					<div id="content-bottom-container" slot="secondary">
						<d2l-activity-date
							href="${this.href}"
							token="${this.token}">
						</d2l-activity-date>
						<d2l-organization-info
							href="${ifDefined(this._organizationHref)}"
							token="${ifDefined(this.token)}"
							show-organization-code>
						</d2l-organization-info>
					</div>
				</d2l-list-item-content>
			`,
			actions: html``
		});
	}

	/**
	 * @type {string} Key for corresponding icon to pull from icon catalogue, includes tier/size
	 */
	// TODO: Migrate to HM component equivalent
	get _activityIcon() {
		const type = this.entity.activityType;
		return (type in constants.iconMapping) && constants.iconMapping[type]
			|| constants.iconMapping['fallback'];
	}

	/**
	 * @type {string} [ Due | End ] date string for activity usage entity
	 * @deprecated
	 * Update this to truncate the date term to just the day (no hours)
	 */
	_getDateTerm(usage) {
		const dueDate = usage.dueDate();
		const endDate = usage.endDate();
		return dueDate && this.localize('due_date', 'date', dueDate)
			|| endDate && this.localize('end_date', 'date', endDate)
			|| 'No date term';
	}
}
customElements.define('d2l-work-to-do-activity-list-pane', ActivityListPane);
