import '@brightspace-ui/core/components/colors/colors.js';
import { css, html, LitElement } from 'lit-element/lit-element.js';
import { heading1Styles, heading4Styles, bodyCompactStyles, bodyStandardStyles, labelStyles} from '@brightspace-ui/core/components/typography/styles.js';
import { checkboxStyles } from '@brightspace-ui/core/components/inputs/input-checkbox-styles.js';
import { classMap } from 'lit-html/directives/class-map.js';
import { getFirstFocusableDescendant } from '@brightspace-ui/core/helpers/focus.js';
import { getUniqueId } from '@brightspace-ui/core/helpers/uniqueId.js';
import { ifDefined } from 'lit-html/directives/if-defined.js';
import ResizeObserver from 'resize-observer-polyfill';
import { RtlMixin } from '@brightspace-ui/core/mixins/rtl-mixin.js';
import { actions } from './d2l-activity-collection-editor-drag.js';

const ro = new ResizeObserver(entries => {
	entries.forEach(entry => {
		if (!entry || !entry.target || !entry.target.resizedCallback) {
			return;
		}
		entry.target.resizedCallback(entry.contentRect && entry.contentRect.width);
	});
});

const defaultBreakpoints = [842, 636, 580, 0];

class ActivityCollectionListItem extends RtlMixin(LitElement) {

	static get properties() {
		return {
			breakpoints: { type: Array },
			disabled: {type: Boolean },
			href: { type: String },
			illustrationOutside: { type: Boolean, attribute: 'illustration-outside' },
			key: { type: String, reflect: true },
			role: { type: String, reflect: true },
			selectable: {type: Boolean },
			selected: { type: Boolean, reflect: true },
			keyboardActive: { type: Boolean, reflect: true, attribute: 'keyboard-active' },
			hideDragger: { type: Boolean, reflect: true, attribute: 'hide-dragger' },
			draggable: { type: String, reflect: true },
			greyOut: { type: Boolean, reflect: true, attribute: 'grey-out' },
			_breakpoint: { type: Number },
			_showUpperDrag: { type: Boolean },
			_showLowerDrag: { type: Boolean }
		};
	}

