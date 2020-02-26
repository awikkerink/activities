import { ActivityScoreGrade} from '../../../components/d2l-activity-editor/state/activity-score-grade.js';
import { expect } from 'chai';
import { when } from 'mobx';

describe('Activity Score Grade', function() {

	const defaultEntityMock = {
		scoreOutOf: () => 10,
		inGrades: () => true,
		gradeType: () => 'Points',
		canEditScoreOutOf: () => true,
		canSeeGrades: () => true,
		canEditGrades: () => true
	};

	describe('fetching', () => {

		it('initializes', async() => {
			const activity = new ActivityScoreGrade(defaultEntityMock);

			expect(activity.isUngraded).to.be.false;
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

	describe('saving', () => {
		it.skip('saves', () => {
		});
	});
});
