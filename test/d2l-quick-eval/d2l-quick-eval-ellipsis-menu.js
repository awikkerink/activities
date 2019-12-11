import '@polymer/iron-test-helpers/mock-interactions.js';

suite('d2l-quick-eval-ellipsis-menu', function() {
	let menu;

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

		setTimeout(() => {
			const controller = menu.shadowRoot.querySelector('d2l-quick-eval-dismissed-activities');
			console.log(controller);
			assert.equal(controller.href, '');
			assert.equal(menu._dropdownOpened, false);

			menu._open();
			menu.updateComplete
				.then(() => {
					assert.equal(controller.href, menu.href);
					assert.equal(menu._dropdownOpened, true);
					done();
				});
		}, 2000);

		// menu.updateComplete
		// 	.then((u) => {
		// 		console.log(menu.renderComplete);
		// 		const controller = menu.shadowRoot.querySelector('d2l-quick-eval-dismissed-activities');
		// 		console.log(controller);
		// 		assert.equal(controller.href, '');
		// 		assert.equal(menu._dropdownOpened, false);

		// 		menu._open();
		// 		menu.updateComplete
		// 			.then(() => {
		// 				assert.equal(controller.href, menu.href);
		// 				assert.equal(menu._dropdownOpened, true);
		// 				done();
		// 			});
		// 	});
	});
});
