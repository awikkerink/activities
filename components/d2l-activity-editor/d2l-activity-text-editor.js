import 'd2l-inputs/d2l-input-textarea';
import './d2l-activity-html-editor';
import { html, LitElement } from 'lit-element/lit-element';

class ActivityTextEditor extends LitElement {

	static get properties() {
		return {
			value: { type: String },
			htmlEditorEnabled: { type: Boolean },
			richtextEditorConfig: { type: Object },
			disabled: { type: Boolean },
			ariaLabel: { type: String },
		};
	}

	_onPlaintextChange() {
		const content = this.shadowRoot.querySelector('d2l-input-textarea').value;
		this._dispatchChangeEvent(content);
	}

	_onRichtextChange(e) {
		const content = e.detail.content;
		this._dispatchChangeEvent(content);
	}

	_dispatchChangeEvent(content) {
		this.dispatchEvent(new CustomEvent('d2l-activity-text-editor-change', {
			bubbles: true,
			composed: true,
			detail: {
				content: content
			}
		}));
	}

	render() {
		if (this.htmlEditorEnabled) {
			return html`
				<d2l-activity-html-editor
					ariaLabel="${this.ariaLabel}"
					value="${this.value}"
					?disabled="${this.disabled}"
					@d2l-activity-html-editor-change="${this._onRichtextChange}"
					.richtextEditorConfig="${this.richtextEditorConfig}">
				</d2l-activity-html-editor>
			`;
		} else {
			return html`
				<d2l-input-textarea
					id="text-editor"
					value="${this.value}"
					?disabled="${this.disabled}"
					@change="${this._onPlaintextChange}"
					@input="${this._onPlaintextChange}">
				</d2l-input-textarea>
			`;
		}
	}

}

customElements.define('d2l-activity-text-editor', ActivityTextEditor);
