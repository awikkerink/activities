import './d2l-activity-grade-category-selector.js';
import './d2l-activity-grade-type-scheme-selector.js';
import { sharedAssociateGrade as associateGradeStore, shared as store } from '../state/activity-store.js';
import { css, html } from 'lit-element/lit-element';
import { ActivityEditorMixin } from '../mixins/d2l-activity-editor-mixin.js';
import { GradeType } from 'siren-sdk/src/activities/associateGrade/AssociateGradeEntity.js';
import { LocalizeActivityEditorMixin } from '../mixins/d2l-activity-editor-lang-mixin.js';
import { MobxLitElement } from '@adobe/lit-mobx';
import { RtlMixin } from '@brightspace-ui/core/mixins/rtl-mixin.js';

class ActivityEditNewGrade extends ActivityEditorMixin(LocalizeActivityEditorMixin(RtlMixin(MobxLitElement))) {
	static get properties() {
		return {
			_showCategories: { type: Boolean },
			_showTypes: { type: Boolean }
		};
	}

	static get styles() {
		return [
			css`
			:host {
				display: block;
			}
			:host([hidden]),
			[hidden] {
				display: none !important;
			}
			.d2l-activity-grades-dialog-property-buttons {
				display: flex;
				flex-direction: row;
				flex-wrap: wrap;
				margin-left: -0.6rem;
			}
			.d2l-activity-grades-dialog-property-buttons > d2l-button-subtle {
				margin-bottom: 0.9rem;
			}
			:host([dir="rtl"]) .d2l-activity-grades-dialog-property-buttons {
				margin-left: 0;
				margin-right: -0.6rem;
			}
			`
		];
	}

	constructor() {
		super();
		this._showCategories = false;
		this._showTypes = false;
	}

	connectedCallback() {
		super.connectedCallback();
		this.reset();
	}

	render() {
		const associateGradeEntity = associateGradeStore.get(this._associateGradeHref);
		if (!associateGradeEntity || !associateGradeEntity.gradeCategoryCollection || !associateGradeEntity.gradeSchemeCollection) {
			return html``;
		}
		const {
			gradeType,
			schemesIsEmpty,
			gradeCategoryCollection,
			selectedCategoryHref,
			isDefaultSchemeSelected,
			hasSelectboxType
		} = associateGradeEntity;

		const categoriesEmpty = gradeCategoryCollection.gradeCategories.length === 0;

		const defaultCategorySelected = !selectedCategoryHref;
		const defaultGradeTypeSelected = gradeType !== GradeType.Selectbox;

		this._showCategories = this._showCategories || !defaultCategorySelected;
		this._showTypes = this._showTypes || !defaultGradeTypeSelected || !isDefaultSchemeSelected;

		const showChooseCategoryButton = !categoriesEmpty && !this._showCategories;
		const showChangeTypeAndSchemeButton = !schemesIsEmpty && !this._showTypes;

		const showCategorySelector = !categoriesEmpty && this._showCategories;
		const showGradeTypeAndSchemeSelector = !schemesIsEmpty && this._showTypes;

		return html`
		<div class="d2l-activity-grades-dialog-property-buttons">
			<d2l-button-subtle
				?hidden="${!showChooseCategoryButton}"
				text="${this.localize('grades.chooseNewGradeItemCategory')}"
				@click="${this.showCategories}">
			</d2l-button-subtle>
			<d2l-button-subtle
				?hidden="${!showChangeTypeAndSchemeButton}"
				text="${hasSelectboxType ? this.localize('grades.changeNewGradeTypeAndScheme') : this.localize('grades.chooseNewGradeScheme')}"
				@click="${this.showTypes}">
			</d2l-button-subtle>
		</div>
		<d2l-activity-grade-category-selector
			?hidden="${!showCategorySelector}"
			.href="${this.href}"
			.token="${this.token}">
		</d2l-activity-grade-category-selector>
		<d2l-activity-grade-type-scheme-selector
			?hidden="${!showGradeTypeAndSchemeSelector}"
			.href="${this._associateGradeHref}"
			.token="${this.token}">
		</d2l-activity-grade-type-scheme-selector>
		`;
	}
	reset() {
		this._showCategories = false;
		this._showTypes = false;
	}
	showCategories() {
		this._showCategories = true;
	}
	showTypes() {
		this._showTypes = true;
	}
	get _associateGradeHref() {
		const entity = store.get(this.href);
		return entity && entity.associateGradeHref;
	}
}

customElements.define('d2l-activity-edit-new-grade', ActivityEditNewGrade);
