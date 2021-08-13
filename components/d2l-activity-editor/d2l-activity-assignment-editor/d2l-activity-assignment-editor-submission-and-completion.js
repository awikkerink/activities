import '../d2l-activity-accordion-collapse.js';
import './d2l-activity-assignment-submission-email-notification-summary.js';
import './d2l-activity-assignment-type-editor.js';
import './d2l-activity-assignment-categories-editor.js';
import './d2l-activity-assignment-type-summary.js';
import './d2l-activity-assignment-categories-summary.js';
import '../d2l-activity-notification-email-editor';
import { bodyCompactStyles, bodySmallStyles, labelStyles } from '@brightspace-ui/core/components/typography/styles.js';
import { css, html } from 'lit-element/lit-element.js';
import { accordionStyles } from '../styles/accordion-styles';
import { ActivityEditorMixin } from '../mixins/d2l-activity-editor-mixin.js';
import { shared as activityStore } from '../state/activity-store.js';
import { ErrorHandlingMixin } from '../error-handling-mixin.js';
import { fetchEntity } from '../state/fetch-entity';
import { LocalizeActivityAssignmentEditorMixin } from './mixins/d2l-activity-assignment-lang-mixin.js';
import { MobxLitElement } from '@adobe/lit-mobx';
import { radioStyles } from '@brightspace-ui/core/components/inputs/input-radio-styles.js';
import { Rels } from 'd2l-hypermedia-constants';
import { RtlMixin } from '@brightspace-ui/core/mixins/rtl-mixin.js';
import { selectStyles } from '@brightspace-ui/core/components/inputs/input-select-styles.js';
import { SkeletonMixin } from '@brightspace-ui/core/components/skeleton/skeleton-mixin.js';
import { shared as store } from './state/assignment-store.js';

const allowableFileTypeDocumentationURL = 'https://documentation.brightspace.com/EN/le/assignments/learner/assignments_intro_1.htm';

class ActivityAssignmentSubmissionAndCompletionEditor extends SkeletonMixin(ActivityEditorMixin(RtlMixin(ErrorHandlingMixin(LocalizeActivityAssignmentEditorMixin(MobxLitElement))))) {

	static get properties() {

		return {
			_customFileTypesError: { type: String },
			href: { type: String },
			token: { type: Object },
			activityUsageHref: { type: String }
		};
	}

	static get styles() {
		return [
			super.styles,
			bodyCompactStyles,
			bodySmallStyles,
			labelStyles,
			radioStyles,
			selectStyles,
			accordionStyles,
			css`
				.d2l-block-select {
					display: block;
					max-width: 300px;
					width: 100%;
				}

				.d2l-body-small {
					margin-bottom: 0.6rem;
				}

				div[id*="container"] {
					margin-top: 20px;
				}

				.d2l-input-radio-label {
					margin-bottom: 10px;
				}

				#allowable-filetypes-help-span {
					margin-left: 10px;
				}

				:host([dir='rtl']) #allowable-filetypes-help-span {
					margin-left: 0;
					margin-right: 10px;
				}
			`
		];
	}

	constructor() {
		super(store);
		this.saveOrder = 2000;
		this.allowableFileTypeCustomValue = '5'; // Custom allowable file type value
		this.restrictedFileTypes = [];
	}

	render() {
		const assignment = store.get(this.href);
		const activity = activityStore.get(this.activityUsageHref);
		return html`
			<d2l-activity-accordion-collapse ?skeleton="${this.skeleton}">
				<span slot="header">
					${this.localize('submissionCompletionAndCategorization')}
				</span>
				<li slot="summary-items">${this._renderAssignmentTypeSummary()}</li>
				<li slot="summary-items">${this._renderCategoriesSummary(assignment)}</li>
				<li slot="summary-items">${this._renderAssignmentSubmissionTypeSummary(assignment)}</li>
				<li slot="summary-items">${this._renderAssignmentCompletionTypeSummary()}</li>
				<li slot="summary-items">${this._renderSubmissionEmailNotificationSummary(assignment)}</li>

				<span slot="components">
					${this._renderAssignmentType()}
					${this._renderCategoriesDropdown(assignment)}
					${this._renderAssignmentSubmissionType(assignment)}
					${this._renderAssignmentFilesSubmissionLimit(assignment)}
					${this._renderAllowableFileTypesDropdown(assignment)}
					${this._renderCustomFileTypesInput(assignment, activity)}
					${this._renderAssignmentSubmissionsRule(assignment)}
					${this._renderAssignmentCompletionType(assignment)}
					${this._renderAssignmentSubmissionNotificationEmail(assignment)}
				</span>
			</d2l-activity-accordion-collapse>
		`;
	}

