import '@brightspace-ui/htmleditor/htmleditor.js';
import { html, LitElement } from 'lit-element/lit-element.js';
import { LocalizeActivityEditorMixin } from './mixins/d2l-activity-editor-lang-mixin.js';

class ActivityHtmlNewEditor extends LocalizeActivityEditorMixin(LitElement) {

	static get properties() {
		return {
			value: { type: String },
			ariaLabel: { type: String },
			disabled: { type: Boolean },
			height: { type: String }
		};
	}

	constructor() {
		super();
		this.height = "10rem";
	}

	render() {
		return html`
			<d2l-htmleditor
				html="${this.value}"
				label="${this.ariaLabel}"
				label-hidden
				?disabled="${this.disabled}"
				height="${this.height}"
				style="height:100%;"
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
