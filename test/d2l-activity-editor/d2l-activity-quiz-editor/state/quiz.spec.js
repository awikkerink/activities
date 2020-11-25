import { expect } from 'chai';
import { fetchEntity } from '../../../../components/d2l-activity-editor/state/fetch-entity.js';
import { Quiz } from '../../../../components/d2l-activity-editor/d2l-activity-quiz-editor/state/quiz.js';
import { QuizEntity } from 'siren-sdk/src/activities/quizzes/QuizEntity.js';
import sinon from 'sinon';

jest.mock('siren-sdk/src/activities/quizzes/QuizEntity.js');
jest.mock('../../../../components/d2l-activity-editor/state/fetch-entity.js');

describe('Quiz', function() {

	afterEach(() => {
		sinon.restore();
		QuizEntity.mockClear();
		fetchEntity.mockClear();
	});

	let sirenEntity;

	beforeEach(() => {
		sirenEntity = sinon.stub();

		QuizEntity.mockImplementation(() => {
			return {
				name: () => 'Homework 101',
				canEditName: () => true,
				canEditHints: () => true,
				getHintsToolEnabled: () => false,
				canEditDisableRightClick: () => true,
				isDisableRightClickEnabled: () => false,
				canEditDisablePagerAndAlerts: () => true,
				isDisablePagerAndAlertsEnabled: () => false,
				password: () => 'hello',
				canEditPassword: () => true,
				canEditNotificationEmail: () => true,
				notificationEmail: () => 'hello@d2l.com'
			};
		});

		fetchEntity.mockImplementation(() => sirenEntity);
	});

	it('fetches', async() => {
		const quiz = new Quiz('http://quiz/1', 'token');
		await quiz.fetch();

		expect(quiz.name).to.equal('Homework 101');
		expect(quiz.canEditName).to.equal(true);
		expect(quiz.canEditHints).to.equal(true);
		expect(quiz.hintsToolEnabled).to.equal(false);
		expect(quiz.canEditDisableRightClick).to.equal(true);
		expect(quiz.isDisableRightClickEnabled).to.equal(false);
		expect(quiz.canEditDisablePagerAndAlerts).to.equal(true);
		expect(quiz.isDisablePagerAndAlertsEnabled).to.equal(false);
		expect(quiz.canEditNotificationEmail).to.equal(true);
		expect(quiz.notificationEmail).to.equal('hello@d2l.com');

		expect(fetchEntity.mock.calls.length).to.equal(1);
		expect(QuizEntity.mock.calls[0][0]).to.equal(sirenEntity);
		expect(QuizEntity.mock.calls[0][1]).to.equal('token');
	});

	it('setDisablePagerAndAlerts', async() => {
		const quiz = new Quiz('http://quiz/1', 'token');
		await quiz.fetch();
		quiz.setDisablePagerAndAlertsTool(true);

		expect(quiz.isDisablePagerAndAlertsEnabled).to.equal(true);
	});

	it('setDisableRightClick', async() => {
		const quiz = new Quiz('http://quiz/1', 'token');
		await quiz.fetch();
		quiz.setDisableRightClick(true);

		expect(quiz.isDisableRightClickEnabled).to.equal(true);
	});

	it('setHintsToolEnabled', async() => {
		const quiz = new Quiz('http://quiz/1', 'token');
		await quiz.fetch();
		quiz.setHintsToolEnabled(true);

		expect(quiz.hintsToolEnabled).to.equal(true);
	});

	it('setName', async() => {
		const quiz = new Quiz('http://quiz/1', 'token');
		await quiz.fetch();
		quiz.setName('No Homework');

		expect(quiz.name).to.equal('No Homework');
	});

	it('setPassword', async() => {
		const quiz = new Quiz('http://quiz/1', 'token');
		await quiz.fetch();

		const password = 'super-secret-password';
		quiz.setPassword(password);

		expect(quiz.password).to.equal(password);
	});

	it('setNotificationEmail', async() => {
		const quiz = new Quiz('http://quiz/1', 'token');
		await quiz.fetch();

		const notificationEmail = 'modified@email.com';
		quiz.setNotificationEmail(notificationEmail);

		expect(quiz.notificationEmail).to.equal(notificationEmail);
	});

});
