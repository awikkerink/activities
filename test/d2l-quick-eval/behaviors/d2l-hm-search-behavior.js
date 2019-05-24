(function() {
	var searchBehavior;

	suite('d2l-hm-search-behavior', function() {
		setup(function() {
			searchBehavior = fixture('basic');
		});
		test('default state is correct', () => {
			assert.equal(null, searchBehavior.searchAction);
			assert.equal(true, searchBehavior.searchCleared);
			assert.equal(false, searchBehavior.searchError);
			assert.equal(0, searchBehavior.searchResultsCount);
		});
		test('_searchResultsLoading sets searchError to false', () => {
			searchBehavior.searchError = true;
			searchBehavior._searchResultsLoading();
			assert.equal(false, searchBehavior.searchError);
		});
		test('_errorOnSearch sets searchError to true', () => {
			searchBehavior.searchError = false;
			searchBehavior._errorOnSearch();
			assert.equal(true, searchBehavior.searchError);
		});
		test('_clearSearchResults sets searchCleared to true', () => {
			searchBehavior.searchCleared = false;
			searchBehavior._clearSearchResults();
			assert.equal(true, searchBehavior.searchCleared);
		});
	});
})();
