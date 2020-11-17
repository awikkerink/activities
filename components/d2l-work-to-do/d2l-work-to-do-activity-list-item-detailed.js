import '@brightspace-ui/core/components/colors/colors';
import '@brightspace-ui/core/components/icons/icon';
import '@brightspace-ui/core/components/list/list-item-content';
import '../d2l-activity-date/d2l-activity-date';

import { bodyCompactStyles, bodySmallStyles, bodyStandardStyles } from '@brightspace-ui/core/components/typography/styles';
import { css, html, LitElement } from 'lit-element/lit-element.js';
import { ActivityUsageEntity } from 'siren-sdk/src/activities/ActivityUsageEntity';
import { ActivityAllowList } from './env';
import { EntityMixinLit } from 'siren-sdk/src/mixin/entity-mixin-lit';
import { ListItemMixin } from '@brightspace-ui/core/components/list/list-item-mixin';
import { LocalizeMixin } from '@brightspace-ui/core/mixins/localize-mixin';
import { nothing } from 'lit-html';
import { fetchEntity } from './state/fetch-entity';

class ActivityListItemDetailed extends ListItemMixin(EntityMixinLit(LocalizeMixin(LitElement))) {

	static get properties() {
		return {
			/** entity used for crawling instance properties (e.g. name) */
			_activity: { type: Object },
			/** entity associated with ActivityUsageEntity's organization */
			_organization: { type: Object },
			/** List of component relevant information related to activityType */
			_props: { type: Object },
		};
	}

	static get styles() {
		return [
			super.styles,
			bodyCompactStyles,
			bodySmallStyles,
			bodyStandardStyles,
			css`
				:host {
					display: block;
					padding: 0 2.1rem;
				}
				:host([hidden]) {
					display: none;
				}
				:hover #d2l-activity-icon,
				:hover #content-top-container {
					color: var(--d2l-color-celestine);
				}
				#d2l-activity-icon {
					margin-right: 2.1rem;
					margin-top: 0.9rem;
				}
				:host([dir="rtl"]) #d2l-activity-icon {
					margin-left: 2.1rem;
					margin-right: 0;
				}
				#content-top-container {
					color: var(--d2l-color-ferrite);
					margin: 0.6rem 0 0 0;
				}
				#d2l-icon-bullet {
					color: var(--d2l-color-tungsten);
					margin-left: -0.15rem;
					margin-right: -0.15rem;
				}
				#content-bottom-container {
					color: var(--d2l-color-tungsten);
				}
				#content-supporting-info-container {
					-webkit-box-orient: vertical;
					color: var(--d2l-color-ferrite);
					display: block;
					display: -webkit-box;
					-webkit-line-clamp: 2;
					margin: 0.3rem 0 0.6rem 0;
					max-width: inherit;
					overflow: hidden;
					text-overflow: ellipsis;
				}
				[slot="content"] {
					padding: 0.3rem 0;
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
		this._activity = undefined;
		this._organization = undefined;
		this._props = undefined;
		this._setEntityType(ActivityUsageEntity);
	}

	set _entity(entity) {
		if (this._entityHasChanged(entity)) {
			this._onActivityUsageChange(entity);
			super._entity = entity;
		}
	}

	/**
	 * Update component's data to match new entry point entity
	 * @param {ActivityUsageEntity} usage Current target usage entity
	 */
	_onActivityUsageChange(usage) {
		this._usage = usage;
		this._loadActivity();
		this._loadOrganization();
	}

	render() {
		if (!this.href || !this.token) {
			return nothing;
		}

		const iconTemplate = this._icon
			? html `<d2l-icon id="d2l-activity-icon" icon=${this._icon}></d2l-icon>`
			: nothing;

		const separatorTemplate = !!this._type && !!this._orgName
			? html `<d2l-icon id="d2l-icon-bullet" icon="tier1:bullet"></d2l-icon>`
			: nothing;

		return this._renderListItem({
			illustration: iconTemplate,
			content: html`
				<d2l-list-item-content id="content">
					<div id="content-top-container" class="d2l-body-standard">
						${this._name}
					</div>
					<div id="content-secondary-container" slot="secondary" class="d2l-body-small">
						${this._type}
						${separatorTemplate}
						${this._orgName}
					</div>
					<div id="content-supporting-info-container" slot="supporting-info" class="d2l-body-compact">
						${this._description}
					</div>
				</d2l-list-item-content>
			`
		});
	}

	set actionHref(href) {  // Require setter function as list-mixin initializes value
		const oldVal = this._actionHref;
		this._actionHref = href;
		this.requestUpdate('actionHref', oldVal);
	}

	/** Link to activity instance for user navigation to complete/work on activity */
	get actionHref() {
		return this._activity && this._activity.hasLinkByType('text/html')
			? this._activity.getLinkByType('text/html').href
			: '';
	}

	/** Due or end date of activity */
	get _date() {
		return this._usage
			? this._usage.dueDate() || this._usage.endDate()
			: '';
	}

	get _description() {
		return this._activity && this._activity.hasProperty('description')
			? this._activity.properties.description
			: '';
	}

	/** String associated with icon catalogue for provided activity type */
	get _icon() {
		return this._props
			? this._props.icon
			: ActivityAllowList.userAssignmentActivity.icon;

	}

	/** Specific name of the activity */
	get _name() {
		return this._activity && this._activity.hasProperty('name')
			? this._activity.properties.name
			: this._props ? this._props.type : '';
	}

	/** Name of the activity's associated organization */
	get _orgName() {
		return this._organization && this._organization.hasProperty('name')
			? this._organization.properties.name
			: '';
	}

	get _type() {
		return this._props
			? this._props.type
			: '';
	}

	/**
	 * Load usage's associated activity entity.
	 * @async
	 */
	async _loadActivity() {
		const entity = this._usage._entity;
		if (!entity || !entity.class) {
			return;
		}

		for (const allowed in ActivityAllowList) {
			if (entity.hasClass(ActivityAllowList[allowed].class)) {
				this._props = ActivityAllowList[allowed];
				const source = (
					entity.hasLinkByRel(ActivityAllowList[allowed].rel)
					&& entity.getLinkByRel(ActivityAllowList[allowed].rel)
					|| {}).href;
				if (source) {
					await fetchEntity(source, this.token)
						.then((sirenEntity) => {
							if (sirenEntity) {
								this._activity = sirenEntity;
							}
						});
				}
			}
		}
	}

	/**
	 * Load usage's organization entity.
	 * @async
	 */
	async _loadOrganization() {
		const organizationHref = this._usage.organizationHref();
		if (organizationHref) {
			await fetchEntity(organizationHref, this.token)
				.then((organization) => {
					this._organization = organization;
				});
		}
	}
}
customElements.define('d2l-work-to-do-activity-list-item-detailed', ActivityListItemDetailed);
