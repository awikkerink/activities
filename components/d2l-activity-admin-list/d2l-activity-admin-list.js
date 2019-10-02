import { css, html, LitElement } from 'lit-element/lit-element.js';
import 'd2l-common/components/d2l-hm-search/d2l-hm-search.js';
import 'd2l-typography/d2l-typography-shared-styles.js';
import 'd2l-button/d2l-button.js';

class AdminList extends LitElement {
	static get properties() {
		return {
			header: {
				type: String
			},
			collectionHref: {
				type: String
			},
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
			.d2l-activity-admin-list-container {
				display: flex;
				justify-content: space-between;
				align-items: baseline;
			}
		`;
	}

	render() {
		return html`
		<div class="d2l-activity-admin-list-container">
			<h1>${this.title}</h1>
			<d2l-button primary>Create Learning Path</d2l-button>
		</div>
		<div>
			CollectionHref: ${this.collectionHref}
		</div>
		`;
	}
}
customElements.define('d2l-activity-admin-list', AdminList);
