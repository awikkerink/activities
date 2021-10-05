import { expect } from 'chai';
import { fetchEntity } from '../../../../components/d2l-activity-editor/state/fetch-entity.js';
import { QuizSubmissionViews } from '../../../../components/d2l-activity-editor/d2l-activity-quiz-editor/state/quiz-submission-views.js';
import { QuizSubmissionViewsEntity } from 'siren-sdk/src/activities/quizzes/submissionViews/QuizSubmissionViewsEntity.js';
import sinon from 'sinon';
jest.mock('siren-sdk/src/activities/quizzes/submissionViews/QuizSubmissionViewsEntity.js');
jest.mock('../../../../components/d2l-activity-editor/state/fetch-entity.js');

describe('Activity Submission Views', function() {

	function defaultEntityMock() {
		return {
			canAddView: () => true
		};
	}

	function readOnlyEntityMock() {
		return {
			canAddView: () => false
		};
	}

	afterEach(() => {
		sinon.restore();
		QuizSubmissionViewsEntity.mockClear();
		fetchEntity.mockClear();
	});

	let sirenEntity;

	describe('Submission View', () => {
		beforeEach(() => {
			sirenEntity = sinon.stub();

			QuizSubmissionViewsEntity.mockImplementation(() => {
				return defaultEntityMock();
			});

			fetchEntity.mockImplementation(() => Promise.resolve(sirenEntity));
		});

		it('fetches', async() => {
			const submissionViews = new QuizSubmissionViews('http://1', 'token');
			await submissionViews.fetch();

			expect(submissionViews.canAddView).to.be.true;
		});
	});

	describe('fetching readonly', () => {
		beforeEach(() => {
			sirenEntity = sinon.stub();

			QuizSubmissionViewsEntity.mockImplementation(() => {
				return readOnlyEntityMock();
			});

			fetchEntity.mockImplementation(() => Promise.resolve(sirenEntity));
		});

		it('fetches readonly entity', async() => {
			const submissionViews = new QuizSubmissionViews('http://1', 'token');
			await submissionViews.fetch();

			expect(submissionViews.canAddView).to.be.false;
		});
	});
});

