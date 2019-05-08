(function() {
	let toggle;
	suite('d2l-quick-eval-view-toggle', function() {
		setup(function() {
			toggle = fixture('basic');
		});

		test('instantiating the element works', function() {
			assert.equal(toggle.tagName.toLowerCase(), 'd2l-quick-eval-view-toggle');
		});

		test('should fire d2l-quick-eval-view-toggle-changed event when submissions is selected and activities is currently active', function(done) {
			toggle.currentSelected = 'activities';
			toggle.addEventListener('d2l-quick-eval-view-toggle-changed', function() {
				assert.equal('submissions', toggle.currentSelected);
				done();
			});

			toggle._selectSubmissions();
		});
		test('should fire d2l-quick-eval-view-toggle-changed event when activities is selected and submissions is currently active', function(done) {
			toggle.currentSelected = 'submissions';
			toggle.addEventListener('d2l-quick-eval-view-toggle-changed', function() {
				assert.equal('activities', toggle.currentSelected);
				done();
			});

			toggle._selectActivities();
		});
		test('should not fire d2l-quick-eval-view-toggle-changed event when activities is selected and activities is currently active', function() {
			toggle.currentSelected = 'activities';
			toggle.addEventListener('d2l-quick-eval-view-toggle-changed', function() {
				assert.fail('d2l-quick-eval-view-toggle-changed should not be fired when selecting the already active button');
			});
			toggle._selectActivities();
		});
		test('should not fire d2l-quick-eval-view-toggle-changed even when submissions is selected and submissions is currently active', function() {
			toggle.currentSelected = 'submissions';
			toggle.addEventListener('d2l-quick-eval-view-toggle-changed', function() {
				assert.fail('d2l-quick-eval-view-toggle-changed should not be fired when selecting the already active button');
			});
			toggle._selectSubmissions();
		});
	});
})();