	static get styles() {

		return [ bodyStandardStyles, bodyCompactStyles, checkboxStyles,  css`

			:host {
				display: block;
				position: relative;

			}

			.wrapper {
				padding: 6px 0;
			}

			:host([hidden]) {
				display: none;
			}

			.d2l-list-item-drag-shadow {
				position: absolute;
				width: calc(100% + 36px);
				height: 100%;
				top: -1px;
				left: -27px;
				border-radius: 6px;
				box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
				display: none;
			}

			:host(:hover:not([hide-dragger])) .d2l-list-item-drag-shadow,
			:host([keyboard-active]) .d2l-list-item-drag-shadow {
				display: block;
			}

			:host([grey-out]) {
				filter: grayscale(75%);
				opacity: 0.4;
			}

			.d2l-list-item-container {
				position: relative;
			}

			.d2l-list-item-draggable {
				position: absolute;
				align-self: center;
				left: -23px;
				top: calc(50% - 18px);
				display: none;
			}

			:host([keyboard-active]) .d2l-list-item-draggable,
			:host(:hover) .d2l-list-item-draggable {
				display: block;
			}
			.d2l-list-item-content {
				border-radius: 6px;
				overflow: hidden;
				position: relative;
				border: solid 1px #e3e9f1;
				background: white;
			}

			.d2l-list-item-flex {
				display: flex;
				position: relative;
			}

			.d2l-list-item-content {
				width: 100%;
			}

			.d2l-list-item-content-flex {
				display: flex;
				justify-content: stretch;
			}

			input[type="checkbox"].d2l-input-checkbox {
				flex-grow: 0;
				flex-shrink: 0;
				margin: 0.6rem 0.9rem 0.6rem 0;
			}

			:host([dir="rtl"]) input[type="checkbox"].d2l-input-checkbox {
				margin-left: 0.9rem;
				margin-right: 0;
			}

			.d2l-list-item-container ::slotted([slot="illustration"]),
			.d2l-list-item-content-flex ::slotted([slot="illustration"]) {
				flex-grow: 0;
				flex-shrink: 0;
				margin: 0 0.9rem 0 0;
				max-height: 2.6rem;
				max-width: 4.5rem;
				overflow: hidden;
			}

			:host([dir="rtl"]) .d2l-list-item-container ::slotted([slot="illustration"]),
			:host([dir="rtl"]) .d2l-list-item-content-flex ::slotted([slot="illustration"]) {
				margin-left: 0.9rem;
				margin-right: 0;
			}

			:host([illustration-outside]) .d2l-list-item-content-flex {
				padding: 0.55rem 0;
			}

			:host([illustration-outside]) .d2l-list-item-container ::slotted([slot="illustration"]),
			:host([illustration-outside]) .d2l-list-item-content-flex ::slotted([slot="illustration"]) {
				margin-bottom: 0.7rem;
				margin-top: 0.7rem;
			}

			:host([illustration-outside]) input[type="checkbox"].d2l-input-checkbox {
				margin-bottom: 1.15rem;
				margin-top: 1.15rem;
			}

			.d2l-list-item-main {
				flex-grow: 1;
				display: grid;
				margin: 0.55rem 0.9rem 0.85rem 0;
				grid-template-columns: auto auto;
				grid-template-rows: auto;
				grid-template-areas:
					"title actions"
					"secondary secondary";
			}
			.d2l-list-item-main-title {
				grid-area: title;
				width: 100%;
				align-self: center;
			}
			.d2l-list-item-main-secondary {
				color: #6e7376;
				grid-area: secondary;
				margin-top: -7px;
			}

			.d2l-list-item-main ::slotted([slot="actions"]) {
				display: grid;
				grid-auto-columns: 42px;
				grid-auto-flow: column;
				grid-gap: 0.3rem;
				z-index: 4;
				grid-area: actions;
				align-self: baseline;
				justify-self: right;
			}

			a, label {
				height: 100%;
				position: absolute;
				width: 100%;
				z-index: 2;
			}

			:host([href]) label {
				width: 2.1rem;
				z-index: 3;
			}

			:host([href]) {
				--d2l-list-item-content-text-color: var(--d2l-color-celestine);
			}

			a[href]:focus + .d2l-list-item-content,
			a[href]:hover + .d2l-list-item-content {
				--d2l-list-item-content-text-decoration: underline;
			}

			:host([href]) .d2l-list-item-link:focus {
				outline: none;
			}

			.d2l-list-item-container[breakpoint="1"] ::slotted([slot="illustration"]),
			.d2l-list-item-container[breakpoint="1"] .d2l-list-item-content-flex ::slotted([slot="illustration"]) {
				margin-right: 1rem;
				max-height: 3.55rem;
				max-width: 6rem;
			}

			:host([dir="rtl"]) .d2l-list-item-container[breakpoint="1"] ::slotted([slot="illustration"]),
			:host([dir="rtl"]) .d2l-list-item-container[breakpoint="1"] .d2l-list-item-content-flex ::slotted([slot="illustration"]) {
				margin-left: 1rem;
				margin-right: 0;
			}

			.d2l-list-item-container[breakpoint="2"] ::slotted([slot="illustration"]),
			.d2l-list-item-container[breakpoint="2"] .d2l-list-item-content-flex ::slotted([slot="illustration"]) {
				margin-right: 1rem;
				max-height: 5.1rem;
				max-width: 9rem;
			}

			:host([dir="rtl"]) .d2l-list-item-container[breakpoint="2"] ::slotted([slot="illustration"]),
			:host([dir="rtl"]) .d2l-list-item-container[breakpoint="2"] .d2l-list-item-content-flex ::slotted([slot="illustration"]) {
				margin-left: 1rem;
				margin-right: 0;
			}

			.d2l-list-item-container[breakpoint="3"] ::slotted([slot="illustration"]),
			.d2l-list-item-container[breakpoint="3"] .d2l-list-item-content-flex ::slotted([slot="illustration"]) {
				margin-right: 1rem;
				max-height: 6rem;
				max-width: 10.8rem;
			}

			:host([dir="rtl"]) .d2l-list-item-container[breakpoint="3"] ::slotted([slot="illustration"]),
			:host([dir="rtl"]) .d2l-list-item-container[breakpoint="3"] .d2l-list-item-content-flex ::slotted([slot="illustration"]) {
				margin-left: 1rem;
				margin-right: 0;
			}

			.d2l-list-item-drag-spots {
				position: absolute;
				height: 100%;
				min-height: calc(100% + 12px);
				width: calc(100% + 30px);
				display: flex;
				flex-direction: column;
				align-items: stretch;
				z-index: 100;
				pointer-events: none;
				top: -6px;
				left: -25px
			}

			.d2l-list-item-drag-spots div {
				min-height: 50%;
				width: 100%;
				pointer-events: none;
			}

			:host([drag-target]) .d2l-list-item-drag-spots,
			:host([drag-target]) .d2l-list-item-drag-spots div {
				pointer-events: all;
			}

			.d2l-list-upper-drag-indicator,
			.d2l-list-lower-drag-indicator {
				position: absolute;
				max-height: 12px;
				width: calc(100% + 30px);
				display: flex;
			}

			.d2l-list-upper-drag-indicator {
				top: -6px;
				left: -20px;
			}

			.d2l-list-lower-drag-indicator {
				bottom: -6px;
				left: -20px;
			}

			.d2l-list-drag-indicator {
				height: 12px;
				width: 100%;
			}
			.d2l-list-drag-indicator line{
				stroke: var(--d2l-color-celestine);
				stroke-width: 3px;
				stroke-linecap: round;
			}
			.d2l-list-drag-indicator-linecap {
				height: 12px;
				width: 5px;
			}
			.d2l-list-drag-indicator-circle {
				height: 12px;
				width: 12px;
				margin-right: -1px;
			}
			.d2l-list-drag-indicator-linecap line,
			.d2l-list-drag-indicator-circle circle{
				stroke: var(--d2l-color-celestine);
				stroke-width: 3px;
				stroke-linecap: round;
			}
		`];
	}

