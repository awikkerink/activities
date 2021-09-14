import { sharedAssociateGrade as associateGradeStore, shared as store } from '../state/activity-store.js';
import { css, html } from 'lit-element/lit-element';
import { formatNumber, formatPercent } from '@brightspace-ui/intl/lib/number.js';
import { ActivityEditorMixin } from '../mixins/d2l-activity-editor-mixin.js';
import { bodySmallStyles } from '@brightspace-ui/core/components/typography/styles.js';
import { LocalizeActivityEditorMixin } from '../mixins/d2l-activity-editor-lang-mixin.js';
import { MobxLitElement } from '@adobe/lit-mobx';
import { selectStyles } from '@brightspace-ui/core/components/inputs/input-select-styles';

class ActivityGradeCandidateSelector extends ActivityEditorMixin(LocalizeActivityEditorMixin(MobxLitElement)) {
	static get properties() {
		return {
			_createSelectboxGradeItemEnabled: { type: Boolean }
		};
	}

	static get styles() {
		return [
			bodySmallStyles,
			selectStyles,
			css`
			:host {
				display: block;
			}

			.d2l-activity-grade-candidate-selector-points-and-weight {
				padding-top: 7px;
			}
			.d2l-grade-candidate-selector-select {
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

		this._createSelectboxGradeItemEnabled = typeof this._createSelectboxGradeItemEnabled === 'undefined' || event.detail.provider;
	}

	render() {
		const gradeCandidateCollection = this._gradeCandidateCollection;
		if (!gradeCandidateCollection) {
			return html``;
		}

		const {
			gradeCandidates,
			selected
		} = gradeCandidateCollection;

		const formatNumberOptions = { maximumFractionDigits: 2 };
		const formattedPoints = selected && selected.maxPoints !== undefined ? formatNumber(selected.maxPoints, formatNumberOptions) : '';
		const formattedWeight = selected && selected.baseWeight !== undefined ? formatPercent(selected.baseWeight / 100, formatNumberOptions) : '';

		return html`
			<select
				aria-label="${this.localize('grades.gradeItem')}"
				id="grade-candidates"
				class="d2l-input-select d2l-grade-candidate-selector-select"
				@change="${this._setSelected}"
			>
				${this._renderGradeCandidateTemplates(gradeCandidates, selected)}
			</select>
			<div class="d2l-body-small d2l-activity-grade-candidate-selector-points-and-weight">
				${formattedPoints ? html`${this.localize('grades.points', { points: formattedPoints })}` : ''}
				${formattedWeight ? html`• ${this.localize('grades.weight', { weight: formattedWeight })}` : ''}
			</div>
		`;
	}

	get _gradeCandidateCollection() {
		const activity = store.get(this.href);
		if (!activity) return null;

		let gradeCandidateCollection = null;
		if (this._createSelectboxGradeItemEnabled) {
			const associateGradeEntity = activity.associateGradeHref && associateGradeStore.get(activity.associateGradeHref);
			gradeCandidateCollection = associateGradeEntity && associateGradeEntity.gradeCandidateCollection;
		} else {
			gradeCandidateCollection = activity.scoreAndGrade && activity.scoreAndGrade.gradeCandidateCollection;
		}

		return gradeCandidateCollection;
	}

	_renderGradeCandidate(gc, selected) {
		return html`<option value="${gc.href}" .selected="${selected && gc.href === selected.href}">${gc.name}</option>`;
	}

	_renderGradeCandidateTemplates(gradeCandidates, selected) {
		return gradeCandidates.map(gc => {
			if (gc.isCategory) {
				return this._renderGradeCategory(gc, selected);
			} else {
				return this._renderGradeCandidate(gc, selected);
			}
		});
	}

	_renderGradeCategory(gradeCategory, selected) {
		return html`
			<optgroup label="${gradeCategory.name}">
				${gradeCategory.gradeCandidates.map(gc => this._renderGradeCandidate(gc, selected))}
			</optgroup>
		`;
	}

	_setSelected(event) {
		if (event && event.target && event.target.value) {
			const gradeCandidateCollection = this._gradeCandidateCollection;
			const storeForAssociateGrade = this._createSelectboxGradeItemEnabled ? associateGradeStore : null;
			gradeCandidateCollection && gradeCandidateCollection.setSelected(event.target.value, storeForAssociateGrade);
		}
	}
}

customElements.define('d2l-activity-grade-candidate-selector', ActivityGradeCandidateSelector);
