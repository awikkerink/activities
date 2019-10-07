import { css, html, LitElement } from 'lit-element/lit-element.js';
import { heading1Styles, bodyStandardStyles } from '@brightspace-ui/core/components/typography/styles.js';
import '@brightspace-ui/core/components/colors/colors.js';
import '@brightspace-ui/core/components/button/button.js';
import { EntityMixinLit } from 'siren-sdk/src/mixin/entity-mixin-lit.js';
import { ActivityUsageCollectionEntity } from 'siren-sdk/src/activities/ActivityUsageCollectionEntity.js';

class AdminList extends EntityMixinLit(LitElement) {
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

	_onActivityUsageCollectionChanged(collection) {
		this._items = [];
		collection.onItemsChange((item, index) => {
			this._items[index] = item;
			this.requestUpdate();
		});
	}

	static get properties() {
		return {
			'title-text': {
				type: String
			},
			_items: {
				type: Array
			}
		};
	}

	static get styles() {
		return [
			heading1Styles,
			bodyStandardStyles,
			css`
				:host {
					display: block;
				}
				:host([hidden]) {
					display: none;
				}
				.d2l-activity-admin-list-content-container {
					display: flex;
					justify-content: center;
				}
				.d2l-activity-admin-list-content {
					box-sizing: border-box;
					padding: 0 30px;
					max-width: 1230px;
					width: 100%;
				}

				.d2l-activity-admin-list-header-container {
					border-bottom: solid 1px var(--d2l-color-gypsum);
					box-sizing: border-box;
					height: 96px;
					width: 100%;
				}
				.d2l-activity-admin-list-header {
					align-items: center;
					display: flex;
					justify-content: space-between;
				}

				.d2l-activity-admin-list-body-container {
					background-color: #f9fafb;
				}
				.d2l-activity-admin-list-body {
					padding-top: 72px;
					padding-bottom: 72px;
				}
			`
		];
	}

	render() {
		return html`
			<div class="d2l-activity-admin-list-content-container d2l-activity-admin-list-header-container">
				<div class="d2l-activity-admin-list-content d2l-activity-admin-list-header">
					<h1 class="d2l-heading-1">${this['title-text']}</h1>
					<d2l-button primary>Create Learning Path</d2l-button>
				</div>
			</div>

			<div class="d2l-activity-admin-list-content-container d2l-activity-admin-list-body-container">
				<div class="d2l-activity-admin-list-content d2l-activity-admin-list-body">
	${this._items.map(
		item =>
			html`
				<p class="d2l-body-standard">${item.activityUsageHref()}</p>
			`
	)}
				</div>
			</div>
		`;
	}
}
customElements.define('d2l-activity-admin-list', AdminList);
