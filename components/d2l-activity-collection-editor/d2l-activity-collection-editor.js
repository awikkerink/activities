import { css, html, LitElement } from 'lit-element/lit-element.js';
import { heading1Styles, heading4Styles, bodyCompactStyles, labelStyles } from '@brightspace-ui/core/components/typography/styles.js';
import '@brightspace-ui/core/components/icons/icon.js';
import '@brightspace-ui/core/components/button/button.js';
import '@brightspace-ui/core/components/colors/colors.js';
import '@d2l/switch/d2l-switch.js';

class CollectionEditor extends LitElement {

	static get properties() {
		return {
			_visibile: {
				type: Boolean
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
				box-shadow: inset 0 -1px 0 0 var(--d2l-color-gypsum);
				width: 100%;
				padding-bottom: 1rem;
			}
			.d2l-activity-collection-title {
				display: flex;
				justify-content: space-between;
				align-items: center;
			}
			.d2l-activity-collection-body {
				padding-top: 1rem;
				background-color: var(--d2l-color-regolith);
				height: 100%;
			}
			.d2l-activity-collection-toggle-container {
				display: flex;
				align-items: center;
			}
		` ];
	}

	_updateVisibility() {
		this._visible = !this._visible;
		this.requestUpdate();
	}

	constructor() {
		super();
		this._visible = false;
	}

	render() {
		const icon = (this._visible ? 'tier1:visibility-show' : 'tier1:visibility-hide');
		const term = (this._visible ? 'Visible' : 'Hidden');

		return html`
			<div class="d2l-activity-collection-header">
				<div>Edit Learning Path</div>
				<div class="d2l-activity-collection-title">
					<h1 class="d2l-heading-1">Employee Onboarding</h1>
					<div class="d2l-activity-collection-toggle-container">
						<d2l-switch aria-label="Visibility Toggle" label-right @click="${this._updateVisibility}"></d2l-switch>
						<div class="d2l-label-text"><d2l-icon icon=${icon}></d2l-icon> ${term}</div>
					</div>
				</div>
				<div class="d2l-body-compact">
					An onboarding program for new financial analysts
				</div>
			</div>
			<div class="d2l-activity-collection-body">
				<d2l-button primary>Add Activity</d2l-button>
				<div class="d2l-activity-collection-activities">
				</div>
			</div>
		`;
	}
}
customElements.define('d2l-activity-collection-editor', CollectionEditor);
