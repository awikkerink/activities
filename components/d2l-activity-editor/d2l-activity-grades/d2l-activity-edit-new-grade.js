import './d2l-activity-grade-category-selector.js';
import './d2l-activity-grade-type-scheme-selector.js';
import { css, html } from 'lit-element/lit-element';
import { ActivityEditorMixin } from '../mixins/d2l-activity-editor-mixin.js';
import { LocalizeActivityEditorMixin } from '../mixins/d2l-activity-editor-lang-mixin.js';
import { MobxLitElement } from '@adobe/lit-mobx';
import { RtlMixin } from '@brightspace-ui/core/mixins/rtl-mixin.js';

class ActivityEditNewGrade extends ActivityEditorMixin(LocalizeActivityEditorMixin(RtlMixin(MobxLitElement))) {
	static get properties() {
		return {
			associateGradeHref: { type: String, attribute: 'associate-grade-href' },
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
				justify-content: space-between;
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
		return html`
		<div class="d2l-activity-grades-dialog-property-buttons">
			<d2l-button-subtle
				?hidden="${this._showCategories}"
				text="${this.localize('grades.chooseNewGradeItemCategory')}"
				@click="${this.showCategories}">
			</d2l-button-subtle>
			<d2l-button-subtle
				?hidden="${this._showTypes}"
				text="${this.localize('grades.changeNewGradeTypeAndScheme')}"
				@click="${this.showTypes}">
			</d2l-button-subtle>
		</div>
		<d2l-activity-grade-category-selector
			?hidden="${!this._showCategories}"
			.href="${this.href}"
			.token="${this.token}">
		</d2l-activity-grade-category-selector>
		<d2l-activity-grade-type-scheme-selector
			?hidden="${!this._showTypes}"
			.href="${this.associateGradeHref}"
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
}

customElements.define('d2l-activity-edit-new-grade', ActivityEditNewGrade);
