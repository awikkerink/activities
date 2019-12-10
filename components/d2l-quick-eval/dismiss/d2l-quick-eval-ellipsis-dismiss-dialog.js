import { html, LitElement } from 'lit-element/lit-element.js';
import { LitQuickEvalLocalize } from '../LitQuickEvalLocalize.js';
import '@brightspace-ui/core/components/dialog/dialog.js';
import '@brightspace-ui/core/components/button/button.js';
import './d2l-quick-eval-dismissed-activities-list.js';

class D2LQuickEvalEllipsisDialog extends LitQuickEvalLocalize(LitElement) {

	static get properties() {
		return {
			opened: { type: Boolean },
			dismissedActivities: { type: Array }
		};
	}

	render() {
		return html`
			<d2l-dialog
				title-text="${this.localize('dismissedActivitiesList')}"
				.opened="${this.opened}">
				<d2l-quick-eval-dismissed-activities-list .dismissedActivities=${this.dismissedActivities}></d2l-quick-eval-dismissed-activities-list>
				<d2l-button slot="footer" primary dialog-action="done">${this.localize('restore')}</d2l-button>
				<d2l-button slot="footer" dialog-action>${this.localize('cancel')}</d2l-button>
			</d2l-dialog>
		`;
	}

	constructor() {
		super();
		this.opened = false;
	}

	_getDialog() {
		return this.shadowRoot.querySelector('d2l-dialog');
	}

	updated() {
		if (this._getDialog() && this.dismissedActivities && this.dismissedActivities.length) {
			setTimeout(()=>this._getDialog().resize(), 0);
		}
	}
}

window.customElements.define('d2l-quick-eval-ellipsis-dialog', D2LQuickEvalEllipsisDialog);