	async save() {
		const assignment = store.get(this.href);
		if (!assignment) {
			return;
		}

		await assignment.save();
	}
	/**
	 * Follows a list of rels beginning at a specific entity.
	 * @async
	 * @param {String[]} relList List of rels to follow
	 * @param {object} entity Beginning entity
	 * @returns {object|null|undefined} The entity at the end of the rel path. {null|undefined} if an entity in the chain is missing or doesn't have the next rel.
	 */
	async _followRelPath(relList, entity) {
		if (!entity || relList.length === 0) return entity;

		const source = (
			entity.hasLinkByRel(relList[0])
			&& entity.getLinkByRel(relList[0])
			|| {}).href;

		if (source) {
			return await this._followRelPath(relList.slice(1), await fetchEntity(source, this.token));
		}

		return null;
	}
	_getAllowableFileTypeOptions(assignment) {
		if (!assignment || !assignment.submissionAndCompletionProps || !assignment.submissionAndCompletionProps.allowableFileTypeOptions) {
			return html``;
		}

		return html`
			${assignment.submissionAndCompletionProps.allowableFileTypeOptions.map(option => html`<option value=${option.value} ?selected=${String(option.value) === assignment.submissionAndCompletionProps.allowableFileType}>${option.title}</option>`)}
		`;
	}
	_getCompletionTypeOptions(assignment) {
		const completionTypeOptions = assignment && assignment.submissionAndCompletionProps ? assignment.submissionAndCompletionProps.completionTypeOptions : [];
		const completionType = assignment && assignment.submissionAndCompletionProps ? assignment.submissionAndCompletionProps.completionType : '0';

		return html`
			${completionTypeOptions.map(option => html`<option value=${option.value} ?selected=${String(option.value) === completionType}>${option.title}</option>`)}
		`;
	}
	_getSelectedAllowableFileType(assignment) {
		if (!assignment || !assignment.submissionAndCompletionProps || !assignment.submissionAndCompletionProps.allowableFileTypeOptions) {
			return html``;
		}

		return assignment.submissionAndCompletionProps.allowableFileTypeOptions.find(opt => String(opt.value) === assignment.submissionAndCompletionProps.allowableFileType);
	}
	_getSelectedCompletionType(assignment) {
		if (!assignment ||
			!assignment.submissionAndCompletionProps ||
			!assignment.submissionAndCompletionProps.completionTypeOptions) {
			return html``;
		}

		return assignment.submissionAndCompletionProps.completionTypeOptions.find(
			opt => String(opt.value) === assignment.submissionAndCompletionProps.completionType
		);
	}
	_getSelectedSubmissionType(assignment) {
		if (!assignment || !assignment.submissionAndCompletionProps || !assignment.submissionAndCompletionProps.submissionTypeOptions) {
			return html``;
		}

		return assignment.submissionAndCompletionProps.submissionTypeOptions.find(opt => String(opt.value) === assignment.submissionAndCompletionProps.submissionType);
	}
	_getSubmissionTypeOptions(assignment) {
		if (!assignment || !assignment.submissionAndCompletionProps || !assignment.submissionAndCompletionProps.submissionTypeOptions) {
			return html``;
		}

		return html`
			${assignment.submissionAndCompletionProps.submissionTypeOptions.map(option => html`<option value=${option.value} ?selected=${String(option.value) === assignment.submissionAndCompletionProps.submissionType}>${option.title}</option>`)}
		`;
	}
	_isInvalidFileTypes(fileTypes) {
		const fileTypesList = fileTypes.split(',').map(type => type.trim());
		const minimumExtensionLength = 3;

		const hasInvalidFileTypes = fileTypesList.some(type => this.restrictedFileTypes.includes(type) || !type.includes('.'));
		const hasInvalidLength = fileTypesList.some(type => type.length < minimumExtensionLength);

		return hasInvalidFileTypes || hasInvalidLength;
	}
	async _loadRestrictedFileTypes(activity) {
		const relList = [Rels.organization, Rels.Files.files, Rels.restricted];
		const activityEntity = (activity._entity && activity._entity._entity) || {};

		const restrictedFileTypesEntity = await this._followRelPath(relList, activityEntity);
		this.restrictedFileTypes = (restrictedFileTypesEntity.properties && restrictedFileTypesEntity.properties.extensions) || [];
	}
	_onNotificationEmailChanged(e) {
		const assignment = store.get(this.href);
		const data = e.detail.value;
		assignment && assignment.setNotificationEmail(data);
	}

