(function() {
	let toggle;
	suite('d2l-quick-eval-view-toggle', function() {
		setup(function() {
			toggle = fixture('basic');
		});

		test('instantiating the element works', function() {
			assert.equal(toggle.tagName.toLowerCase(), 'd2l-quick-eval-activity-card');
		});
	});
})();
