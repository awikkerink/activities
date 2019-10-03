import { css, html, LitElement } from 'lit-element/lit-element.js';
import { heading1Styles } from '@brightspace-ui/core/components/typography/styles.js';
import '@brightspace-ui/core/components/button/button.js';

class AdminList extends LitElement {
	static get properties() {
		return {
			titleText: {
				type: String
			},
			collectionHref: {
				type: String
			},
		};
	}

	static get styles() {
		return [ heading1Styles, css`
			:host {
				display: block;
			}
			:host([hidden]) {
				display: none;
			}
			.d2l-activity-admin-list-container {
				display: flex;
				justify-content: space-between;
				align-items: center;
			}
		` ];
	}

	render() {
		return html`
		<div class="d2l-activity-admin-list-container">
			<h1 class="d2l-heading-1">${this.titleText}</h1>
			<d2l-button primary>Create Learning Path</d2l-button>
		</div>
		<div>
			CollectionHref: ${this.collectionHref}
		</div>
		`;
	}
}
customElements.define('d2l-activity-admin-list', AdminList);
