import 'd2l-inputs/d2l-input-text.js';
import './d2l-assignment-turnitin-editor';
import '../d2l-activity-availability-dates-editor.js';
import '../d2l-activity-due-date-editor.js';
import '../d2l-activity-release-conditions-editor.js';
import 'd2l-inputs/d2l-input-checkbox.js';
import '../d2l-activity-text-editor.js';
import '../d2l-activity-visibility-editor.js';
import '../d2l-activity-attachments/d2l-activity-attachments-editor.js';
import { bodySmallStyles, heading4Styles, labelStyles } from '@brightspace-ui/core/components/typography/styles.js';
import { css, html, LitElement } from 'lit-element/lit-element.js';
import { Debouncer } from '@polymer/polymer/lib/utils/debounce.js';
import { ErrorHandlingMixin } from '../error-handling-mixin.js';
import { getLocalizeResources } from '../localization.js';
import { LocalizeMixin } from '@brightspace-ui/core/mixins/localize-mixin.js';
import { selectStyles } from '../select-styles.js';
import { timeOut } from '@polymer/polymer/lib/utils/async.js';
import { ActivityEditorMixin } from '../d2l-activity-editor-mixin.js';
import { connect } from '../connect-mixin.js';
import reducer, {
	storeName,
	selectAssignment,
	selectAssignmentEntity,
	actions
} from './state/assignment.js';

class AssignmentEditorDetail extends ErrorHandlingMixin(connect(ActivityEditorMixin(LocalizeMixin(LitElement)))) {

	static get properties() {
		return {
			htmlEditorEnabled: { type: Boolean },
			_name: { type: String },
			_nameError: { type: String },
			_instructions: { type: String },
			_entity: { type: Object },
			_submissionType: { type: Number },
			_completionType: { type: Number },
			_annotationToolsAvailable: { type: Boolean },
		};
	}

	static get styles() {
		return [
			bodySmallStyles,
			heading4Styles,
			labelStyles,
			selectStyles,
			css`
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

			.d2l-heading-4 {
				margin: 0 0 0.6rem 0;
			}

			.d2l-body-small {
				margin: 0 0 0.3rem 0;
			}
			`
		];
	}

	static async getLocalizeResources(langs) {
		return getLocalizeResources(langs, import.meta.url);
	}

	constructor() {
		super();
		this._debounceJobs = {};
		this._storeName = storeName;
	}

	get _reducers() {
		return reducer;
	}

	_mapStateToProps(state) {
		const assignment = selectAssignment(state, this.href, this.token);
		return assignment ? {
			_name: assignment.name,
			_instructions: assignment.instructions,
			_submissionType: assignment.submissionType,
			_completionType: assignment.completionType,
			_annotationToolsAvailable: assignment.annotationToolsAvailable,
			_entity: selectAssignmentEntity(state, this.href, this.token),
		} : {};
	}

	_mapDispatchToProps(dispatch) {
		const dispatchAndSave = this._autoSave ? async (action) => {
			await dispatch(action);
			this.save();
		} : dispatch;
		return {
			_fetchAssignment: () => dispatch(actions.fetchAssignment(this.href, this.token)),
			_updateName: (name) => dispatchAndSave(actions.updateName({ href: this.href, token: this.token, name })),
			_updateInstructions: (instructions) => dispatchAndSave(actions.updateInstructions({ href: this.href, token: this.token, instructions })),
			_updateSubmissionType: (submissionType) => dispatchAndSave(actions.updateSubmissionType({ href: this.href, token: this.token, submissionType })),
			_updateCompletionType: (completionType) => dispatchAndSave(actions.updateCompletionType({ href: this.href, token: this.token, completionType })),
			_updateAnnotationToolsAvailable: (annotationToolsAvailable) => dispatchAndSave(actions.updateAnnotationToolsAvailable({ href: this.href, token: this.token, annotationToolsAvailable })),
			_saveAssignmentDetails: () => dispatch(actions.saveAssignmentDetails({ href: this.href, token: this.token }))
		}
	}

