import '@brightspace-ui/core/components/colors/colors';
import '@brightspace-ui/core/components/icons/icon';
import '@brightspace-ui/core/components/list/list-item-content';
import '../d2l-activity-date/d2l-activity-date';

import { css, html, LitElement } from 'lit-element/lit-element';
import { ActivityUsageEntity } from 'siren-sdk/src/activities/ActivityUsageEntity';
import { ActivityAllowList } from './env';
import { classMap } from 'lit-html/directives/class-map';
import { EntityMixinLit } from 'siren-sdk/src/mixin/entity-mixin-lit';
import { fetchEntity } from './state/fetch-entity';
import { ListItemMixin } from '@brightspace-ui/core/components/list/list-item-mixin';
import { LocalizeMixin } from '@brightspace-ui/core/mixins/localize-mixin';
import { nothing } from 'lit-html';
import { SkeletonMixin } from '@brightspace-ui/core/components/skeleton/skeleton-mixin';

class ActivityListItemBasic extends SkeletonMixin(ListItemMixin(EntityMixinLit(LocalizeMixin(LitElement)))) {

	static get properties() {
		return {
			/** entity used for crawling instance properties (e.g. name) */
			_activity: { type: Object },
			/** List of component relevant information related to activityType */
			_activityProperties: { type: Object },
			/** entity associated with ActivityUsageEntity's organization */
			_organization: { type: Object },
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
				.d2l-activity-icon-container {
					display: inline-block;
					flex-grow: 0;
					flex-shrink: 0;
					margin: 0.35rem 0.6rem 0 0;
				}
				:host([dir="rtl"]) .d2l-activity-icon-container {
					margin: 0.6rem 0 0 0.6rem;
				}
				:host([skeleton]) .d2l-activity-icon-container.d2l-skeletize {
					padding: 0.2rem 0.1rem;
				}
				.d2l-activity-name-container {
					color: var(--d2l-color-ferrite);
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;
				}
				.d2l-activity-icon-container.d2l-hovering,
				.d2l-activity-icon-container.d2l-focusing,
				.d2l-activity-name-container.d2l-hovering,
				.d2l-activity-name-container.d2l-focusing {
					color: var(--d2l-color-celestine);
					text-decoration: underline;
				}
				.d2l-icon-bullet {
					color: var(--d2l-color-tungsten);
					margin-left: -0.15rem;
					margin-right: -0.15rem;
				}
				.d2l-secondary-content-container {
					color: var(--d2l-color-tungsten);
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;
				}
				[slot="content"] {
					display: flex;
					padding: 0.1rem 0;
				}
				d2l-list-item-generic-layout {
					background: transparent;
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
		this._activityProperties = undefined;
		this._organization = undefined;
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
			'd2l-hovering': this._hoveringLink,
			'd2l-skeletize': true,
		};

		const nameClasses = {
			'd2l-activity-name-container': true,
			'd2l-focusing': this._focusingLink,
			'd2l-hovering': this._hoveringLink,
			'd2l-skeletize': true,
			'd2l-skeletize-50': true
		};

		const secondaryClasses = {
			'd2l-secondary-content-container' : true,
			'd2l-skeletize' : true,
			'd2l-skeletize-65' : true,
		};

		const iconTemplate = this._icon
			? html `<d2l-icon class=${classMap(iconClasses)} icon=${this._icon}></d2l-icon>`
			: nothing;

		const dateTemplate = html `<d2l-activity-date href="${this.href}" .token="${this.token}" format="MMM d"></d2l-activity-date>`;

		const separatorTemplate = this._date && (this._orgName || this._orgCode)
			? html `<d2l-icon class="d2l-icon-bullet" icon="tier1:bullet"></d2l-icon>`
			: nothing;

		return this._renderListItem({
			illustration: iconTemplate,
			content: html`
				<d2l-list-item-content id="content">
					<div class=${classMap(nameClasses)}>
						${this._name}
					</div>
					<div class=${classMap(secondaryClasses)} slot="secondary">
						${dateTemplate}
						${separatorTemplate}
						${this._orgName || this._orgCode}
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
		if (!this._started) {
			return '';
		}

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

	/** Indicates if activity start date is in the past */
	get _started() {
		return this._usage && this._usage.startDate()
			? new Date(this._usage.startDate()) < new Date()
			: true;
	}

	/** String associated with icon catalogue for provided activity type */
	get _icon() {
		return this._activityProperties
			? this._activityProperties.icon
			: ActivityAllowList.userAssignmentActivity.icon;

	}

	/** Specific name of the activity */
	get _name() {
		return this._activity && this._activity.hasProperty('name')
			? this._activity.properties.name
			: this._activityProperties ? this._activityProperties.type : '';
	}

	/** Organization code of the activity's associated organization */
	get _orgCode() {
		return this._organization && this._organization.hasProperty('code')
			? this._organization.properties.code
			: '';
	}

	/** Name of the activity's associated organization */
	get _orgName() {
		return this._organization && this._organization.hasProperty('name')
			? this._organization.properties.name
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
				this._activityProperties = ActivityAllowList[allowed];
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
customElements.define('d2l-work-to-do-activity-list-item-basic', ActivityListItemBasic);
