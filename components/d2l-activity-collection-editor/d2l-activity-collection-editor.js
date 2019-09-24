import { css, html, LitElement } from 'lit-element/lit-element.js';

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
			<div>D2L Activity Collection Editor</div>
		`;
	}
}
customElements.define('d2l-activity-collection-editor', CollectionEditor);