	constructor() {
		super();
		this._breakpoint = 0;
		this.breakpoints = defaultBreakpoints;
		this.disabled = false;
		this.role = 'listitem';
		this.selectable = false;
		this._contentId = getUniqueId();
		this._checkBoxId = getUniqueId();
		this.hideDragger = false;
		this.draggable = "true";
	}

	get breakpoints() {
		return this._breakpoints;
	}

	set breakpoints(value) {
		const oldValue = this._breakpoints;
		if (value !== defaultBreakpoints) this._breakpoints = value.sort((a, b) => b - a).slice(0, 4);
		else this._breakpoints = defaultBreakpoints;
		this.requestUpdate('breakpoints', oldValue);
	}

	firstUpdated() {
		this.addEventListener('dragstart', this._dragStartHandler.bind(this));
		this.addEventListener('dragend', this._dragStopHandler.bind(this));
		this.addEventListener('dragleave', this._dragExit.bind(this));
	}

	connectedCallback() {
		super.connectedCallback();

		const separators = this.parentNode.getAttribute('separators');
		if (separators) this._separators = separators;
		this._extendSeparators = this.parentNode.hasAttribute('extend-separators');

		ro.observe(this);
	}

	disconnectedCallback() {
		super.disconnectedCallback();
		ro.unobserve(this);
	}

	focus() {
		const node = getFirstFocusableDescendant(this);
		if (node) node.focus();
	}

	render() {

		const label = this.selectable ? html`<label class="d2l-list-item-label" for="${this._checkBoxId}" aria-labelledby="${this._contentId}"></label>` : null;
		const link = this.href ? html`<a class="d2l-list-item-link" href="${ifDefined(this.href)}" aria-labelledby="${this._contentId}"></a>` : null;
		const beforeContent = this.selectable
			? html`<input id="${this._checkBoxId}" class="d2l-input-checkbox" @change="${this._handleCheckboxChange}" type="checkbox" .checked="${this.selected}" ?disabled="${this.disabled}"><slot name="illustration"></slot>`
			: html`<slot name="illustration"></slot>`;

		const classes = {
			'd2l-list-item-container': true,
			'd2l-list-item-flex': label || link || this.illustrationOutside,
			'd2l-visible-on-ancestor-target': true
		};

		return html`
			${this._renderDivider(this._showUpperDrag, 'd2l-list-upper-drag-indicator')}
			<div class="wrapper">
				<div class="d2l-list-item-drag-shadow"></div>
				<div class="d2l-list-item-drag-spots">
					<div @drop="${this._dropHandler.bind(this)}" @dragover="${this._dragOverHandler.bind(this)}" @dragenter="${this._dragUpperEnter.bind(this)}" @dragleave="${this._dragUpperExit.bind(this)}"></div>
					<div @drop="${this._dropHandler.bind(this)}" @dragover="${this._dragOverHandler.bind(this)}" @dragenter="${this._dragLowerEnter.bind(this)}" @dragleave="${this._dragLowerExit.bind(this)}"></div>
				</div>
				<div class="${classMap(classes)}" breakpoint="${this._breakpoint}">
					${ this.hideDragger ? null : html`<d2l-activity-collection-editor-drag class="d2l-list-item-draggable" @d2l-activity-collection-editor-drag-action="${this._dragAction}"></d2l-activity-collection-editor-drag>`}
					${label}
					${this.illustrationOutside ? beforeContent : null}
					${link}
					<div id="${this._contentId}"
						class="d2l-list-item-content"
						?extend-separators="${this._extendSeparators}"
						separators="${ifDefined(this._separators)}">
						<div class="d2l-list-item-content-flex">
							${!this.illustrationOutside ? beforeContent : null}
							<div class="d2l-list-item-main d2l-body-standard">
								<div class="d2l-list-item-main-title"><slot></slot></div>
								<div class="d2l-list-item-main-secondary d2l-body-compact"><slot name="secondary"></slot></div>
								<slot name="actions"></slot>
							</div>
						</div>
					</div>
				</div>
		</div>
			${this._renderDivider(this._showLowerDrag, 'd2l-list-lower-drag-indicator')}
		`;

	}

