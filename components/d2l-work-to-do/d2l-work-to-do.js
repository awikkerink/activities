import '@brightspace-ui/core/components/icons/icon';
import '@brightspace-ui/core/components/colors/colors';
import './d2l-work-to-do-activity-collection';
import './d2l-work-to-do-activity-list-header';

import { Actions, Rels } from 'siren-sdk/src/hypermedia-constants';
import { bodyCompactStyles, bodySmallStyles } from '@brightspace-ui/core/components/typography/styles';
import { css, html, LitElement } from 'lit-element/lit-element';
import { Constants } from './env';
import { EntityMixinLit } from 'siren-sdk/src/mixin/entity-mixin-lit';
import { fetchEntity } from './state/fetch-entity';
import { ifDefined } from 'lit-html/directives/if-defined';
import { LocalizeMixin } from '@brightspace-ui/core/mixins/localize-mixin';
import { SimpleEntity } from 'siren-sdk/src/es6/SimpleEntity';
import { UserEntity } from 'siren-sdk/src/users/UserEntity';
import { nothing } from 'lit-html';

class WorkToDoWidget extends EntityMixinLit(LocalizeMixin(LitElement)) {

	static get properties() {
		return {
			_overdueCount: { type: Number },
			_overdueSource: { type: String },
			_upcomingCount: { type: Number },
			_upcomingDisplayLimit: { type: Number },
			_upcomingSource: { type: String }
		};
	}

