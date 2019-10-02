import { css, html, LitElement } from 'lit-element/lit-element.js';

class ActivityEditor extends LitElement {

	static get properties() {
		return {
			loading: { type: Boolean },
		};
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
			<div ?hidden="${!this.loading}">Loading ...</div>
			<div ?hidden="${this.loading}">
				<slot name="editor"></slot>
			</div>
		`;
	}
}
customElements.define('d2l-activity-editor', ActivityEditor);
