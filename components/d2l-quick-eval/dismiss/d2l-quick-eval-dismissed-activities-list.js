import { html, LitElement } from 'lit-element/lit-element.js';
import { LitQuickEvalLocalize } from '../LitQuickEvalLocalize.js';
import '@brightspace-ui/core/components/list/list.js';
import '@brightspace-ui/core/components/list/list-item.js';
import '@brightspace-ui/core/components/list/list-item-content.js';
import 'd2l-icons/d2l-icon.js';
import '../../d2l-subtitle/d2l-subtitle.js';

class D2LQuickEvalDismissedActivitiesList extends LitQuickEvalLocalize(LitElement) {
	render() {
		return html`
			<d2l-list separators>${this.dismissedActivities.map(act => html`
				<d2l-list-item selectable>
					<d2l-icon slot="illustration" icon="${this._computeIcon(act.type)}" aria-label="${this.localize(act.type)}"></d2l-icon>
					<d2l-list-item-content>
						<div>${act.name}</div>
						<div slot="secondary">
							<d2l-subtitle .text="${this._computeSubtitleText(act)}"></d2l-subtitle>
						</div>
					</d2l-list-item-content>
				</d2l-list-item>`)}
			</d2l-list>
		`;
	}

	static get properties() {
		return {
			dismissedActivities: { type: Array }
		};
	}

	_computeSubtitleText(act) {
		return [act.course, this.localize('dismissedOn', {date: this.formatDateTime(new Date(act.dismissedDate))})];
	}

	_computeIcon(type) {
		switch (type) {
			case 'quiz':
				return 'tier2:quizzing';
			case 'assignment':
				return 'tier2:assignments';
			case 'discussion':
				return 'tier2:discussions';
		}
		return '';
	}
}

window.customElements.define('d2l-quick-eval-dismissed-activities-list', D2LQuickEvalDismissedActivitiesList);
