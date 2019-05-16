import { html, PolymerElement } from '@polymer/polymer/polymer-element.js';
import './d2l-quick-eval-activities-list.js';

class D2LQuickEvalSubmissions extends PolymerElement {
	static get template() {
		const template = html`
			<d2l-quick-eval-activities-list href="[[href]]" token="[[token]]" logging-endpoint="[[loggingEndpoint]]" master-teacher="[[masterTeacher]]">
			</d2l-quick-eval-activities-list>
		`;
		template.setAttribute('strip-whitespace', 'strip-whitespace');
		return template;
	}

	static get is() {
		return 'd2l-quick-eval-submissions';
	}
}

window.customElements.define(D2LQuickEvalSubmissions.is, D2LQuickEvalSubmissions);
