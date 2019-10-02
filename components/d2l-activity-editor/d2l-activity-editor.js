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
			}
			:host([hidden]) {
				display: none;
			}
			d2l-save-status {
				padding: 20px;
				padding-bottom: 0px;
			}
		`;
	}

	constructor() {
		super();
		this.addEventListener('d2l-activity-editor-autosave', e => {
			const saveStatus = this.shadowRoot.querySelector('#save-status');
			switch(e.detail.message) {
				case 'd2l-siren-entity-save-start':
					saveStatus.start();
					break;
				case 'd2l-siren-entity-save-end':
					saveStatus.end();
					break;
				case 'd2l-siren-entity-save-error':
					saveStatus.error();
					break;
			}
		});
	}

	_getSaveStatus() {
		return html`
			<d2l-save-status
				id="save-status">
			</d2l-save-status>
		`;
	}

	render() {
		return html`
			${this._getSaveStatus()}
			<div ?hidden="${!this.loading}">Loading ...</div>
			<div ?hidden="${this.loading}">
				<slot name="editor"></slot>
			</div>
		`;
	}
}
customElements.define('d2l-activity-editor', ActivityEditor);