	resizedCallback(width) {
		const lastBreakpointIndexToCheck = 3;
		this.breakpoints.some((breakpoint, index) => {
			if (width >= breakpoint || index > lastBreakpointIndexToCheck) {
				this._breakpoint = lastBreakpointIndexToCheck - index - (lastBreakpointIndexToCheck - this.breakpoints.length + 1) * index;
				return true;
			}
		});
	}

	setSelected(selected, suppressEvent) {
		this.selected = selected;
		if (!suppressEvent) this._dispatchSelected(selected);
	}

	updated(changedProperties) {
		if (changedProperties.has('key')) {
			const oldValue = changedProperties.get('key');
			if (typeof oldValue !== 'undefined') {
				this.setSelected(undefined, true);
			}
		}
		if (changedProperties.has('breakpoints')) {
			this.resizedCallback(this.offsetWidth);
		}
	}

	_dispatchSelected(value) {
		this.dispatchEvent(new CustomEvent('d2l-list-item-selected', {
			detail: { key: this.key, selected: value },
			bubbles: true
		}));
	}

	_handleCheckboxChange(e) {
		this.setSelected(e.target.checked);
	}
	async _dragAction(e) {
		const action = e.detail.action;
		console.log(action);
		if (action === actions.active) {
			this.keyboardActive = true;
			this._nextElement = this.nextElementSibling;
			await this.updateComplete;
			this._dispatchDragKeyboard(this.keyboardActive);

		} else if (action === actions.cancel) {
			this.parentNode.insertBefore(this, this._nextElement);
			this.keyboardActive = false;
			await this.updateComplete;
			this._dispatchDragKeyboard(this.keyboardActive);

		} else if (action === actions.save) {
			this.keyboardActive = false;
			this._dispatchDragMove(this.previousElementSibling && this.previousElementSibling.key);
			await this.updateComplete;
			this._dispatchDragKeyboard(this.keyboardActive);
			await this.updateComplete;
			this.shadowRoot.querySelector('d2l-activity-collection-editor-drag').focus();

		} else if (action === actions.up) {
			this.previousElementSibling && this._insertDiv(this, this.previousElementSibling);
			this.enterKeyboardMode();

		} else if (action === actions.down) {
			this.nextElementSibling && this._insertDiv(this, this.nextElementSibling.nextElementSibling);
			this.enterKeyboardMode();

		} else if (action === actions.nextElement && this.nextElementSibling) {
			this.keyboardActive = false;
			this._dispatchDragMove(this.previousElementSibling && this.previousElementSibling.key);
			await this.updateComplete;
			this._dispatchDragKeyboard(this.keyboardActive);
			await this.updateComplete;
			this.nextElementSibling.hideDragger = false;
			await this.nextElementSibling.updateComplete;
			const dragger =  this.nextElementSibling.shadowRoot.querySelector('d2l-activity-collection-editor-drag');
			dragger.enterKeyboardMode();
		} else if (action === actions.previousElement && this.previousElementSibling) {
			this.keyboardActive = false;
			this._dispatchDragMove(this.previousElementSibling && this.previousElementSibling.key);
			await this.updateComplete;
			this._dispatchDragKeyboard(this.keyboardActive);
			await this.updateComplete;
			this.previousElementSibling.hideDragger = false;
			await this.previousElementSibling.updateComplete;
			const dragger =  this.previousElementSibling.shadowRoot.querySelector('d2l-activity-collection-editor-drag');
			dragger.enterKeyboardMode();
		}
	}

