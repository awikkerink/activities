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
			_breakpoint: { type: Number }
		};
	}

	static get styles() {

		return [ bodyStandardStyles, bodyCompactStyles, checkboxStyles,  css`

			:host {
				display: block;
				position: relative;
				padding: 6px 0;
			}

			:host([hidden]) {
				display: none;
			}

			:host([keyboard-active]) .d2l-list-item-drag-shadow {
				position: absolute;
				width: calc(100% + 36px);
				height: 100%;
				top: -1px;
				left: -27px;
				border-radius: 6px;
				box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
			}

			:host([hide-dragger]) {
				filter: grayscale(50%);
				opacity: 0.6;
			}

			.d2l-list-item-container {
				position: relative;
			}

			.d2l-list-item-draggable {
				position: absolute;
				align-self: center;
				left: -23px;
				top: calc(50% - 18px);
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
			<div class="d2l-list-item-drag-shadow"></div>
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
			await this.updateComplete;
			this._dispatchDragKeyboard(this.keyboardActive)
		} else if (action === actions.save || action === actions.cancel) {
			this.keyboardActive = false;
			await this.updateComplete;
			this._dispatchDragKeyboard(this.keyboardActive)
		}
	}

	_dispatchDragKeyboard(keyboardActive) {
		this.dispatchEvent(new CustomEvent('d2l-activity-collection-list-item', {
			detail: { keyboardActive },
			bubbles: false
		}));
	}
}

customElements.define('d2l-activity-collection-list-item', ActivityCollectionListItem);
