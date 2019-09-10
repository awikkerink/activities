(function() {
	let qeActivityCard;
	suite('d2l-quick-eval-activity-card', function() {
		setup(function() {
			qeActivityCard = fixture('basic');
		});

		test('instantiating the element works', function() {
			assert.equal(qeActivityCard.tagName.toLowerCase(), 'd2l-quick-eval-activity-card');
		});

		test('allsubmissions event fires with submissionListHref', function(done) {
			qeActivityCard.addEventListener('d2l-quick-eval-activity-view-submission-list', function(e) {
				assert.equal(e.detail.submissionListHref, '');
				done();
			});

			qeActivityCard._dispatchViewSubmissionListEvent();
		});

		test('_denominatorOver99 works', function() {
			assert.isFalse(qeActivityCard._denominatorOver99(50));
			assert.isFalse(qeActivityCard._denominatorOver99(99));
			assert.isTrue(qeActivityCard._denominatorOver99(100));
			assert.isTrue(qeActivityCard._denominatorOver99(200));
		});
	});
})();
