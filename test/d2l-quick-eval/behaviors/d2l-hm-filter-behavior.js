import SirenParse from 'siren-parser';

(function() {
	var filterBehavior;

	suite('d2l-hm-filter-behavior', function() {
		setup(function() {
			filterBehavior = fixture('basic');
		});
		test('default state is correct', () => {
			assert.isNotOk(filterBehavior.filterHref);
			assert.isFalse(filterBehavior.filterError);
		});
		test('_setFilterHref properly sets filterHref given valid entity', () => {
			const entity = {
				'links': [
					{
						'rel': ['https://api.brightspace.com/rels/filters'],
						'href': '/not/a/real/url'
					}
				]
			};

			assert.isNotOk(filterBehavior.filterHref);
			filterBehavior._setFilterHref(SirenParse(entity));
			assert.isOk(filterBehavior.filterHref);
		});
		test('_setFilterHref properly sets filterHref given invalid entity', () => {
			const entity = {
				'links': [
					{
						'rel': ['https://api.brightspace.com/rels/filters'],
						'href': '/not/a/real/url'
					}
				]
			};
			filterBehavior._setFilterHref(SirenParse(entity));
			assert.isOk(filterBehavior.filterHref);

			filterBehavior._setFilterHref(null);
			assert.isNotOk(filterBehavior.filterHref);
		});
		test('_filtersLoaded properly sets filterApplied', () => {
			const e = {
				detail: {
					totalSelectedFilters: 2
				}
			};

			filterBehavior.filterApplied = false;
			filterBehavior.filterError = true;

			filterBehavior._filtersLoaded(e);

			assert.isTrue(filterBehavior.filterApplied);
			assert.isFalse(filterBehavior.filterError);

		});
		test('_filtersLoaded properly sets filterApplied when zero filters selected', () => {
			const e = {
				detail: {
					totalSelectedFilters: 0
				}
			};

			filterBehavior.filterApplied = false;
			filterBehavior.filterError = true;

			filterBehavior._filtersLoaded(e);

			assert.isFalse(filterBehavior.filterApplied);
			assert.isFalse(filterBehavior.filterError);

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
