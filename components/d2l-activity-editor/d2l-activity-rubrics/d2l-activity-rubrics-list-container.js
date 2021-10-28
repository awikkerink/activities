import './d2l-activity-rubrics-list-editor';
import 'd2l-associations/add-associations.js';
import 'd2l-rubric/d2l-rubric-editor.js';
import '@brightspace-ui/core/components/dialog/dialog-fullscreen.js';
import '@brightspace-ui/core/components/dropdown/dropdown.js';
import '@brightspace-ui/core/components/dropdown/dropdown-content.js';
import '@brightspace-ui/core/components/menu/menu.js';
import '@brightspace-ui/core/components/menu/menu-item.js';
import '@brightspace-ui/core/components/button/floating-buttons.js';
import '@brightspace-ui/core/components/button/button.js';
import { css, html } from 'lit-element/lit-element.js';
import { accordionStyles } from '../styles/accordion-styles';
import { ActivityEditorMixin } from '../mixins/d2l-activity-editor-mixin.js';
import { announce } from '@brightspace-ui/core/helpers/announce.js';
import { shared as assignmentStore } from '../../d2l-activity-editor/d2l-activity-assignment-editor/state/assignment-store.js';
import { Association } from 'siren-sdk/src/activities/Association.js';
import associationStore from './state/association-collection-store.js';
import { labelStyles } from '@brightspace-ui/core/components/typography/styles.js';
import { LocalizeActivityEditorMixin } from '../mixins/d2l-activity-editor-lang-mixin.js';
import { MobxLitElement } from '@adobe/lit-mobx';
import { RtlMixin } from '@brightspace-ui/core/mixins/rtl-mixin.js';
import { selectStyles } from '@brightspace-ui/core/components/inputs/input-select-styles.js';

class ActivityRubricsListContainer extends ActivityEditorMixin(RtlMixin(LocalizeActivityEditorMixin(MobxLitElement))) {

	static get properties() {
		return {
			_newlyCreatedPotentialAssociationHref: { type: String },
			_isFirstLoad: { type: Boolean },
			activityUsageHref: { type: String },
			assignmentHref: { type: String },
			indirectAssociationsHref: { type: String }
		};
	}

	static get styles() {
		return [
			labelStyles,
			selectStyles,
			accordionStyles,
			css`
				d2l-dropdown-button-subtle {
					margin-bottom: 0.6rem;
					margin-left: -0.6rem;
				}
			`
		];
	}

	constructor() {
		super(associationStore);
		this._newlyCreatedPotentialAssociation = {};
		this._newlyCreatedPotentialAssociationHref = '';
		this._isFirstLoad = true;
	}

	connectedCallback() {
		super.connectedCallback();

		this._richTextEnabled = this._dispatchRequestProvider('d2l-provider-html-editor-enabled');
		this._newBrightspaceEditorRubricsEnabled = this._dispatchRequestProvider('d2l-provider-html-new-editor-enabled');
	}

	render() {
		const entity = associationStore.get(this.href);

		if (!entity) {
			return html``;
		}

		return html`
			<div class="d2l-label-text">
				${this.localize('rubrics.hdrRubrics')}
			</div>
			<d2l-activity-rubrics-list-editor
				href="${this.href}"
				.activityUsageHref=${this.activityUsageHref}
				.token=${this.token}
				.assignmentHref=${this.assignmentHref}
				.indirectAssociationsHref=${this.indirectAssociationsHref}
			>
			</d2l-activity-rubrics-list-editor>

			${this._renderAddRubricDropdown(entity)}

			${this._renderDefaultScoringRubric()}

			<d2l-dialog-fullscreen
				id="create-new-association-dialog"
				@d2l-dialog-close="${this._onDialogClose}"
				title-text = ${this.localize('rubrics.hdrCreateRubric')}>
				${this._renderRubricEditor()}
				<d2l-button slot="footer" primary  @click="${this._attachRubric}">
					${this.localize('rubrics.btnAttachRubric')}
				</d2l-button>
				<d2l-button slot="footer" @click="${this._closeEditNewAssociationDialog}">
					${this.localize('rubrics.btnCancel')}
				</d2l-button>
			</d2l-dialog-fullscreen>

			<d2l-dialog
				id="attach-rubric-dialog"
				@associations-done-work="${this._closeAttachRubricDialog}"
				@associations-resize-dialog="${this._resizeDialog}"
				width="700"
				title-text="${this.localize('rubrics.txtAddExisting')}"
			>
				<d2l-add-associations
					.token="${this.token}"
					.href="${this.activityUsageHref}"
					type="rubrics"
					skipSave
				></d2l-add-associations>
			</d2l-dialog>
		`;
	}
	updated(changedProperties) {
		super.updated(changedProperties);

		if ((changedProperties.has('indirectAssociationsHref') || changedProperties.has('token')) &&
			this.indirectAssociationsHref && this.token) {

			associationStore.fetch(this.indirectAssociationsHref, this.token);
		}
	}