	_openPopoutInNewTab() {
		window.open(
			allowableFileTypeDocumentationURL,
			'_blank '
		);
	}

	_renderAllowableFileTypesDropdown(assignment) {
		if (!assignment ||
			!assignment.submissionAndCompletionProps ||
			!assignment.submissionAndCompletionProps.showFilesSubmissionOptions ||
			assignment.submissionAndCompletionProps.allowableFileType === 'undefined') {
			return html``;
		}

		let allowableFileTypeContent = html``;
		if (assignment.submissionAndCompletionProps.canEditAllowableFileType) {
			allowableFileTypeContent = html`<select
										id="assignment-allowable-filetypes"
										aria-labelledby="assignment-allowable-filetypes-label"
										class="d2l-input-select d2l-block-select"
										@change="${this._saveAllowableFileTypeOnChange}">
											${this._getAllowableFileTypeOptions(assignment)}
									</select>`;
		} else {
			const allowableFileType = this._getSelectedAllowableFileType(assignment);
			if (allowableFileType) {
				allowableFileTypeContent = html`<div class="d2l-body-compact">${allowableFileType.title}</div>`;
			}
		}

		return html`
			<div id="assignment-allowable-filetypes-container" class="d2l-editor">
				<div class="d2l-label-text" id="assignment-allowable-filetypes-label">
					${this.localize('allowableFiletypes')}
					<span id="allowable-filetypes-help-span">
						<d2l-button-icon
							text="${this.localize('allowableFileTypesHelp')}"
							icon="tier1:help"
							@click="${this._openPopoutInNewTab}">
						</d2l-button-icon>
					</span>
				</div>
				${allowableFileTypeContent}
			</div>
		`;
	}

	_renderAssignmentCompletionType(assignment) {
		if (!assignment ||
			!assignment.submissionAndCompletionProps ||
			!assignment.submissionAndCompletionProps.completionTypeOptions ||
			assignment.submissionAndCompletionProps.completionTypeOptions.length === 0) {
			return html``;
		}

		let completionTypeContent = html``;
		if (assignment.submissionAndCompletionProps.canEditCompletionType) {
			completionTypeContent = html`
				<select
					id="assignment-completion-type"
					aria-labelledby="assignment-completion-type-label"
					class="d2l-input-select d2l-block-select"
					@change="${this._saveCompletionTypeOnChange}">
						${this._getCompletionTypeOptions(assignment)}
				</select>
			`;
		} else {
			const completionType = this._getSelectedCompletionType(assignment);
			if (completionType) {
				completionTypeContent = html`<div class="d2l-body-compact">${completionType.title}</div>`;
			}
		}

		return html`
			<div id="assignment-completion-type-container" class="d2l-editor">
				<div class="d2l-label-text" id="assignment-completion-type-label">
					${this.localize('completionType')}
				</div>
				${completionTypeContent}
			</div>
		`;
	}

	_renderAssignmentCompletionTypeSummary() {
		return html``;
	}

	_renderAssignmentFilesSubmissionLimit(assignment) {
		if (!assignment ||
			!assignment.submissionAndCompletionProps ||
			!assignment.submissionAndCompletionProps.showFilesSubmissionOptions) {
			return html``;
		}

		const unlimitedFilesPerSubmissionText = this.localize('UnlimitedFilesPerSubmission');
		const oneFilePerSubmissionText = this.localize('OneFilePerSubmission');

		let submissionLimitContent;
		if (assignment.submissionAndCompletionProps.canEditFilesSubmissionLimit) {
			submissionLimitContent = html`
				<label class="d2l-input-radio-label files-submission-limit-unlimited">
				<input
					id="files-submission-limit-unlimited"
					type="radio"
					name="filesSubmissionLimit"
					value="unlimited"
					@change="${this._setfilesSubmisisonLimit}"
					?checked="${assignment.submissionAndCompletionProps.filesSubmissionLimit === 'unlimited'}"
				>
					${unlimitedFilesPerSubmissionText}
				</label>

				<label class="d2l-input-radio-label files-submission-limit-one">
					<input
						id="files-submission-limit-one"
						type="radio"
						name="filesSubmissionLimit"
						value="onefilepersubmission"
						@change="${this._setfilesSubmisisonLimit}"
						?checked="${assignment.submissionAndCompletionProps.filesSubmissionLimit === 'onefilepersubmission'}"
					>
					${oneFilePerSubmissionText}
				</label>
			`;
		} else {
			submissionLimitContent = html`
				<div class="d2l-body-compact">
					${assignment.submissionAndCompletionProps.filesSubmissionLimit === 'unlimited' ? unlimitedFilesPerSubmissionText : oneFilePerSubmissionText}
				</div>
			`;
		}

		return html`
			<div id="assignment-files-submission-limit-container" class="d2l-editor">
				<div class="d2l-label-text">
					${this.localize('filesSubmissionLimit')}
				</div>
				${submissionLimitContent}
			</div>
		`;
	}

