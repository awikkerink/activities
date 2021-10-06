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
			isPrimaryView: () => true
		};
	}

	function readOnlyEntityMock() {
		return {
			isPrimaryView: () => true
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

			QuizSubmissionViewsEntity.mockImplementation(() => {
				return defaultEntityMock();
			});

			fetchEntity.mockImplementation(() => Promise.resolve(sirenEntity));
		});

		it('fetches', async() => {
			const submissionView = new QuizSubmissionView('http://1', 'token');
			await submissionView.fetch();

			expect(submissionView.isPrimaryView).to.be.true;
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
			const submissionView = new QuizSubmissionViews('http://1', 'token');
			await submissionView.fetch();

			expect(submissionView.isPrimaryView).to.be.true;
		});
	});
});

