import SirenParse from 'siren-parser';

(function() {
	var searchBehavior;

	suite('d2l-hm-search-behavior', function() {
		setup(function() {
			searchBehavior = fixture('basic');
		});
		test('default state is correct', () => {
			assert.isNotOk(searchBehavior.searchAction);
			assert.isFalse(searchBehavior.searchApplied);
			assert.isFalse(searchBehavior.searchError);
			assert.equal(0, searchBehavior.searchResultsCount);
		});
		test('_setSearchAction properly sets searchAction given valid entity', () => {
			const entity = {
				'actions': [
					{
						'name': 'search',
						'href': '/not/a/real/url'
					}
				]
			};

			assert.isNotOk(searchBehavior.searchAction);
			searchBehavior._setSearchAction(SirenParse(entity));
			assert.isOk(searchBehavior.searchAction);
		});
		test('_setSearchAction invalidates search action given null entity', () => {
			const entity = {
				'actions': [
					{
						'name': 'search',
						'href': '/not/a/real/url'
					}
				]
			};

			searchBehavior._setSearchAction(SirenParse(entity));
			assert.isOk(searchBehavior.searchAction);

			searchBehavior._setSearchAction(null);
			assert.isNotOk(searchBehavior.searchAction);
		});
		test('_clearSearchError sets searchError to false', () => {
			searchBehavior.searchError = true;
			searchBehavior._clearSearchError();
			assert.isFalse(searchBehavior.searchError);
		});
		test('_searchResultsLoaded properly sets variables when entity is valid', () => {
			const entity = {
				'entities': [
					{
						'rel': [],
						'href': '/1'
					},
					{
						'rel': [],
						'href': '/2'
					},
					{
						'rel': [],
						'href': '/3'
					}
				]
			};

			const e = {
				detail: {
					results: SirenParse(entity),
					searchIsCleared: false
				}
			};

			searchBehavior._searchResultsLoaded(e);
			assert.isTrue(searchBehavior.searchApplied);
			assert.equal(3, searchBehavior.searchResultsCount);
			assert.isFalse(searchBehavior.searchError);
		});
		test('_searchResultsLoaded properly sets variables when entity is null', () => {
			const e = {
				detail: {
					results: null,
					searchIsCleared: false
				}
			};

			searchBehavior._searchResultsLoaded(e);
			assert.isTrue(searchBehavior.searchApplied);
			assert.equal(0, searchBehavior.searchResultsCount);
			assert.isFalse(searchBehavior.searchError);
		});
		test('_errorOnSearch sets searchError to true', () => {
			searchBehavior.searchError = false;
			searchBehavior._errorOnSearch();
			assert.isTrue(searchBehavior.searchError);
		});
		test('_clearSearchResults sets searchApplied to false', () => {
			searchBehavior.searchApplied = true;
			searchBehavior._clearSearchResults();
			assert.isFalse(searchBehavior.searchApplied);
		});
	});
})();
