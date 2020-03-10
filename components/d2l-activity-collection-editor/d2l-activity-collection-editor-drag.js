import { css, html, LitElement } from 'lit-element/lit-element.js';
import '@brightspace-ui/core/components/icons/icon.js';
import '@brightspace-ui/core/components/button/button.js';
import { buttonStyles } from '@brightspace-ui/core/components/button/button-styles.js';
import { getFirstFocusableDescendant } from '@brightspace-ui/core/helpers/focus.js';
import '@brightspace-ui/core/components/button/button-icon.js';
import { announce } from '@brightspace-ui/core/helpers/announce.js';

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
			keyboardActive: { type: Boolean, attribute: 'keyboard-active', reflect: true },
			text: { type: String },
			title: { type: String },
			position: { type: Number },
			total: { type: Number }
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
		if (node) {
			node.focus();
		}
	}

	render() {
		return html`${this.keyboardActive ? this.renderKeyboardDragging() : this.renderDragger()}`;
	}

	renderDragger() {
		return html`
			<button class="dragger-button" @keydown="${this._handleDeactiveKeyboard}" aria-label="${this.text}">
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
		if (isActive && !this.firstActive) {
			this.firstActive = true;
			announce(`You are in move mode is enabled for ${this.title}`);
			this._announceUse();
		} else if (!isActive && this.firstActive){
			this.firstActive = false;
			announce(`You are no longer in move mode for ${this.title}`);
		}
		await this.updateComplete;
		this.focus();
	}

	_onBlur() {
		this.keyboardActive = false;
		if (!this._tabbing) {
			this._dispatchAction(actions.save);
		}
		this._tabbing = false;
	}

	_handleActiveKeyboard(e) {
		if (!this.keyboardActive) {
			return;
		}
		this.tempPosition = this.tempPosition ? this.tempPosition : this.position;
		let action = null;
		let asyncRun = () => null;
		switch (e.keyCode) {
			case keyCodes.UP:
				asyncRun = () => {
					this.tempPosition = this.tempPosition <= 1 ? 1 : this.tempPosition-1;
					announce(`Activity has moved up: ${this.tempPosition} out of ${this.total}`);
				}
				action = actions.up;
				break;
			case keyCodes.DOWN:
				asyncRun = () => {
					this.tempPosition = this.tempPosition >= this.total ? this.total : this.tempPosition+1;
					announce(`Activity has moved down. ${this.tempPosition} out of ${this.total}`);
				}
				action = actions.down;
				break;
			case keyCodes.HOME:
				asyncRun = () => {
					this.tempPosition = 1;
					announce(`Activity is now the first activity. 1 out of ${this.total}`);
				}
				action = actions.first;
				break;
			case keyCodes.END:
				asyncRun = () => {
					this.tempPosition = this.total;
					announce(`Activity is now the last activity. ${this.tempPosition} out of ${this.total}`);
				}
				action = actions.last;
				break;
			case keyCodes.TAB:
				this.tempPosition = false;
				this._tabbing = true;
				e.shiftKey ? announce('Switched to the previous element') : announce('Switched to the next element');
				action = e.shiftKey ? actions.previousElement : actions.nextElement;
				break;
			case keyCodes.ESC:
				this.tempPosition = false;
				announce('Activity has returned to its orginal position');
				action = actions.cancel;
				this._setKeyboardDragging(false);
				break;
			case keyCodes.ENTER:
			case keyCodes.SPACE:
				this._announceUse();
				break;
			case keyCodes.RIGHT:
				action = actions.save;
				announce(`Activity has been moved to position ${this.tempPosition} out of ${this.total}.`);
				this.tempPosition = false;
				this._setKeyboardDragging(false);
				break;
			default:
				return;
		}
		this.updateComplete.then(asyncRun.bind(this));
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
	_announceUse() {
		announce(`Current position: ${this.tempPosition ? this.tempPosition : this.position} out of ${this.total}. To move the activity use the up and down arrows then use right arrow to accept your change. Press enter or space to repeat.`);
	}
}

customElements.define('d2l-activity-collection-editor-drag', ActivityCollectionEditorDrag);
