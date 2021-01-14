import '@brightspace-ui/htmleditor/htmleditor.js';
import { css, html, LitElement } from 'lit-element/lit-element.js';
import { inputStyles } from '@brightspace-ui/core/components/inputs/input-styles';
import { LocalizeActivityEditorMixin } from './mixins/d2l-activity-editor-lang-mixin.js';

class ActivityHtmlNewEditor extends LocalizeActivityEditorMixin(LitElement) {

	static get properties() {
		return {
			value: { type: String },
			ariaLabel: { type: String },
			disabled: { type: Boolean }
		};
	}

	static get styles() {
		return [ inputStyles, css`
			:host {
				display: flex;
				width: 100%;
			}
			:host([hidden]) {
				display: none;
			}
		`];
	}

	render() {
		return html`
			<d2l-htmleditor
				html="${this.value}"
				title="${this.ariaLabel}"
				?disabled="${this.disabled}"
				type="inline"
				@d2l-htmleditor-blur="${this._onContentChange}">
			</d2l-htmleditor>
		`;
	}

	_onContentChange() {
		const content = this.shadowRoot.querySelector('d2l-htmleditor').html;
		this.dispatchEvent(new CustomEvent('d2l-activity-html-editor-change', {
			bubbles: true,
			composed: true,
			detail: {
				content: content
			}
		}));
	}
}

customElements.define('d2l-activity-html-new-editor', ActivityHtmlNewEditor);