	_renderAssignmentSubmissionNotificationEmail(assignment) {
		if (!assignment || !assignment.showNotificationEmail) {
			return html``;
		}

		return html`
			<div id="assignment-notification-email-container" class="d2l-editor">
				<d2l-activity-notification-email-editor
					value="${assignment.notificationEmail}"
					?disabled="${!assignment.canEditNotificationEmail}"
					@activity-notification-email-changed="${this._onNotificationEmailChanged}">
					<p slot="description">
						${this.localize('hlpSubmissionNotificationEmail')}
					</p>
				</d2l-activity-notification-email-editor>
			</div>
		`;
	}
	_renderAssignmentSubmissionsRule(assignment) {

		if (!assignment ||
			!assignment.submissionAndCompletionProps ||
			!assignment.submissionAndCompletionProps.showSubmissionsRule) {
			return html``;
		}

		let submissionsRuleContent;
		if (assignment.submissionAndCompletionProps.canEditSubmissionsRule) {
			submissionsRuleContent = html`
				${assignment.submissionAndCompletionProps.submissionsRuleOptions.map((x) => html`
					<label class="d2l-input-radio-label">
						<input
							type="radio"
							name="submissionsRule"
							.value="${x.value}"
							@change="${this._setSubmisisonsRule}"
							?checked="${assignment.submissionAndCompletionProps.submissionsRule === x.value}"
						>
						${x.title}
					</label>
				`)}
			`;
		} else {
			const found = assignment.submissionAndCompletionProps.submissionsRuleOptions.find(x => assignment.submissionAndCompletionProps.submissionsRule === x.value);
			submissionsRuleContent = html`<div class="d2l-body-compact">${found.title}</div>`;
		}

		return html`
			<div id="assignment-submissions-rule-container" class="d2l-editor">
				<div class="d2l-label-text">
					${this.localize('submissionsRule')}
				</div>
				${submissionsRuleContent}
			</div>
		`;
	}
	_renderAssignmentSubmissionType(assignment) {
		if (!assignment || !assignment.submissionAndCompletionProps) {
			return html``;
		}

		let submissionTypeContent = html``;
		if (assignment.submissionAndCompletionProps.canEditSubmissionType) {
			submissionTypeContent = html`
				<select
					id="assignment-submission-type"
					aria-labelledby="assignment-submission-type-label"
					class="d2l-input-select d2l-block-select"
					@change="${this._saveSubmissionTypeOnChange}">
						${this._getSubmissionTypeOptions(assignment)}
				</select>
			`;
		} else {
			const submissionType = this._getSelectedSubmissionType(assignment);
			if (submissionType) {
				submissionTypeContent = html`<div class="d2l-body-compact">${submissionType.title}</div>`;
			}
		}

		return html`
			<div id="assignment-submission-type-container" class="d2l-editor">
				<div class="d2l-label-text" id="assignment-submission-type-label">
					${this.localize('submissionType')}
				</div>
				${submissionTypeContent}
			</div>
		`;
	}
	_renderAssignmentSubmissionTypeSummary(assignment) {
		if (!assignment || !assignment.submissionAndCompletionProps) {
			return html``;
		}

		const submissionType = this._getSelectedSubmissionType(assignment);

		if (submissionType) {
			return html`${submissionType.title}`;
		}

		return html``;
	}
	_renderAssignmentType() {
		return html`
			<div id="assignment-type-container" class="d2l-editor">
				<div class="d2l-label-text">
					${this.localize('txtAssignmentType')}
				</div>
				<d2l-activity-assignment-type-editor
					href="${this.href}"
					.token="${this.token}">
				</d2l-activity-assignment-type-editor>
			</div>
		`;
	}
	_renderAssignmentTypeSummary() {
		return html`
			<d2l-activity-assignment-type-summary
				href="${this.href}"
				.token="${this.token}">
			</d2l-activity-assignment-type-summary>
		`;
	}

