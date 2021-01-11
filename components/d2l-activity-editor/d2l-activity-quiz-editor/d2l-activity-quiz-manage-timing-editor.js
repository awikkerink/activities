import './d2l-activity-quiz-manage-timing-container';
import '@brightspace-ui/core/components/inputs/input-number.js';
import { css, html } from 'lit-element/lit-element.js';
import { ActivityEditorFeaturesMixin } from '../mixins/d2l-activity-editor-features-mixin.js';
import { ActivityEditorMixin } from '../mixins/d2l-activity-editor-mixin.js';
import { AsyncContainerMixin } from '@brightspace-ui/core/mixins/async-container/async-container-mixin.js';
import { labelStyles } from '@brightspace-ui/core/components/typography/styles.js';
import { LocalizeActivityQuizEditorMixin } from './mixins/d2l-activity-quiz-lang-mixin';
import { MobxLitElement } from '@adobe/lit-mobx';
import { radioStyles } from '@brightspace-ui/core/components/inputs/input-radio-styles.js';
import { selectStyles } from '@brightspace-ui/core/components/inputs/input-select-styles';
import { SkeletonMixin } from '@brightspace-ui/core/components/skeleton/skeleton-mixin.js';
import { sharedTiming as store } from './state/quiz-store';

class ActivityQuizManageTimingEditor extends AsyncContainerMixin(
	LocalizeActivityQuizEditorMixin(
		SkeletonMixin(
			ActivityEditorFeaturesMixin(ActivityEditorMixin(MobxLitElement))
		)
	)
) {
	static get styles() {
		return [
			super.styles,
			labelStyles,
			radioStyles,
			selectStyles,
			css`
				d2l-input-checkbox {
					margin-top: 0.9rem;
				}
				d2l-input-number {
					width: auto;
				}
				.d2l-input-radio-label {
					padding-right: 1rem;
				}
				.d2l-input-radio-label:last-of-type {
					margin-bottom: 0.9rem;
				}
				.d2l-input-number-label {
					margin-left: 0.2rem;
					margin-right: 0.2rem;
				}
				.d2l-time-menu-container {
					margin: 1rem;
				}
				.d2l-time-enforcement-input-container {
					display: flex;
					flex-direction: row;
					margin-bottom: 0.8rem;
				}
				.d2l-timing-option-container {
					display: flex;
					flex-direction: row;
				}
				.d2l-italic-label {
					font-size: 0.8rem;
					font-style: italic;
				}
				.d2l-extended-deadline-container {
					margin-left: 1.7rem;
					margin-right: 1.7rem;
				}
			`,
		];
	}

	constructor() {
		super(store);
	}

	render() {
		const timeEnforced = true;
		return html`
			${this._renderTimeEnforcementOptions()}
			${timeEnforced
		? html`${this._renderTimeEnforcedMenu()}`
		: html`${this._renderRecommendedTimeLimitMenu()}`}
		`;
	}

	_renderExtendedDeadline() {
		const deadlineOptions = ['1', '5', '10', '15', '30', '45', '60', '120'];
		return html`
			<div class="d2l-extended-deadline-container">
				<label class="d2l-label-text">Extended Deadline</label>
				<div>
					<select class="d2l-input-select">
						${deadlineOptions.map(
		(min) => html`<option>${min}</option>`
	)}
					</select>
					<label class="d2l-input-number-label"
						>minute(s) after the Grace Period ends</label
					>
				</div>
			</div>
		`;
	}

	_renderRecommendedTimeLimitMenu() {
		const hidden = true;
		return html`
			<div class="d2l-time-menu-container">
				<div class="d2l-time-enforcement-input-container">
					<d2l-input-number
						label="minute(s)"
						title="minutes(s)"
						?label-hidden=${hidden}
						value="120"
						min="1"
						max="9999"
					>
						<label class="d2l-input-number-label" slot="after"
							>minute(s)</label
						>
					</d2l-input-number>
				</div>
				<label class="d2l-italic-label"
					>Will be displayed before the quiz starts</label
				>
				<d2l-input-checkbox>Show clock</d2l-input-checkbox>
			</div>
		`;
	}
	_renderTimeEnforcedMenu() {
		const timeEnforcmentLabels = [
			'Allow the learner to continue working',
			'Prevent the learner from making further changes',
			'Allow the learner to continue working, but automatically score the attempt as zero after an extended deadline.',
		];
		const showExtendedDeadline = true;
		return html`
			<div class="d2l-time-menu-container">
				<div class="d2l-time-enforcement-input-container">
					<d2l-input-number
						label="Time Limit"
						title="Time Limit"
						value="120"
						min="1"
						max="9999"
						><label class="d2l-input-number-label" slot="after"
							>minute(s)</label
						></d2l-input-number
					>

					<d2l-input-number
						label="Grace Period"
						title="Time Limit"
						value="5"
						min="1"
						><label class="d2l-input-number-label" slot="after"
							>minute(s) before flagged as exceeded time
							limit</label
						></d2l-input-number
					>
				</div>

				<label class="d2l-label-text"
					>Exceeded Time Limit Behaviour</label
				>
				<div>
					<label class="d2l-italic-label"
						>After the grace period, flag the quiz attempt as
						exceeded time limit and,</label
					>
				</div>

				${timeEnforcmentLabels.map(
		(label, i) =>
			html`<label class="d2l-input-radio-label"
							><input
								type="radio"
								name="exceededTimeBehaviour"
								?checked=${i === 0}
							/>${label}</label
						>`
	)}
				${showExtendedDeadline
		? html`${this._renderExtendedDeadline()}`
		: null}
			</div>
		`;
	}
	_renderTimeEnforcementOptions() {
		const entity = store.get(this.href);
		if (!entity) {
			return html``;
		}

		const {
			canEditTiming,
			timingTypes
		} = entity || {};

		return canEditTiming ? html`
			<div class="d2l-timing-option-container">
				${timingTypes.map(
		(type) =>
			html`<label class="d2l-input-radio-label"
							><input
								type="radio"
								name="timeEnforcement"
								?checked=${type.selected}
								@change="${this._setTimingType}"
								value="${type.value}"
							/>${type.title}</label
						>`
	)}
			</div>
		` : html``;
	}

	_setTimingType(e) {
		const entity = store.get(this.href);
		const data = e.target.value;
		entity && entity.setTimingType(data);
	}
}

customElements.define(
	'd2l-activity-quiz-manage-timing-editor',
	ActivityQuizManageTimingEditor
);
