import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';
import {QuickEvalLocalize} from '../QuickEvalLocalize.js';
import '../../d2l-subtitle/d2l-subtitle.js';

class D2LQuickEvalActivityCardSubtitle extends QuickEvalLocalize(PolymerElement) {
	static get template() {
		return html`
			<d2l-subtitle text="[[_computeText(activityType, dueDate)]]"></d2l-subtitle>
		`;
	}

	static get properties() {
		return {
			activityType: {
				type: String
			},
			dueDate: {
				type: String
			}
		};
	}

	_computeText(activityType, dueDate) {
		const result = [ ];
		if (activityType) {
			const localizedActivityType = this.localize(activityType);
			if (localizedActivityType) {
				result.push(localizedActivityType);
			}
		}
		if (dueDate) {
			const formattedDateTime = Date.parse(dueDate);
			if (formattedDateTime) {
				result.push(this.localize('due', 'date', this.formatDateTime(new Date(dueDate))));
			}
		}
		return result;
	}
}

window.customElements.define('d2l-quick-eval-activity-card-subtitle', D2LQuickEvalActivityCardSubtitle);
