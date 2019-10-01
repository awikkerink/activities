import { css, html, LitElement } from 'lit-element/lit-element.js';

class ActivityEditor extends LitElement {

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
			<slot name="editor"></slot>
		`;
	}
}
customElements.define('d2l-activity-editor', ActivityEditor);
