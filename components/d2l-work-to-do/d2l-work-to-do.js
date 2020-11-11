import '@brightspace-ui/core/components/button/button';
import '@brightspace-ui/core/components/icons/icon';
import '@brightspace-ui/core/components/link/link';
import './d2l-work-to-do-activity-list-header';
import './d2l-work-to-do-activity-list-item-basic';
import './d2l-work-to-do-activity-list-item-detailed';

import { Actions, Rels } from 'siren-sdk/src/hypermedia-constants';
import { bodyStandardStyles, heading3Styles } from '@brightspace-ui/core/components/typography/styles';
import { css, html, LitElement } from 'lit-element/lit-element';
import { Config, Constants } from './env';
import { EntityMixinLit } from 'siren-sdk/src/mixin/entity-mixin-lit';
import { fetchEntity } from './state/fetch-entity';
import { ifDefined } from 'lit-html/directives/if-defined';
import { LocalizeMixin } from '@brightspace-ui/core/mixins/localize-mixin';
import { performSirenAction } from 'siren-sdk/src/es6/SirenAction';
import { UserEntity } from 'siren-sdk/src/users/UserEntity';
import { repeat } from 'lit-html/directives/repeat';
import { nothing } from 'lit-html';

/**
 * @classdesc Class representation of Work to Do widget component
 */
class WorkToDoWidget extends EntityMixinLit(LocalizeMixin(LitElement)) {

	static get properties() {
		return {
			/** Represents current session's discovery tool access */
			_discoverActive: { type: Boolean },
			/** ActivityUsageCollection with time: 0 -> 52[weeks] */
			_maxCollection: { type: Object },
			/** ActivityUsageCollection with time: (OverdueWeekLimit) -> 0 */
			_overdueCollection: { type: Object },
			/** ActivityUsageCollection with time: 0 -> UpcomingWeekLimit */
			_upcomingCollection: { type: Object },
		};
	}

