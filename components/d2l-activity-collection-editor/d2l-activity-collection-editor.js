import { css, html, LitElement } from 'lit-element/lit-element.js';
import '@d2l/switch/d2l-switch.js';

class CollectionEditor extends LitElement {
	static get properties() {
		return {};
	}

	static get styles() {
		return css`
			:host {
				display: block;
			}
			:host([hidden]) {
				display: none;
			}
		`;
	}

	render() {
		return html`
			<div class="d2l-activity-collection-header">
				<h1>Employee Onboarding</h1>
				<div class="d2l-activity-collection-description">
					An onboarding program for new financial analysts
				</div>
			</div>
			<div>
				<d2l-switch label-right>Hidden</d2l-switch>
			</div>
		`;
	}
}
customElements.define('d2l-activity-collection-editor', CollectionEditor);
