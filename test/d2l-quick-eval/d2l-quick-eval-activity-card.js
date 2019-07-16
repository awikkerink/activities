(function() {
	let toggle;
	suite('d2l-quick-eval-view-toggle', function() {
		setup(function() {
			toggle = fixture('basic');
		});

		test('instantiating the element works', function() {
			assert.equal(toggle.tagName.toLowerCase(), 'd2l-quick-eval-activity-card');
		});

		test('_denominatorOver99 works', function() {
			assert.isFalse(toggle._denominatorOver99(50));
			assert.isFalse(toggle._denominatorOver99(99));
			assert.isTrue(toggle._denominatorOver99(100));
			assert.isTrue(toggle._denominatorOver99(200));
		});
	});
})();
