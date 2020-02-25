import '@brightspace-ui/core/templates/primary-secondary/primary-secondary.js';
import './consistent-evaluation-html-editor.js';
import { css, html, LitElement } from 'lit-element/lit-element.js';
import { getUniqueId } from '@brightspace-ui/core/helpers/uniqueId';

class EvaluationPage extends LitElement {

	static get properties() {
		return {
			leftPanelUrl: { type: String }
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
			d2l-template-primary-secondary {
				height: 60rem;
			}
			iframe {
				height: 60rem;
				width: 100%;
			}
		`;
	}

	_resolveUrl() {
		return `${import.meta.url}/../../node_modules/d2l-html-editor/`;
	}

	constructor() {
		super()
		this.richTextEditorDisabled = false;
		this._richTextEditorConfig = {};
		this._htmlEditorUniqueId = `htmleditor-${getUniqueId()}`;
	}

	render() {
		return html`
			<d2l-template-primary-secondary>
				<iframe
					slot="primary"
					id="d2l-evaluation-page-iframe"
					src="${this.leftPanelUrl}">
				</iframe>
				<div slot="secondary">
					<button
						onclick="SendMessageFromParentToIframe()">Button in parent
					</button>
					<d2l-consistent-evaluation-html-editor
						@d2l-request-provider="${this._onRequestProvider}"
						value="This is the value"
						.richtextEditorConfig="${this._richTextEditorConfig}"
						@html-editor-demo-change="${this._saveInstructionsOnChange}"
						ariaLabel="aria label"
						?disabled="${this.richTextEditorDisabled}"
					></d2l-consistent-evaluation-html-editor>
					<p>hello</p>
				</div>
				
			</d2l-template-primary-secondary>
		`;
	}

	_saveInstructionsOnChange() {
		console.log('save on change');
	}
}
customElements.define('d2l-evaluation-page', EvaluationPage);
