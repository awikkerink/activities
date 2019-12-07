import 'd2l-inputs/d2l-input-text.js';
import '../d2l-activity-due-date-editor.js';
import 'd2l-inputs/d2l-input-checkbox.js';
import '../d2l-activity-text-editor.js';
import '../d2l-activity-visibility-editor.js';
import '../d2l-activity-attachments/d2l-activity-attachments-editor.js';
import { css, html, LitElement } from 'lit-element/lit-element.js';
import { Debouncer } from '@polymer/polymer/lib/utils/debounce.js';
import { ErrorHandlingMixin } from '../error-handling-mixin.js';
import { getLocalizeResources } from '../localization.js';
import { labelStyles } from '@brightspace-ui/core/components/typography/styles.js';
import { LocalizeMixin } from '@brightspace-ui/core/mixins/localize-mixin.js';
import { selectStyles } from '../select-styles.js';
import { timeOut } from '@polymer/polymer/lib/utils/async.js';
import { connect } from '../connect-mixin.js';
import { ActivityEditorMixin } from '../d2l-activity-editor-mixin.js';
import reducer, { fetchEntity, selectActivity, selectActivityEntity, updateName, updateInstructions } from './state/assignment.js';

class AssignmentEditorDetail extends ErrorHandlingMixin(connect(ActivityEditorMixin(LocalizeMixin(LitElement)))) {

	static get properties() {
		return {
			htmlEditorEnabled: { type: Boolean },
			_name: { type: String },
			_nameError: { type: String },
			_instructions: { type: String },
			_entity: { type: Object },
			_canEditName: { type: Boolean },
			_instructionsRichTextEditorConfig: { type: Object },
			_canEditInstructions: { type: Boolean },
			_activityUsageHref: { type: String },
			_submissionTypes: { type: Array },
			_canEditSubmissionType: { type: Boolean },
			_completionTypes: { type: Array },
			_canEditCompletionType: { type: Boolean },
			_showCompletionType: { type: Boolean },
			_canSeeAnnotations: {type: Boolean },
			_annotationToolsAvailable: { type: Boolean },
			_attachmentsHref: { type: String }
		};
	}

	static get styles() {
		return [labelStyles, selectStyles, css`
			:host {
				display: block;
			}
			:host([hidden]) {
				display: none;
			}
			:host > div {
				padding-bottom: 20px;
			}

			select {
				width: 300px;
				display: block;
			}
		`];
	}

	static async getLocalizeResources(langs) {
		return getLocalizeResources(langs, import.meta.url);
	}

	constructor() {
		super();
		this._debounceJobs = {};

		this._submissionTypes = [];
		this._completionTypes = [];
	}

	// set _entity(entity) {
	// 	if (this._entityHasChanged(entity)) {
	// 		this._onAssignmentChange(entity);
	// 		super._entity = entity;
	// 	}
	// }

	// _onAssignmentChange(assignment) {
	// 	if (!assignment) {
	// 		return;
	// 	}

	// 	this._name = assignment.name();
	// 	this._canEditName = assignment.canEditName();
	// 	this._instructions = assignment.instructionsEditorHtml();
	// 	this._instructionsRichTextEditorConfig = assignment.instructionsRichTextEditorConfig();
	// 	this._canEditInstructions = assignment.canEditInstructions();
	// 	this._activityUsageHref = assignment.activityUsageHref();
	// 	this._submissionTypes = assignment.submissionTypeOptions();
	// 	this._canEditSubmissionType = assignment.canEditSubmissionType();
	// 	this._completionTypes = assignment.completionTypeOptions();
	// 	this._canEditCompletionType = assignment.canEditCompletionType();
	// 	this._canSeeAnnotations = assignment.canSeeAnnotations();
	// 	this._annotationToolsAvailable = assignment.getAvailableAnnotationTools();
	// 	this._attachmentsHref = assignment.attachmentsCollectionHref();
	// }

	get _reducers() {
		return reducer;
	}

	_mapStateToProps(state) {
		const assignment = selectActivity(state, this.href, this.token);
		return assignment ? {
			_name: assignment.name,
			_instructions: assignment.instructions,
			_entity: selectActivityEntity(state, this.href, this.token),
		} : {};
	}

	_mapDispatchToProps(dispatch) {
		return {
			_fetchEntity: () => dispatch(fetchEntity(this.href, this.token)),
			_updateName: (name) => dispatch(updateName({ href: this.href, token: this.token, name })),
			_saveInstructions: (instructions) => dispatch(updateInstructions({ href: this.href, token: this.token, instructions }))
		}
	}

	updated(changedProperties) {
		super.updated(changedProperties);

		if ((changedProperties.has('href') || changedProperties.has('token')) &&
			this.href && this.token) {
			this._fetchEntity();
		}
	}

	_saveOnChange(jobName) {
		this._debounceJobs[jobName] && this._debounceJobs[jobName].flush();
	}

	_saveNameOnInput(e) {
		const name = e.target.value;
		const isNameEmpty = (name || '').trim().length === 0;

		const errorProperty = '_nameError';
		const emptyNameErrorLangterm = 'emptyNameError';
		const tooltipId = 'name-tooltip';

		if (isNameEmpty) {
			this.setError(errorProperty, emptyNameErrorLangterm, tooltipId);
		} else {
			this.clearError(errorProperty);
			this._debounceJobs.name = Debouncer.debounce(
				this._debounceJobs.name,
				timeOut.after(500),
				() => this._updateName(name)
			);
		}
	}

