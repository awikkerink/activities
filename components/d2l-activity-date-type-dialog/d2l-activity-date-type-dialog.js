import '@brightspace-ui/core/components/button/button.js';
import '@brightspace-ui/core/components/inputs/input-checkbox.js';
import '@brightspace-ui/core/components/dialog/dialog.js';
import '@brightspace-ui/core/components/loading-spinner/loading-spinner.js';
import { bodyCompactStyles } from '@brightspace-ui/core/components/typography/styles.js';
import { css, html, LitElement } from 'lit-element/lit-element.js';
import { radioStyles } from '@brightspace-ui/core/components/inputs/input-radio-styles.js';
import { LocalizeActivityDateTypeDialogMixin } from './d2l-activity-date-type-dialog-lang-mixin';

/**
 * A component to launch a dialog wrapping availability date type seleciton options
 * @fires d2l-activity-date-type-closed - dispatched when dialog is closed
 */
class D2LActivityDateTypeDialog extends (LocalizeActivityDateTypeDialogMixin(LitElement)) {

	static get properties() {
		return {
			/**
			 * Whether or not the dialog is open
			 */
			opened: { type: Boolean, reflect: true },

			/**
			 * Specify the title of the dialog
			 */
			titleText: { type: String, attribute: false },

			/**
			 * Specify the description to be displayed before the radio input selection
			 */
			descriptionText: { type: String, attribute: false },

			/**
			 * The date type option to be selected on open
			 * @dateType { 0: 'accessRestricted'| 1: 'submissionRestricted'| 2: 'hidden'}
			 */
			dateType: { type: Number, attribute: false },

			/**
			 * The value of the display in calendar checkbox on open
			 */
			displayInCalendar: { type: Boolean, attribute: false },

			/**
			 * The preferred width (unit-less) for the dialog
			 */
			width: { type: Number }
		};
	}

	static get styles() {
		return [
			radioStyles,
			bodyCompactStyles,
			css`
				:host {
					display: block;
				}
				:host([hidden]) {
					display: none;
				}
				.d2l-input-radio-label {
					margin-bottom: 10px;
				}
				.d2l-dialog-element {
					margin-bottom: 30px;
					margin-top: 30px;
				}
				.d2l-no-collapse {
					display: flex;
					flex-direction: column;
				}
			`
		];
	}

	async open() {
		if (this.opened) return;
		this.opened = true;
		return await new Promise((resolve) => {
			const onClose = (e) => {
				if (e.target !== this) return; // ignore if bubbling from child dialog
				this.removeEventListener('d2l-activity-date-type-dialog-closed', onClose);
				resolve(e.detail);
			};
			this.addEventListener('d2l-activity-date-type-dialog-closed', onClose);
		});
	}

	constructor() {
		super();
		this.opened = false;
		this.titleText = '';
		this.descriptionText = '';
		this.dateType = 0; //'accessRestricted'
		this.displayInCalendar = false;
		this.width = 600;
	}

	render() {
		return html`
			<d2l-dialog
				@d2l-dialog-close=${this._handleDialogClose}
				title-text=${this.titleText}
				?opened=${this.opened}
				width=${this.width}
			>
				<div class="d2l-body-compact" >${this.descriptionText}</div>

				${this._renderDateTypeOptions()}

				<div class ="d2l-dialog-element">
					<d2l-button primary data-dialog-action="done">${this.localize('txtDoneButton')}</d2l-button>
					<d2l-button data-dialog-action="cancel">${this.localize('txtCancelButton')}</d2l-button>
				</div>
			</d2l-dialog>
		`;
	}

	_renderDateTypeOptions() {
		return html`
			<d2l-input-fieldset class="d2l-dialog-element d2l-no-collapse">
				<label class="d2l-input-radio-label">
					<input
						type="radio"
						name="availabilityDateTypeOptions"
						value=0
						?checked=${this.dateType === 0}
						@change=${this._setDateTypeValue}/>
					${this.localize('lblVisibleWithAccessRestricted')}
				</label>
				<label class="d2l-input-radio-label">
					<input
						type="radio"
						name="availabilityDateTypeOptions"
						value=1
						?checked=${this.dateType === 1}
						@change=${this._setDateTypeValue}/>
					${this.localize('lblVisibleWithSubmissionRestricted')}
				</label>
				<label class="d2l-input-radio-label">
					<input
						type="radio"
						name="availabilityDateTypeOptions"
						value=2
						?checked=${this.dateType === 2}
						@change=${this._setDateTypeValue}/>
					${this.localize('lblHidden')}
				</label>
			</d2l-input-fieldset>
			<d2l-input-checkbox
				id="display-in-calendar-cb"
				name="availabilityDateTypeOptions"
				class="d2l-dialog-element"
				?checked=${this.displayInCalendar}
				@change=${this._setDisplayInCalendar}
			>
				${this.localize('lblDisplayInCalendar')}
			</d2l-input-checkbox>
		`;
	}

	_handleDialogClose(e) {
		this.opened = false;
		this.dispatchEvent(new CustomEvent('d2l-activity-date-type-dialog-closed', {
			detail: {
				action: e.detail.action,
				dateType: this.dateType,
				displayInCalendar: this.displayInCalendar
			},
			bubbles: true,
			composed: true,
			cancelable: true
		}));
	}

	_setDateTypeValue(e) {
		this.dateType = e.target.value;
	}

	_setDisplayInCalendar(e) {
		this.displayInCalendar = e.target.checked;
	}
}

customElements.define('d2l-activity-date-type-dialog', D2LActivityDateTypeDialog);
