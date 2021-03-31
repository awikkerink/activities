import { expect } from 'chai';
import { fetchEntity } from '../../../../components/d2l-activity-editor/state/fetch-entity.js';
import { QuizAttempts } from '../../../../components/d2l-activity-editor/d2l-activity-quiz-editor/state/quiz-attempts.js';
import { QuizAttemptsEntity } from 'siren-sdk/src/activities/quizzes/attempts/QuizAttemptsEntity.js';
import sinon from 'sinon';
jest.mock('siren-sdk/src/activities/quizzes/attempts/QuizAttemptsEntity.js');
jest.mock('../../../../components/d2l-activity-editor/state/fetch-entity.js');

const attemptsAllowedOpts = [
	{ title: 'Unlimited', value: 0, selected: true },
	{ title: 3, value: 3, selected: false }
];
const gradeCalcOptions = [
	{ title: 'Highest Attempt', value: 1, selected: true },
	{ title: 'Lowest Attempt', value: 2, selected: true }
];
const gradeCalcType = { title: 'Highest Attempt', value: 1 };

const attemptConditions = [
	{ properties: { attempt: 2 } },
	{ properties: { attempt: 3 } }
];

describe('Quiz Attempts', function() {
	afterEach(() => {
		sinon.restore();
		QuizAttemptsEntity.mockClear();
		fetchEntity.mockClear();
	});

	let sirenEntity;

	beforeEach(() => {
		sirenEntity = sinon.stub();

		QuizAttemptsEntity.mockImplementation(() => {
			return {
				canUpdateAttemptsAllowed: () => true,
				canUpdateOverallGradeCalculation: () => true,
				canUpdateRetakeIncorrectOnly: () => true,
				canUpdateAttemptConditions: () => true,
				attemptsAllowed: () => '5',
				attemptsAllowedOptions: () => attemptsAllowedOpts,
				overallGradeCalculationType: () => gradeCalcType,
				overallGradeCalculationOptions: () => gradeCalcOptions,
				isRetakeIncorrectOnly: () => true,
				attemptConditions: () => attemptConditions
			};
		});

		fetchEntity.mockImplementation(() => Promise.resolve(sirenEntity));
	});

	describe('attempts', () => {
		it('fetches', async() => {
			const attempts = new QuizAttempts('http://1', 'token');
			await attempts.fetch();

			expect(attempts.canUpdateAttemptsAllowed).to.be.true;
			expect(attempts.canUpdateOverallGradeCalculation).to.be.true;
			expect(attempts.canUpdateRetakeIncorrectOnly).to.be.true;
			expect(attempts.attemptsAllowedOptions.length).to.equal(2);
			expect(attempts.overallGradeCalculationType).to.deep.equal(gradeCalcType);
			expect(attempts.overallGradeCalculationOptions.length).to.equal(2);
			expect(attempts.isRetakeIncorrectOnly).to.be.true;
			expect(attempts.attemptConditions.length).to.equal(2);
		});

		it('set attempts', async() => {
			const attempts = new QuizAttempts('http://1', 'token');
			await attempts.fetch();
			expect(attempts.attemptsAllowed).to.equal('5');

			attempts.setAttemptsAllowed('2');
			expect(attempts.attemptsAllowed).to.equal('2');

		});

		it('set overallGradeCalculation type', async() => {
			const attempts = new QuizAttempts('http://1', 'token');
			await attempts.fetch();
			expect(attempts.overallGradeCalculationType).to.include(gradeCalcType);

			attempts.setOverallGradeCalculationType(gradeCalcOptions[1]);
			const newGradeCalcType = {
				title: gradeCalcOptions[1].title,
				value: gradeCalcOptions[1].value
			};
			expect(attempts.overallGradeCalculationType).to.include(newGradeCalcType);
		});

		it('set retakeIncorrectOnly', async() => {
			const attempts = new QuizAttempts('http://1', 'token');
			await attempts.fetch();

			attempts.setRetakeIncorrectOnly(false);
			expect(attempts.isRetakeIncorrectOnly).to.be.false;
		});

		it('set attempt conditions', async() => {
			const attempts = new QuizAttempts('http://1', 'token');
			await attempts.fetch();
			const attemptConditionTwo = { attempt: 2, min: 2.5, max: 88.8 };
			const attemptConditionThree = { attempt: 3, min: 42 };

			attempts.setAttemptCondition(attemptConditionTwo);
			expect(attempts.attemptConditions[0].properties).to.include(attemptConditionTwo);
			attempts.setAttemptCondition(attemptConditionThree);
			expect(attempts.attemptConditions[1].properties).to.include(attemptConditionThree);
		});

		it('delete attempt condition min and/or max values', async() => {
			const attempts = new QuizAttempts('http://1', 'token');
			await attempts.fetch();
			const attemptConditionTwo = { attempt: 2, min: 2.5, max: 88.8 };
			const attemptConditionThree = { attempt: 3, min: 42, max: 94 };
			const attemptConditionTwoNoMin = { attempt: 2, min: undefined, max: 88.8 };
			const attemptConditionThreeNoMax = { attempt: 3, min: 42, max: undefined };
			const attemptConditionThreeReset = { attempt: 3, min: undefined, max: undefined };

			attempts.setAttemptCondition(attemptConditionTwo);
			attempts.setAttemptCondition(attemptConditionThree);
			attempts.setAttemptCondition(attemptConditionTwoNoMin);
			attempts.setAttemptCondition(attemptConditionThreeNoMax);
			expect(attempts.attemptConditions[0].properties).to.include(attemptConditionTwoNoMin);
			expect(attempts.attemptConditions[1].properties).to.include(attemptConditionThreeNoMax);
			attempts.setAttemptCondition(attemptConditionThreeReset);
			expect(attempts.attemptConditions[1].properties).to.include(attemptConditionThreeReset);
		});
	});
});
