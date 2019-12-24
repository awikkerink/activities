import { css, html, LitElement } from 'lit-element/lit-element.js';
import { repeat } from 'lit-html/directives/repeat';
import { heading1Styles, heading4Styles, bodyCompactStyles, labelStyles} from '@brightspace-ui/core/components/typography/styles.js';
import { EntityMixinLit } from 'siren-sdk/src/mixin/entity-mixin-lit.js';
import { ActivityUsageEntity } from 'siren-sdk/src/activities/ActivityUsageEntity.js';
import { classes as organizationClasses } from 'siren-sdk/src/organizations/OrganizationEntity.js';
import { NamedEntityMixin } from 'siren-sdk/src/entityAddons/named-entity-mixin.js';
import { DescribableEntityMixin } from 'siren-sdk/src/entityAddons/describable-entity-mixin.js';
import { SimpleEntity } from 'siren-sdk/src/es6/SimpleEntity.js';
import { ActionCollectionEntity } from 'siren-sdk/src/activities/ActionCollectionEntity.js';
import { performSirenAction } from 'siren-sdk/src/es6/SirenAction.js';
import { LocalizeMixin } from '@brightspace-ui/core/mixins/localize-mixin.js';
import '@brightspace-ui/core/components/icons/icon.js';
import '@brightspace-ui/core/components/button/button.js';
import '@brightspace-ui/core/components/colors/colors.js';
import '@brightspace-ui/core/components/dialog/dialog.js';
import '@brightspace-ui/core/components/link/link.js';
import '@brightspace-ui/core/components/list/list.js';
import '@brightspace-ui/core/components/list/list-item.js';
import '@brightspace-ui/core/components/list/list-item-content.js';
import '@brightspace-ui/core/components/inputs/input-search.js';
import 'd2l-organizations/components/d2l-organization-image/d2l-organization-image.js';
import '@brightspace-ui-labs/edit-in-place/d2l-labs-edit-in-place.js';
import '../d2l-activity-editor/d2l-activity-visibility-editor.js';
import { getLocalizeResources } from './localization.js';

const baseUrl = import.meta.url;
class CollectionEditor extends LocalizeMixin(EntityMixinLit(LitElement)) {

	constructor() {
		super();
		this._items = [];
		this._candidateItems = [];
		this._specialization = {};
		this._setEntityType(ActivityUsageEntity);
	}

