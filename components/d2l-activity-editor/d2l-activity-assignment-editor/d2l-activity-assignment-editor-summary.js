import 'd2l-accordion/d2l-accordion.js';
import { css, html, LitElement } from 'lit-element/lit-element.js';

class AssignmentEditorSummary extends LitElement {

	static get properties() {
		return {
			summaryTitle: {type: String},
			getSummarizedContent: {type: Function}
		};
	}

	static get styles() {
		return [
			css`
				:host {
					display: block;
				}
				:host([hidden]) {
					display: none;
				}
			`
		];
	}

	render() {
		return html`
			<d2l-accordion>
				<d2l-accordion-collapse title=${this.summaryTitle} flex>
                	<slot name="content"></slot>
				</d2l-accordion-collapse>
			</d2l-accordion>
		`;
	}
}
customElements.define('d2l-activity-assignment-editor-summary', AssignmentEditorSummary);
