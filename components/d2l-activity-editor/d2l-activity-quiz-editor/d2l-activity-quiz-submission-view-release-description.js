import { ActivityEditorMixin } from '../mixins/d2l-activity-editor-mixin.js';
import { formatDateTime } from '@brightspace-ui/intl/lib/dateTime.js';
import { getDateFromISODateTime } from '@brightspace-ui/core/helpers/dateTime.js';
import { html } from 'lit-element/lit-element.js';
import { LocalizeActivityQuizEditorMixin } from './mixins/d2l-activity-quiz-lang-mixin';
import { MobxLitElement } from '@adobe/lit-mobx';
import { sharedSubmissionView as store } from './state/quiz-store';

class ActivityQuizSubmissionViewReleaseDescription
	extends ActivityEditorMixin(LocalizeActivityQuizEditorMixin(MobxLitElement)) {

	constructor() {
		super(store);
	}

	render() {
		const entity = store.get(this.href);
		if (!entity) return html``;

		return html`${this._generateReleaseDescription(entity)}`;
	}

	_formatDateTime(suspiciousString) {
		if (!suspiciousString) {
			return null;
		}

		const date = getDateFromISODateTime(suspiciousString);

		if (isNaN(date.getTime())) {
			return null;
		}

		return formatDateTime(date);
	}

	_generateReleaseDescription(view) {
		const {
			releaseDate,
			attemptRestrictions,
			gradeRestrictions,
			gradeRestrictionsMinGrade,
			gradeRestrictionsMaxGrade,
			ipRestrictions,
			timeLimit,
			timeLimitNumber,
			attemptRestrictionNumber
		} = view;

		if (!releaseDate) return html``;

		let timeLimitNumberValue = 0;
		if (timeLimit) {
			timeLimitNumberValue = timeLimitNumber.value;
		}

		let attemptRestrictionNumberValue = 0;
		if (attemptRestrictions) {
			attemptRestrictionNumberValue = attemptRestrictionNumber;
		}

		let langterm = 'submissionViewReleaseDateSummary';

		let minGrade = 0;
		let maxGrade = 0;
		if (attemptRestrictions && gradeRestrictions) {
			minGrade = (gradeRestrictionsMinGrade && gradeRestrictionsMinGrade.value) || 0;
			maxGrade = (gradeRestrictionsMaxGrade && gradeRestrictionsMaxGrade.value) || 0;
		}

		if (minGrade !== 0 && maxGrade !== 0) {
			langterm = 'submissionViewReleaseDateSummaryBothMinMaxGrades';
		}

		return this.localize(langterm, {
			releaseDate: this._formatDateTime(releaseDate),
			attemptRestrictionNumber: attemptRestrictionNumberValue,
			minGrade,
			maxGrade,
			ipRestrictions,
			timeLimitNumber: timeLimitNumberValue
		});
	}
}

customElements.define(
	'd2l-activity-quiz-submission-view-release-description',
	ActivityQuizSubmissionViewReleaseDescription
);
