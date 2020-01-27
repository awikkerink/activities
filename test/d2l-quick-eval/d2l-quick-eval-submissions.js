import '@polymer/iron-test-helpers/mock-interactions.js';

suite('d2l-quick-eval-submissions', function() {

	let submissions;

	setup(function() {
		window.D2L.Siren.WhitelistBehavior._testMode(true);
		submissions = fixture('basic');
	});

	function waitForHeader(callback, list, selector) {
		const header = list.shadowRoot.querySelector(selector);

		if (header) {
			callback();
		} else {
			setTimeout(function() {
				waitForHeader(callback, list, selector);
			}, 30);
		}
	}

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

			const nameHeaders = submissions._headerColumns[0].headers;
			assert.equal('firstName', nameHeaders[0].key);

			submissions._headerColumns[0].headers[0].canSort = true;
			submissions._headerColumns[0].headers[1].canSort = true;

			const list = submissions.shadowRoot.querySelector('d2l-quick-eval-submissions-table');

			const clickLastName = function() {
				const lastNameHeader = list.shadowRoot.querySelector('#lastName');

				const verifyFirstNameNameFirst = function() {
					assert.equal('firstName', nameHeaders[0].key);
					assert.equal(',', nameHeaders[0].suffix);
					assert.equal('', nameHeaders[1].suffix);

					done();
				};

				const verifyLastNameFirst = function() {
					assert.equal('lastName', nameHeaders[0].key);
					assert.equal(',', nameHeaders[0].suffix);
					assert.equal('', nameHeaders[1].suffix);

					lastNameHeader.removeEventListener('click', verifyLastNameFirst);

					const clickFirstName = function() {
						var firstNameHeader = list.shadowRoot.querySelector('#firstName');
						firstNameHeader.addEventListener('click', verifyFirstNameNameFirst);

						MockInteractions.tap(firstNameHeader);
					};
					waitForHeader(clickFirstName, list, '#firstName');
				};

				lastNameHeader.addEventListener('click', verifyLastNameFirst);
				MockInteractions.tap(lastNameHeader);
			};
			waitForHeader(clickLastName, list, '#lastName');
		});
	});

	test('_computeNumberOfActivitiesToShow returns max of data length, and previously shown number of activities', function() {
		const numberOfActivitiesToShowWhenDataLarger = submissions._computeNumberOfActivitiesToShow([1, 2, 3, 4], 1);
		assert.equal(4, numberOfActivitiesToShowWhenDataLarger);

		const numberOfActivitiesToShowWhenPreviousLarger = submissions._computeNumberOfActivitiesToShow([1], 5);
		assert.equal(5, numberOfActivitiesToShowWhenPreviousLarger);
	});
});
