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
import { nothing } from 'lit-html';

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
					display: inline-block;
					width: 100%;
				}
				:host([hidden]) {
					display: none;
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
		this.dispatchEvent(new CustomEvent('d2l-collection-changed', eventDetails));
	}

	render() {
		if (!this._items || this._count === 0 || this.maxDisplay === 0) {
			return nothing;
		}

		const items = this._items
			? this._items.slice(0, this.maxDisplay).map(item =>
				html`
					<d2l-work-to-do-activity-list-pane
						href=${ifDefined(item.usage._entity.getLinkByRel(Rels.Activities.activityUsage).href)}
						token=${ifDefined(this.token)}></d2l-work-to-do-activity-list-pane>
				`)
			: nothing;

		return html`
			<div class="d2l-collection-container">
				<div class="d2l-collection-body-container"></div>
					<d2l-list separators="none">${items}</d2l-list>
				</div>
			</div>
		`;
	}
}
customElements.define('d2l-work-to-do-activity-collection', ActivityUsageCollection);
