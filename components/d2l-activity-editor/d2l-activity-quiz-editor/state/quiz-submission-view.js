import { action, configure as configureMobx, decorate, observable } from 'mobx';
import { Classes } from 'siren-sdk/src/hypermedia-constants';
import { fetchEntity } from '../../state/fetch-entity.js';
import { QuizSubmissionViewEntity } from 'siren-sdk/src/activities/quizzes/submissionViews/QuizSubmissionViewEntity.js';

configureMobx({ enforceActions: 'observed' });

const accordionDropdownValues = {
	noQuestions: 'no-questions',
	incorrectQuestionsWithCorrectAnswers: 'incorrect-questions-with-correct-answers',
	incorrectQuestionsWithoutCorrectAnswers: 'incorrect-questions-without-correct-answers',
	allQuestionsWithCorrectAnswers: 'all-questions-with-correct-answers',
	allQuestionsWithoutCorrectAnswers: 'all-questions-without-correct-answers'
};

export class QuizSubmissionView {
	constructor(href, token) {
		this.href = href;
		this.token = token;
	}

	async deleteSubmissionView() {
		await this._entity.deleteSubmissionView();
	}

	async fetch(bypassCache) {
		const sirenEntity = await fetchEntity(this.href, this.token, bypassCache);

		if (sirenEntity) {
			const entity = new QuizSubmissionViewEntity(sirenEntity, this.token, {
				remove: () => { },
			});
			this.load(entity);
		}
		return this;
	}

	load(entity) {
		this._entity = entity;
		this.canUpdateShowStandards = entity.canUpdateShowStandards();
		this.canUpdateShowAttemptScore = entity.canUpdateShowAttemptScore();
		this.canUpdateShowStatsClassAverage = entity.canUpdateShowStatsClassAverage();
		this.canUpdateShowStatsScoreDistribution = entity.canUpdateShowStatsScoreDistribution();
		this.isPrimaryView = entity.isPrimaryView();
		this.showStandards = entity.showStandards();
		this.isStandardsSupported = entity.isStandardsSupported();
		this.showAttemptScore = entity.showAttemptScore();
		this.showStatsClassAverage = entity.showStatsClassAverage();
		this.showStatsScoreDistribution = entity.showStatsScoreDistribution();
		this.canUpdateMessage = entity.canUpdateMessage();
		this.message = entity.message();
		this.isMessageRichtext = entity.isMessageRichtext();
		this.canUpdateHideShowQuestions = entity.canUpdateHideShowQuestions();
		this.hideQuestions = entity.hideQuestions();
		this.canUpdateShowCorrectAnswers = entity.canUpdateShowCorrectAnswers();
		this.canUpdateShowLearnerResponses = entity.canUpdateShowLearnerResponses();
		this.canUpdateShowQuestions = entity.canUpdateShowQuestions();
		this.canUpdateShowQuestionScore = entity.canUpdateShowQuestionScore();
		this.showCorrectAnswers = entity.showCorrectAnswers();
		this.showLearnerResponses = entity.showLearnerResponses();
		this.showQuestionScore = entity.showQuestionScore();
		this.showQuestionsType = entity.showQuestionsType();
		this.showQuestionsOptions = entity.showQuestionsOptions();
		this.canDeleteSubmissionView = entity.canDeleteSubmissionView();
		this.canUpdateAttemptRestrictions = entity.canUpdateAttemptRestrictions();
		this.canUpdateIpRestrictions = entity.canUpdateIpRestrictions();
		this.canUpdateTimeLimit = entity.canUpdateTimeLimit();
		this.attemptRestrictions = entity.attemptRestrictions();
		this.ipRestrictions = entity.ipRestrictions();
		this.timeLimit = entity.timeLimit();
		this.canUpdateReleaseDate = entity.canUpdateReleaseDate();
		this.releaseDate = entity.releaseDate();
		this.canUpdateTimeLimitNumber = entity.canUpdateTimeLimitNumber();
		this.timeLimitNumber = entity.timeLimitNumber();
		this.canUpdateAttemptRestrictionNumber = entity.canUpdateAttemptRestrictionNumber();
		this.attemptRestrictionsOptions = entity.attemptRestrictionsOptions();
		this.canUpdateGradeRestrictions = entity.canUpdateGradeRestrictions();
		this.attemptRestrictionNumber = entity.attemptRestrictionNumber();
		this.gradeRestrictions = entity.gradeRestrictions();
		this.canUpdateGradeRestrictionsMinMaxGrade = entity.canUpdateGradeRestrictionsMinMaxGrade();
		this.gradeRestrictionsMinGrade = (entity.gradeRestrictionsMinMaxGrade() || {})['min-grade'];
		this.gradeRestrictionsMaxGrade = (entity.gradeRestrictionsMinMaxGrade() || {})['max-grade'];

		// run after rest of entity properties are loaded
		this.accordionDropdownOptions = this._generateAccordionDropdownOptions();
	}

