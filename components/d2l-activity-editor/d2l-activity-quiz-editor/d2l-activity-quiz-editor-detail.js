import '@brightspace-ui/core/components/inputs/input-text.js';
import 'd2l-tooltip/d2l-tooltip';
import '../d2l-activity-due-date-editor.js';
import '../d2l-activity-outcomes.js';
import '../d2l-activity-score-editor.js';
import '../d2l-activity-text-editor.js';
import '../d2l-activity-attachments/d2l-activity-attachments-editor.js';

import { css, html } from 'lit-element/lit-element.js';
import { ActivityEditorMixin } from '../mixins/d2l-activity-editor-mixin.js';
import { AsyncContainerMixin } from '@brightspace-ui/core/mixins/async-container/async-container-mixin.js';
import { labelStyles } from '@brightspace-ui/core/components/typography/styles.js';
import { MobxLitElement } from '@adobe/lit-mobx';
import { RtlMixin } from '@brightspace-ui/core/mixins/rtl-mixin.js';
import { SkeletonMixin } from '@brightspace-ui/core/components/skeleton/skeleton-mixin.js';

class QuizEditorDetail extends AsyncContainerMixin(SkeletonMixin((RtlMixin(ActivityEditorMixin(MobxLitElement))))) {

	static get properties() {
		return {
			activityUsageHref: { type: String, attribute: 'activity-usage-href' },
		};
	}

	static get styles() {
		return [
			super.styles,
			labelStyles,
			css`
				:host {
					display: block;
				}
				:host([hidden]) {
					display: none;
				}
				:host > div,
				.d2l-activity-label-container {
					margin-bottom: 8px;
				}
				d2l-icon {
					padding-right: 1rem;
				}
				:host([dir="rtl"]) d2l-icon {
					padding-left: 1rem;
					padding-right: 0;
				}
			`
		];
	}

	constructor() {
		super();
		this.skeleton = false;
	}

	render() {
		const quiz = {}; // TODO: implement new store function

		const {
			name,
			canEditName,
		} = quiz || {};

		return html`
			<div id="assignment-name-container">
			<d2l-input-text
				?skeleton="${this.skeleton}"
				id="assignment-name"
				maxlength="128"
				value="${name}"
				@input="${this._saveNameOnInput}"
				required
				?disabled="${!canEditName}"
				prevent-submit>
			</d2l-input-text>
		`;
	}

}
customElements.define('d2l-activity-quiz-editor-detail', QuizEditorDetail);
