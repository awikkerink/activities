import '@brightspace-ui/core/components/dialog/dialog.js';
import { css, html } from 'lit-element/lit-element.js';
import { ActivityEditorWorkingCopyDialogMixin } from '../mixins/d2l-activity-editor-working-copy-dialog-mixin';
import { checkboxStyles } from '../styles/checkbox-styles.js';
import { labelStyles } from '@brightspace-ui/core/components/typography/styles.js';
import { LocalizeActivityQuizEditorMixin } from './mixins/d2l-activity-quiz-lang-mixin';
import { MobxLitElement } from '@adobe/lit-mobx';
import { RtlMixin } from '@brightspace-ui/core/mixins/rtl-mixin.js';
import { selectStyles } from '@brightspace-ui/core/components/inputs/input-select-styles.js';
import { shared as store } from './state/quiz-store';

class ActivityQuizSubmissionViewsContainer
	extends ActivityEditorWorkingCopyDialogMixin(RtlMixin(LocalizeActivityQuizEditorMixin(MobxLitElement))) {

	static get styles() {
		return [
			labelStyles,
			selectStyles,
			checkboxStyles,
			css`
				.d2l-label-text {
					padding-bottom: 10px;
				}

				#button_with_padding {
					padding-top: 5px;
				}
			`
		];
	}

	constructor() {
		super(store);
	}

	render() {
		return html`
			<div class="d2l-label-text">
				${this.localize('submissionViewHeading1')}
			</div>

			<d2l-input-checkbox 
				?checked=""
				@change=""
				ariaLabel="${this.localize('submissionViewCheckboxLabel')}"
				?disabled="">
				${this.localize('submissionViewCheckboxLabel')}
			</d2l-input-checkbox>

			<div class="d2l-label-text">
				${this.localize('submissionViewHeading2')}
			</div>

			<div>
				<select
					id="submission-view-editor"
					class="d2l-input-select d2l-block-select"
					@change="">

					<option value="">API Placeholder 1</option>
					<option value="">API Placeholder 2</option>
				</select>
			</div>

			<div>
				<d2l-button-subtle
					id="button_with_padding"
					text=${this.localize('submissionViewButtonText')}
					@click=""
					h-align="text">
				</d2l-button-subtle>
			</div>     
		`;
	}
}

customElements.define(
	'd2l-activity-quiz-submission-views-container',
	ActivityQuizSubmissionViewsContainer
);
