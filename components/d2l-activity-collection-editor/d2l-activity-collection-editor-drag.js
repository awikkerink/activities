import { css, html, LitElement } from 'lit-element/lit-element.js';
import '@brightspace-ui/core/components/icons/icon.js';
import '@brightspace-ui/core/components/button/button.js';
import { buttonStyles } from '@brightspace-ui/core/components/button/button-styles.js';
import { getFirstFocusableDescendant } from '@brightspace-ui/core/helpers/focus.js';
import '@brightspace-ui/core/components/button/button-icon.js';

const keyCodes = Object.freeze({
	END: 35,
	HOME: 36,
	UP: 38,
	DOWN: 40,
	SPACE: 32,
	ENTER: 13,
	ESC: 27,
	TAB: 9,
	LEFT: 37,
	RIGHT: 39,
	SHIFT: 16,

});

export const actions = Object.freeze({
	first: 'last',
	end: 'first',
	up: 'up',
	down: 'down',
	active: 'keyboard-active',
	save: 'keyboard-deactivate-save',
	cancel: 'keyboard-deactivate-cancel',
	nextElement: 'next-element',
	previousElement: 'previous-element'
});

class ActivityCollectionEditorDrag extends LitElement {

	static get properties() {
		return {
			keyboardActive: { type: Boolean, attribute: 'keyboard-active', reflect: true }
		};
	}

	static get styles() {
		return [ buttonStyles, css`
			:host {
				display: flex;
				align-items: center;
			}
			.dragger-button,
			.keyboard-button {
				margin: 0;
				padding: 0;
				width: 18px;
				height: 36px;
				min-height: 36px;
				display: grid;
				grid-auto-columns: auto;
				grid-auto-rows: 1fr 1fr;
			}
			/* Firefox includes a hidden border which messes up button dimensions */
			button::-moz-focus-inner {
				border: 0;
			}
			.dragger-button {
				background-color: unset;
			}
			button,
			button[disabled]:hover,
			button[disabled]:focus,
			:host([active]) button[disabled] {
				background-color: var(--d2l-color-gypsum);
				color: var(--d2l-color-ferrite);
			}
			button:hover,
			button:focus,
			:host([active]) button {
				background-color: var(--d2l-color-mica);
			}
			button[disabled] {
				opacity: 0.5;
				cursor: default;
			}
		`];
	}

	constructor() {
		super();
		this.keyboardActive = false;
		this._shift = false;
	}

	focus() {
		const node = getFirstFocusableDescendant(this);
		if (node) node.focus();
	}

	render() {
		return html`${this.keyboardActive ? this.renderKeyboardDragging() : this.renderDragger()}`;
	}

	renderDragger() {
		return html`
			<button class="dragger-button" @keydown="${this._handleDeactiveKeyboard}">
				<d2l-icon icon="tier1:dragger"></d2l-icon>
			</button>
		`;
	}

	renderKeyboardDragging() {
		return html`
			<button class="keyboard-button" @blur="${this._onBlur}" @keydown="${this._handleActiveKeyboard}">
				<d2l-icon class="sub-icon" icon="tier1:arrow-toggle-up" @click="${() => this._dispatchAction(actions.up)}"></d2l-icon>
				<d2l-icon class="sub-icon" icon="tier1:arrow-toggle-down" @click="${() => this._dispatchAction(actions.down)}"></d2l-icon>
			</button>
		`;
	}

	async _setKeyboardDragging(isActive) {
		this.keyboardActive = isActive;
		await this.updateComplete;
		this.focus();
	}

	_onBlur() {
		if (!this._tabbing) {
			this.keyboardActive = false;
			this._dispatchAction(actions.save);
		}
		this._tabbing = false;
	}

	_handleActiveKeyboard(e) {
		if (!this.keyboardActive) {
			return;
		}
		let action = null;
		switch (e.keyCode) {
			case keyCodes.UP:
				action = actions.up;
				break;
			case keyCodes.DOWN:
				action = actions.down;
				break;
			case keyCodes.HOME:
				action = actions.first;
				break;
			case keyCodes.END:
				action = actions.last;
				break;
			case keyCodes.TAB:
				this._tabbing = true;
				action = e.shiftKey ? actions.previousElement : actions.nextElement;
				break;
			case keyCodes.ESC:
				action = actions.cancel;
				this._setKeyboardDragging(false);
				break;
			case keyCodes.ENTER:
			case keyCodes.SPACE:
			case keyCodes.RIGHT:
				action = actions.save;
				this._setKeyboardDragging(false);
				break;
			default:
				return;
		}

		this._dispatchAction(action);
		e.preventDefault();
		e.stopPropagation();
	}

	_handleDeactiveKeyboard(e) {
		if (e.keyCode === keyCodes.ENTER || e.keyCode === keyCodes.SPACE || e.keyCode === keyCodes.LEFT) {
			this._dispatchAction(actions.active);
			this._setKeyboardDragging(true);
			e.preventDefault();
		}
	}

	enterKeyboardMode() {
		this._dispatchAction(actions.active);
		this._setKeyboardDragging(true);
	}

	_dispatchAction(action) {
		this.dispatchEvent(new CustomEvent('d2l-activity-collection-editor-drag-action', {
			detail: { action },
			bubbles: false
		}));
	}
}

customElements.define('d2l-activity-collection-editor-drag', ActivityCollectionEditorDrag);
