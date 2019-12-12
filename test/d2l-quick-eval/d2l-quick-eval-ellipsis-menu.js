import '@polymer/iron-test-helpers/mock-interactions.js';

suite('d2l-quick-eval-ellipsis-menu', function() {
	let menu;

	function waitForController(callback) {
		const controller = menu.shadowRoot.querySelector('d2l-quick-eval-dismissed-activities');

		if (controller) {
			waitForDialog(controller, callback);
		} else {
			setTimeout(function() {
				waitForController(callback);
			}, 30);
		}
	}
	function waitForDialog(controller, callback) {
		const dialog = controller.shadowRoot.querySelector('d2l-quick-eval-ellipsis-dialog')
			.shadowRoot.querySelector('d2l-dialog');

		if (dialog) {
			waitForContent(controller, dialog, callback);
		} else {
			setTimeout(function() {
				waitForDialog(controller, callback);
			});
		}
	}
	function waitForContent(controller, dialog, callback) {
		const content = dialog.shadowRoot.querySelector('.d2l-dialog-content');

		if (content) {
			callback(controller);
		} else {
			setTimeout(function() {
				waitForContent(controller, dialog, callback);
			}, 30);
		}
	}

	setup(function() {
		menu = fixture('basic');
	});
	test('instantiating the element works', function() {
		assert.equal(menu.tagName.toLowerCase(), 'd2l-quick-eval-ellipsis-menu');
	});
	test('attributes are set correctly', function() {
		assert.equal(menu.token, 't');
		assert.equal(menu.href, 'h');
	});
	test('lazy loading works correctly', function(done) {
		function verify(controller) {
			assert.equal(controller.href, '');
			assert.equal(menu._initialLoad, true);

			menu._open();
			menu.updateComplete
				.then(() => {
					assert.equal(controller.href, menu.href);
					assert.equal(menu._initialLoad, false);
					done();
				});
		}
		waitForController(verify);
	});
});