	static get styles() {
		return [
			bodyCompactStyles,
			bodySmallStyles,
			css`
				:host {
					display: block;
				}
				:host([hidden]) {
					display: none;
				}
				.d2l-work-to-do-content-container {
					background-color: var(--d2l-color-regolith);
					display: flex;
					justify-content: center;
					padding-bottom: 72px;
					padding-top: 72px;
				}
				.d2l-work-to-do-header-container {
					border-bottom: solid 1px var(--d2l-color-gypsum);
					box-sizing: border-box;
					height: 96px;
					width: 100%;
				}
				.d2l-work-to-do-body-container {
					align-items: center;
					display: flex;
					justify-content: space-between;
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
		this._emptyEntity = {};
		this._items = [];
		this._setEntityType(UserEntity);
	}

	set _entity(entity) {
		if (this._entityHasChanged(entity)) {
			this._onEntityChanged(entity);
			super._entity = entity;
			this.requestUpdate();
		}
	}

	/**
	 * @description Update widget's data to match updated entry point entity
	 * @param {UserEntity} user Current target user entity
	 */
	_onEntityChanged(user) {
		if (!user || !user._entity) {
			return;
		}
		this._setCollectionSources(user._entity);
	}

	render() {
		const overdueCollection = html`
				<d2l-activity-collection
					href=${ifDefined(this._overdueSource)}
					token=${ifDefined(this.token)}
					max-display=${Constants.MaxWidgetDisplay}
					@d2l-collection-changed=${this._handleOverdueCollectionChange}>
				</d2l-activity-collection>
			`;

		const upcomingCollection = html`
				<d2l-activity-collection
					href=${ifDefined(this._overdueSource)}
					token=${ifDefined(this.token)}
					max-display=${ifDefined(this._upcomingDisplayLimit)}
					@d2l-collection-changed=${this._handleUpcomingCollectionChange}>
				</d2l-activity-collection>
			`;

		const overdueHeader = this._overdueCount > 0
			? html `<d2l-work-to-do-list-header overdue count=${this._overdueCount}></d2l-work-to-do-list-header>`
			: nothing;

		const upcomingHeader = this._upcomingCount > 0
			? html `<d2l-work-to-do-list-header count=${this._upcomingCount}></d2l-work-to-do-list-header>`
			: nothing;

		const overdueTemplate = html`
			<div id="overdue-activities-content">
				${overdueHeader}
				${overdueCollection}
			</div>
		`;

		const upcomingTemplate = this._overdueCount < Constants.MaxWidgetDisplay
			? html`
				<div id="upcoming-activities-content">
					${upcomingHeader}
					${upcomingCollection}
				</div>`
			: nothing;

		return html`
			<div class="d2l-work-to-do-header-container">
				<h3 class="d2l-heading-2">${this.localize('my_work_to_do')}</h3>
				<!-- <d2l-icon icon="chevron-down-medium"></d2l-icon> -->
			</div>
			<!-- Logic for view/state display required -->
			<div class="d2l-work-to-do-body-container">
				${overdueTemplate}
				${upcomingTemplate}
			</div>
		`;
	}

	_handleOverdueCollectionChange(e) {
		if (!e || !e.detail || !e.detail.count) {
			throw new ReferenceError('_handleOverdueCollectionChange expects event to contain count field in details');
		}
		this._overdueCount = e.detail.count || 0;
		this._upcomingDisplayLimit = Math.max((Constants.MaxWidgetDisplay - this._overdueCount), 0);
	}

	_handleUpcomingCollectionChange(e) {
		if (!e || !e.detail || !e.detail.count) {
			throw new ReferenceError('_handleOverdueCollectionChange expects event to contain count field in details');
		}
		this._upcomingCount = e.detail.count || 0;
	}

	_createActionUrl(action, parameters) {
		const query = {};
		const fields = action.fields || [];
		fields.forEach(field => {
			if (field.name in parameters && field.type === 'text') {
				query[field.name] = parameters[field.name];
			} else {
				query[field.name] = decodeURI(field.value);
			}
		});

		const queryString = Object.keys(query).map(key => {
			return `${key}=${query[key]}`;
		}).join('&');

		return queryString ? `${action.href}?${queryString}` : null;
	}

	/** Set sources for upcoming and overdue ActivityUsageCollectionEntities */
	async _setCollectionSources(entity) {
		const emptySource = (
			entity.hasLinkByRel(Rels.Activities.myActivitiesEmpty)
			&& entity.getLinkByRel(Rels.Activities.myActivitiesEmpty)
			|| {}).href;

		if (emptySource) {
			const sirenEntity = await fetchEntity(emptySource, this.token);
			if (sirenEntity) {
				this._emptyEntity = new SimpleEntity(sirenEntity, this.token, { remove: () => { } });
			}
			this._overdueSource = this._overdueHref(this._emptyEntity);
			this._upcomingSource = this._upcomingHref(this._emptyEntity);
		}
	}

	/**
	 * Sets target overdue ActivityUsageCollection
	 * @param {SimpleEntity} empty
	 * @returns {String}
	 */
	_overdueHref(empty) {
		// TODO: Consider pagination referencing
		if (!empty._entity || !empty._entity.hasLinkByRel(Rels.Activities.overdue)) {
			return;
		}

		return empty._entity.getLinkByRel(Rels.Activities.overdue).href;
	}

	/**
	 * Sets target of time bound ActivityUsageCollection
	 * @param {SimpleEntity} empty
	 * @param {Number} [forwardLimit] - [Default: 14] Number of days into future for upcoming activities
	 */
	_upcomingHref(empty, forwardLimit) {
		if (!empty._entity || !empty._entity.hasActionByName(Actions.activities.selectCustomDateRange)) {
			return;
		}

		const action = empty._entity.getActionByName(Actions.activities.selectCustomDateRange);
		forwardLimit = forwardLimit ? forwardLimit : 14;  // Use a config/constant instead

		const now = new Date();
		const end = new Date(now.getFullYear(), now.getMonth(), now.getDate() + forwardLimit, 23, 59, 59, 999).toISOString();
		const start = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0, 0).toISOString();
		const parameters = {
			start: start,
			end: end
		};

		return this._createActionUrl(action, parameters);
	}
}
customElements.define('d2l-work-to-do', WorkToDoWidget);
