import 'd2l-save-status/d2l-save-status.js';
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
				padding: 20px;
			}
			:host([hidden]) {
				display: none;
			}
			d2l-save-status {
				padding-bottom: 20px;
			}
		`;
	}

	firstUpdated(changedProperties) {
		super.firstUpdated(changedProperties);

		this.addEventListener('d2l-siren-entity-save-start', () => {
			this.shadowRoot.querySelector('#save-status').start();
		});
		this.addEventListener('d2l-siren-entity-save-end', () => {
			this.shadowRoot.querySelector('#save-status').end();
		});
		this.addEventListener('d2l-siren-entity-save-error', () => {
			this.shadowRoot.querySelector('#save-status').error();
		});
	}

	render() {
		return html`
			<d2l-save-status
				id="save-status">
			</d2l-save-status>
			<div ?hidden="${!this.loading}">Loading ...</div>
			<div ?hidden="${this.loading}">
				<slot name="editor"></slot>
			</div>
		`;
	}
}
customElements.define('d2l-activity-editor', ActivityEditor);