	_saveInstructionsOnChange(e) {
		const instructions = e.detail.content;

		this._debounceJobs.instructions = Debouncer.debounce(
			this._debounceJobs.instructions,
			timeOut.after(500),
			() => this._saveInstructions(instructions)
		);
	}

	_saveSubmissionTypeOnChange() {
		const submissionType = this.shadowRoot.querySelector('select#assignment-submission-type').value;
		this.wrapSaveAction(super._entity.setSubmissionType(submissionType));
	}

	_saveCompletionTypeOnChange() {
		const completionType = this.shadowRoot.querySelector('select#assignment-completion-type').value;
		this.wrapSaveAction(super._entity.setCompletionType(completionType));
	}

	_getNameTooltip() {
		if (this._nameError) {
			return html`
				<d2l-tooltip
					id="name-tooltip"
					for="assignment-name"
					position="bottom"
					?showing="${this._nameError}">
					${this._nameError}
				</d2l-tooltip>
			`;
		}
	}

	_getSubmissionTypeOptions() {
		return html`
			${this._submissionTypes.map(option => html`<option value=${option.value} ?selected=${option.selected}>${option.title}</option>`)}
		`;
	}

	_getCompletionTypeOptions() {
		return html`
			${this._completionTypes.map(option => html`<option value=${option.value} ?selected=${option.selected}>${option.title}</option>`)}
		`;
	}

	_toggleAnnotationToolsAvailability() {
		this._annotationToolsAvailable = !this._annotationToolsAvailable;
		this.wrapSaveAction(super._entity.setAnnotationToolsAvailability(this._annotationToolsAvailable));
	}

	render() {
		if (!this._entity) {
			return html``;
		}

		return html`
			<div id="assignment-visibility-container">
				<d2l-activity-visibility-editor
					.href="${this._entity.activityUsageHref()}"
					.token="${this.token}">
				</d2l-activity-visibility-editor>
			</div>
			<div id="assignment-name-container">
				<label class="d2l-label-text" for="assignment-name">${this.localize('name')}*</label>
				<d2l-input-text
					id="assignment-name"
					value="${this._name}"
					@change="${this._saveOnChange('name')}"
					@input="${this._saveNameOnInput}"
					aria-label="${this.localize('name')}"
					?disabled="${!this._entity.canEditName()}"
					aria-invalid="${this._nameError ? 'true' : ''}"
					prevent-submit>
				</d2l-input-text>
				${this._getNameTooltip()}
			</div>

			<div id="duedate-container">
				<label class="d2l-label-text">${this.localize('dueDate')}</label>
				<d2l-activity-due-date-editor
					.href="${this._entity.activityUsageHref()}"
					.token="${this.token}">
				</d2l-activity-due-date-editor>
			</div>

			<div id="assignment-instructions-container">
				<label class="d2l-label-text">${this.localize('instructions')}</label>
				<d2l-activity-text-editor
					value="${this._instructions}"
					?htmlEditorEnabled="${this.htmlEditorEnabled}"
					.richtextEditorConfig="${this._entity.instructionsRichTextEditorConfig()}"
					@d2l-activity-text-editor-change="${this._saveInstructionsOnChange}"
					ariaLabel="${this.localize('instructions')}"
					?disabled="${!this._entity.canEditInstructions()}">
				</d2l-activity-text-editor>
			</div>

			<div id="assignment-submission-type-container">
				<label class="d2l-label-text" for="assignment-submission-type">${this.localize('submissionType')}</label>
				<select
					id="assignment-submission-type"
					@change="${this._saveSubmissionTypeOnChange}"
					?disabled="${!this._canEditSubmissionType}">

					${this._getSubmissionTypeOptions()}
				</select>
			</div>

			<div id="assignment-completion-type-container" ?hidden="${!this._completionTypes.length > 0}">
				<label class="d2l-label-text" for="assignment-completion-type">${this.localize('completionType')}</label>
				<select
					id="assignment-completion-type"
					@change="${this._saveCompletionTypeOnChange}"
					?disabled="${!this._canEditCompletionType}">

					${this._getCompletionTypeOptions()}
				</select>
			</div>

			<div id="assignment-attachments-editor-container" ?hidden="${!this._attachmentsHref}">
				<d2l-activity-attachments-editor
					.href="${this._attachmentsHref}"
					.token="${this.token}">
				</d2l-activity-attachments-editor>
			</div>

			<div id="annotations-checkbox-container" ?hidden="${!this._canSeeAnnotations}">
				<label class="d2l-label-text">${this.localize('annotationTools')}</label>
					<d2l-input-checkbox
						@change="${this._toggleAnnotationToolsAvailability}"
						?checked="${this._annotationToolsAvailable}">
						ariaLabel=${this.localize('annotationToolDescription')}>
						${this.localize('annotationToolDescription')}
					</d2l-input-checkbox>
			</div>

		`;
	}
}
customElements.define('d2l-activity-assignment-editor-detail', AssignmentEditorDetail);
