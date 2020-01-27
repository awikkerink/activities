import '@polymer/iron-test-helpers/mock-interactions.js';

suite('d2l-quick-eval-submissions', function() {

	let submissions;

	setup(function() {
		window.D2L.Siren.WhitelistBehavior._testMode(true);
		submissions = fixture('basic');
	});

	test('instantiating the element works', function() {
		assert.equal(submissions.tagName.toLowerCase(), 'd2l-quick-eval-submissions');
	});

	test('_numberOfActivitiesToShow starts with default value of 20', function() {
		assert.equal(20, submissions._numberOfActivitiesToShow);
	});

	test('attributes are set correctly', function() {
		assert.equal(submissions.href, 'blah');
		assert.equal(submissions.token, 't');
	});

	suite('Headers', () => {
		[
			{ masterTeacher: true, courseLevel: true, expected: [ 'displayName', 'activityName', 'localizedSubmissionDate', 'masterTeacher']},
			{ masterTeacher: true, courseLevel: false, expected: [ 'displayName', 'activityName', 'courseName', 'localizedSubmissionDate', 'masterTeacher']},
			{ masterTeacher: false, courseLevel: true, expected: [ 'displayName', 'activityName', 'localizedSubmissionDate']},
			{ masterTeacher: false, courseLevel: false, expected: [ 'displayName', 'activityName', 'courseName', 'localizedSubmissionDate']}
		].forEach(testCase => {
			test('Headers are computed correctly', () => {
				submissions.masterTeacher = testCase.masterTeacher;
				submissions.courseLevel = testCase.courseLevel;
				assert.deepEqual(submissions._headerColumns.map(hc => hc.key), testCase.expected);
			});
		});

		test('firstName begins before lastName, clicking lastName puts it before firstName and clicking firstName puts it before lastName', (done) => {

			var nameHeaders = submissions._headerColumns[0].headers;
			assert.equal('firstName', nameHeaders[0].key);

			submissions._headerColumns[0].headers[0].canSort = true;
			submissions._headerColumns[0].headers[1].canSort = true;

			const list = submissions.shadowRoot.querySelector('d2l-quick-eval-submissions-table');

			flush(function() {
				var lastNameHeader = list.shadowRoot.querySelector('#lastName');

				var verifyFirstNameNameFirst = function() {
					assert.equal('firstName', nameHeaders[0].key);
					assert.equal(',', nameHeaders[0].suffix);
					assert.equal('', nameHeaders[1].suffix);

					done();
				};

				var verifyLastNameFirst = function() {
					assert.equal('lastName', nameHeaders[0].key);
					assert.equal(',', nameHeaders[0].suffix);
					assert.equal('', nameHeaders[1].suffix);

					lastNameHeader.removeEventListener('click', verifyLastNameFirst);
					
					flush(function() {
						var firstNameHeader = list.shadowRoot.querySelector('#firstName');
						firstNameHeader.addEventListener('click', verifyFirstNameNameFirst);

						MockInteractions.tap(firstNameHeader);
					});
				};

				lastNameHeader.addEventListener('click', verifyLastNameFirst);
				MockInteractions.tap(lastNameHeader);

			});
		});
	});

	test('_computeNumberOfActivitiesToShow returns max of data length, and previously shown number of activities', function() {
		const numberOfActivitiesToShowWhenDataLarger = submissions._computeNumberOfActivitiesToShow([1, 2, 3, 4], 1);
		assert.equal(4, numberOfActivitiesToShowWhenDataLarger);

		const numberOfActivitiesToShowWhenPreviousLarger = submissions._computeNumberOfActivitiesToShow([1], 5);
		assert.equal(5, numberOfActivitiesToShowWhenPreviousLarger);
	});
});
