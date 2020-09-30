import '@brightspace-ui/core/components/colors/colors';
import '@brightspace-ui/core/components/list/list';
import '@brightspace-ui/core/components/list/list-item';
import './d2l-work-to-do-activity-list-header';
import './d2l-work-to-do-activity-list-pane';

import { bodyCompactStyles, bodySmallStyles } from '@brightspace-ui/core/components/typography/styles';
import { css, html, LitElement } from 'lit-element/lit-element';
import { ActivityUsageCollectionEntity } from 'siren-sdk/src/activities/ActivityUsageCollectionEntity';
import { EntityMixinLit } from 'siren-sdk/src/mixin/entity-mixin-lit';
import { ifDefined } from 'lit-html/directives/if-defined';
import { Rels } from 'siren-sdk/src/hypermedia-constants.js';

/**
* @description Class representation of WorkToDoActivitiesCollection
*/
class ActivityUsageCollection extends EntityMixinLit(LitElement) {

	static get properties() {
		return {
			maxDisplay: { type: Number, attribute: 'max-display' },
			_items: { type: Array },
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
				.d2l-overdue-collection-container {
					background-color: var(--d2l-color-regolith);
					display: flex;
					justify-content: center;
					padding-bottom: 72px;
					padding-top: 72px;
				}
				.d2l-overdue-collection-header-container {
					border-bottom: solid 1px var(--d2l-color-gypsum);
					box-sizing: border-box;
					height: 96px;
					width: 100%;
				}
				.d2l-overdue-collection-body-container {
					align-items: center;
					display: flex;
					justify-content: space-between;
				}
`
		];
	}

	constructor() {
		super();
		this._count = 0;
		this._items = [];
		this._setEntityType(ActivityUsageCollectionEntity);
	}

	set _entity(entity) {
		if (this._entityHasChanged(entity)) {
			this._onActivityUsageCollectionChanged(entity);
			super._entity = entity;
		}
	}

	/**
	 * @description Update widget's activity usage collection (_items) to current target collection
	 * @param {ActivityUsageCollectionEntity} collection Current target collection entity
	 */
	_onActivityUsageCollectionChanged(collection) {
		collection.onItemsChange(item => {
			item.onActivityUsageChange(usage => {
				usage.onOrganizationChange(organization => {
					const newItem = { usage, organization };
					this._items = [...this._items, newItem];
				});
			});
		});
		this._count = collection._items().length || 0;
		const eventDetails = {
			bubbles: true,
			composed: false,
			detail: {
				count: this._count
			}
		};
		this.dispatchEvent(new CustomEvent('d2l-overdue-collection-changed', eventDetails));
	}

	render() {
		if (!this._items || this._count === 0 || this.maxDisplay === 0) {
			return html``;
		}

		const items = this._items.slice(0, this.maxDisplay).map(item =>
			html`
				<d2l-activity-list-pane
					action-href=${ifDefined(item.usage.userActivityUsageHref())}
					href=${ifDefined(item.usage._entity.getLinkByRel(Rels.Activities.activityUsage).href)}
					token=${ifDefined(this.token)}>
				</d2l-activity-list-pane>
			`
		);

		return html`
			<div class="d2l-overdue-collection-container">
				<div class="d2l-overdue-collection-header-container">
					<d2l-activity-list-header count=${this._count}></d2l-activity-list-header>
				</div>
				<div class="d2l-overdue-collection-body-container">
					<d2l-list separators="none">${items}</d2l-list>
				</div>
			</div>
		`;
	}
}
customElements.define('d2l-work-to-do-activity-collection', ActivityUsageCollection);
