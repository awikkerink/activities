import '@brightspace-ui/core/components/colors/colors.js';
import { offscreenStyles } from '@brightspace-ui/core/components/offscreen/offscreen-styles.js';
import { css, html, LitElement } from 'lit-element/lit-element.js';

export const listSelectionStates = {
	none: 'none',
	some: 'some',
	all: 'all'
};

class List extends LitElement {

	static get properties() {
		return {
			extendSeparators: { type: Boolean, reflect: true, attribute: 'extend-separators' },
			separators: { type: String, reflect: true },
			tabindex: { type: Number, reflect: true},
			role: { type: String, reflect: true },
			ariaMultiselectable: { type: String, reflect: true, attribute: 'aria-multiselectable' }
		};
	}

	static get styles() {
		return [offscreenStyles, css`
			:host {
				display: block;
			}
			:host(:focus) {
				outline: none;
			}
		`];
	}

	constructor() {
		super();
		this.tabindex = -1;
		this.role = 'list';
		this.ariaMultiselectable = 'true';

	}

	firstUpdated() {
		this.addEventListener('d2l-list-item-selected', (e) => {
			this.dispatchEvent(new CustomEvent('d2l-list-selection-change', {
				detail: e.detail
			}));
			e.stopPropagation();
		});
	}

	getSelectionInfo() {
		const items = this._getItems();
		const selectedItems = items.filter(item => item.selected);

		let state = listSelectionStates.none;
		if (selectedItems.length > 0) {
			if (selectedItems.length === items.length) state = listSelectionStates.all;
			else state = listSelectionStates.some;
		}

		return {
			keys: selectedItems.map(item => item.key),
			state: state
		};
	}

	render() {
		return html`
			<div>
				<slot></slot>
			</div>
		`;
	}

	focus(e) {
		this.dispatchEvent(new Event('focus'));
	}
	blur(e) {
		this.dispatchEvent(new Event('blur'));
	}

	toggleSelectAll() {
		const items = this._getItems();
		const notSelectedItems = items.filter(item => !item.selected);
		if (notSelectedItems.length === 0) {
			items.forEach(item => item.setSelected(false, true));
		} else {
			notSelectedItems.forEach(item => item.setSelected(true, true));
		}
	}

	_getItems() {
		return this.shadowRoot.querySelector('slot').assignedNodes().filter((node) => {
			return node.nodeType === Node.ELEMENT_NODE && node.role === 'listitem';
		});
	}

}

customElements.define('d2l-activity-collection-list', List);
