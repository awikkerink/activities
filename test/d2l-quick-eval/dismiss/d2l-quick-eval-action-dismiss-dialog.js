/* global moment:false */
suite('_getIso8601Date', () => {

	let component;

	setup(function() {
		component = fixture('basic');
	});

	const testCases = [
		{
			testName: 'no padding',
			date: moment(new Date(1999, 9, 10)),
			expected: '1999-10-10'
		},
		{
			testName: 'pad month and day',
			date: moment(new Date(2020, 0, 9)),
			expected: '2020-01-09'
		}
	];

	testCases.forEach(testCase => {
		test(testCase.testName, () => {
			const actual = component._getIso8601Date(testCase.date);
			assert.equal(actual, testCase.expected);
		});
	});
});
