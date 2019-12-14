import { css, html, LitElement } from 'lit-element/lit-element.js';
import {repeat} from 'lit-html/directives/repeat';
import { heading1Styles, heading4Styles, bodyCompactStyles, labelStyles } from '@brightspace-ui/core/components/typography/styles.js';
import { EntityMixinLit } from 'siren-sdk/src/mixin/entity-mixin-lit.js';
import { ActivityUsageEntity } from 'siren-sdk/src/activities/ActivityUsageEntity.js';
import { NamedEntityMixin } from 'siren-sdk/src/entityAddons/named-entity-mixin.js';
import { DescribableEntityMixin } from 'siren-sdk/src/entityAddons/describable-entity-mixin.js';
import { SimpleEntity } from 'siren-sdk/src/es6/SimpleEntity.js';
import '@brightspace-ui/core/components/icons/icon.js';
import '@brightspace-ui/core/components/button/button.js';
import '@brightspace-ui/core/components/colors/colors.js';
import '@brightspace-ui/core/components/list/list.js';
import '@brightspace-ui/core/components/list/list-item.js';
import 'd2l-organizations/components/d2l-organization-image/d2l-organization-image.js';
import '@brightspace-ui-labs/edit-in-place/d2l-labs-edit-in-place.js';
import '../d2l-activity-editor/d2l-activity-visibility-editor.js';

class CollectionEditor extends EntityMixinLit(LitElement) {

	constructor() {
		super();
		this._items = [];
		this._specialization = {};
		this._setEntityType(ActivityUsageEntity);
	}

	set _entity(entity) {
		if (this._entityHasChanged(entity)) {
			this._onActivityUsageChange(entity);
			super._entity = entity;
		}
	}

	_onActivityUsageChange(usage) {

		usage.onSpecializationChange(NamedEntityMixin(DescribableEntityMixin(SimpleEntity)), (specialization) => {
			this._specialization = specialization;
			this._name = specialization.getName();
			this._description = specialization.getDescription();
		});
		let hasACollection = false;
		usage.onActivityCollectionChange((collection, error) => {
			if (error) {
				return;
			}

			hasACollection = true;
			const items = [];
			let itemsLoadedOnce = false;
			collection.onItemsChange((item, index) => {
				item.onActivityUsageChange((usage) => {
					usage.onOrganizationChange((organization) => {
						items[index] = organization;
						items[index].removeItem = () => collection.removeItem(item.self());
						if (itemsLoadedOnce) {
							this._items = items;
						}
					});
				});
			});

			collection.subEntitiesLoaded().then(() => {
				this._items = items;
				itemsLoadedOnce = true;
			});
		});

		usage.subEntitiesLoaded().then(() => {
			if (!hasACollection) {
				this._items = [];
			}
		});
	}

	static get properties() {
		return {
			_description: { type: String },
			_items: { type: Array },
			_name: { type: String },
			_specialization: { type: Object }
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
				padding: 15px 30px;
			}
			.d2l-activity-collection-base-info {
				display: flex;
				justify-content: space-between;
			}
			.d2l-activity-collection-title-header {
				margin: 6px 0px 0px 0px;
				min-height: 52px;
				overflow: hidden;
				padding: 0px 6px 6px 0px;
			}
			.d2l-activity-visbility-label {
				white-space: nowrap;
			}
			.d2l-activity-collection-description {
				overflow:hidden;
			}
			.d2l-activity-collection-body {
				padding: 15px 6px;
				background-color: var(--d2l-color-regolith);
				height: 100%;
			}
			.d2l-activity-collection-toggle-container {
				display: flex;
				align-self: flex-start;
				margin: 0.55rem 1.5rem;
			}
		` ];
	}

	render() {
		const items = repeat(this._items, (item) => item.self(), item =>
			html`
			<d2l-list-item>
				<d2l-organization-image href=${item.self()} slot="illustration"></d2l-organization-image>
				<d2l-list-item-content>
					${item.name()}
				</d2l-list-item-content>
				<d2l-button-icon slot="actions" text="Remove Course" icon="d2l-tier1:close-default" @click=${item.removeItem}>
			</d2l-list-item>
			`
		);

		return html`
			<div class="d2l-activity-collection-header">
				<div>Edit Learning Path</div>
				<div class="d2l-activity-collection-base-info">
					<div>
						<h1 class="d2l-heading-1 d2l-activity-collection-title-header">
							<d2l-labs-edit-in-place size="49" placeholder="Untitled Learning Path" maxlength="128" value="${this._name}" @change=${this._titleChanged}></d2l-labs-edit-in-place>
						</h1>
						<div class="d2l-body-compact d2l-activity-collection-description">
							<d2l-labs-edit-in-place size="49" placeholder="Enter a description" maxlength="280" value="${this._description}" @change=${this._descriptionChanged}></d2l-labs-edit-in-place>
						</div>
					</div>
					<d2l-activity-visibility-editor class="d2l-activity-collection-toggle-container" ?disabled="${!this._items.length}" .href="${this.href}" .token="${this.token}"></d2l-activity-visibility-editor>
				</div>
			</div>
			<div class="d2l-activity-collection-body">
				<d2l-button primary>Add Activity</d2l-button>
				<div class="d2l-activity-collection-activities">
					<d2l-list>${items}</d2l-list>
				</div>
			</div>
		`;
	}

	_titleChanged(e) {
		this._specialization.setName && this._specialization.setName(e.target.value);
	}

	_descriptionChanged(e) {
		this._specialization.setDescription && this._specialization.setDescription(e.target.value);
	}
}
customElements.define('d2l-activity-collection-editor', CollectionEditor);