	static async getLocalizeResources(langs) {
		return getLocalizeResources(langs, baseUrl);
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

		this._isDraft = usage.isDraft();
		this._canEditDraft = usage.canEditDraft();
		this._setVisibility = (draftStatus) => {
			this._isDraft = draftStatus;
			usage.setDraftStatus(draftStatus).then(() => usage.update());
		};

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
			this._addExistingAction = collection._entity.getActionByName('start-add-existing-activity');
		});

		usage.subEntitiesLoaded().then(() => {
			if (!hasACollection) {
				this._items = [];
			}
		});
	}

	async getCandidates(action, fields = null, clearList = false) {
		const resp = await performSirenAction(this.token, action, fields, true);
		this._actionCollectionEntity = new ActionCollectionEntity(resp, this._token, null);
		if (clearList) {
			this._candidateItems = [];
		}
		this._actionCollectionEntity._items().forEach(item => {
			item.onActivityUsageChange(async usage => {
				usage.onOrganizationChange((organization) => {
					const alreadyAdded = this._items.findIndex(item => item.self() === organization.self()) >= 0;
					this._candidateItems.push({ item, organization, alreadyAdded });
					if (this._candidateItems.length >= this._actionCollectionEntity._items().length) {
						this.requestUpdate('_candidateItems', []);
					}
				});
			});
		});
	}

	async addActivities() {
		const addAction = this._actionCollectionEntity.getExecuteMultipleAction();
		const keys = this.shadowRoot.querySelector('d2l-dialog d2l-list').getSelectionInfo().keys;
		const fields = [{ name: 'actionStates', value: keys }];
		await performSirenAction(this.token, addAction, fields, true);
	}

	handleSearch(event) {
		const searchAction = this._actionCollectionEntity.getSearchAction();
		const fields = [{ name: 'collectionSearch', value: event.detail.value }];
		this.clearAllSelected();
		this.getCandidates(searchAction, fields, true);
	}

	handleSelectionChange() {
		this._selectionCount = this.shadowRoot.querySelector('d2l-dialog d2l-list').getSelectionInfo().keys.length;
	}

	clearAllSelected() {
		const items = this.shadowRoot.querySelectorAll('d2l-dialog d2l-list d2l-list-item');
		items.forEach(item => item.setSelected(false, false));
	}

	clearDialog() {
		this.clearAllSelected();
		this.shadowRoot.querySelector('.d2l-add-activity-dialog-header d2l-input-search').value = '';
	}

	loadMore() {
		this.getCandidates(this._actionCollectionEntity.getNextAction());
	}

	async open() {
		this.getCandidates(this._addExistingAction, null, true);
		await this.shadowRoot.querySelector('d2l-dialog').open();
	}

	static get properties() {
		return {
			_actionCollectionEntity: { type: Object },
			_addExistingAction: { type: Object },
			_candidateItems: { type: Array },
			_canEditDraft: { type: Boolean },
			_description: { type: String },
			_isDraft: { type: Boolean },
			_items: { type: Array },
			_name: { type: String },
			_selectionCount: { type: Number },
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
			.d2l-activity-collection-base-info {
				display: flex;
				justify-content: space-between;
			}
			.d2l-activity-collection-body {
				margin: auto;
				max-width: 1230px;
				padding: 0 1.5rem;
			}
			.d2l-activity-collection-body-content {
				max-width: 820px;
				padding: 0 0.3rem;
			}
			.d2l-activity-collection-list-actions {
				align-items: baseline;
				display: flex;
				justify-content: space-between;
				margin: 0.9rem 0;
				max-width: 820px;
			}
			.d2l-activity-collection-description {
				margin-bottom: 0.95rem;
			}
			.d2l-activity-collection-header {
				background: white;
				box-shadow: inset 0 -1px 0 0 var(--d2l-color-gypsum);
				padding: 0.75rem 1.5rem 0 1.5rem;
			}
			.d2l-activity-collection-header-content {
				box-sizing: border-box;
				margin: 0 auto;
				max-width: 1230px;
				overflow: hidden;
				padding: 0 0.3rem;
			}
			.d2l-activity-collection-header-col1 {
				max-width: 600px;
			}
			.d2l-activity-collection-title-header {
				margin: 9px 0px 6px 0;
				min-height: 52px;
			}
			.d2l-activity-collection-toggle-container {
				align-self: flex-start;
				display: flex;
				flex-shrink: 0;
				margin: 0.55rem 0 0.55rem 1.5rem;
			}

			.d2l-activity-visbility-label {
				white-space: nowrap;
			}
			.d2l-add-activity-dialog {
				min-height: 500px;
			}
			.d2l-add-activity-dialog-header {
				align-items: baseline;
				display: flex;
				justify-content: space-between;
				padding-bottom: 10px;
			}
			.d2l-add-activity-dialog-load-more {
				padding-top: 10px;
			}
			.d2l-add-activity-dialog-selection-count {
				color: var(--d2l-color-ferrite);
				font-size: 16px;
			}
			.d2l-list-item-secondary {
				color: var(--d2l-color-olivine-minus-1);
				font-size: 14px;
			}
			.d2l-activity-collection-sub-header {
				margin: 0;
			}
			.d2l-activity-collection-toggle-container-button {
				display: none;
			}

			@media only screen and (max-width: 929px) {
				.d2l-activity-collection-header {
					padding-left: 1.2rem;
					padding-right: 1.2rem;
				}
				.d2l-activity-collection-body {
					padding-left: 1.2rem;
					padding-right: 1.2rem;
				}
			}

			@media only screen and (max-width: 615px) {
				.d2l-activity-collection-toggle-container {
					position: fixed;
					right: 1.5rem;
				}
				.d2l-activity-collection-title-header {
					margin-bottom: 0;
					margin-right: 7.5rem;
					min-height: 2.3rem;
				}
				.d2l-activity-collection-header {
					padding-left: 0.8rem;
					padding-right: 0.8rem;
				}
				.d2l-activity-collection-body {
					padding-left: 0.8rem;
					padding-right: 0.8rem;
				}
			}
			@media only screen and (max-width: 480px) {
				.d2l-activity-collection-toggle-container-button {
					display: block;
					position: fixed;
					right: 1.5rem;
					margin-top: 0.35rem;
				}
				.d2l-activity-collection-toggle-container {
					display: none;
				}
				.d2l-activity-collection-title-header {
					margin-right: 2.1rem;
				}
			}
		` ];
	}

	render() {
		const icon = (this._isDraft ? 'tier1:visibility-hide' : 'tier1:visibility-show');

		const items = repeat(this._items, (item) => item.self(), item =>
			html`
			<d2l-list-item>
				<d2l-organization-image href=${item.self()} slot="illustration"></d2l-organization-image>
				<d2l-list-item-content>
					${item.name()}
					<div slot="secondary">${item.hasClass(organizationClasses.courseOffering) ? this.localize('course') : null}</div>
				</d2l-list-item-content>
				<d2l-button-icon slot="actions" text="${this.localize('removeActivity', 'courseName', item.name())}" icon="d2l-tier1:close-default" @click=${item.removeItem}>
			</d2l-list-item>
			`
		);

		return html`
			<div class="d2l-activity-collection-header">
				<div class="d2l-activity-collection-header-content">
					<div class="d2l-heading-4 d2l-activity-collection-sub-header">${this.localize('editLearningPath')}</div>
					<div class="d2l-activity-collection-base-info">
						<div class="d2l-activity-collection-header-col1">
							<h1 class="d2l-heading-1 d2l-activity-collection-title-header">
								<d2l-labs-edit-in-place size="49" placeholder="${this.localize('untitledLearningPath')}" maxlength="128" value="${this._name}" @change=${this._titleChanged}></d2l-labs-edit-in-place>
							</h1>
							<div class="d2l-body-compact d2l-activity-collection-description">
								<d2l-labs-edit-in-place size="49" placeholder="${this.localize('enterADescription')}" maxlength="280" value="${this._description}" @change=${this._descriptionChanged}></d2l-labs-edit-in-place>
							</div>
						</div>
						<d2l-activity-visibility-editor class="d2l-activity-collection-toggle-container" ?disabled="${!this._items.length}" .href="${this.href}" .token="${this.token}"></d2l-activity-visibility-editor>
						<d2l-button-icon
							class="d2l-activity-collection-toggle-container-button"
							?disabled="${!this._canEditDraft || this.disabled}"
							@click="${() => typeof this._setVisibility === 'function' && this._setVisibility(!this._isDraft)}"
							icon=${icon}>
						</d2l-button-icon>
					</div>
				</div>
			</div>
			<div class="d2l-activity-collection-body">
				<div class="d2l-activity-collection-body-content">
					<div class="d2l-activity-collection-list-actions">
						<d2l-button @click="${this.open}" primary>${this.localize('addActivity')}</d2l-button>
						<div class="d2l-body-compact">${this.localize('numberOfActivities', 'count', this._items.length)}</div>
					</div>
					<div class="d2l-activity-collection-activities">
						<d2l-list>${items}</d2l-list>
					</div>
				</div>
			</div>
			${this._renderCandidates()}

		`;
	}

	_renderCandidates() {
		const candidates = repeat(this._candidateItems, (candidate) => candidate.item.getActionState(), candidate =>
			html`
			<d2l-list-item ?selectable=${!candidate.alreadyAdded} key=${candidate.item.getActionState()}>
				<d2l-organization-image href=${candidate.organization.self()} slot="illustration"></d2l-organization-image>
				<d2l-list-item-content>
					${candidate.organization.name()}
					<div slot="secondary" class="d2l-list-item-secondary">${candidate.alreadyAdded ? html`${this.localize('alreadyAdded')}` : null}</div>
				<d2l-list-item-content>
			</d2l-list-item>
			`
		);

		const selectedNav = this._selectionCount > 0
			? html`${this.localize('selected', 'count', this._selectionCount)} <d2l-link @click=${this.clearAllSelected}>${this.localize('clearSelected')}</d2l-link>`
			: null;

		return html`
				<div class="dialog-div">
				<d2l-dialog id="dialog" title-text="${this.localize('browseActivityLibrary')}" @d2l-dialog-close=${this.clearDialog}>
					<div class="d2l-add-activity-dialog">
						<div class="d2l-add-activity-dialog-header">
							<div>
								<d2l-input-search label="${this.localize('search')}" @d2l-input-search-searched=${this.handleSearch}></d2l-input-search>
							</div>
							<div class="d2l-add-activity-dialog-selection-count">${selectedNav}</div>
						</div>
						<d2l-list @d2l-list-selection-change=${this.handleSelectionChange}>${candidates}</d2l-list>
						<div class="d2l-add-activity-dialog-load-more">
							${this._actionCollectionEntity && this._actionCollectionEntity.getNextAction() ? html`<d2l-button @click=${this.loadMore}>${this.localize('loadMore')}</d2l-button>` :	null}
						</div>
					</div>

					<d2l-button slot="footer" primary dialog-action="add" @click=${this.addActivities}>${this.localize('add')}</d2l-button>
					<d2l-button slot="footer" dialog-action>${this.localize('cancel')}</d2l-button>
				</d2l-dialog>

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
