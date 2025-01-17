import '../shared-components/d2l-activity-content-editor-title.js';
import './d2l-activity-content-scorm-activity-display-options.js';
import './d2l-activity-content-scorm-external-activity.js';
import { shared as activityStore, sharedScoring as scoringStore } from '../../state/activity-store.js';
import { AsyncContainerMixin, asyncStates } from '@brightspace-ui/core/mixins/async-container/async-container-mixin.js';
import { css, html } from 'lit-element/lit-element.js';
import { activityContentEditorStyles } from '../shared-components/d2l-activity-content-editor-styles';
import { ActivityEditorMixin } from '../../mixins/d2l-activity-editor-mixin.js';
import { ContentScormActivityEntity } from 'siren-sdk/src/activities/content/ContentScormActivityEntity.js';
import { shared as contentScormActivityStore } from './state/content-scorm-activity-store.js';
import { editorLayoutStyles } from '../../styles/activity-editor-styles.js';
import { EntityMixinLit } from 'siren-sdk/src/mixin/entity-mixin-lit.js';
import { ErrorHandlingMixin } from '../../error-handling-mixin.js';
import { labelStyles } from '@brightspace-ui/core/components/typography/styles.js';
import { LocalizeActivityEditorMixin } from '../../mixins/d2l-activity-editor-lang-mixin.js';
import { MobxLitElement } from '@adobe/lit-mobx';
import { RtlMixin } from '@brightspace-ui/core/mixins/rtl-mixin.js';
import { SkeletonMixin } from '@brightspace-ui/core/components/skeleton/skeleton-mixin.js';

class ContentScormActivityDetail extends AsyncContainerMixin(SkeletonMixin(ErrorHandlingMixin(LocalizeActivityEditorMixin(EntityMixinLit(RtlMixin(ActivityEditorMixin(MobxLitElement))))))) {

	static get properties() {
		return {
			activityUsageHref: { type: String },
			scoreEditorLoading: { type: Boolean }
		};
	}

	static get styles() {
		return [
			super.styles,
			labelStyles,
			activityContentEditorStyles,
			editorLayoutStyles,
			css`
				.d2l-activity-label-container {
					margin-bottom: 8px;
				}
				d2l-activity-content-external-activity {
					margin-top: 36px;
				}
				#score-and-duedate-container {
					display: flex;
					flex-wrap: wrap;
					padding-bottom: 0;
				}
				#score-container {
					margin-right: 40px;
				}
				:host([dir="rtl"]) #score-container {
					margin-left: 40px;
					margin-right: 0;
				}
				.d2l-grade-type-text {
					margin: 0 0.75rem 0 0.2rem;
				}
				:host([dir="rtl"]) .d2l-grade-type-text {
					margin: 0 0.2rem 0 0.75rem;
				}
			`
		];
	}

	constructor() {
		super(contentScormActivityStore);
		this.skeleton = true;
		this.scoreEditorLoading = true;
		this._setEntityType(ContentScormActivityEntity);
	}

	connectedCallback() {
		super.connectedCallback();
		const event = new CustomEvent('d2l-request-provider', {
			detail: { key: 'd2l-provider-create-selectbox-grade-item-enabled' },
			bubbles: true,
			composed: true,
			cancelable: true
		});
		this.dispatchEvent(event);

		this._createSelectboxGradeItemEnabled = typeof this._createSelectboxGradeItemEnabled === 'undefined' || event.detail.provider;

		this.saveTitle = this.saveTitle.bind(this);
		this.saveLinkOptions = this.saveLinkOptions.bind(this);
		this.saveGradeOptions = this.saveGradeOptions.bind(this);
	}

	render() {
		const scormActivityEntity = contentScormActivityStore.getContentScormActivity(this.href);

		let title = '';
		let entityTitle = '';
		let subTitle = null;

		if (scormActivityEntity) {
			title = `${this.localize('content.scormActivity')}: ${scormActivityEntity.contentServiceTitle}`;
			entityTitle = scormActivityEntity.title;

			if (scormActivityEntity.contentServiceUpdatedAt) {
				const date = new Date(Date.parse(scormActivityEntity.contentServiceUpdatedAt))
					.toLocaleDateString('en-us', { year: 'numeric', month: 'long', day: 'numeric' });
				subTitle = `${this.localize('content.lastEdited')} ${date}`;
			}

			if (!this.scoreEditorLoading) {
				this.skeleton = false;
			}
		}

		return html`
			<d2l-activity-content-editor-title
				.entity=${scormActivityEntity}
				.onSave=${this.saveTitle}
				?skeleton="${this.skeleton}"
			>
			</d2l-activity-content-editor-title>

			<div id="score-and-duedate-container">
				<div id="score-container" class="d2l-editor-layout-section">
					<div class="d2l-activity-label-container d2l-label-text d2l-skeletize">
						${this.localize('editor.gradeOutOf')}
					</div>
					<d2l-activity-score-editor
						?skeleton="${this.skeleton}"
						.href="${this.activityUsageHref}"
						.token="${this.token}"
						.activityName="${entityTitle}"
						.hasActivityScore="${false}"
						.disableNotInGradebook="${true}">
					</d2l-activity-score-editor>
				</div>
				<div id="duedate-container" class="d2l-editor-layout-section">
					<d2l-activity-due-date-editor
						?skeleton="${this.skeleton}"
						.href="${this.activityUsageHref}"
						.token="${this.token}">
					</d2l-activity-due-date-editor>
				</div>
			</div>

			<d2l-activity-content-scorm-activity-display-options
				.entity=${scormActivityEntity}
				.onSave=${this.saveLinkOptions}
				?skeleton="${this.skeleton}"
				?showLinkOptions=${true}
			>
			</d2l-activity-content-scorm-activity-display-options>

			<d2l-activity-content-external-activity
				.entity=${scormActivityEntity}
				.title=${title}
				.subTitle=${subTitle}
				?skeleton="${this.skeleton}"
				?showActivityPreview=${true}>
			</d2l-activity-content-external-activity>
		`;
	}

	updated(changedProperties) {
		super.updated(changedProperties);

		if (changedProperties.has('asyncState')) {
			this.scoreEditorLoading = this.asyncState !== asyncStates.complete;
		}
	}

	hasPendingChanges() {
		const scormActivityEntity = contentScormActivityStore.getContentScormActivity(this.href);
		if (!scormActivityEntity) {
			return false;
		}
		return scormActivityEntity.dirty;
	}

	async save() {
		const scormActivityEntity = contentScormActivityStore.getContentScormActivity(this.href);

		if (!scormActivityEntity) {
			return;
		}

		await scormActivityEntity.save();

		const activityUsageEntity = activityStore.get(this.activityUsageHref);

		if (!activityUsageEntity) {
			return;
		}

		const scoring = scoringStore.get(activityUsageEntity.scoringHref);
		await scoring && scoring.fetch(true);
	}

	saveGradeOptions() {
		// TODO: Implement this for writing grades
	}

	saveLinkOptions(isExternalResource) {
		const scormActivityEntity = contentScormActivityStore.getContentScormActivity(this.href);

		if (!scormActivityEntity) {
			return;
		}

		scormActivityEntity.setExternalResource(isExternalResource);
	}

	saveTitle(title) {
		const scormActivityEntity = contentScormActivityStore.getContentScormActivity(this.href);

		if (!scormActivityEntity) {
			return;
		}

		scormActivityEntity.setTitle(title);
	}
}

customElements.define('d2l-activity-content-scorm-activity-detail', ContentScormActivityDetail);
