import { runAxe } from '@brightspace-ui/core/tools/a11y-test-helper.js';

describe('d2l-activity-admin-list', () => {
	let element;
	let collectionEntity;

	beforeEach(async() => {
		element = fixture('admin-list');
		await element.updateComplete;

		collectionEntity = {};
	});

	it('should pass all axe tests', async() => {
		await runAxe(element);
	});

	it('should reset items on collection changed', () => {
		collectionEntity.onItemsChange = () => {};
		element._items = ['non', 'empty', 'items', 'array'];

		element._onActivityUsageCollectionChanged(collectionEntity);

		expect(element._items).to.be.empty;
	});
});
