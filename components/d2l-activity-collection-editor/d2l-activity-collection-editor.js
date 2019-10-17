import { css, html, LitElement } from 'lit-element/lit-element.js';
import { heading1Styles, heading4Styles, bodyCompactStyles, labelStyles } from '@brightspace-ui/core/components/typography/styles.js';
import { EntityMixinLit } from 'siren-sdk/src/mixin/entity-mixin-lit.js';
import { ActivityUsageEntity } from 'siren-sdk/src/activities/ActivityUsageEntity.js';
import '../d2l-activity-usage-list-item/d2l-activity-usage-list-item.js';
import '@brightspace-ui/core/components/icons/icon.js';
import '@brightspace-ui/core/components/button/button.js';
import '@brightspace-ui/core/components/colors/colors.js';
import '@d2l/switch/d2l-switch.js';

class CollectionEditor extends EntityMixinLit(LitElement) {

	constructor() {
		super();
		this._visible = false;
		this._items = [];
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
		usage.onOrganizationChange((organization) => {
			this._organization = organization;
		});
		this._items = [];
		usage.onActivityCollectionChange((collection => {
			collection.onItemsChange((item, index) => {
				this._items[index] = item;
				this.requestUpdate();
			});
		}));
	}

	static get properties() {
		return {
			_visibile: {
				type: Boolean
			},
			_collection: {
				type: Object
			},
			_organization: {
				type: Object
			},
			_items: {
				type: Array
			}
		};
	}

	static get styles() {
		return [ heading1Styles, heading4Styles, bodyCompactStyles, labelStyles, css`
			:host {
				display: block;
			}
			:host([hidden]) {
				display: none;
			}
			.d2l-activity-collection-header {
				box-shadow: inset 0 -1px 0 0 var(--d2l-color-gypsum);
				width: 100%;
				padding: 15px 30px;
			}
			.d2l-activity-collection-title {
				display: flex;
				justify-content: space-between;
				align-items: center;
			}
			.d2l-activity-collection-body {
				padding: 15px 30px;
				background-color: var(--d2l-color-regolith);
				height: 100%;
			}
			.d2l-activity-collection-toggle-container {
				display: flex;
				align-items: center;
			}
		` ];
	}

	_updateVisibility() {
		this._visible = !this._visible;
		this.requestUpdate();
	}

	render() {
		const icon = (this._visible ? 'tier1:visibility-show' : 'tier1:visibility-hide');
		const term = (this._visible ? 'Visible' : 'Hidden');

		return html`
			<div class="d2l-activity-collection-header">
				<div>Edit Learning Path</div>
				<div class="d2l-activity-collection-title">
					<h1 class="d2l-heading-1">${this._organization.name()}</h1>
					<div class="d2l-activity-collection-toggle-container">
						<d2l-switch aria-label="Visibility Toggle" label-right @click="${this._updateVisibility}"></d2l-switch>
						<div class="d2l-label-text"><d2l-icon icon=${icon}></d2l-icon> ${term}</div>
					</div>
				</div>
				<div class="d2l-body-compact">
					${this._organization.description()}
				</div>
			</div>
			<div class="d2l-activity-collection-body">
				<d2l-button primary>Add Activity</d2l-button>
				<div class="d2l-activity-collection-activities">
					<d2l-list>
	${this._items.map(item =>
		html`
			<d2l-activity-usage-list-item href=${item.activityUsageHref()} token=${this.token}></d2l-activity-usage-list-item>
		`
	)}
					</d2l-list>
				</div>
			</div>
		`;
	}
}
customElements.define('d2l-activity-collection-editor', CollectionEditor);
