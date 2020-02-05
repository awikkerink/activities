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
            iframe {
                height: 100%;
                overflow: hidden;
                width: 100%;
            }
		`;
	}

	render() {
        return html`
            <d2l-template-primary-secondary>
                <iframe
                    slot="primary"
                    src="${this.leftPanelUrl}">
                </iframe>
            </d2l-template-primary-secondary>
		`;
	}
}
customElements.define('d2l-evaluation-page', EvaluationPage);
