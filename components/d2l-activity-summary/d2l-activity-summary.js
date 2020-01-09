import 'd2l-accordion/d2l-accordion.js';
import { css, html, LitElement } from 'lit-element/lit-element.js';

class ActivitySummary extends LitElement {

	static get properties() {
		return {
			summaryTitle: {type: String},
			summary: {type: Array},
			_isOpened: {type: Boolean}
		};
	}

	constructor(){
		super();
		this._isOpened = false;
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

	_handleClick(event) {
		this._isOpened = event.target.opened;
	}

	render() {
		return html`
			<d2l-accordion>
				<d2l-accordion-collapse 
				title=${this.summaryTitle} 
				@click=${this._handleClick} 
				flex>
					<slot name="detailed-content"></slot>
				</d2l-accordion-collapse>
				${this._isOpened? 
					null:
					html`<ul>
						${this.summary.map(row => html`<li>${row}</li>`)}
					</ul>` 
				}
			</d2l-accordion>
		`;
	}
}
customElements.define('d2l-activity-summary', ActivitySummary);
