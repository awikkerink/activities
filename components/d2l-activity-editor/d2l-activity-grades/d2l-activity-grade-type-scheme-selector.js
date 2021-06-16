import { css, html } from 'lit-element/lit-element';
import { ActivityEditorMixin } from '../mixins/d2l-activity-editor-mixin.js';
import { bodySmallStyles } from '@brightspace-ui/core/components/typography/styles.js';
import { GradeType } from 'siren-sdk/src/activities/associateGrade/AssociateGradeEntity.js';
import { inputLabelStyles } from '@brightspace-ui/core/components/inputs/input-label-styles.js';
import { LocalizeActivityEditorMixin } from '../mixins/d2l-activity-editor-lang-mixin.js';
import { MobxLitElement } from '@adobe/lit-mobx';
import { radioStyles } from '@brightspace-ui/core/components/inputs/input-radio-styles.js';
import { RtlMixin } from '@brightspace-ui/core/mixins/rtl-mixin.js';
import { selectStyles } from '@brightspace-ui/core/components/inputs/input-select-styles';
import { sharedAssociateGrade as store } from '../state/activity-store.js';

class ActivityGradeTypeSchemeSelector extends ActivityEditorMixin(LocalizeActivityEditorMixin(RtlMixin(MobxLitElement))) {
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
	}

	render() {
		const associateGrade = store.get(this.href);

		if (!associateGrade) {
			return html``;
		}

		const {
			canEditNewGrade,
			gradeType,
			gradeSchemeCollection
		} = associateGrade;

		return html`
			<div id="d2l-activity-grade-type-selector">
				<d2l-input-fieldset label=${this.localize('grades.newGradeType')}>
					<label class="d2l-input-radio-label ${!canEditNewGrade ? 'd2l-input-radio-label-disabled' : ''}">
						<input
							type="radio"
							name="gradeType"
							value="numeric"
							?disabled="${!canEditNewGrade}"
							.checked="${gradeType === GradeType.Numeric}"
							@change="${this._typeRadioChanged}">
						${this.localize('grades.newGradeTypeNumeric')}
					</label>
					<d2l-input-radio-spacer class="d2l-body-small">
						${this.localize('grades.numericDescription')}<br />
						${this.localize('grades.numericDescriptionExample')}
					</d2l-input-radio-spacer>
					<label class="d2l-input-radio-label ${!canEditNewGrade ? 'd2l-input-radio-label-disabled' : ''}">
						<input
							type="radio"
							name="gradeType"
							value="selectbox"
							?disabled="${!canEditNewGrade}"
							.checked="${gradeType === GradeType.Selectbox}"
							@change="${this._typeRadioChanged}">
						${this.localize('grades.newGradeTypeSelectbox')}
					</label>
					<d2l-input-radio-spacer class="d2l-body-small">
						${this.localize('grades.selectboxDescription')}<br />
						${this.localize('grades.selectboxDescriptionExample')}
					</d2l-input-radio-spacer>
				</d2l-input-fieldset>
			</div>
			<div id="d2l-activity-grade-scheme-selector">
				<label for="grade-schemes" class="d2l-input-label">${this.localize('grades.newGradeScheme')}</label>
				<select
					id="grade-schemes"
					class="d2l-input-select"
					@change="${this._setSelectedScheme}"
					>
					${gradeSchemeCollection && gradeSchemeCollection.gradeSchemes.map(scheme => html`
						<option value="${scheme.href}" .selected="${scheme.isSelected}">
							${scheme.isDefault ?
		this.localize('grades.defaultGradeScheme', { schemeName: scheme.name })
		: scheme.name
}
						</option>
					`)};
				</select>
			</div>
		`;
	}

	async _setSelectedScheme(e) {
		const currentTarget = e.currentTarget;
		if (!currentTarget) return;

		const associateGrade = store.get(this.href);
		if (!associateGrade) return;

		await associateGrade.gradeSchemeCollection.setGradeScheme(currentTarget.value, store);
	}

	async _typeRadioChanged(e) {
		const currentTarget = e.currentTarget;
		if (!currentTarget) return;

		const associateGrade = store.get(this.href);
		if (!associateGrade) return;

		await associateGrade.setGradeType(currentTarget.value);
		await associateGrade.getGradeSchemes();
	}
}

customElements.define('d2l-activity-grade-type-scheme-selector', ActivityGradeTypeSchemeSelector);
