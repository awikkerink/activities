import 'd2l-inputs/d2l-input-text.js';
import '../d2l-activity-due-date-editor.js';
import '../d2l-activity-html-editor.js';
import { css, html, LitElement } from 'lit-element/lit-element.js';
import { AssignmentEntity } from 'siren-sdk/src/activities/assignments/AssignmentEntity.js';
import { Debouncer } from '@polymer/polymer/lib/utils/debounce.js';
import { EntityMixinLit } from 'siren-sdk/src/mixin/entity-mixin-lit.js';
import { ErrorHandlingMixin } from '../error-handling-mixin.js';
import { getLocalizeResources } from './localization.js';
import { labelStyles } from '@brightspace-ui/core/components/typography/styles.js';
import { LocalizeMixin } from '@brightspace-ui/core/mixins/localize-mixin.js';
import { SirenFetchMixinLit } from 'siren-sdk/src/mixin/siren-fetch-mixin-lit.js';
import { timeOut } from '@polymer/polymer/lib/utils/async.js';

class AssignmentEditorDetail extends ErrorHandlingMixin(SirenFetchMixinLit(EntityMixinLit(LocalizeMixin(LitElement)))) {

	static get properties() {
		return {
			_name: { type: String },
			_nameError: { type: String },
			_instructions: { type: String },
			_richtextEditorConfig: { type: Object },
			_activityUsageHref: { type: String }
		};
	}

	static get styles() {
		return [labelStyles, css`
			:host {
				display: block;
			}
			:host([hidden]) {
				display: none;
			}
			:host > div {
				padding-bottom: 20px;
			}
		`];
	}

	static async getLocalizeResources(langs) {
		return getLocalizeResources(langs);
	}

	constructor() {
		super();
		this._setEntityType(AssignmentEntity);
		this._debounceJobs = {};
	}

	set _entity(entity) {
		if (this._entityHasChanged(entity)) {
			this._onAssignmentChange(entity);
			super._entity = entity;
		}
	}

	_onAssignmentChange(assignment) {
		if (assignment) {
			this._name = assignment.name();
			this._instructions = assignment.instructionsEditorHtml();
			this._richtextEditorConfig = assignment.getRichTextEditorConfig();
			this._activityUsageHref = assignment.activityUsageHref();
		}
	}

	_saveOnChange(jobName) {
		this._debounceJobs[jobName] && this._debounceJobs[jobName].flush();
	}

	_saveName(value) {
		if (super._entity.canEditName()) {
			const action = super._entity.getSaveNameAction();
			const fields = [{ name: 'name', value: value }];
			this._performSirenAction(action, fields);
		}
	}

	_saveInstructions(value) {
		if (super._entity.canEditInstructions()) {
			const action = super._entity.getSaveInstructionsAction();
			const fields = [{ name: 'instructions', value: value }];
			this._performSirenAction(action, fields);
		}
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
				() => this._saveName(name)
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

	render() {
		return html`
			<div id="assignment-name-container">
				<label class="d2l-label-text" for="assignment-name">${this.localize('name')}*</label>
				<d2l-input-text
					id="assignment-name"
					value="${this._name}"
					@change="${this._saveOnChange('name')}"
					@input="${this._saveNameOnInput}"
					aria-label="${this.localize('name')}"
					?disabled="${super._entity && !super._entity.canEditName()}"
					aria-invalid="${this._nameError ? 'true' : ''}"
					prevent-submit>
				</d2l-input-text>
				${this._getNameTooltip()}
			</div>

			<div id="duedate-container">
				<label class="d2l-label-text">${this.localize('dueDate')}</label>
				<d2l-activity-due-date-editor
					dateLabel="${this.localize('dueDate')}"
					timeLabel="${this.localize('dueTime')}"
					.href="${this._activityUsageHref}"
					.token="${this.token}">
				</d2l-activity-due-date-editor>
			</div>

			<div id="assignment-instructions-container">
				<label class="d2l-label-text">${this.localize('instructions')}</label>
				<d2l-activity-html-editor
					value="${this._instructions}"
					.richtextEditorConfig="${this._richtextEditorConfig}"
					@d2l-activity-html-editor-change="${this._saveInstructionsOnChange}"
					ariaLabel="${this.localize('instructions')}"
					?disabled="${super._entity && !super._entity.canEditInstructions()}">
				</d2l-activity-html-editor>
			</div>
		`;
	}
}
customElements.define('d2l-activity-assignment-editor-detail', AssignmentEditorDetail);
