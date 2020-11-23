import '@brightspace-ui/core/components/colors/colors';
import '@brightspace-ui/core/components/icons/icon';
import '@brightspace-ui/core/components/list/list-item-content';
import '../d2l-activity-date/d2l-activity-date';

import { bodyCompactStyles, bodySmallStyles, bodyStandardStyles, heading3Styles } from '@brightspace-ui/core/components/typography/styles';
import { css, html, LitElement } from 'lit-element/lit-element.js';
import { ActivityUsageEntity } from 'siren-sdk/src/activities/ActivityUsageEntity';
import { ActivityAllowList } from './env';
import { classMap } from 'lit-html/directives/class-map.js';
import { EntityMixinLit } from 'siren-sdk/src/mixin/entity-mixin-lit';
import { ListItemMixin } from '@brightspace-ui/core/components/list/list-item-mixin';
import { LocalizeMixin } from '@brightspace-ui/core/mixins/localize-mixin';
import { nothing } from 'lit-html';
import { fetchEntity } from './state/fetch-entity';

class ActivityListItemDetailed extends ListItemMixin(EntityMixinLit(LocalizeMixin(LitElement))) {

	static get properties() {
		return {
			/** Indicates whether the component should render the due/end date of the related activity */
			includeDate: { type: Boolean, attribute: 'include-date' },
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
			heading3Styles,
			css`
				:host {
					display: block;
					padding: 0 2.1rem;
				}
				:host([hidden]) {
					display: none;
				}
				.d2l-activity-icon-container {
					padding: 0.7rem 0.7rem 0 0.25rem;
				}
				:host([dir="rtl"]) .d2l-activity-icon-container {
					padding: 0.7rem 0.25rem 0 0.7rem;
				}
				.d2l-activity-name-container {
					color: var(--d2l-color-ferrite);
					margin: 0.6rem 0 0 0;
				}
				.d2l-activity-icon-container.d2l-hovering,
				.d2l-activity-icon-container.d2l-focusing,
				.d2l-activity-name-container.d2l-hovering,
				.d2l-activity-name-container.d2l-focusing {
					--d2l-list-item-content-text-decoration: underline;
					color: var(--d2l-color-celestine);
				}
				#d2l-icon-bullet {
					color: var(--d2l-color-tungsten);
					margin-left: -0.15rem;
					margin-right: -0.15rem;
				}
				.d2l-content-secondary-container {
					color: var(--d2l-color-tungsten);
					margin-bottom: 0.3rem;
				}
				.d2l-content-secondary-container-no-description {
					margin-bottom: 0.6rem;
				}
				.d2l-content-supporting-info-container {
					-webkit-box-orient: vertical;
					color: var(--d2l-color-ferrite);
					display: block;
					display: -webkit-box;
					-webkit-line-clamp: 2;
					margin-bottom: 0.6rem;
					max-width: inherit;
					overflow: hidden;
					text-overflow: ellipsis;
				}
				[slot="content"] {
					padding: 0;
				}
				.d2l-activity-date-container {
					margin: 0;
					padding: 1rem 0 0.1rem 0;
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

		const iconClasses = {
			'd2l-activity-icon-container': true,
			'd2l-focusing': this._focusingLink,
			'd2l-hovering': this._hoveringLink
		};

		const nameClasses = {
			'd2l-body-standard': true,
			'd2l-activity-name-container': true,
			'd2l-focusing': this._focusingLink,
			'd2l-hovering': this._hoveringLink
		};

		const secondaryClasses = {
			'd2l-body-small': true,
			'd2l-content-secondary-container': true,
			'd2l-content-secondary-container-no-description': !this._description
		};

		const supportingClasses = {
			'd2l-body-compact': true,
			'd2l-content-supporting-info-container': true,
		};

		const dateTemplate = this.includeDate
			? html `
				<div class="d2l-activity-date-container">
					<d2l-activity-date
						class="d2l-heading-3"
						href=${this.href}
						.token=${this.token}
						format="dddd, MMMM d"
						date-only>
					</d2l-activity-date>
				</div>`
			: nothing;

		const iconTemplate = this._icon
			? html `<d2l-icon class=${classMap(iconClasses)} icon=${this._icon}></d2l-icon>`
			: nothing;

		const separatorTemplate = !!this._type && !!this._orgName
			? html `<d2l-icon id="d2l-icon-bullet" icon="tier1:bullet"></d2l-icon>`
			: nothing;

		const descriptionTemplate = this._description
			? html`
				<div id="content-supporting-info-container" slot="supporting-info" class=${classMap(supportingClasses)}>
					${this._description}
				</div>`
			: nothing;

		const listItemTemplate = this._renderListItem({
			illustration: iconTemplate,
			content: html`
				<d2l-list-item-content id="content">
					<div class=${classMap(nameClasses)}>
						${this._name}
					</div>
					<div class=${classMap(secondaryClasses)} slot="secondary">
						${this._type}
						${separatorTemplate}
						${this._orgName}
					</div>
					${descriptionTemplate}
				</d2l-list-item-content>
			`
		});

		return html`
			${dateTemplate}
			${listItemTemplate}
		`;
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
