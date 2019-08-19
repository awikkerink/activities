(function() {
	let subtitle;
	suite('d2l-quick-eval-activity-card-subtitle', function() {
		setup(function() {
			subtitle = fixture('basic');
		});

		test('instantiating the element works', function() {
			assert.equal(subtitle.tagName.toLowerCase(), 'd2l-quick-eval-activity-card-subtitle');
		});

		[
			{ activityType: 'quiz', dueDate: '2012-09-01T13:00:00.000', expected: ['Quiz', 'Due: 9/1/2012 1:00 PM'] },
			{ activityType: 'quiz', dueDate: '', expected: ['Quiz'] },
			{ activityType: 'quiz', dueDate: 'invalid', expected: ['Quiz'] },
			{ activityType: '', dueDate: '2012-09-01T13:00:00.000', expected: ['Due: 9/1/2012 1:00 PM'] },
			{ activityType: 'invalid', dueDate: '2012-09-01T13:00:00.000', expected: ['Due: 9/1/2012 1:00 PM'] }
		].forEach(testCase => {
			test(`_computeText returns ${JSON.stringify(testCase.expected)} when activityType is '${testCase.activityType}' and dueDate is '${testCase.dueDate}'`, function() {
				assert.deepEqual(subtitle._computeText(testCase.activityType, testCase.dueDate), testCase.expected);
			});
		});
	});
})();
