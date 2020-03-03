import {directive, NodePart, removeNodes} from 'lit-html';

// Define the map at module level
const stateMap = new WeakMap();

const removePart = (itemkey, part) => {
	const container = part.startNode.parentNode;
	const start = container.querySelector(`d2l-activity-collection-list-item[key=${itemkey}]`);
	const end = start.nextSibling;
	removeNodes(container, start, end);
  };

export const orderListRender = directive((orderedList, getkey, renderItem) => (containerPart) => {
	const nestedParts = stateMap.get(containerPart) || {};
	const newNestedParts = {};
	const itemParts = [];
	Object.keys(nestedParts).forEach(itemkey => {
		if (!orderedList.some(item => itemkey === getkey(item))) {
			removePart(itemkey, nestedParts[itemkey].part);
		}
	});
	orderedList.forEach(item => {
		let itemPart = nestedParts[getkey(item)];
		if (itemPart === undefined) {
			itemPart = {};
			itemPart.part = new NodePart(containerPart.options);
			itemPart.item = item;
			itemPart.part.appendIntoPart(containerPart);
		}
		newNestedParts[getkey(item)] = itemPart;
		itemPart.part.setValue(renderItem(item));
		itemParts.push(itemPart.part);
	});

	itemParts.forEach(itemPart => {
		itemPart.commit();
	});

	stateMap.set(containerPart, newNestedParts);

	return false;
});
