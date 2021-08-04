import './d2l-activity-quiz-editor-detail.js';
import './d2l-activity-quiz-editor-secondary.js';
import '../d2l-activity-editor.js';
import { ActivityEditorMixin } from '../mixins/d2l-activity-editor-mixin.js';
import { AsyncContainerMixin } from '@brightspace-ui/core/mixins/async-container/async-container-mixin.js';
import { html } from 'lit-element/lit-element.js';
import { LocalizeActivityQuizEditorMixin } from './mixins/d2l-activity-quiz-lang-mixin';
import { MobxLitElement } from '@adobe/lit-mobx';
import { RtlMixin } from '@brightspace-ui/core/mixins/rtl-mixin.js';
import { shared as store } from '../state/activity-store.js';

class QuizEditor extends AsyncContainerMixin(RtlMixin(LocalizeActivityQuizEditorMixin(ActivityEditorMixin(MobxLitElement)))) {

	static get properties() {
		return {
			/**
			 * True if the user's settings allow for rendering the WYSIWYG HTML editor
			 */
			htmlEditorEnabled: { type: Boolean },
			/**
			 * True if the new html editor config is on
			 */
			htmlNewEditorEnabled: { type: Boolean },
			/**
			* Set the WidthType on the template to constrain page width if necessary
			*/
			widthType: { type: String, attribute: 'width-type' },
			/**
			 * Is Creating New
			 */
			isNew: { type: Boolean },
			newActivityHrefs: { type: Array }
		};
	}

	constructor() {
		super();

		const telemetrySourceId = 'quiz';

		this.type = telemetrySourceId;
		this.telemetryId = 'quiz';
		this.newActivityHrefs = [];
	}

	render() {
		return html`
			<d2l-activity-editor
				type="${this.type}"
				telemetryId="${this.telemetryId}"
				.href=${this.href}
				.token=${this.token}
				width-type="${this.widthType}"
				error-term="${this.localize('quizSaveError')}"
				?isnew="${this.isNew}"
				?html-editor-enabled="${this.htmlEditorEnabled}"
				?html-new-editor-enabled="${this.htmlNewEditorEnabled}"
				@d2l-question-updated="${this._handleQuestionUpdated}"
				@d2l-question-activity-add-start="${this._onActivityAddStart}"
				@d2l-question-activity-add-complete="${this._refreshTotalPoints}"
				@d2l-question-activity-deleted="${this._refreshTotalPoints}"
				resizable>

				${this._editorTemplate}

			</d2l-activity-editor>
		`;
	}

	get _editorTemplate() {
		const activity = store.get(this.href);
		const {
			specializationHref
		} = activity || {};

		return html`
			<slot name="editor-nav" slot="header"></slot>
			<div slot="primary">
				<d2l-activity-quiz-editor-detail
					activity-usage-href=${this.href}
					.newactivityhrefs=${this.newActivityHrefs}
					.href="${specializationHref}"
					.token="${this.token}">
				</d2l-activity-quiz-editor-detail>
			</div>
			<div slot="secondary">
				<d2l-activity-quiz-editor-secondary
					.href="${specializationHref}"
					.token="${this.token}"
					activity-usage-href="${this.href}">
				</d2l-activity-quiz-editor-secondary>
			</div>
		`;
	}

	_getActivityHrefs(e) {
		if (e && e.detail && e.detail.activities && e.detail.activities.length) {
			return e.detail.activities;
		}
	}

	async _handleQuestionUpdated(e) {
		// If new questions were created via "Save & New/Copy", the hrefs for those new questions will be on the event.
		const hrefs = this._getActivityHrefs(e);
		if (hrefs) {
			this.newActivityHrefs = [...hrefs];
		} else {
			this._refreshTotalPoints();
		}
	}

	async _onActivityAddStart(e) {
		const hrefs = this._getActivityHrefs(e);
		if (hrefs) {
			this.newActivityHrefs = [...hrefs];
		}
	}

	_refreshTotalPoints() {
		const activity = store.get(this.href);
		if (activity) {
			activity.fetchScoreAndGradeScoreOutOf(true);
		}
	}
}
customElements.define('d2l-activity-quiz-editor', QuizEditor);
