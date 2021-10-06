import { ActivityEditorDialogMixin } from '../mixins/d2l-activity-editor-dialog-mixin.js';
import { ActivityEditorMixin } from '../mixins/d2l-activity-editor-mixin.js';
import { html } from 'lit-element/lit-element.js';
import { LocalizeActivityQuizEditorMixin } from './mixins/d2l-activity-quiz-lang-mixin';
import { MobxLitElement } from '@adobe/lit-mobx';
import { RtlMixin } from '@brightspace-ui/core/mixins/rtl-mixin.js';
import { sharedSubmissionViews as store } from './state/quiz-store';

class ActivityQuizSubmissionViewsEditor
	extends ActivityEditorMixin(RtlMixin(ActivityEditorDialogMixin(LocalizeActivityQuizEditorMixin(MobxLitElement)))) {

	constructor() {
		super(store);
	}

	render() {
		const entity = store.get(this.href);
		if (!entity) {
			return html``;
		}

		return html`
			${this._renderDescriptionText()}
			${this._temporarilyRenderEverything(entity)}
		`;
	}

	_renderDescriptionText() {
		return html`
			<div>
				<label>${this.localize('submissionViewHeading1')}</label>
				<d2l-button-icon
					icon="tier1:help"
					@click="${this.open}">
				</d2l-button-icon>
				${this._renderHelpDialog()}
			</div>
		`;
	}

	_renderHelpDialog() {
		const width = 900;
		return html`
			<d2l-dialog
				?opened="${this.opened}"
				width="${width}"
				@d2l-dialog-close="${this.handleClose}"
				title-text="${this.localize('submissionViewsHelpDialogTitle')}">
				<div>
					<p>${this.localize('submissionViewsHelpDialogParagraph1')}</p>
					<p>${this.localize('submissionViewsHelpDialogParagraph2')}</p>
				</div>
				<d2l-button
					data-dialog-action
					slot="footer"
					primary>
					${this.localize('submissionViewsHelpDialogConfirmation')}
				</d2l-button>
			</d2l-dialog>
		`;
	}

	_temporarilyRenderEverything(entity) {
		const submissionViews = entity && entity.submissionViews;
		if (!submissionViews) return html``;

		return html`
			${submissionViews.map(view => {
				const { isPrimaryView } = view;
				return html`<p>isPrimaryView: ${isPrimaryView}</p>`;
			})}
		`;
	}
}

customElements.define(
	'd2l-activity-quiz-submission-views-editor',
	ActivityQuizSubmissionViewsEditor
);