	setAttemptRestrictionNumber(value) {
		this.attemptRestrictionNumber = value;
		return this.updateProperty(() => this._entity.setAttemptRestrictionNumber(value));
	}
	// patched instantly on line 94 before siren call .
	setAttemptRestrictions(value) {
		this.attemptRestrictions = value;
		return this.updateProperty(() => this._entity.setAttemptRestrictions(value));
	}

	setGradeRestrictions(value) {
		this.gradeRestrictions = value;
		return this.updateProperty(() => this._entity.setGradeRestrictions(value));
	}

	setIpRestrictions(value) {
		this.ipRestrictions = value;
		return this.updateProperty(() => this._entity.setIpRestrictions(value));
	}

	setMessage(value) {
		this.message = value;
		return this.updateProperty(() => this._entity.setMessage(value));
	}

	setMinMaxGrade(min, max) {
		return this.updateProperty(() => this._entity.setMinMaxGrade(min, max));
	}

	setReleaseDate(value) {
		this.releaseDate = value;
		return this.updateProperty(() => this._entity.setReleaseDate(value));
	}

	setShowAttemptScore(value) {
		this.showAttemptScore = value;
		return this.updateProperty(() => this._entity.setShowAttemptScore(value));
	}

	setShowQuestionsAndCorrectAnswers(value) {
		if (value === accordionDropdownValues.noQuestions) {
			this.hideQuestions = true;
			return this.updateProperty(() => this._entity.setHideShowQuestions(true));
		}

		let newShowQuestionsValue;
		let newShowCorrectAnswersValue;
		switch (value) {
			case accordionDropdownValues.incorrectQuestionsWithCorrectAnswers:
				newShowQuestionsValue = Classes.quizzes.submissionView.showQuestions.incorrectQuestions;
				newShowCorrectAnswersValue = true;
				break;
			case accordionDropdownValues.incorrectQuestionsWithoutCorrectAnswers:
				newShowQuestionsValue = Classes.quizzes.submissionView.showQuestions.incorrectQuestions;
				newShowCorrectAnswersValue = false;
				break;
			case accordionDropdownValues.allQuestionsWithCorrectAnswers:
				newShowQuestionsValue = Classes.quizzes.submissionView.showQuestions.allQuestions;
				newShowCorrectAnswersValue = true;
				break;
			case accordionDropdownValues.allQuestionsWithoutCorrectAnswers:
				newShowQuestionsValue = Classes.quizzes.submissionView.showQuestions.allQuestions;
				newShowCorrectAnswersValue = false;
				break;
			default:
				return;
		}

		this.showQuestionsType = newShowQuestionsValue;
		this.showCorrectAnswers = newShowCorrectAnswersValue;
		return this.updateProperty(() => this._entity.setShowQuestionsAndCorrectAnswers(newShowQuestionsValue, newShowCorrectAnswersValue));
	}

	setShowStatsClassAverage(value) {
		this.showStatsClassAverage = value;
		return this.updateProperty(() => this._entity.setShowStatsClassAverage(value));
	}

	setShowStatsScoreDistribution(value) {
		this.showStatsScoreDistribution = value;
		return this.updateProperty(() => this._entity.setShowStatsScoreDistribution(value));
	}

	setTimeLimit(value) {
		this.timeLimit = value;
		return this.updateProperty(() => this._entity.setTimeLimit(value));
	}

	setTimeLimitNumber(value) {
		this.timeLimitNumber = value;
		return this.updateProperty(() => this._entity.setTimeLimitNumber(value));
	}

	async updateProperty(updateFunc) {
		this.saving = updateFunc();
		const entity = await this.saving;
		this.saving = null;
		// The siren-sdk function called to perform an action first checks that the entity has permission to do so.
		// If the entity lacks permission, the function returns `undefined`, otherwise it returns a reconstructed siren-sdk submission views entity.
		// If `undefined` is returned, it likely means the UI is out of sync with the entity state, and disallowed actions can be performed.
		// In this case, we should attempt to reload the MobX object, so that the UI state is in sync again.
		if (!entity) {
			this.fetch();
			return;
		}
		this.load(entity);
	}

