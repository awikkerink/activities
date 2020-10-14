import '@brightspace-ui/core/components/colors/colors';
import '@brightspace-ui/core/components/list/list';
import '@brightspace-ui/core/components/list/list-item';
import './d2l-work-to-do-activity-list-header';
import './d2l-work-to-do-activity-list-item-basic';

import { css, html, LitElement } from 'lit-element/lit-element';
import { ActivityUsageCollectionEntity } from 'siren-sdk/src/activities/ActivityUsageCollectionEntity';
import { EntityMixinLit } from 'siren-sdk/src/mixin/entity-mixin-lit';
import { ifDefined } from 'lit-html/directives/if-defined';
import { nothing } from 'lit-html';
import { repeat } from 'lit-html/directives/repeat';

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
		collection.subEntitiesLoaded().then(
			collection.onItemsChange((item, i) => {
				item.onActivityUsageChange(usage => {
					this._items[i] = { usage };
					this._items = [...this._items];
				});
			}),
		);

	}

	render() {
		if (!this._items || this.maxDisplay === 0) {
			return nothing;
		}

		const items = repeat(
			this._items.slice(0, this.maxDisplay),
			item => item.usage,
			item =>
				html`
					<d2l-work-to-do-activity-list-item-basic
						href=${ifDefined(item.usage.self())}
						.token=${ifDefined(this.token)}></d2l-work-to-do-activity-list-item-basic>
				`
		);

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
