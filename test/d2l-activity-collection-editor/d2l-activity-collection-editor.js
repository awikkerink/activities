import { runAxe } from '@brightspace-ui/core/tools/a11y-test-helper.js';

describe('d2l-activity-collection-editor', () => {
	let element;

	beforeEach(async() => {
		element = fixture('collection-editor');
		await element.updateComplete;
	});

	it('should pass all axe tests', async() => {
		await runAxe(element);
	});

});