	viewId() {
		return new URL(this.href).pathname.split('submissionviews/')[1];
	}

	_generateAccordionDropdownOptions() {
		const options = [
			{
				value: accordionDropdownValues.noQuestions,
				selected: this.hideQuestions,
				langtermTitle: 'submissionViewsAccordionDropdownNoQuestions'
			},
			{
				value: accordionDropdownValues.incorrectQuestionsWithCorrectAnswers,
				selected: !this.hideQuestions && this.showQuestionsType === Classes.quizzes.submissionView.showQuestions.incorrectQuestions && this.showCorrectAnswers,
				langtermTitle: 'submissionViewsAccordionDropdownIncorrectQuestionsWithCorrectAnswers'
			},
			{
				value: accordionDropdownValues.incorrectQuestionsWithoutCorrectAnswers,
				selected: !this.hideQuestions && this.showQuestionsType === Classes.quizzes.submissionView.showQuestions.incorrectQuestions && !this.showCorrectAnswers,
				langtermTitle: 'submissionViewsAccordionDropdownIncorrectQuestionsWithoutCorrectAnswers'
			},
			{
				value: accordionDropdownValues.allQuestionsWithCorrectAnswers,
				selected: !this.hideQuestions && this.showQuestionsType === Classes.quizzes.submissionView.showQuestions.allQuestions && this.showCorrectAnswers,
				langtermTitle: 'submissionViewsAccordionDropdownAllQuestionsWithCorrectAnswers'
			},
			{
				value: accordionDropdownValues.allQuestionsWithoutCorrectAnswers,
				selected: !this.hideQuestions && this.showQuestionsType === Classes.quizzes.submissionView.showQuestions.allQuestions && !this.showCorrectAnswers,
				langtermTitle: 'submissionViewsAccordionDropdownAllQuestionsWithoutCorrectAnswers'
			}
		];
		return options;
	}
}

decorate(QuizSubmissionView, {
	// props
	canUpdateShowStandards: observable,
	canUpdateShowAttemptScore: observable,
	canUpdateShowStatsClassAverage: observable,
	canUpdateShowStatsScoreDistribution: observable,
	isPrimaryView: observable,
	showStandards: observable,
	isStandardsSupported: observable,
	showAttemptScore: observable,
	showStatsClassAverage: observable,
	showStatsScoreDistribution: observable,
	canUpdateMessage: observable,
	message: observable,
	isMessageRichtext: observable,
	canUpdateHideShowQuestions: observable,
	hideQuestions: observable,
	canUpdateShowCorrectAnswers: observable,
	canUpdateShowLearnerResponses: observable,
	canUpdateShowQuestions: observable,
	canUpdateShowQuestionScore: observable,
	showCorrectAnswers: observable,
	showLearnerResponses: observable,
	showQuestionScore: observable,
	showQuestionsType: observable,
	showQuestionsOptions: observable,
	accordionDropdownOptions: observable,
	canDeleteSubmissionView: observable,
	canUpdateAttemptRestrictions: observable,
	canUpdateIpRestrictions: observable,
	canUpdateTimeLimit: observable,
	attemptRestrictions: observable,
	ipRestrictions: observable,
	timeLimit: observable,
	canUpdateReleaseDate: observable,
	releaseDate: observable,
	canUpdateTimeLimitNumber: observable,
	timeLimitNumber: observable,
	canUpdateAttemptRestrictionNumber: observable,
	canUpdateGradeRestrictions: observable,
	attemptRestrictionNumber: observable,
	gradeRestrictions: observable,
	canUpdateGradeRestrictionsMinMaxGrade: observable,
	gradeRestrictionsMinGrade: observable,
	gradeRestrictionsMaxGrade: observable,
	attemptRestrictionsOptions: observable,
	// actions
	load: action,
	setMessage: action,
	setShowAttemptScore: action,
	setShowQuestionsAndCorrectAnswers: action,
	setShowStatsClassAverage: action,
	setShowStatsScoreDistribution: action,
	deleteSubmissionView: action,
	setAttemptRestrictions: action,
	setIpRestrictions: action,
	setTimeLimit: action,
	setReleaseDate: action,
	setTimeLimitNumber: action,
	setAttemptRestrictionNumber: action,
	setGradeRestrictions: action,
	setMinMaxGrade: action
});
