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
