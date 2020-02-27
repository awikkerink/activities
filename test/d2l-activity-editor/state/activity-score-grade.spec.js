import { ActivityScoreGrade} from '../../../components/d2l-activity-editor/state/activity-score-grade.js';
import { expect } from 'chai';
import { when } from 'mobx';

describe('Activity Score Grade', function() {

	let defaultEntityMock;

	beforeEach(() => {
		defaultEntityMock = {
			scoreOutOf: () => 10,
			inGrades: () => true,
			gradeType: () => 'Points',
			canEditScoreOutOf: () => true,
			canSeeGrades: () => true,
			canEditGrades: () => true
		};
	});

	describe('fetching', () => {

		it('initializes with score and in grades', async() => {
			const activity = new ActivityScoreGrade(defaultEntityMock);

			expect(activity.isUngraded).to.be.false;
		});

		it('initializes with score only', async() => {
			defaultEntityMock.inGrades = () => false;

			const activity = new ActivityScoreGrade(defaultEntityMock);

			expect(activity.isUngraded).to.be.false;
		});

		it('initializes with ungraded', async() => {
			defaultEntityMock.scoreOutOf = () => '';
			defaultEntityMock.inGrades = () => false;

			const activity = new ActivityScoreGrade(defaultEntityMock);

			expect(activity.isUngraded).to.be.true;
		});
	});

	describe('updating', () => {

		it('reacts to ungraded', async(done) => {
			const activity = new ActivityScoreGrade(defaultEntityMock);

			when(
				() => activity.isUngraded,
				() => {
					done();
				}
			);

			activity.setUngraded();
		});
	});
});
