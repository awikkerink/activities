import 'd2l-accordion/d2l-accordion.js';
import { css, html, LitElement } from 'lit-element/lit-element.js';

class AssignmentEditorSummary extends LitElement {

	static get properties() {
		return {
			summaryTitle: {type: String},
			summary: {type: Array},
			getSummarizedContent: {type: Function}
		};
	}

	constructor(){
		super();
		this.isOpened = false;
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
				<d2l-accordion-collapse 
				title=${this.summaryTitle} 
				?opened=${this.isOpened} 
				onclick=${this.isOpened = !this.isOpened} 
				flex>
					<slot name="content"></slot>
				</d2l-accordion-collapse>
				${!this.isOpened? 
					html`<ul>
						${this.summary.map(i => html`<li>${i}</li>`)}
					</ul>` :
					null
				}
			</d2l-accordion>
		`;
	}
}
customElements.define('d2l-activity-assignment-editor-summary', AssignmentEditorSummary);
