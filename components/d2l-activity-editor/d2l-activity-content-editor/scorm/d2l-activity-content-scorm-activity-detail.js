import '../shared-components/d2l-activity-content-editor-title.js';
import './d2l-activity-content-scorm-activity-display-options.js';
import './d2l-activity-content-scorm-external-activity.js';
import { css, html } from 'lit-element/lit-element.js';
import { activityContentEditorStyles } from '../shared-components/d2l-activity-content-editor-styles';
import { ActivityEditorMixin } from '../../mixins/d2l-activity-editor-mixin.js';
import { ContentScormActivityEntity } from 'siren-sdk/src/activities/content/ContentScormActivityEntity.js';
import { shared as contentScormActivityStore } from './state/content-scorm-activity-store.js';
import { EntityMixinLit } from 'siren-sdk/src/mixin/entity-mixin-lit.js';
import { ErrorHandlingMixin } from '../../error-handling-mixin.js';
import { labelStyles } from '@brightspace-ui/core/components/typography/styles.js';
import { LocalizeActivityEditorMixin } from '../../mixins/d2l-activity-editor-lang-mixin.js';
import { MobxLitElement } from '@adobe/lit-mobx';
import { RtlMixin } from '@brightspace-ui/core/mixins/rtl-mixin.js';
import { SkeletonMixin } from '@brightspace-ui/core/components/skeleton/skeleton-mixin.js';

class ContentScormActivityDetail extends SkeletonMixin(ErrorHandlingMixin(LocalizeActivityEditorMixin(EntityMixinLit(RtlMixin(ActivityEditorMixin(MobxLitElement)))))) {

	static get properties() {
		return {
			activityUsageHref: { type: String }
		};
	}

	static get styles() {
		return [
			super.styles,
			labelStyles,
			activityContentEditorStyles,
			css`
				.d2l-activity-label-container {
					margin-bottom: 6px;
				}
				d2l-activity-content-external-activity {
					margin-top: 36px;
				}
			`
		];
	}

	constructor() {
		super(contentScormActivityStore);
		this.skeleton = true;
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

		this._createSelectboxGradeItemEnabled = event.detail.provider;

		this.saveTitle = this.saveTitle.bind(this);
		this.saveLinkOptions = this.saveLinkOptions.bind(this);
		this.saveGradeOptions = this.saveGradeOptions.bind(this);
	}

	render() {
		const scormActivityEntity = contentScormActivityStore.getContentScormActivity(this.href);

		let title = '';
		let subTitle = null;

		if (scormActivityEntity) {
			this.skeleton = false;
			title = `${this.localize('content.scormActivity')}: ${scormActivityEntity.title}`;
			if (scormActivityEntity.lastEdited) {
				subTitle = `${this.localize('content.lastEdited')} ${new Date(Date.parse(scormActivityEntity.lastEdited)).toUTCString()}`;
			}
		}

		return html`
			<d2l-activity-content-editor-title
				.entity=${scormActivityEntity}
				.onSave=${this.saveTitle}
				?skeleton="${this.skeleton}"
			>
			</d2l-activity-content-editor-title>

			<div id="score-container" class="d2l-editor-layout-section">
				<div class="d2l-activity-label-container d2l-label-text d2l-skeletize">
					${this._createSelectboxGradeItemEnabled ? this.localize('editor.gradeOutOf') : this.localize('editor.scoreOutOf')}
				</div>
				<d2l-activity-score-editor
					?skeleton="${this.skeleton}"
					.href="${this.activityUsageHref}"
					.token="${this.token}"
					.activityName="${''}">
				</d2l-activity-score-editor>
			</div>

			<d2l-activity-content-editor-due-date
				.href="${this.activityUsageHref}"
				.token="${this.token}"
				?skeleton="${this.skeleton}"
				?expanded=${true}
			>
			</d2l-activity-content-editor-due-date>

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

	async save() {
		const scormActivityEntity = contentScormActivityStore.getContentScormActivity(this.href);

		if (!scormActivityEntity) {
			return;
		}

		await scormActivityEntity.save();
	}

	saveGradeOptions() {
		// TODO: Implement for writing grades
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
