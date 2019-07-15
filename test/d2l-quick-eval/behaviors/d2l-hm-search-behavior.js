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
			assert.isFalse(searchBehavior.searchLoading);
		});
		test('properly sets searchAction given valid entity', () => {
			const entity = {
				'actions': [
					{
						'name': 'search',
						'href': '/not/a/real/url'
					}
				]
			};

			const parsedEntity = SirenParse(entity);
			searchBehavior.entity = parsedEntity;
			assert.isOk(searchBehavior.searchAction);
			assert.equal(searchBehavior.searchAction, parsedEntity.actions[0]);
		});

		test('Properly set searchAction given invalid entity', () => {
			searchBehavior.entity = null;
			assert.isNotOk(searchBehavior.searchAction);
		});

		test('d2l-hm-search-results-loading sets searchLoading to true', () => {
			searchBehavior.dispatchEvent(
				new CustomEvent(
					'd2l-hm-search-results-loading'
				)
			);
			assert.isTrue(searchBehavior.searchLoading);
		});

		test('d2l-hm-search-results-loaded sets searchLoading to false and entity to results and error to false', () => {
			const results = ['some', 'arbitrary', 'results'];
			searchBehavior.dispatchEvent(
				new CustomEvent(
					'd2l-hm-search-results-loaded',
					{
						detail: {
							results: results,
							searchIsCleared: false
						}
					}
				)
			);
			assert.isTrue(searchBehavior.searchApplied);
			assert.isFalse(searchBehavior.searchLoading);
			assert.equal(results, searchBehavior.entity);
			assert.isFalse(searchBehavior.searchError);
		});

		test('_clearErrors sets searchError to false', () => {
			searchBehavior.searchError = true;
			searchBehavior._clearErrors();
			assert.isFalse(searchBehavior.searchError);
		});

		test('d2l-hm-search-error sets searchError correctly', () => {
			const errorDetail = {error: true};
			searchBehavior.dispatchEvent(
				new CustomEvent(
					'd2l-hm-search-error',
					{
						detail: errorDetail
					}
				)
			);
			assert.isFalse(searchBehavior.searchLoading);
			assert.equal(errorDetail, searchBehavior.searchError);
		});

		test('searchIsCleared sets searchApplied to false', () => {
			searchBehavior.dispatchEvent(
				new CustomEvent(
					'd2l-hm-search-results-loaded',
					{
						detail: {
							results: [],
							searchIsCleared: true
						}
					}
				)
			);
			assert.isFalse(searchBehavior.searchLoading);
			assert.isFalse(searchBehavior.searchApplied);
		});
	});
})();
