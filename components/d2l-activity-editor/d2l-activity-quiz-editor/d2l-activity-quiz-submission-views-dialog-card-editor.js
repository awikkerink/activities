import { ActivityEditorMixin } from '../mixins/d2l-activity-editor-mixin.js';
import { bodySmallStyles, labelStyles } from '@brightspace-ui/core/components/typography/styles.js';
import { checkboxStyles } from '@brightspace-ui/core/components/inputs/input-checkbox';
import { css, html } from 'lit-element/lit-element.js';
import { LocalizeActivityQuizEditorMixin } from './mixins/d2l-activity-quiz-lang-mixin';
import { MobxLitElement } from '@adobe/lit-mobx';
import { RtlMixin } from '@brightspace-ui/core/mixins/rtl-mixin.js';
import { selectStyles } from '@brightspace-ui/core/components/inputs/input-select-styles.js';
import { sharedSubmissionView as store } from './state/quiz-store';


class ActivityQuizSubmissionViewsDialogCardEditor
	extends ActivityEditorMixin(RtlMixin(LocalizeActivityQuizEditorMixin(MobxLitElement))) {

	static get properties() {
		return {
			_outcomesTerm: { type: String }
		};
	}

	static get styles() {
		return [
			labelStyles,
			bodySmallStyles,
			selectStyles,
			checkboxStyles,
			css`
				.d2l-activity-quiz-submission-views-dialog-card-editor > div {
					padding: 10px 0 20px;
				}

				.d2l-activity-quiz-submission-views-dialog-secondary-editor-one-indent {
					display: inline-block;
					padding-left: 30px;
				}

				.d2l-activity-quiz-submission-views-accordion-editor-tile-primary-dropdown {
					margin-bottom: 1rem;
					width: 100px;
				}

				.d2l-activity-quiz-submission-view-dialog-card-editor-specific-grade-container {
					display: inline-block;
				}

				.d2l-activity-quiz-submission-view-dialog-card-editor-specific-grade-item {
					display: inline-block;
					padding-left: 10px;
				}

				.d2l-body-small {
					color: #000000;
				}
			`
		];
	}

	constructor() {
		super(store);
	}

	connectedCallback() {
		super.connectedCallback();

		this._outcomesTerm = this._dispatchRequestProvider('d2l-provider-outcomes-term');
	}

	render() {
		const entity = store.get(this.href);
		if (!entity) return html``;

		const {isPrimaryView} = entity;
		if (isPrimaryView) {
			return this._renderEditView(entity);
		} else {
			return this._renderEditViewSecondary(entity);
		}
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

	_onShowAttemptScoreChange(e) {
		const view = store.get(this.href);
		if (!view) return html``;
		view && view.setShowAttemptScore(e.target.checked);
	}

	_onShowStatsClassAverageChange(e) {
		const view = store.get(this.href);
		if (!view) return html``;
		view && view.setShowStatsClassAverage(e.target.checked);
	}

	_onShowStatsScoreDistributionChange(e) {
		const view = store.get(this.href);
		if (!view) return html``;
		view && view.setShowStatsScoreDistributionChange(e.target.checked);
	}

	_renderEditView(entity) {
		const {
			canUpdateMessage,
			message,
			canUpdateShowAttemptScore,
			showAttemptScore,
			canUpdateShowStatsClassAverage,
			showStatsClassAverage,
			canUpdateShowStatsScoreDistribution,
			showStatsScoreDistribution
		} = entity;

		return html`
			<div class="d2l-activity-quiz-submission-views-dialog-card-editor">
				<div>
					<div class="d2l-label-text">
						${this.localize('submissionViewDialogCardSubmissionViewMessageHeader')}
					</div>
					<textarea ?disabled="${!canUpdateMessage}">TEMPORARY - ${message}</textarea>
				</div>
				<div>
					<div class="d2l-label-text">
						${this.localize('submissionViewDialogCardSubmissionViewGradeHeader')}
					</div>
					<d2l-input-checkbox
						?checked=${showAttemptScore}
						@change="${this._onShowAttemptScoreChange}"
						ariaLabel="${this.localize('submissionViewsDialogEditorGradeCheckbox')}"
						?disabled="${!canUpdateShowAttemptScore}">
						${this.localize('submissionViewsDialogEditorGradeCheckbox')}
					</d2l-input-checkbox>
				</div>
				<div>
					<div class="d2l-label-text">
						${this.localize('submissionViewDialogCardSubmissionViewQuestionsHeader')}
					</div>
					${this._renderHideShowQuestionsComponent(entity)}
				</div>
				<div>
					<div class="d2l-label-text">
						${this.localize('statistics')}
					</div>
					<d2l-input-checkbox
						?checked=${showStatsClassAverage}
						@change="${this._onShowStatsClassAverageChange}"
						ariaLabel="${this.localize('submissionViewsDialogEditorClassAverageCheckbox')}"
						?disabled="${!canUpdateShowStatsClassAverage}">
						${this.localize('submissionViewsDialogEditorClassAverageCheckbox')}
					</d2l-input-checkbox>
					<d2l-input-checkbox
						?checked=${showStatsScoreDistribution}
						@change="${this._onShowStatsScoreDistributionChange}"
						ariaLabel="${this.localize('submissionViewsDialogEditorGradeDistributionCheckbox')}"
						?disabled="${!canUpdateShowStatsScoreDistribution}">
						${this.localize('submissionViewsDialogEditorGradeDistributionCheckbox')}
					</d2l-input-checkbox>
				</div>
			</div>
		`;
	}

	_renderEditViewSecondary(entity) {
		const {
			canUpdateIpRestrictions,
			ipRestrictions,
			canUpdateTimeLimit,
			timeLimit,
			canUpdateAttemptRestrictions,
			canUpdateGradeRestrictions,
			attemptRestrictions,
			canUpdateTimeLimitNumber,
			timeLimitNumber,
			gradeRestrictions
		} = entity;

		return html`
			<div class="d2l-label-text">
				${this.localize('submissionViewDialogSecondaryEditorRestrictAccessLabel')}
			</div>

			<d2l-input-checkbox
				?checked=${attemptRestrictions}
				@change="${this._onAttemptRestrictionChange}"
				ariaLabel="${this.localize('submissionViewsDialogSecondaryEditorAttemptCheckbox')}"
				?disabled="${!canUpdateAttemptRestrictions}">
				${this.localize('submissionViewsDialogSecondaryEditorAttemptCheckbox')}
			</d2l-input-checkbox>

			${ attemptRestrictions? html`
				<div class="d2l-activity-quiz-submission-views-dialog-secondary-editor-one-indent">
				<div class="d2l-label-text">
					${this.localize('submissionViewDialogSecondaryEditorAttemptLabel')}
				</div>
					${this._generateDropdown(entity)}
					<d2l-input-checkbox
						?checked=${gradeRestrictions}
						@change="${this._onGradeRangeRestrictionsChange}"
						ariaLabel="${this.localize('submissionViewsDialogSecondaryEditorRangeCheckbox')}"
						?disabled="${!canUpdateGradeRestrictions}">
						${this.localize('submissionViewsDialogSecondaryEditorRangeCheckbox')}
					</d2l-input-checkbox>
					${this._renderGradeRange(entity)}
				</div>
			` : html``}

			<d2l-input-checkbox
				?checked=${ipRestrictions}
				@change="${this._onIPRestrictionsChange}"
				ariaLabel="${this.localize('submissionViewsDialogSecondaryEditorIPCheckbox')}"
				?disabled="${!canUpdateIpRestrictions}">
				${this.localize('submissionViewsDialogSecondaryEditorIPCheckbox')}
			</d2l-input-checkbox>

			<d2l-input-checkbox
				?checked=${timeLimit}
				@change="${this._onTimeLimitChange}"
				ariaLabel=""
				?disabled="${!canUpdateTimeLimit}">
				${this.localize('submissionViewsDialogSecondaryEditorTimingCheckbox')}
			</d2l-input-checkbox>

			${ timeLimit? html`
			<div class="d2l-activity-quiz-submission-views-dialog-secondary-editor-one-indent">
				<div class="d2l-time-enforcement-input-container">
					<d2l-input-number
						label="Time Limit"
						title=Time Limit
						value=${timeLimitNumber.value}
						min=${timeLimitNumber.min}
						max=${timeLimitNumber.max}
						@change=${this._onTimeLimitValueChange}
						?disabled=${!canUpdateTimeLimitNumber}>
						<span class="d2l-body-small" slot="after">${this.localize('submissionViewsDialogSecondaryEditorNumericalInputText1')} </span>
					</d2l-input-number>
				</div>
			</div>
			` : html `` }
		`;
	}

	_renderGradeRange(entity) {
		const {
			gradeRestrictions,
			gradeRestrictionsMinGrade,
			gradeRestrictionsMaxGrade,
			canUpdateGradeRestrictionsMinMaxGrade
		} = entity;

		if (gradeRestrictions) {
			return html`
			<div class="d2l-activity-quiz-submission-view-dialog-card-editor-specific-grade-container">
				<div class="d2l-activity-quiz-submission-view-dialog-card-editor-specific-grade-item">
					<div class="d2l-body-small">${this.localize("submissionViewsDialogSecondaryEditorGradeRangeText1")}</div>
				</div>
				<div class="d2l-activity-quiz-submission-view-dialog-card-editor-specific-grade-item">
					<d2l-input-number
						label="Min:"
						title="Min:"
						value=${gradeRestrictionsMinGrade}
						min=0
						max=100
						@change=${this._onMinGradeChange}
						?disabled=${!canUpdateGradeRestrictionsMinMaxGrade}>
						<span class="d2l-body-small" slot="after"> % </span>
					</d2l-input-number>
				</div>
				<div class="d2l-activity-quiz-submission-view-dialog-card-editor-specific-grade-item">
					<div class="d2l-body-small">${this.localize("submissionViewsDialogSecondaryEditorGradeRangeText2")}</div>
				</div>
				<div class="d2l-activity-quiz-submission-view-dialog-card-editor-specific-grade-item">
					<d2l-input-number
						label="Max:"
						title="Max:"
						value=${gradeRestrictionsMaxGrade}
						min=0
						max=100
						@change=${this._onMaxGradeChange}
						?disabled=${!canUpdateGradeRestrictionsMinMaxGrade}>
						<span class="d2l-body-small" slot="after"> % </span>
					</d2l-input-number>
				</div>
			</div>
			`
		} else {
			return html ``
		}
	}

	_onMinGradeChange(e) {
		const entity = store.get(this.href);
		const data =  e.target.value;
		entity && entity.setMinMaxGrade(String(data),null);
	}

	_onMaxGradeChange(e) {
		const entity = store.get(this.href);
		const data =  e.target.value;
		entity && entity.setMinMaxGrade(null,String(data));
	}

	_generateDropdown(entity) {
		const {
			attemptRestrictionsOptions,
			canUpdateAttemptRestrictionNumber,
			attemptRestrictionNumber
		} = entity;

		return html`
			<div>
				<select
					class="d2l-input-select d2l-block-select d2l-activity-quiz-submission-views-accordion-editor-tile-primary-dropdown"
					@change="${this._onDropdownChange}"
					?disabled="${!canUpdateAttemptRestrictionNumber}">
					${attemptRestrictionsOptions.map(option => html`
						<option value="${option.value}" ?selected=${(option.value == attemptRestrictionNumber)}>${option.value}</option>
					`)};
				</select>
			</div>
		`;
	}

	_onDropdownChange(e) {
		const entity = store.get(this.href);
		entity && entity.setAttemptRestrictionNumber(e.target.value);

	}

	_onGradeRangeRestrictionsChange(e) {
		const entity = store.get(this.href);
		const data = e.target.checked;
		entity && entity.setGradeRestrictions(data);
	}

	_onAttemptRestrictionChange(e) {
		const entity = store.get(this.href);
		const data = e.target.checked;
		entity && entity.setAttemptRestrictions(data);
	}

	_onTimeLimitValueChange(e) {
		const entity = store.get(this.href);
		const data =  e.target.value;
		entity && entity.setTimeLimitNumber(data);
	}

	_onIPRestrictionsChange(e) {
		const entity = store.get(this.href);
		entity && entity.setIpRestrictions(e.target.checked);
	}

	_onTimeLimitChange(e) {
		const entity = store.get(this.href);
		const data = e.target.checked;
		entity && entity.setTimeLimit(data);
	}

	_renderHideShowQuestionsComponent(entity) {
		const {
			canUpdateShowStandards,
			showStandards,
			isStandardsSupported
		} = entity;

		const lowerCaseOutcomesTerm = this._outcomesTerm && this._outcomesTerm.toLowerCase();

		return html`
			<i>Modifying Question options not yet implemented! (US132398)</i>
			${isStandardsSupported && lowerCaseOutcomesTerm ? html`
				<d2l-input-checkbox
					?checked=${showStandards}
					@change="${this._onShowStatsClassAverageChange}"
					ariaLabel="${this.localize('submissionViewsDialogEditorClassAverageCheckbox')}"
					?disabled="${!canUpdateShowStandards}">
					${this.localize('showOutcomesForTheDisplayedQuestionsCheckbox', 'outcomesTerm', lowerCaseOutcomesTerm)}
				</d2l-input-checkbox>
			` : html`` }
		`;
	}
}

customElements.define(
	'd2l-activity-quiz-submission-views-dialog-card-editor',
	ActivityQuizSubmissionViewsDialogCardEditor
);
