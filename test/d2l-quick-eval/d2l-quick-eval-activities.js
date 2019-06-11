import '@polymer/iron-test-helpers/mock-interactions.js';

(function() {
	let act, list, noSubmissionComponent, noCriteriaResultsComponent;

	const expectedData = [
		{
			name: 'Org Name',
			activities: [{
				courseName: 'Org Name',
				activityNameHref: 'data/assignmentActivity.json',
				assigned: 21,
				completed: 22,
				published: 23,
				evaluated: 24,
				unread: 25,
				resubmitted: 26,
				dueDate: '2019-03-03T03:03:03.003Z',
				activityType: 'assignment'
			},
			{
				courseName: 'Org Name',
				activityNameHref: 'data/quizActivity.json',
				assigned: 11,
				completed: 12,
				published: 13,
				evaluated: 14,
				unread: 15,
				resubmitted: 16,
				dueDate: '2019-02-02T02:02:02.002Z',
				activityType: 'quiz'
			},
			{
				courseName: 'Org Name',
				activityNameHref: 'data/topicActivity.json',
				assigned: 1,
				completed: 2,
				published: 3,
				evaluated: 4,
				unread: 5,
				resubmitted: 6,
				dueDate: '2019-01-01T01:01:01.001Z',
				activityType: 'discussion'
			}]
		}
	];

	async function loadPromise(url) {
		var entity = await window.D2L.Siren.EntityStore.fetch(url, '');
		await act._loadData(entity.entity);
	}

	suite('d2l-quick-eval-activities', function() {
		setup(function() {
			act = fixture('basic');
			noSubmissionComponent = act.shadowRoot.querySelector('.d2l-quick-eval-no-submissions');
			noCriteriaResultsComponent = act.shadowRoot.querySelector('.d2l-quick-eval-no-criteria-results');
			list = act.shadowRoot.querySelector('d2l-quick-eval-activities-list');
		});
		test('instantiating the element works', function() {
			assert.equal(act.tagName.toLowerCase(), 'd2l-quick-eval-activities');
		});
		test('attributes are set correctly', function() {
			assert.equal(act.href, 'blah');
			assert.equal(act.token, 't');
		});
		test('if there is no data, d2l-quick-eval-no-submissions-image is shown', () => {
			assert.notEqual(getComputedStyle(noSubmissionComponent).display, 'none');
			assert.equal(getComputedStyle(noCriteriaResultsComponent).display, 'none');
			assert.equal(getComputedStyle(list).display, 'none');
		});
		test('if there is no data and filters have been applied, d2l-quick-eval-no-criteria-results-image is shown', () => {
			act.filterApplied = true;

			assert.notEqual(getComputedStyle(noCriteriaResultsComponent).display, 'none');
			assert.equal(getComputedStyle(noSubmissionComponent).display, 'none');
			assert.equal(getComputedStyle(list).display, 'none');
		});
		test('if there is no data and search has been applied, d2l-quick-eval-no-criteria-results-image is shown', () => {
			act.searchApplied = true;

			assert.notEqual(getComputedStyle(noCriteriaResultsComponent).display, 'none');
			assert.equal(getComputedStyle(noSubmissionComponent).display, 'none');
			assert.equal(getComputedStyle(list).display, 'none');
		});
		test('if there is no data and filters and search have been applied, d2l-quick-eval-no-criteria-results-image is shown', () => {
			act.filterApplied = true;
			act.searchApplied = true;

			assert.notEqual(getComputedStyle(noCriteriaResultsComponent).display, 'none');
			assert.equal(getComputedStyle(noSubmissionComponent).display, 'none');
			assert.equal(getComputedStyle(list).display, 'none');
		});
		test('if there is data, the list is shown', () => {
			act._data = expectedData;
			assert.equal(getComputedStyle(noCriteriaResultsComponent).display, 'none');
			assert.equal(getComputedStyle(noSubmissionComponent).display, 'none');
			assert.notEqual(getComputedStyle(list).display, 'none');
		});
		test('data is imported correctly', (done) => {
			loadPromise('data/unassessedActivitiesCollection.json').then(function() {
				assert.equal(act._data.length, expectedData.length);
				assert.deepEqual(act._data, expectedData);
				done();
			});
		});
	});
})();
