import { shared as activityStore, sharedAssociateGrade as associateGradeStore } from '../state/activity-store.js';
import { ActivityEditorMixin } from '../mixins/d2l-activity-editor-mixin';
import { GradebookStatus } from 'siren-sdk/src/activities/associateGrade/AssociateGradeEntity.js';
import { html } from 'lit-element/lit-element';
import { LocalizeActivityQuizEditorMixin } from './mixins/d2l-activity-quiz-lang-mixin.js';
import { MobxLitElement } from '@adobe/lit-mobx';
import { shared as store } from './state/quiz-store';

class ActivityQuizSyncGradebookSummary
	extends ActivityEditorMixin(LocalizeActivityQuizEditorMixin(MobxLitElement)) {

	static get properties() {
		return {
			quizHref: { type: String }
		};
	}

	constructor() {
		super(activityStore);
		this.checkoutOnLoad = true; // this is for the activityUsage, not the quiz
	}

	render() {
		const quizEntity = store.get(this.quizHref);
		const activityEntity = activityStore.get(this.checkedOutHref);

		if (!quizEntity || !activityEntity) {
			return html``;
		}

		const associateGradeEntity = associateGradeStore.get(activityEntity.associateGradeHref);

		const gradebookStatus = associateGradeEntity && associateGradeEntity.gradebookStatus;
		const isSyncGradebookEnabled = quizEntity.isSyncGradebookEnabled;

		if (!isSyncGradebookEnabled || gradebookStatus === GradebookStatus.NotInGradebook) {
			return html``;
		}

		return html`${this.localize('syncGradebookSummary')}`;
	}

	updated(changedProperties) {
		super.updated(changedProperties);
		if ((changedProperties.has('quizHref') || changedProperties.has('token')) &&
			this.quizHref && this.token) {

			this.store && this._fetch(async() => {
				return this.store.fetch(this.quizHref, this.token);
			});
		}
	}
}

customElements.define(
	'd2l-activity-quiz-sync-gradebook-summary',
	ActivityQuizSyncGradebookSummary
);
