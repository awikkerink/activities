import { css, html, LitElement } from 'lit-element/lit-element.js';
import { heading1Styles, heading4Styles, bodyCompactStyles, labelStyles } from '@brightspace-ui/core/components/typography/styles.js';
import '@brightspace-ui/core/components/icons/icon.js';
import '@d2l/switch/d2l-switch.js';

const
	_visible = {
		icon: 'tier1:visibility-show',
		text: 'Visible'
	},
	_hidden = {
		icon: 'tier1:visibility-hide',
		text: 'Hidden'
	};

class CollectionEditor extends LitElement {

	static get properties() {
		return {
			_visibility: {
				type: Object
			}
		};
	}

	static get styles() {
		return [ heading1Styles, heading4Styles, bodyCompactStyles, labelStyles, css`
			:host {
				display: block;
			}
			:host([hidden]) {
				display: none;
			}
			.d2l-activity-collection-header {
				display: flex;
				justify-content: space-between;
				align-items: center;
			}
			.toggle-container {
				display: flex;
				align-items: center;
			}
		` ];
	}

	_updateVisibility() {
		this._visibility = this._visibility === _hidden ? _visible : _hidden;
	}

	constructor() {
		super();
		this._visibility = _hidden;
	}

	render() {
		return html`
			<div class="d2l-heading-4">Edit Learning Path</div>
			<div class="d2l-activity-collection-header">
				<h1 class="d2l-heading-1">Employee Onboarding</h1>
				<div class="toggle-container">
					<d2l-switch aria-label="Visibility Toggle" label-right @click="${this._updateVisibility}"></d2l-switch>
					<div class="d2l-label-text"><d2l-icon icon=${this._visibility.icon}></d2l-icon> ${this._visibility.text}</div>
				</div>
			</div>
			<div class="d2l-body-compact">
				An onboarding program for new financial analysts
			</div>
		`;
	}
}
customElements.define('d2l-activity-collection-editor', CollectionEditor);
