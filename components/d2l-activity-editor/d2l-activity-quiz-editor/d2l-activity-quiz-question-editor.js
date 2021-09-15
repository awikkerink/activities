import '@brightspace-hmc/foundation-components/components/activity/editor/collection/custom/quiz/d2l-activity-collection-editor-quiz.js';
import { css, LitElement } from 'lit-element/lit-element.js';
import { html } from '@brightspace-hmc/foundation-engine/framework/lit/hypermedia-components.js';

const componentClass = class extends LitElement {
	static get properties() {
		return {
			href: { type: String, reflect: true },
			token: { type: String },
			importedActivityHrefs: { type: Array }
		};
	}
	static get styles() {
		return [css`
			:host {
				display: block;
			}`];
	}
	render() {
		return html `
			<d2l-activity-editor-main href="${this.href}"
									.token="${this.token}"
									.importedActivityHrefs=${this.importedActivityHrefs}>
			</d2l-activity-editor-main>
		`;
	}
};

customElements.define('d2l-activity-quiz-question-editor', componentClass);
