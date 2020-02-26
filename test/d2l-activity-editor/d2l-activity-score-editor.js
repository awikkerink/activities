import '../../components/d2l-activity-editor/d2l-activity-score-editor.js';
import { elementUpdated, expect, fixture, html } from '@open-wc/testing';
import { ActivityScoreGrade } from '../../components/d2l-activity-editor/state/activity-score-grade.js';
import { ActivityUsage } from '../../components/d2l-activity-editor/state/activity-usage.js';
import { shared as store } from '../../components/d2l-activity-editor/state/activity-store.js';

describe('d2l-activity-score-editor', function() {

	let el, href, activity, score;

	beforeEach(async() => {
		score = new ActivityScoreGrade({
			scoreOutOf: () => 50,
			inGrades: () => true,
			gradeType: () => 'Points',
			canEditScoreOutOf: () => true,
			canSeeGrades: () => true,
			canEditGrades: () => true
		});
		href = 'http://activity/1';

		activity = new ActivityUsage(href, 'token');
		activity.setScoreAndGrade(score);
		store.put(href, activity);

		el = await fixture(html`
			<d2l-activity-score-editor href=${href} token="token"></d2l-activity-score-editor>
		`);
	});

	afterEach(() => {
		store.clear();
	});

	describe('graded', () => {
		it('passes accessibility test', async() => {
			await expect(el).to.be.accessible();
		});

		it('renders score out of input', async() => {
			expect(el.shadowRoot.querySelectorAll('#score-out-of')).to.exist;
			const input = el.shadowRoot.querySelector('#score-out-of');
			expect(input.value).to.equal('50');
		});

		describe('can see grades', () => {
			it('renders grade menu', async() => {
				expect(el.shadowRoot.querySelectorAll('#grade-dropdown')).to.exist;
			});
		});

	});

	describe('ungraded', () => {
		beforeEach(async() => {
			score.setUngraded();
			await elementUpdated(el);
		});

		it('passes accessibility test', async() => {
			await expect(el).to.be.accessible();
		});

		it('renders ungraded button', async() => {
			expect(el.shadowRoot.querySelectorAll('#ungraded')).to.exist;
		});

		it('does not render grade menu', async() => {
			expect(el.shadowRoot.querySelectorAll('#grade-dropdown')).to.not.exist;
		});
	});
});