	_renderCategoriesDropdown(assignment) {
		if (!assignment || !assignment.categoriesLink) return;

		return html`
		<div id="container">
			<d2l-activity-assignment-categories-editor
				href="${assignment.categoriesLink}"
				.token="${this.token}">
			</d2l-activity-assignment-categories-editor>
		</div>
	`;
	}

	_renderCategoriesSummary(assignment) {
		if (!assignment || !assignment.categoriesLink) return;

		return html`
			<d2l-activity-assignment-categories-summary
				href="${assignment.categoriesLink}"
				.token="${this.token}">
			</d2l-activity-assignment-categories-summary>
		`;
	}

	_renderCustomFileTypesInput(assignment, activity) {
		if (!assignment || !assignment.submissionAndCompletionProps || !activity) {
			return html``;
		}

		if (assignment.submissionAndCompletionProps.allowableFileType === this.allowableFileTypeCustomValue) {
			if (this.restrictedFileTypes.length === 0) {
				this._loadRestrictedFileTypes(activity);
			}
			return html`
				<div>
					<p class="d2l-body-small">${this.localize('customFiletypesNotification')}</p>
				</div>

				<d2l-input-text
					id="custom-filetype-input"
					label="${this.localize('customFiletypes')}"
					label-hidden
					maxlength="64"
					value="${assignment.submissionAndCompletionProps.customAllowableFileTypes}"
					@change="${this._saveCustomAllowableFileTypes}"
					aria-invalid="${this._customFileTypesError ? 'true' : ''}"
					placeholder="${this.localize('customFiletypesPlaceholder')}"
					prevent-submit
					required
					novalidate>
				</d2l-input-text>
				${this._customFileTypesError ?
		html `<d2l-tooltip id="custom-filetypes-tooltip" for="custom-filetype-input" state="error" align="start" offset="10">
				${this._customFileTypesError}
				</d2l-tooltip>`
		:
		html``}
			`;
		} else {
			return html``;
		}
	}

	_renderSubmissionEmailNotificationSummary(assignment) {
		if (!assignment || !assignment.showNotificationEmail) {
			return html``;
		}
		return html`
			<d2l-activity-assignment-submission-email-notification-summary
				href="${this.href}"
				.token="${this.token}">
			</d2l-activity-assignment-submission-email-notification-summary>
		`;
	}
	_saveAllowableFileTypeOnChange(event) {
		const storeHref = store.get(this.href);
		storeHref.setAllowableFileType(event.target.value);
		if (event.target.value === this.allowableFileTypeCustomValue) {
			storeHref.setCustomAllowableFileTypes('');
		}
	}
	_saveCompletionTypeOnChange(event) {
		store.get(this.href).setCompletionType(event.target.value);
	}
	_saveCustomAllowableFileTypes(event) {
		const fileTypes = event.target.value;
		const errorProperty = '_customFileTypesError';

		if (this._isInvalidFileTypes(fileTypes)) {
			const invalidCustomFileTypesErrorLangterm = 'customFiletypesError';
			const tooltipId = 'custom-filetypes-tooltip';

			this.setError(errorProperty, invalidCustomFileTypesErrorLangterm, tooltipId);
		} else {
			this.clearError(errorProperty);
			store.get(this.href).setCustomAllowableFileTypes(fileTypes);
		}
	}
	_saveSubmissionTypeOnChange(event) {
		store.get(this.href).setSubmissionType(event.target.value);
	}
	_setfilesSubmisisonLimit(e) {
		const assignment = store.get(this.href);
		const data = e.target.value;
		assignment && assignment.setFilesSubmissionLimit(data);
	}

	_setSubmisisonsRule(e) {
		const assignment = store.get(this.href);
		const data = e.target.value;
		assignment &&
			assignment.submissionAndCompletionProps &&
			assignment.submissionAndCompletionProps.setSubmissionsRule(data);
	}

}
customElements.define('d2l-activity-assignment-editor-submission-and-completion-editor', ActivityAssignmentSubmissionAndCompletionEditor);
