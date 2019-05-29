import SirenParse from 'siren-parser';

(function() {
	var filterBehavior;

	suite('d2l-hm-filter-behavior', function() {
		setup(function() {
			filterBehavior = fixture('basic');
		});
		test('default state is correct', () => {
			assert.lengthOf(filterBehavior.filterHref, 0);
			assert.isFalse(filterBehavior.filterError);
		});
		test.skip('_setFilterHref properly sets filterHref given valid entity', () => {
			const entity = {
				'actions': [
					{
						'name': 'search',
						'href': '/not/a/real/url'
					}
				]
			};

			assert.isNull(filterBehavior.searchAction);
			filterBehavior._setSearchAction(SirenParse(entity));
			assert.isNotNull(filterBehavior.searchAction);
		});
		test.skip('_setSearchAction invalidates search action given null entity', () => {
			const entity = {
				'actions': [
					{
						'name': 'search',
						'href': '/not/a/real/url'
					}
				]
			};

			filterBehavior._setSearchAction(SirenParse(entity));
			assert.isNotNull(filterBehavior.searchAction);

			filterBehavior._setSearchAction(null);
			assert.isNull(filterBehavior.searchAction);
		});
		test('_clearFilterError sets filterError to false', () => {
			filterBehavior.filterError = true;
			filterBehavior._clearFilterError();
			assert.isFalse(filterBehavior.filterError);
		});
		test('_errorOnFilter sets filterError to true', () => {
			filterBehavior.filterError = false;
			filterBehavior._errorOnFilter();
			assert.isTrue(filterBehavior.filterError);
		});
	});
})();
