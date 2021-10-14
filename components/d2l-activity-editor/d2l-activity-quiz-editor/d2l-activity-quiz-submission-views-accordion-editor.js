import './d2l-activity-quiz-submission-views-accordion-editor-tile.js';
import { css, html } from 'lit-element/lit-element.js';
import { ActivityEditorMixin } from '../mixins/d2l-activity-editor-mixin.js';
import { labelStyles } from '@brightspace-ui/core/components/typography/styles.js';
import { LocalizeActivityQuizEditorMixin } from './mixins/d2l-activity-quiz-lang-mixin';
import { MobxLitElement } from '@adobe/lit-mobx';
import { RtlMixin } from '@brightspace-ui/core/mixins/rtl-mixin.js';
import { sharedSubmissionViews as store } from './state/quiz-store';

class ActivityQuizSubmissionViewsAccordionEditor
	extends ActivityEditorMixin(RtlMixin(LocalizeActivityQuizEditorMixin(MobxLitElement))) {

	static get styles() {
		return [
			labelStyles,
			css`
				.d2l-label-text {
					padding-bottom: 10px;
				}
			`
		];
	}

	constructor() {
		super(store);
	}

	render() {
		const entity = store.get(this.href);
		if (!entity) return html``;

		const linkedSubmissionViews = entity.linkedSubmissionViews;
		if (!linkedSubmissionViews) return html``;

		return html`
			<div class="d2l-label-text">
				${this.localize('submissionViewHeading1')}
			</div>
			${linkedSubmissionViews.map(view => html`${this._renderSubmissionView(view)}`)}
		`;

	}

	_onTileRemoved(e) {
		if (!e || !e.target || !e.target.href) return;

		const views = store.get(this.href);

		// Optimistic UI - Remove view from collection
		views && views.removeView(e.target.href);
	}

	_renderSubmissionView(view) {
		return html`
			<d2l-activity-quiz-submission-views-accordion-editor-tile
				href="${view.href}"
				.token="${this.token}"
				@d2l-activity-quiz-submission-views-accordion-editor-tile-removed="${this._onTileRemoved}">
			</d2l-activity-quiz-submission-views-accordion-editor-tile>
		`;
	}
}

customElements.define(
	'd2l-activity-quiz-submission-views-accordion-editor',
	ActivityQuizSubmissionViewsAccordionEditor
);
