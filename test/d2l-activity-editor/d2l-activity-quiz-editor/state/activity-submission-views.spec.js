import { expect } from 'chai';
import { fetchEntity } from '../../../../components/d2l-activity-editor/state/fetch-entity.js';
import { QuizSubmissionView } from '../../../../components/d2l-activity-editor/d2l-activity-quiz-editor/state/quiz-submission-view.js';
import { QuizSubmissionViews } from '../../../../components/d2l-activity-editor/d2l-activity-quiz-editor/state/quiz-submission-views.js';
import { QuizSubmissionViewsEntity } from 'siren-sdk/src/activities/quizzes/submissionViews/QuizSubmissionViewsEntity.js';
import sinon from 'sinon';
jest.mock('siren-sdk/src/activities/quizzes/submissionViews/QuizSubmissionViewsEntity.js');
jest.mock('../../../../components/d2l-activity-editor/state/fetch-entity.js');

describe('Activity Submission Views', function() {

	function defaultEntityMock() {
		return {
			canAddView: () => true,
			linkedSubmissionViews: () => null
		};
	}

	function readOnlyEntityMock() {
		return {
			canAddView: () => false,
			linkedSubmissionViews: () => null
		};
	}

	afterEach(() => {
		sinon.restore();
		QuizSubmissionViewsEntity.mockClear();
		fetchEntity.mockClear();
	});

	let sirenEntity;

	describe('Submission Views', () => {
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

		describe('remove view', () => {
			let views;
			beforeEach(() => {
				const view1 = new QuizSubmissionView('http://100', 'token');
				const view2 = new QuizSubmissionView('http://200', 'token');

				views = [view1, view2];
			});

			it('does not modify views collection if view href is not found', async() => {
				const submissionViews = new QuizSubmissionViews('http://1', 'token');
				await submissionViews.fetch();

				submissionViews.submissionViews = views;

				expect(submissionViews.submissionViews.length).to.equal(2);
				submissionViews.removeView('already removed');
				expect(submissionViews.submissionViews.length).to.equal(2);
			});

			it('removes view from collection if view href is found', async() => {
				const submissionViews = new QuizSubmissionViews('http://1', 'token');
				await submissionViews.fetch();

				submissionViews.submissionViews = views;

				expect(submissionViews.submissionViews.length).to.equal(2);
				submissionViews.removeView('http://200');
				expect(submissionViews.submissionViews.length).to.equal(1);
			});
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

