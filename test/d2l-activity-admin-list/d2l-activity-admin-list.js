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

	it('should add item on items changed', () => {
		collectionEntity.onItemsChange = callback => {
			callback('item-3', 2);
			callback('item-1', 0);
			callback('item-2', 1);
		};
		element._onActivityUsageCollectionChanged(collectionEntity);

		expect(element._items).to.have.lengthOf(3);
		expect(element._items[0]).to.equal('item-1');
		expect(element._items[1]).to.equal('item-2');
		expect(element._items[2]).to.equal('item-3');
	});
});
