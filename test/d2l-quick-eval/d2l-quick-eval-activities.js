import '@polymer/iron-test-helpers/mock-interactions.js';

(function() {
	var list;

	suite('d2l-quick-eval-activities', function() {
		setup(function() {
			list = fixture('basic');
		});
		test('instantiating the element works', function() {
			assert.equal(list.tagName.toLowerCase(), 'd2l-quick-eval-activities');
		});
		test('attributes are set correctly', function() {
			assert.equal(list.href, 'blah');
			assert.equal(list.token, 't');
		});
		test('if there is no data in the list, d2l-quick-eval-no-submissions-image is shown', () => {
			var noSubmissionComponent = list.shadowRoot.querySelector('.d2l-quick-eval-no-submissions');
			assert.notEqual(getComputedStyle(noSubmissionComponent).display, 'none');
			var noCriteriaResultsComponent = list.shadowRoot.querySelector('.d2l-quick-eval-no-criteria-results');
			assert.equal(getComputedStyle(noCriteriaResultsComponent).display, 'none');
		});
		test('if there is no data in the list and filters have been applied, d2l-quick-eval-no-criteria-results-image is shown', () => {
			list.filterApplied = true;

			var noCriteriaResultsComponent = list.shadowRoot.querySelector('.d2l-quick-eval-no-criteria-results');
			assert.notEqual(getComputedStyle(noCriteriaResultsComponent).display, 'none');
			var noSubmissionComponent = list.shadowRoot.querySelector('.d2l-quick-eval-no-submissions');
			assert.equal(getComputedStyle(noSubmissionComponent).display, 'none');
		});
		test('if there is no data in the list and search has been applied, d2l-quick-eval-no-criteria-results-image is shown', () => {
			list.searchApplied = true;

			var noCriteriaResultsComponent = list.shadowRoot.querySelector('.d2l-quick-eval-no-criteria-results');
			assert.notEqual(getComputedStyle(noCriteriaResultsComponent).display, 'none');
			var noSubmissionComponent = list.shadowRoot.querySelector('.d2l-quick-eval-no-submissions');
			assert.equal(getComputedStyle(noSubmissionComponent).display, 'none');
		});
		test('if there is no data in the list and filters and search have been applied, d2l-quick-eval-no-criteria-results-image is shown', () => {
			list.filterApplied = true;
			list.searchApplied = true;

			var noCriteriaResultsComponent = list.shadowRoot.querySelector('.d2l-quick-eval-no-criteria-results');
			assert.notEqual(getComputedStyle(noCriteriaResultsComponent).display, 'none');
			var noSubmissionComponent = list.shadowRoot.querySelector('.d2l-quick-eval-no-submissions');
			assert.equal(getComputedStyle(noSubmissionComponent).display, 'none');
		});
	});
})();
