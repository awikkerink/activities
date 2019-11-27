import { html, LitElement } from 'lit-element/lit-element.js';
import { LitQuickEvalLocalize } from '../LitQuickEvalLocalize.js';
import { RtlMixin } from '@brightspace-ui/core/mixins/rtl-mixin.js';
import { radioStyles } from '@brightspace-ui/core/components/inputs/input-radio-styles.js';
import '@brightspace-ui/core/components/dialog/dialog.js';
import '@brightspace-ui/core/components/button/button.js';

class D2LQuickEvalActionDialog extends RtlMixin(LitQuickEvalLocalize(LitElement)) {

	static get styles() {
		return radioStyles;
	}

	render() {
		return html`
			<d2l-dialog title-text="Dismiss Activity">
				<p>Dismissing an activity hides it from Quick Eval, but won't affect the activity</p>
				<p>Dismiss until...</p>
				<label class="d2l-input-radio-label">
					<input type="radio" name="myGroup">
					Next submission
				</label>
				<label class="d2l-input-radio-label">
					<input type="radio" name="myGroup">
					A specific date
				</label>
				<label class="d2l-input-radio-label">
					<input type="radio" name="myGroup">
					Forever
				</label>
				<d2l-button slot="footer" primary dialog-action="done">${this.localize('restore')}</d2l-button>
				<d2l-button slot="footer" dialog-action>${this.localize('cancel')}</d2l-button>
			</d2l-dialog>
		`;
	}

	open() {
		const actionDialog = this.shadowRoot.querySelector('d2l-dialog');
		actionDialog.open();
	}

}

window.customElements.define('d2l-quick-eval-action-dialog', D2LQuickEvalActionDialog);
