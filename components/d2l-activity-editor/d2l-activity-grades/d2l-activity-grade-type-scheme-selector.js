import { css, html } from 'lit-element/lit-element';
import { ActivityEditorMixin } from '../mixins/d2l-activity-editor-mixin.js';
import { bodySmallStyles } from '@brightspace-ui/core/components/typography/styles.js';
import { inputLabelStyles } from '@brightspace-ui/core/components/inputs/input-label-styles.js';
import { LocalizeActivityEditorMixin } from '../mixins/d2l-activity-editor-lang-mixin.js';
import { MobxLitElement } from '@adobe/lit-mobx';
import { radioStyles } from '@brightspace-ui/core/components/inputs/input-radio-styles.js';
import { RtlMixin } from '@brightspace-ui/core/mixins/rtl-mixin.js';
import { selectStyles } from '@brightspace-ui/core/components/inputs/input-select-styles';
import { shared as store } from '../state/activity-store.js';

class ActivityGradeTypeSchemeSelector extends ActivityEditorMixin(LocalizeActivityEditorMixin(RtlMixin(MobxLitElement))) {
	static get properties() {
		return {
			_canChooseType: { type: Boolean },
			_numericChecked: { type: Boolean },
			_createSelectboxGradeItemEnabled: { type: Boolean }
		};
	}

	static get styles() {
		return [
			inputLabelStyles,
			selectStyles,
			bodySmallStyles,
			radioStyles,
			css`
			:host {
				display: block;
			}
			:host([hidden]),
			[hidden] {
				display: none !important;
			}
			.d2l-input-radio-label {
				margin-bottom: 0;
			}
			#d2l-activity-grade-type-selector {
				margin-bottom: 32px;
				margin-top: 16px;
			}
			.d2l-body-small {
				margin-bottom: 0.9rem;
			}
			.d2l-body-small:last-of-type {
				margin-bottom: 0;
			}
			`
		];
	}

	constructor() {
		super(store);
		this._canChooseType = true;
		this._numericChecked = true;
	}

	connectedCallback() {
		super.connectedCallback();

		const event = new CustomEvent('d2l-request-provider', {
			detail: { key: 'd2l-provider-create-selectbox-grade-item-enabled' },
			bubbles: true,
			composed: true,
			cancelable: true
		});
		this.dispatchEvent(event);

		this._createSelectboxGradeItemEnabled = event.detail.provider;
	}

	render() {
		return html`
			<div id="d2l-activity-grade-type-selector">
				<d2l-input-fieldset label=${this.localize('grades.newGradeType')}>
					<label class="d2l-input-radio-label ${!this._canChooseType ? 'd2l-input-radio-label-disabled' : ''}">
						<input
							type="radio"
							name="gradeType"
							value="numeric"
							?disabled="${!this._canChooseType}"
							.checked="${this._numericChecked}"
							@change="${this._typeRadioChanged}">
						${this.localize('grades.newGradeTypeNumeric')}
					</label>
					<d2l-input-radio-spacer class="d2l-body-small">
						${this.localize('grades.numericDescription')}<br />
						${this.localize('grades.numericDescriptionExample')}
					</d2l-input-radio-spacer>
					<label class="d2l-input-radio-label ${!this._canChooseType ? 'd2l-input-radio-label-disabled' : ''}">
						<input
							type="radio"
							name="gradeType"
							value="selectbox"
							?disabled="${!this._canChooseType}"
							.checked="${!this._numericChecked}"
							@change="${this._typeRadioChanged}">
						${this.localize('grades.newGradeTypeSelectbox')}
					</label>
					<d2l-input-radio-spacer class="d2l-body-small">
						${this.localize('grades.selectboxDescription')}<br />
						${this.localize('grades.selectboxDescriptionExample')}
					</d2l-input-radio-spacer>
				</d2l-input-fieldset>
			</div>
		`;
	}

	_typeRadioChanged() {
		// TODO
	}
}

customElements.define('d2l-activity-grade-type-scheme-selector', ActivityGradeTypeSchemeSelector);
