import { bodyCompactStyles, bodySmallStyles, heading3Styles, labelStyles } from '@brightspace-ui/core/components/typography/styles';
import { css, html } from 'lit-element/lit-element';
import { ActivityEditorMixin } from '../mixins/d2l-activity-editor-mixin';
import { LocalizeActivityQuizEditorMixin } from './mixins/d2l-activity-quiz-lang-mixin.js';
import { MobxLitElement } from '@adobe/lit-mobx';
import { selectStyles } from '@brightspace-ui/core/components/inputs/input-select-styles';
import { sharedAttempts as store } from './state/quiz-store';

class ActivityQuizAttemptConditionsEditor extends ActivityEditorMixin(LocalizeActivityQuizEditorMixin(MobxLitElement)) {
	static get properties() {
		return {
			isAttemptConditionsOpen: { type: Boolean, attribute: false }
		};
	}

	static get styles() {
		return [
			bodyCompactStyles,
			bodySmallStyles,
			heading3Styles,
			labelStyles,
			selectStyles,
			css`
				d2l-button-subtle {
					display: flex;
				}
				d2l-input-number {
					margin-left: 2rem;
					margin-right: 2rem;
					width: auto;
				}
				.d2l-attempts-condition-header {
					margin: 0;
				}
				.d2l-attempts-conditions-range-editor {
					align-items: center;
					border-bottom: 1px solid var(--d2l-color-corundum);
					display: flex;
					padding-bottom: 0.8rem;
					padding-top: 0.5rem;
				}
				.d2l-input-number-text {
					margin-left: 0.4rem;
					margin-right: 0.4rem;
				}
				.d2l-input-range-text {
					margin-left: 0;
					margin-right: 0;
				}
			`
		];
	}

	constructor() {
		super(store);
		this.isAttemptConditionsOpen = false;
	}

	render() {
		return html`
		${this.isAttemptConditionsOpen ? html`${this._renderAttemptConditionsEditor()}` :
		html`
			<d2l-button-subtle
				icon="tier1:plus-large"
				text=${this.localize('btnAttemptConditions')}
				@click=${(this._openAttemptConditionsRangeEditor)}>
			</d2l-button-subtle>`}
		`;
	}
	_generateHandler(handler, attemptConditionNumber) {
		return (e) => handler(e, attemptConditionNumber, this);
	}

	_handleChange(e, attemptConditionNumber, ctx) {
		const { name, value } = e.target;
		ctx._setAttemptCondition({
			attempt: attemptConditionNumber,
			[name]: value
		});
	}

	_openAttemptConditionsRangeEditor() {
		this.isAttemptConditionsOpen = !this.isAttemptConditionsOpen;
	}

	_renderAttemptConditionsEditor() {
		return html`
			<div class="d2l-heading-3 d2l-attempts-condition-header">${this.localize('attemptConditions')}</div>
			<p class="d2l-body-compact">${this.localize('attemptConditionsParagraph1')}</p>
			<p class="d2l-body-compact">${this.localize('attemptConditionsParagraph2')}</p>
			${this._renderAttemptConditionsRangeEditor()}
		`;
	}

	_renderAttemptConditionsRangeEditor() {
		const entity = store.get(this.href);
		if (!entity) {
			return html``;
		}

		const {
			attemptsAllowed,
			attemptConditions,
			canUpdateAttemptConditions
		} = entity || {};

		if (!attemptConditions || attemptsAllowed < 2) return html``;

		return html` ${attemptConditions.map((ac) => {
			const { attempt, min, max } = ac.properties;
			if (attempt > attemptsAllowed || attempt < 2) {
				return; // don't render extra attempt conditions
			}
			const index = attempt - 1;
			const next = attempt;
			return html`
				<div class="d2l-attempts-conditions-range-editor">
					<div>
						<div class="d2l-label-text">${this.localize('attemptConditionsRangePrefixText1', { index })}</div>
						<div class="d2l-body-small">${this.localize('attemptConditionsRangePrefixText2')}</div>
					</div>
					<d2l-input-number
						label="${this.localize('minLabel')}"
						value="${min || null}"
						min=0
						max=100
						name="min"
						?disabled=${canUpdateAttemptConditions}
						input-width=3.5rem
						@change=${this._generateHandler(this._handleChange, attempt)}
						>
						<div slot="after">
							<span class="d2l-label-text d2l-input-number-text">${this.localize('percentageRangeText')}</span>
						</div>
					</d2l-input-number>
					<div class="d2l-body-small d2l-input-range-text">${this.localize('andRangeText')}</div>
					<d2l-input-number
						label="${this.localize('maxLabel')}"
						value="${max || null}"
						min=0
						max=100
						name="max"
						?disabled=${canUpdateAttemptConditions}
						input-width=3.5rem
						@change=${this._generateHandler(this._handleChange, attempt)}
						>
						<div slot="after">
							<span class="d2l-label-text d2l-input-number-text">${this.localize('percentageRangeText')}</span>
						</div>
					</d2l-input-number>
					<div>
						<div class="d2l-body-small">${this.localize('attemptConditionsRangeSuffixText1')}</div>
						<div class="d2l-label-text">${this.localize('attemptConditionsRangeSuffixText2', { next })}</div>
					</div>
				</div>
			`;})}
		`;
	}

	_setAttemptCondition(data) {
		const entity = store.get(this.href);
		entity && entity.setAttemptCondition(data);
	}

}

customElements.define(
	'd2l-activity-quiz-attempt-conditions-editor',
	ActivityQuizAttemptConditionsEditor
);