	_renderDivider(show, htmlClass) {
		return show ? html`
			<div class="${htmlClass}">
				<svg viewBox="0 0 12 12" class="d2l-list-drag-indicator-circle">
					<circle cx="6" cy="6" r="4" fill="none"/>
				</svg>
				<svg class="d2l-list-drag-indicator">
					<line x1="0" y1="50%" x2="100%" y2="50%" />
				</svg>
				<svg viewBox="0 0 5 12" class="d2l-list-drag-indicator-linecap">
					<line x1="-5" y1="50%" x2="0" y2="50%" />
				</svg>
			</div>
		` : null;
	}

	enterKeyboardMode() {
		this.shadowRoot.querySelector('d2l-activity-collection-editor-drag')._setKeyboardDragging(true);
		this.keyboardActive = true;
	}

	_insertDiv(elm, target) {
		this.parentNode.insertBefore(elm, target);
	}

	_dispatchDragKeyboard(keyboardActive) {
		this.dispatchEvent(new CustomEvent('d2l-activity-collection-list-item', {
			detail: { keyboardActive },
			bubbles: false
		}));
	}

	_dispatchDragMove(targetKey, key) {
		this.dispatchEvent(new CustomEvent('d2l-activity-collection-list-item-move', {
			detail: { item: (key ? key : this.key), target: targetKey },
			bubbles: false
		}));
	}

	_dragStartHandler(e) {
		this.greyOut = true;
		e.dataTransfer.setData("text/plain", `${this.key}`);
		this.dispatchEvent(new CustomEvent('d2l-activity-collection-list-item-dragging', {
			detail: { dragging: true, key: this.key },
			bubbles: false
		}));
		const node = this.parentNode.nextElementSibling.querySelector(`d2l-activity-collection-list-item[key="${this.key}"]`);
		console.log(node.shadowRoot.firstElementChild.firstElementChildf);
		node.toggleAttribute('hidden', false);
		node.shadowRoot.firstElementChild.style.transform = 'rotate(1deg)';
		node.shadowRoot.firstElementChild.firstElementChild.style.background = '#f9fbff';
		node.shadowRoot.firstElementChild.firstElementChild.style.display = 'block';
		node.shadowRoot.firstElementChild.style.opacity = '1';
		e.dataTransfer.setDragImage(node, 100, 75);
	}

	_dragStopHandler() {
		this.greyOut = false;
		this.dispatchEvent(new CustomEvent('d2l-activity-collection-list-item-dragging', {
			detail: { dragging: false, key: this.key },
			bubbles: false
		}));
	}

	_dropUpperHandler(e) {
		e.preventDefault();
		this._showUpperDrag = false;
		const data = e.dataTransfer.getData("text/plain");
		this._dispatchDragMove(this.previousElementSibling && this.previousElementSibling.key, data);
		const node = this.parentNode.querySelector(`d2l-activity-collection-list-item[key="${data}"]`);
		this._insertDiv(node, this);
	}

	_dropLowerHandler(e) {
		e.preventDefault();
		this._showLowerDrag = false;
		const data = e.dataTransfer.getData("text/plain");
		this._dispatchDragMove(this.key, data);
		const node =  this.parentNode.querySelector(`d2l-activity-collection-list-item[key="${data}"]`);
		this._insertDiv(node, this.nextElementSibling);
	}

	_dropHandler(e) {
		if (this._targetForDrop === undefined) {
			return;
		}
		e.preventDefault();
		this._showUpperDrag = false;
		this._showLowerDrag = false;
		const data = e.dataTransfer.getData("text/plain");
		this._dispatchDragMove(this.key, data);
		const node =  this.parentNode.querySelector(`d2l-activity-collection-list-item[key="${data}"]`);
		this._insertDiv(node, this._targetForDrop);
	}

	_dragUpperEnter() {
		this._showLowerDrag = !this._showUpperDrag && true;
		if (!this._showUpperDrag) {
			this._targetForDrop = this.nextElementSibling;
		}
	}

	_dragLowerEnter() {
		this._showUpperDrag = !this._showLowerDrag && true;;
		if (!this._showLowerDrag) {
			this._targetForDrop = this;
		}
	}

	_dragUpperExit() {
		if (!this._showLowerDrag) {
			this._targetForDrop = undefined;
		}
		this._showUpperDrag = false;
	}

	_dragLowerExit() {
		if (!this._showUpperDrag) {
			this._targetForDrop = undefined;
		}
		this._showLowerDrag = false;
	}

	_dragExit() {
		this._showLowerDrag = false;
		this._showUpperDrag = false;
		this._targetForDrop = null;
	}

	_dragOverHandler(e) {
		e.preventDefault();
 		e.dataTransfer.dropEffect = "move";
	}
}

customElements.define('d2l-activity-collection-list-item', ActivityCollectionListItem);
