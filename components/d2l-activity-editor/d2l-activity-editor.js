import { css, html, LitElement } from 'lit-element/lit-element.js';
import { PendingContainerMixin } from 'siren-sdk/src/mixin/pending-container-mixin.js';

class ActivityEditor extends PendingContainerMixin(LitElement) {

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
			<div ?hidden="${!this._hasPendingChildren}">Loading ...</div>
			<div ?hidden="${this._hasPendingChildren}">
				<slot name="editor"></slot>
			</div>
		`;
	}
}
customElements.define('d2l-activity-editor', ActivityEditor);