	static get styles() {
		return [
			bodyStandardStyles,
			heading3Styles,
			css`
				:host {
					display: block;
				}
				:host([hidden]) {
					display: none;
				}
				#empty-template {
					margin-left: auto;
					margin-right: auto;
				}
				.d2l-empty-icon-container {
					display: flex;
					justify-content: center;
					margin: 1.6rem auto 0 auto;
				}
				.d2l-empty-header-text-container,
				.d2l-empty-body-text-container {
					display: block;
					text-align: center;
					width: 16.5rem;
				}
				.d2l-empty-header-text-container {
					margin: 1.2rem auto 0.3rem auto;
				}
				.d2l-empty-body-text-container {
					margin: 0 auto 0.9rem auto;
				}
				.d2l-empty-button-container {
					display: flex;
					justify-content: center;
					width: 100%;
				}
				#empty-icon {
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
		this._discoverActive = false;
		this._emptyEntity = undefined;
		this._maxCollection = undefined;
		this._overdueCollection = undefined;
		this._overdueDisplayLimit = Constants.MaxWidgetDisplay;
		this._upcomingCollection = undefined;
		this._viewAllSource = 'http://www.d2l.com';  // TODO: Update to actual tool location
		this._setEntityType(UserEntity);
	}

	set _entity(entity) {
		if (this._entityHasChanged(entity)) {
			this._onEntityChanged(entity);
			super._entity = entity;
		}
	}

	/**
	 * Update widget's data to match updated entry point entity
	 * @param {UserEntity} user Current target user entity
	 */
	_onEntityChanged(user) {
		if (!user || !user._entity) {
			return;
		}
		this._getCollections(user._entity);
	}

	render() {

		/** Activity state templates */
		const collectionTemplate = (collection, displayLimit, isOverdue) => {
			if (!collection || displayLimit === 0) {
				return nothing;
			}

			const activities = collection.getSubEntitiesByRel(Rels.Activities.userActivityUsage);
			if (activities.length === 0) {
				return nothing;
			}

			const items = repeat(
				activities.slice(0, displayLimit),
				item => item.links,
				item =>
					html`
						<d2l-work-to-do-activity-list-item-basic
							href=${ifDefined(item.getLinkByRel('self').href)}
							.token=${ifDefined(this.token)}></d2l-work-to-do-activity-list-item-basic>
					`
			);

			return html`
				<div class="d2l-activity-collection">
					<d2l-work-to-do-activity-list-header ?overdue=${isOverdue} count=${activities.length}></d2l-work-to-do-activity-list-header>
					<div class="d2l-activity-collection-content"></div>
						<d2l-list separators="none">${items}</d2l-list>
					</div>
				</div>
			`;
		};

		const activitiesViewTemplate = () => {
			if (!this._overdueCollection || !this._upcomingCollection) {
				return nothing;
			}
			return html`
				<div class="d2l-overdue-list">
					${collectionTemplate(this._overdueCollection, this._overdueDisplayLimit, true)}
				</div>
				<div class="d2l-upcoming-list">
					${collectionTemplate(this._upcomingCollection, this._upcomingDisplayLimit, false)}
				</div>
				<d2l-link aria-label="${this.localize('fullViewLink')}" href="${this._viewAllSource}" small>${this.localize('fullViewLink')}</d2l-link>
			`;
		};

		/** Empty state templates */
		const emptyViewTextTemplate = (discoverActive, hasActivities) => {
			if (hasActivities) {
				return html`${this.localize('activitiesAvailable')}`;
			}

			return discoverActive
				? html`${this.localize('noActivitiesDiscoverActive')}`
				: html`${this.localize('noActivitiesDiscoverInactive')}`;
		};

		const emptyViewButtonTemplate = (discoverActive, hasActivities) => {
			if (hasActivities) {
				return html `
					<d2l-button
						primary
						@click=${() => window.location.href = this._viewAllSource}>
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

		const emptyViewTemplate = () => {
			if (!this._maxCollection) {
				return nothing;
			}

			return html`
				<div id='empty-template'>
					<div class="d2l-empty-icon-container">
						<d2l-icon id="empty-icon" icon="tier3:search"></d2l-icon>
					</div>
					<div class="d2l-heading-3 d2l-empty-header-text-container">
						${this.localize('nothingHere')}
					</div>
					<div class="d2l-body-standard d2l-empty-body-text-container">
						${emptyViewTextTemplate(this._discoverActive, this._maxCount)}
					</div>
					<div class="d2l-empty-button-container">
						${emptyViewButtonTemplate(this._discoverActive, this._maxCount)}
					</div>
				</div>
			`;
		};

		/** Error state template */
		const errorTemplate = nothing;

		/** Full-view state templates */
		const fullPageTemplate = nothing;

		/** Loading state template */
		const loadingTemplate = nothing;

		/** Main render function logic */
		switch (this._state) {
			case 'activity':
				return activitiesViewTemplate();
			case 'empty':
				return emptyViewTemplate();
			case 'error':
				return errorTemplate; // TODO: Create error template
			case 'full-page':
				return fullPageTemplate; // TODO: Create full page template
			case 'loading':
				return loadingTemplate; // TODO: Create loading template (or infuse skeletons)
			default:
				return activitiesViewTemplate();
		}
	}

	get _maxCount() {
		return this._maxCollection && this._maxCollection.hasSubEntityByRel(Rels.Activities.userActivityUsage)
			? this._maxCollection.getSubEntitiesByRel(Rels.Activities.userActivityUsage).length
			: 0;
	}

	get _overdueCount() {
		return this._overdueCollection && this._overdueCollection.hasSubEntityByRel(Rels.Activities.userActivityUsage)
			? this._overdueCollection.getSubEntitiesByRel(Rels.Activities.userActivityUsage).length
			: 0;
	}

	get _upcomingCount() {
		return this._upcomingCollection && this._upcomingCollection.hasSubEntityByRel(Rels.Activities.userActivityUsage)
			? this._upcomingCollection.getSubEntitiesByRel(Rels.Activities.userActivityUsage).length
			: 0;
	}

	get _upcomingDisplayLimit() {
		return this._overdueCount
			? Math.max((Constants.MaxWidgetDisplay - this._overdueCount - 1), 0)  // Subtract one to account for additional header space
			: Constants.MaxWidgetDisplay;
	}

	get _state() {
		if (this._overdueCollection && this._upcomingCollection) {
			if (this._overdueCount || this._upcomingCount) {
				return 'activity';
			} else if (this._maxCollection) {
				return 'empty';
			} else {
				return 'loading'; // Either templates need skeleton functionality or loading is a template
			}
		}

		return 'loading';
	}

	/**
	 * Get collections of overdue, upcoming and max range ActivityUsageCollectionEntities
	 * @async
	 * @param {UserEntity} entity - User 'whoami' endpoint response
	 */
	async _getCollections(entity) {
		const emptySource = (
			entity.hasLinkByRel(Rels.Activities.myActivitiesEmpty)
			&& entity.getLinkByRel(Rels.Activities.myActivitiesEmpty)
			|| {}).href;

		if (emptySource) {
			await fetchEntity(emptySource, this.token)
				.then((emptyEntity) => {
					if (emptyEntity) {
						this._loadOverdue(emptyEntity);
						this._loadUpcoming(emptyEntity);
						this._loadUpcoming(emptyEntity, Constants.MaxDays);
					}
				});
		}
	}

	/**
	 * Load collection of overdue activities.
	 * Will set collection of overdue activities
	 * @async
	 * @param {SimpleEntity} entity - Empty-activities domain endpoint response
	 */
	async _loadOverdue(entity) {
		if (!entity || !entity.hasLinkByRel(Rels.Activities.overdue)) {
			return;
		}

		const source = entity.getLinkByRel(Rels.Activities.overdue).href;
		await fetchEntity(source, this.token)
			.then((sirenEntity) => {
				this._overdueCollection = sirenEntity;
			});
	}

	/**
	 * Load collection of upcoming activities from present time until 'forwardLimit'.
	 * Will set collection of upcoming activities
	 * @async
	 * @param {SimpleEntity} entity - 'Empty' Activities domain endpoint response
	 * @param {Number} [forwardLimit] - [Default: Config.UpcomingWeekLimit * 7] Number of days into future to look for activities
	 */
	async _loadUpcoming(entity, forwardLimit) {
		if (!entity || !entity.hasActionByName(Actions.activities.selectCustomDateRange)) {
			return;
		}

		const isMax = !!forwardLimit;
		forwardLimit = forwardLimit ? forwardLimit : (Config.UpcomingWeekLimit * 7);

		const now = new Date();
		const end = new Date(now.getFullYear(), now.getMonth(), now.getDate() + forwardLimit, 23, 59, 59, 999).toISOString();
		const start = new Date(now.getTime()).toISOString();

		const action = entity.getActionByName(Actions.activities.selectCustomDateRange);
		const fields = [
			{ name: 'start', value: start },
			{ name: 'end', value: end }
		];
		performSirenAction(this.token, action, fields, true)
			.then((sirenEntity) => {
				if (!isMax) {
					this._upcomingCollection = sirenEntity;
				} else {
					this._maxCollection = sirenEntity;
				}
			});
	}
}
customElements.define('d2l-work-to-do', WorkToDoWidget);
