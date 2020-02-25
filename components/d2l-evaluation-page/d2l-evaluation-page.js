import '@brightspace-ui/core/templates/primary-secondary/primary-secondary.js';
import { css, html, LitElement } from 'lit-element/lit-element.js';

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
			#evidence {
				height: 100%;
				display: flex;
				flex-grow: 1;
			}
			#d2l-evaluation-page-iframe {
				width: 100%
			}
		`;
	}

	render() {
		return html`
			<d2l-template-primary-secondary>
				<div slot="primary" id="evidence">
					<iframe
						slot="primary"
						id="d2l-evaluation-page-iframe"
						frameBorder="0"
						src="${this.leftPanelUrl}">
					</iframe>
				</div>
				<div slot="secondary">
					<p>right panel</p>
				</div>
			</d2l-template-primary-secondary>
		`;
	}
}
customElements.define('d2l-evaluation-page', EvaluationPage);
