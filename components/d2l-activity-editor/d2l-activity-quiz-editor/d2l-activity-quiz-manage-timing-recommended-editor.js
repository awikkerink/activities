import '@brightspace-ui/core/components/inputs/input-number.js';
import { css, html } from 'lit-element/lit-element.js';
import { ActivityEditorMixin } from '../mixins/d2l-activity-editor-mixin.js';
import { AsyncContainerMixin } from '@brightspace-ui/core/mixins/async-container/async-container-mixin.js';
import { inputLabelStyles } from '@brightspace-ui/core/components/inputs/input-label-styles.js';
import { labelStyles } from '@brightspace-ui/core/components/typography/styles.js';
import { LocalizeActivityQuizEditorMixin } from './mixins/d2l-activity-quiz-lang-mixin';
import { MobxLitElement } from '@adobe/lit-mobx';
import { radioStyles } from '@brightspace-ui/core/components/inputs/input-radio-styles.js';
import { selectStyles } from '@brightspace-ui/core/components/inputs/input-select-styles';
import { SkeletonMixin } from '@brightspace-ui/core/components/skeleton/skeleton-mixin.js';
import { sharedTiming as store } from './state/quiz-store';

class ActivityQuizManageTimingRecommendedEditor extends AsyncContainerMixin(LocalizeActivityQuizEditorMixin(SkeletonMixin(ActivityEditorMixin(MobxLitElement)))) {
	static get styles() {
		return [
			super.styles,
			inputLabelStyles,
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
				.d2l-input-number-label {
					margin-left: 0.2rem;
					margin-right: 0.2rem;
				}
				.d2l-time-menu-container {
					margin-left: 1.7rem;
					margin-right: 1.7rem;
				}
				.d2l-time-enforcement-input-container {
					display: flex;
					flex-direction: row;
					margin-bottom: 0.8rem;
				}
				.d2l-italic-label {
					font-size: 0.8rem;
					font-style: italic;
				}
			`,
		];
	}

	constructor() {
		super(store);
	}

	render() {
		const entity = store.get(this.href);
		if (!entity) {
			return html``;
		}
		return html`
		 ${this._renderRecommendedTimeLimitEditor(entity)}`;
	}

	_renderRecommendedTimeLimitEditor(entity) {
		const {
			showClock,
			recommendedTimeLimit
		} = entity || {};
		// TODO: remove constant min/max
		const hideMinutesLabel = true;
		return html`
			<div class="d2l-time-menu-container">
				<div class="d2l-time-enforcement-input-container">
					<d2l-input-number
						label=${this.localize('minutesLabel')}
						title=${this.localize('minutesLabel')}
						?label-hidden=${hideMinutesLabel}
						value=${recommendedTimeLimit}
						min=1
						max=9999
						@change=${this._setTimeLimit}>
						<div slot="after">
							<span class="d2l-input-number-label">${this.localize('minutesLabel')}</span>
						</div>
					</d2l-input-number>
				</div>
					<label>
						<span class="d2l-italic-label">${this.localize('showClockLabel')}</span>
						<d2l-input-checkbox ?checked=${showClock}>${this.localize('showClockTitle')}</d2l-input-checkbox>
					</label>
				</div>
			</div>
		`;
	}

	// TODO: handle min/max inputs
	_setTimeLimit(e) {
		const entity = store.get(this.href);
		const data = e.target.value;
		entity && entity.setTimeLimit(data);
	}
}

customElements.define(
	'd2l-activity-quiz-manage-timing-recommended-editor',
	ActivityQuizManageTimingRecommendedEditor
);