	async save() {
		await this._saveAssignmentDetails();
	}

	updated(changedProperties) {
		super.updated(changedProperties);

		if ((changedProperties.has('href') || changedProperties.has('token')) &&
			this.href && this.token) {
			this._fetchAssignment();
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
			() => this._updateInstructions(instructions)
		);
	}

	_saveSubmissionTypeOnChange() {
		const submissionType = this.shadowRoot.querySelector('select#assignment-submission-type').value;
		this._updateSubmissionType(submissionType);
	}

	_saveCompletionTypeOnChange() {
		const completionType = this.shadowRoot.querySelector('select#assignment-completion-type').value;
		this._updateCompletionType(completionType);
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

	get _renderSubmissionType() {
		const submissionTypes = this._entity.submissionTypeOptions()
		return html`
			<div id="assignment-submission-type-container">
				<label class="d2l-label-text" for="assignment-submission-type">${this.localize('submissionType')}</label>
				<select
					id="assignment-submission-type"
					@change="${this._saveSubmissionTypeOnChange}"
					?disabled="${!this._entity.canEditSubmissionType()}">
						${submissionTypes.map(option => html`<option value=${option.value} ?selected=${String(option.value) === this._submissionType}>${option.title}</option>`)}
				</select>
			</div>
		`;
	}

	get _renderCompletionType() {
		const completionTypes = this._entity.validCompletionTypeOptions(this._submissionType);
		return html`
			<div id="assignment-completion-type-container" ?hidden="${!completionTypes.length > 0}">
				<label class="d2l-label-text" for="assignment-completion-type">${this.localize('completionType')}</label>
				<select
					id="assignment-completion-type"
						@change="${this._saveCompletionTypeOnChange}"
						?disabled="${!this._entity.canEditCompletionType()}">
							${completionTypes.map(option => html`<option value=${option.value} ?selected=${String(option.value) === this._completionType}>${option.title}</option>`)}
				</select>
			</div >
		`;
	}

	_toggleAnnotationToolsAvailability() {
		this._updateAnnotationToolsAvailable(!this._annotationToolsAvailable);
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

			<div id="assignment-attachments-editor-container" ?hidden="${!this._entity.attachmentsCollectionHref()}">
				<d2l-activity-attachments-editor
					.href="${this._entity.attachmentsCollectionHref()}"
					.token="${this.token}">
				</d2l-activity-attachments-editor>
			</div>

			${this._renderSubmissionType}
			${this._renderCompletionType}

			<div id="availability-dates-container">
				<d2l-activity-availability-dates-editor
					.href="${this._entity.activityUsageHref()}"
					.token="${this.token}">
				</d2l-activity-availability-dates-editor>
			</div>

			<div id="assignment-release-conditions-container">
				<h3 class="d2l-heading-4">${this.localize('hdrReleaseConditions')}</h3>
				<p class="d2l-body-small">${this.localize('hlpReleaseConditions')}</p>
				<d2l-activity-release-conditions-editor
					.href="${this._entity.activityUsageHref()}"
					.token="${this.token}">
				</d2l-activity-release-conditions-editor>
			</div>

			<d2l-assignment-turnitin-editor .token="${this.token}" .href="${this.href}">
			</d2l-assignment-turnitin-editor>

			<div id="annotations-checkbox-container" ?hidden="${!this._entity.canSeeAnnotations()}">
				<label class="d2l-label-text">${this.localize('annotationTools')}</label>
					<d2l-input-checkbox
						@change="${this._toggleAnnotationToolsAvailability}"
						?checked="${this._annotationToolsAvailable}"
						ariaLabel="${this.localize('annotationToolDescription')}">
						${this.localize('annotationToolDescription')}
					</d2l-input-checkbox>
			</div>
		`;
	}
}
customElements.define('d2l-activity-assignment-editor-detail', AssignmentEditorDetail);