	cancelChanges() {
		this._isValidDefaultScoringRubric();
	}

	_attachRubric() {
		const entity = associationStore.get(this.href);

		if (!entity) {
			return;
		}

		entity.addAssociations([this._newlyCreatedPotentialAssociation]);

		this._closeEditNewAssociationDialog();
		announce(this.localize('rubrics.txtRubricAdded'));
	}
	_clearNewRubricHref() {
		this._newlyCreatedPotentialAssociationHref = '';
	}
	_closeAttachRubricDialog(e) {
		const entity = associationStore.get(this.href);

		if (e && e.detail && e.detail.associations) {

			entity.addAssociations(e.detail.associations);

			announce(this.localize('rubrics.txtRubricAdded'));
		}
		this._toggleDialog(false);
	}
	_closeEditNewAssociationDialog() {
		const editNewAssociationDialog =
			this.shadowRoot.querySelector('#create-new-association-dialog');
		if (editNewAssociationDialog) {
			this._clearNewRubricHref();
			editNewAssociationDialog.opened = false;
		}
	}
	async _createNewAssociation() {

		const entity = associationStore.get(this.href);
		if (!entity) {
			return;
		}

		this._newlyCreatedPotentialAssociation = await entity.createPotentialAssociation();

		if (!this._newlyCreatedPotentialAssociation) {
			return;
		}

		const potentialAssociationEntity = new Association(
			this._newlyCreatedPotentialAssociation,
			this.token
		);

		this._newlyCreatedPotentialAssociationHref = potentialAssociationEntity.getRubricLink();

		const editNewAssociationDialog = this.shadowRoot.querySelector('#create-new-association-dialog');
		if (editNewAssociationDialog) {
			editNewAssociationDialog.opened = true;
		}

	}
	_dedupeDefaultScoringRubricOptions(defaultScoringRubricOptions) {
		const dedupedOptions = new Map();
		defaultScoringRubricOptions.map((option) => {
			dedupedOptions.set(option.value, option.title);
		});
		const dedupedDefaultScoringRubricOptions = [];
		dedupedOptions.forEach((optionTitle, optionValue) => dedupedDefaultScoringRubricOptions.push(
			{
				title: optionTitle,
				value: optionValue
			})
		);
		return dedupedDefaultScoringRubricOptions;
	}
	_dispatchRequestProvider(key) {
		const event = new CustomEvent('d2l-request-provider', {
			detail: { key: key },
			bubbles: true,
			composed: true,
			cancelable: true
		});

		this.dispatchEvent(event);

		return event.detail.provider;
	}
	async _isValidDefaultScoringRubric() {
		const entity = associationStore.get(this.href);
		const indirectAssociations = associationStore.get(this.indirectAssociationsHref);
		const assignment = assignmentStore.get(this.assignmentHref);

		if (!entity || !assignment || !indirectAssociations) {
			return false;
		}

		const defaultScoringRubricOptions = this._dedupeDefaultScoringRubricOptions([...entity.defaultScoringRubricOptions, ...indirectAssociations.defaultScoringRubricOptions]);
		if (assignment.defaultScoringRubricId === '-2' || assignment.defaultScoringRubricId === '-1' || assignment.defaultScoringRubricId === '0') {
			return true; // If the value is -2: Control not present (Legacy), -1: No default selected, 0: If `null` is ever cast to a Number
		}

		const isDefaultScoringRubricValidOption = defaultScoringRubricOptions.some(
			(opts) => String(opts.value) === assignment.defaultScoringRubricId
		);

		if (!isDefaultScoringRubricValidOption) {
			// An indirectly associated rubric can be used as an option, Assignment saved, remove it, close the page and leave `defaultScoringRubricId` now invalid.
			assignment.resetDefaultScoringRubricId();
			await assignment._entity.save({ defaultScoringRubricId: -1 });
		}
		return isDefaultScoringRubricValidOption;
	}
	_onDialogClose(e) {
		const editNewAssociationDialog = this.shadowRoot.querySelector('#create-new-association-dialog');
		// only update when the dialog closes, not any nested popups that bubble a close event
		if (editNewAssociationDialog && e.target === editNewAssociationDialog) this._clearNewRubricHref();
	}
	_openAttachRubricDialog() {
		this._toggleDialog(true);
	}
	_renderAddRubricDropdown(entity) {

		const canCreatePotentialAssociation = entity.canCreatePotentialAssociation();
		const canCreateAssociation = entity.canCreateAssociation();

		const canEditRubricAssociation = canCreatePotentialAssociation || canCreateAssociation;

		return html`
		<d2l-dropdown-button-subtle
			text="${this.localize('rubrics.btnAddRubric')}"
			?disabled="${!canEditRubricAssociation}"
		>
			<d2l-dropdown-menu align="start">
				<d2l-menu label="${this.localize('rubrics.btnAddRubric')}">
					<d2l-menu-item
						text="${this.localize('rubrics.btnCreateNew')}"
						@d2l-menu-item-select="${this._createNewAssociation}"
						?hidden=${!canCreatePotentialAssociation}
					>
					</d2l-menu-item>
					<d2l-menu-item
						text="${this.localize('rubrics.btnAddExisting')}"
						@d2l-menu-item-select="${this._openAttachRubricDialog}"
						?hidden=${!canCreateAssociation}
					>
					</d2l-menu-item>
				</d2l-menu>
			</d2l-dropdown-menu>
		</d2l-dropdown-button-subtle>
		`;

	}
	_renderDefaultScoringRubric() {
		const entity = associationStore.get(this.href);
		const indirectAssociations = associationStore.get(this.indirectAssociationsHref);
		const assignment = assignmentStore.get(this.assignmentHref);

		if (!entity || !assignment || !indirectAssociations) {
			return html``;
		}

		const defaultScoringRubricOptions = this._dedupeDefaultScoringRubricOptions([...entity.defaultScoringRubricOptions, ...indirectAssociations.defaultScoringRubricOptions]);
		const isReadOnly = !assignment.canEditDefaultScoringRubric;

		if (!defaultScoringRubricOptions || defaultScoringRubricOptions.length <= 1) {
			return html``;
		}
		if (this._isFirstLoad) {
			this._isFirstLoad = !this._isValidDefaultScoringRubric(); // On Assignment load, ensure a rubric ID is associated and hence a valid option
		}

		if (assignment.defaultScoringRubricId === null) {
			assignment.resetDefaultScoringRubricId();
		}

		return html`
			<div class="d2l-label-text" id="assignment-default-scoring-rubric-label">
				${this.localize('rubrics.defaultScoringRubric')}
			</div>
			<select
				id="assignment-default-scoring-rubric"
				aria-labelledby="assignment-default-scoring-rubric-label"
				class="d2l-input-select block-select"
				@change="${this._saveDefaultScoringRubricOnChange}"
				?disabled=${isReadOnly}>
					<option value="-1" ?selected=${'-1' === assignment.defaultScoringRubricId}>${this.localize('rubrics.noDefaultScoringRubricSelected')}</option>
					${defaultScoringRubricOptions.map(option => html`<option value=${option.value} ?selected=${String(option.value) === assignment.defaultScoringRubricId}>${option.title}</option>`)}
			</select>
		`;

	}
	_renderRubricEditor() {
		if (this._newlyCreatedPotentialAssociationHref !== '') {
			return html`
				<d2l-rubric-editor
					.href="${this._newlyCreatedPotentialAssociationHref}"
					.token="${this.token}"
					?use-new-brightspace-editor="${this._newBrightspaceEditorRubricsEnabled}"
					?rich-text-enabled="${this._richTextEnabled}"
					title-dropdown-hidden
					title-hidden>
				</d2l-rubric-editor>`;
		} else {
			return html``;
		}
	}

	_resizeDialog(e) {
		e.currentTarget.resize();
	}

	_saveDefaultScoringRubricOnChange(event) {
		const assignment = assignmentStore.get(this.assignmentHref);

		if (!assignment) {
			return;
		}

		assignment.setDefaultScoringRubric(event.target.value);
	}
	_toggleDialog(toggle) {

		const dialog = this.shadowRoot.querySelector('#attach-rubric-dialog');
		if (dialog) {
			if (toggle) {
				this.shadowRoot.querySelector('d2l-add-associations').reset();
			}
			dialog.opened = toggle;
		}
	}

}
customElements.define('d2l-activity-rubrics-list-container', ActivityRubricsListContainer);
