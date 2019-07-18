(function() {
	let qeActivityCard;
	suite('d2l-quick-eval-activity-card', function() {
		setup(function() {
			qeActivityCard = fixture('basic');
		});

		test('instantiating the element works', function() {
			assert.equal(qeActivityCard.tagName.toLowerCase(), 'd2l-quick-eval-activity-card');
		});

		test('_denominatorOver99 works', function() {
			assert.isFalse(qeActivityCard._denominatorOver99(50));
			assert.isFalse(qeActivityCard._denominatorOver99(99));
			assert.isTrue(qeActivityCard._denominatorOver99(100));
			assert.isTrue(qeActivityCard._denominatorOver99(200));
		});

		test('_computeFormattedDate works as intended when activity has valid dueDate', function() {
			const dueDate = '2012-09-01T13:00:00.000';
			const expectedFormattedDate = '9/1/2012 1:00 PM';

			assert.equal(qeActivityCard._computeFormattedDate(dueDate), expectedFormattedDate);
		});

		test('_computeFormattedDate works as intended when activity does not have dueDate', function() {
			const dueDate = '';
			const expectedFormattedDate = '';

			assert.equal(qeActivityCard._computeFormattedDate(dueDate), expectedFormattedDate);
		});
	});
})();
