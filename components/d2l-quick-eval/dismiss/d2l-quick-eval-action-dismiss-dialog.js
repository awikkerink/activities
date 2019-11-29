import { css, html, LitElement } from 'lit-element/lit-element.js';
import { LitQuickEvalLocalize } from '../LitQuickEvalLocalize.js';
import { RtlMixin } from '@brightspace-ui/core/mixins/rtl-mixin.js';
import { radioStyles } from '@brightspace-ui/core/components/inputs/input-radio-styles.js';
import { labelStyles, bodyStandardStyles } from '@brightspace-ui/core/components/typography/styles.js';
import '@brightspace-ui/core/components/dialog/dialog.js';
import '@brightspace-ui/core/components/button/button.js';
import 'd2l-datetime-picker/d2l-datetime-picker.js';

// shim for vaadin calendar to overlay on top of the dialog
(()=>{
	if (window.D2L && window.D2L.DialogMixin && window.D2L.DialogMixin.preferNative) {
		window.D2L.DialogMixin.preferNative = false;
	}

	var styling = `
		vaadin-date-picker-overlay {
			z-index: 1000;
		}
	`;
	var head = document.head || document.getElementsByTagName('head')[0];
	var style = document.createElement('style');
	head.appendChild(style);
	style.type = 'text/css';
	style.appendChild(document.createTextNode(styling));
})()

class D2LQuickEvalActionDialog extends RtlMixin(LitQuickEvalLocalize(LitElement)) {

	static get properties() {
		return {
			selectedRadio: String,
		};
	}

	static get styles() {
		return [ labelStyles, bodyStandardStyles, radioStyles, css`
			.radio-container {
				margin-top: 0.5rem;
			}
			.datepicker-container {
				margin-bottom: 0.9rem;
			}
			` ];
	}

	render() {
		return html`
			<d2l-dialog title-text="Dismiss Activity">
				<div class="d2l-body-standard">Dismissing an activity hides it from Quick Eval, but won't affect the activity</div>
				<br/>
				<p class="d2l-label-text">Dismiss until...</p>
				<div class="radio-container">
					<label class="d2l-input-radio-label">
						<input @change="${this._updateProp.bind(this, "submission")}" type="radio" name="myGroup">
						Next submission
					</label>
					<label class="d2l-input-radio-label">
						<input @change="${this._updateProp.bind(this, "date")}" type="radio" name="myGroup">
						A specific date
					</label>
					${this.selectedRadio === "date"? html`
						<div class="datepicker-container">
							<d2l-datetime-picker placeholder="11|12|2019" hide-label></d2l-datetime-picker>
						</div>
						`: null }
					<label class="d2l-input-radio-label">
						<input @change="${this._updateProp.bind(this, "forever")}" type="radio" name="myGroup">
						Forever
					</label>
				</div>
				<d2l-button slot="footer" primary dialog-action="done">${this.localize('restore')}</d2l-button>
				<d2l-button slot="footer" dialog-action>${this.localize('cancel')}</d2l-button>
			</d2l-dialog>
		`;
	}

	open() {
		this._getDialog().open();
	}

	constructor() {
		super();
	}

	_getDialog() {
		return this.shadowRoot.querySelector('d2l-dialog');
	}

	_updateProp(propName) {
		this.selectedRadio = propName;
		this._getDialog().resize();
	}

}

window.customElements.define('d2l-quick-eval-action-dialog', D2LQuickEvalActionDialog);
