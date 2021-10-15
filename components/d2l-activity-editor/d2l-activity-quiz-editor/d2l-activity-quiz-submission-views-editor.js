import './d2l-activity-quiz-submission-views-dialog-card.js';
import { ActivityEditorDialogMixin } from '../mixins/d2l-activity-editor-dialog-mixin.js';
import { ActivityEditorMixin } from '../mixins/d2l-activity-editor-mixin.js';
import { html } from 'lit-element/lit-element.js';
import { LocalizeActivityQuizEditorMixin } from './mixins/d2l-activity-quiz-lang-mixin';
import { MobxLitElement } from '@adobe/lit-mobx';
import { RtlMixin } from '@brightspace-ui/core/mixins/rtl-mixin.js';
import { sharedSubmissionViews as store } from './state/quiz-store';

class ActivityQuizSubmissionViewsEditor
	extends ActivityEditorMixin(RtlMixin(ActivityEditorDialogMixin(LocalizeActivityQuizEditorMixin(MobxLitElement)))) {

	static get properties() {
		return {
			quizHref: {
				attribute: 'quiz-href',
				reflect: true,
				type: String
			},
			dialogInEditState: {
				type: Boolean
			}
		};
	}

	constructor() {
		super(store);
	}

	connectedCallback() {
		super.connectedCallback();
		this.addEventListener('d2l-activity-quiz-submission-views-dialog-edit-start', this._onEnteringEditState);
		this.addEventListener('d2l-activity-quiz-submission-views-dialog-edit-end', this._onEndingEditState);
	}

	disconnectedCallback() {
		super.disconnectedCallback();
		this.removeEventListener('d2l-activity-quiz-submission-views-dialog-edit-start', this._onEnteringEditState);
		this.removeEventListener('d2l-activity-quiz-submission-views-dialog-edit-end', this._onEndingEditState);
	}

	render() {
		const entity = store.get(this.href);
		if (!entity) {
			return html``;
		}

		return html`
			${this._renderDescriptionText()}
			${this._renderCards(entity)}
		`;
	}

	_onEnteringEditState() {
		this.dialogInEditState = true;
	}

	_onEndingEditState() {
		this.dialogInEditState = false;
	}

	_renderCards(entity) {
		const linkedSubmissionViews = entity && entity.linkedSubmissionViews;
		if (!linkedSubmissionViews) return html``;

		return html`
			${linkedSubmissionViews.map(view => html`
				<d2l-activity-quiz-submission-views-dialog-card
					href="${view.href}"
					quiz-href="${this.quizHref}"
					?dialog-in-edit-state="${this.dialogInEditState}"
					.token="${this.token}">
				</d2l-activity-quiz-submission-views-dialog-card>
			`)}
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
}

customElements.define(
	'd2l-activity-quiz-submission-views-editor',
	ActivityQuizSubmissionViewsEditor
);
