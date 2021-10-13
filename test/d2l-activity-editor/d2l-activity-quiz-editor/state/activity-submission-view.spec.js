import { expect } from 'chai';
import { fetchEntity } from '../../../../components/d2l-activity-editor/state/fetch-entity.js';
import { QuizSubmissionView } from '../../../../components/d2l-activity-editor/d2l-activity-quiz-editor/state/quiz-submission-view.js';
import { QuizSubmissionViewEntity } from 'siren-sdk/src/activities/quizzes/submissionViews/QuizSubmissionViewEntity.js';
import sinon from 'sinon';
jest.mock('siren-sdk/src/activities/quizzes/submissionViews/QuizSubmissionViewEntity.js');
jest.mock('../../../../components/d2l-activity-editor/state/fetch-entity.js');

describe('Activity Submission View', function() {

	function defaultEntityMock() {
		return {
			canDeleteSubmissionView: () => true,
			canUpdateShowStandards: () => true,
			canUpdateShowAttemptScore: () => true,
			canUpdateShowStatsClassAverage: () => true,
			canUpdateShowStatsScoreDistribution: () => true,
			isPrimaryView: () => true,
			showStandards: () => true,
			showAttemptScore: () => true,
			showStatsClassAverage: () => true,
			showStatsScoreDistribution: () => true,
			canUpdateMessage: () => true,
			message: () => '<p>hello</p>',
			isMessageRichtext: () => true,
			canUpdateHideShowQuestions: () => true,
			hideQuestions: () => true,
			canUpdateShowCorrectAnswers: () => true,
			canUpdateShowLearnerResponses: () => true,
			canUpdateShowQuestions: () => true,
			canUpdateShowQuestionScore: () => true,
			showCorrectAnswers: () => true,
			showLearnerResponses: () => true,
			showQuestionScore: () => true,
			showQuestionsType: () => 'all-questions',
			showQuestionsOptions: () => [
				{
					'value': 'all-questions',
					'selected': true
				},
				{
					'value': 'incorrect-questions',
					'selected': false
				},
				{
					'value': 'correct-questions',
					'selected': false
				}
			]
		};
	}

	function readOnlyEntityMock() {
		return {
			canDeleteSubmissionView: () => false,
			canUpdateShowStandards: () => false,
			canUpdateShowAttemptScore: () => false,
			canUpdateShowStatsClassAverage: () => false,
			canUpdateShowStatsScoreDistribution: () => false,
			isPrimaryView: () => true,
			showStandards: () => true,
			showAttemptScore: () => true,
			showStatsClassAverage: () => true,
			showStatsScoreDistribution: () => true,
			canUpdateMessage: () => false,
			message: () => '<p>hello</p>',
			isMessageRichtext: () => true,
			canUpdateHideShowQuestions: () => false,
			hideQuestions: () => true,
			canUpdateShowCorrectAnswers: () => false,
			canUpdateShowLearnerResponses: () => false,
			canUpdateShowQuestions: () => false,
			canUpdateShowQuestionScore: () => false,
			showCorrectAnswers: () => true,
			showLearnerResponses: () => true,
			showQuestionScore: () => true,
			showQuestionsType: () => 'all-questions',
			showQuestionsOptions: () => undefined
		};
	}

	afterEach(() => {
		sinon.restore();
		QuizSubmissionViewEntity.mockClear();
		fetchEntity.mockClear();
	});

	let sirenEntity;

	describe('Submission View', () => {
		beforeEach(() => {
			sirenEntity = sinon.stub();

			QuizSubmissionViewEntity.mockImplementation(() => {
				return defaultEntityMock();
			});

			fetchEntity.mockImplementation(() => Promise.resolve(sirenEntity));
		});

		it('fetches', async() => {
			const submissionView = new QuizSubmissionView('http://1', 'token');
			await submissionView.fetch();

			expect(submissionView.canDeleteSubmissionView).to.be.true;
			expect(submissionView.canUpdateShowStandards).to.be.true;
			expect(submissionView.canUpdateShowAttemptScore).to.be.true;
			expect(submissionView.canUpdateShowStatsClassAverage).to.be.true;
			expect(submissionView.canUpdateShowStatsScoreDistribution).to.be.true;
			expect(submissionView.isPrimaryView).to.be.true;
			expect(submissionView.showStandards).to.be.true;
			expect(submissionView.showAttemptScore).to.be.true;
			expect(submissionView.showStatsClassAverage).to.be.true;
			expect(submissionView.showStatsScoreDistribution).to.be.true;
			expect(submissionView.canUpdateMessage).to.be.true;
			expect(submissionView.message).to.equal('<p>hello</p>');
			expect(submissionView.isMessageRichtext).to.be.true;
			expect(submissionView.canUpdateHideShowQuestions).to.be.true;
			expect(submissionView.hideQuestions).to.be.true;
			expect(submissionView.canUpdateShowCorrectAnswers).to.be.true;
			expect(submissionView.canUpdateShowLearnerResponses).to.be.true;
			expect(submissionView.canUpdateShowQuestions).to.be.true;
			expect(submissionView.canUpdateShowQuestionScore).to.be.true;
			expect(submissionView.showCorrectAnswers).to.be.true;
			expect(submissionView.showLearnerResponses).to.be.true;
			expect(submissionView.showQuestionScore).to.be.true;
			expect(submissionView.showQuestionsType).to.equal('all-questions');
			expect(submissionView.showQuestionsOptions.length).to.equal(3);
		});
	});

	describe('fetching readonly', () => {
		beforeEach(() => {
			sirenEntity = sinon.stub();

			QuizSubmissionViewEntity.mockImplementation(() => {
				return readOnlyEntityMock();
			});

			fetchEntity.mockImplementation(() => Promise.resolve(sirenEntity));
		});

		it('fetches readonly entity', async() => {
			const submissionView = new QuizSubmissionView('http://1', 'token');
			await submissionView.fetch();

			expect(submissionView.canDeleteSubmissionView).to.be.false;
			expect(submissionView.canUpdateShowStandards).to.be.false;
			expect(submissionView.canUpdateShowAttemptScore).to.be.false;
			expect(submissionView.canUpdateShowStatsClassAverage).to.be.false;
			expect(submissionView.canUpdateShowStatsScoreDistribution).to.be.false;
			expect(submissionView.isPrimaryView).to.be.true;
			expect(submissionView.showStandards).to.be.true;
			expect(submissionView.showAttemptScore).to.be.true;
			expect(submissionView.showStatsClassAverage).to.be.true;
			expect(submissionView.showStatsScoreDistribution).to.be.true;
			expect(submissionView.canUpdateMessage).to.be.false;
			expect(submissionView.message).to.equal('<p>hello</p>');
			expect(submissionView.isMessageRichtext).to.be.true;
			expect(submissionView.canUpdateHideShowQuestions).to.be.false;
			expect(submissionView.hideQuestions).to.be.true;
			expect(submissionView.canUpdateShowCorrectAnswers).to.be.false;
			expect(submissionView.canUpdateShowLearnerResponses).to.be.false;
			expect(submissionView.canUpdateShowQuestions).to.be.false;
			expect(submissionView.canUpdateShowQuestionScore).to.be.false;
			expect(submissionView.showCorrectAnswers).to.be.true;
			expect(submissionView.showLearnerResponses).to.be.true;
			expect(submissionView.showQuestionScore).to.be.true;
			expect(submissionView.showQuestionsType).to.equal('all-questions');
			expect(submissionView.showQuestionsOptions).to.be.undefined;
		});
	});
});

