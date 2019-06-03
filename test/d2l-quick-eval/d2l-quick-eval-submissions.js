suite('d2l-quick-eval-submissions', function() {

	let submissions;

	setup(function() {
		submissions = fixture('basic');
	});

	test('instantiating the element works', function() {
		assert.equal(submissions.tagName.toLowerCase(), 'd2l-quick-eval-submissions');
	});
});
