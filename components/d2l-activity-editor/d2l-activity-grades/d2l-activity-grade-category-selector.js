import { sharedAssociateGrade as associateGradeStore, shared as store } from '../state/activity-store.js';
import { css, html } from 'lit-element/lit-element';
import { ActivityEditorMixin } from '../mixins/d2l-activity-editor-mixin.js';
import { inputLabelStyles } from '@brightspace-ui/core/components/inputs/input-label-styles.js';
import { LocalizeActivityEditorMixin } from '../mixins/d2l-activity-editor-lang-mixin.js';
import { MobxLitElement } from '@adobe/lit-mobx';
import { RtlMixin } from '@brightspace-ui/core/mixins/rtl-mixin.js';
import { selectStyles } from '@brightspace-ui/core/components/inputs/input-select-styles';

class ActivityGradeCategorySelector extends ActivityEditorMixin(LocalizeActivityEditorMixin(RtlMixin(MobxLitElement))) {
	static get properties() {
		return {
			_createSelectboxGradeItemEnabled: { type: Boolean }
		};
	}

	static get styles() {
		return [
			inputLabelStyles,
			selectStyles,
			css`
			:host {
				display: block;
			}
			:host([hidden]),
			[hidden] {
				display: none !important;
			}
			.d2l-input-label {
				display: block;
				margin-bottom: 8px;
			}
			#d2l-activity-grade-category-selector {
				margin-bottom: 1.5rem;
			}
			.d2l-grade-category-selector-select {
				max-width: 100%;
			}
			`
		];
	}

	constructor() {
		super(store);
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
		const gradeCategoryCollection = this._gradeCategoryCollection;
		if (!gradeCategoryCollection) {
			return html``;
		}

		const { selected } = gradeCategoryCollection;
		const gradeCategories = this._createSelectboxGradeItemEnabled ?
			gradeCategoryCollection.gradeCategories : gradeCategoryCollection.gradeCandidates;

		return html`
			<div id="d2l-activity-grade-category-selector">
				<label for="grade-categories" class="d2l-input-label">${this.localize('grades.newGradeItemCategory')}</label>
				<select
					id="grade-categories"
					class="d2l-input-select d2l-grade-category-selector-select"
					@change="${this._setSelected}"
					>
					${gradeCategories.map(gc => html`
						<option value="${gc.href}" .selected="${selected && gc.href === selected.href}">
							${gc.name ? gc.name : this.localize('grades.noGradeItemCategory')}
						</option>
					`)};
				</select>
			</div>
		`;
	}

	get _gradeCategoryCollection() {
		const activity = store.get(this.href);

		if (!activity) return null;

		let gradeCategoryCollection = null;
		if (this._createSelectboxGradeItemEnabled) {
			const associateGradeEntity = activity.associateGradeHref && associateGradeStore.get(activity.associateGradeHref);
			gradeCategoryCollection = associateGradeEntity && associateGradeEntity.gradeCategoryCollection;
		} else {
			const hasCategory = activity.scoreAndGrade &&
				activity.scoreAndGrade.newGradeCandidatesCollection &&
				activity.scoreAndGrade.newGradeCandidatesCollection.hasNewGradeCandidateWithCategory();

			if (hasCategory) {
				gradeCategoryCollection = activity.scoreAndGrade.newGradeCandidatesCollection;
			}
		}

		return gradeCategoryCollection;
	}

	_setSelected(e) {
		const gradeCategoryCollection = this._gradeCategoryCollection;
		if (!gradeCategoryCollection) return;

		const storeForAssociateGrade = this._createSelectboxGradeItemEnabled ? associateGradeStore : null;
		if (e && e.target && e.target.value) {
			gradeCategoryCollection.setSelected(e.target.value, storeForAssociateGrade);
		} else {
			gradeCategoryCollection.setSelected(null, storeForAssociateGrade);
		}
	}
}

customElements.define('d2l-activity-grade-category-selector', ActivityGradeCategorySelector);
