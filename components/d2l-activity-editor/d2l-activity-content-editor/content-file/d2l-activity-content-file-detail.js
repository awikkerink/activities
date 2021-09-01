import '../shared-components/d2l-activity-content-editor-title.js';
import './d2l-activity-content-file-loading.js';
import '@brightspace-ui/core/components/menu/menu-item-separator.js';
import './html-files/d2l-activity-content-html-file-editor.js';
import { bodySmallStyles, labelStyles } from '@brightspace-ui/core/components/typography/styles.js';
import { ContentFileEntity, FILE_TYPES } from 'siren-sdk/src/activities/content/ContentFileEntity.js';
import { css, html } from 'lit-element/lit-element.js';
import { activityContentEditorStyles } from '../shared-components/d2l-activity-content-editor-styles.js';
import { ActivityEditorMixin } from '../../mixins/d2l-activity-editor-mixin.js';
import { activityHtmlEditorStyles } from '../shared-components/d2l-activity-html-editor-styles.js';
import { shared as contentFileStore } from './state/content-file-store.js';
import { EntityMixinLit } from 'siren-sdk/src/mixin/entity-mixin-lit.js';
import { ErrorHandlingMixin } from '../../error-handling-mixin.js';
import { LocalizeActivityEditorMixin } from '../../mixins/d2l-activity-editor-lang-mixin.js';
import { MobxLitElement } from '@adobe/lit-mobx';
import { RtlMixin } from '@brightspace-ui/core/mixins/rtl-mixin.js';
import { SkeletonMixin } from '@brightspace-ui/core/components/skeleton/skeleton-mixin.js';

class ContentFileDetail extends SkeletonMixin(ErrorHandlingMixin(LocalizeActivityEditorMixin(EntityMixinLit(RtlMixin(ActivityEditorMixin(MobxLitElement)))))) {

	static get properties() {
		return {
			activityUsageHref: { type: String },
			htmlFileTemplates: { type: Array },
			pageContent: { typeof: Text },
			sortHTMLTemplatesByName: { type: Boolean },
		};
	}

	static get styles() {
		return [
			super.styles,
			labelStyles,
			activityContentEditorStyles,
			activityHtmlEditorStyles,
			bodySmallStyles,
			css`
				d2l-activity-content-html-file-editor {
					display: flex;
					flex-direction: column;
					height: inherit;
				}
			`,
		];
	}

	constructor() {
		super(contentFileStore);
		this._debounceJobs = {};
		this._setEntityType(ContentFileEntity);
		this.skeleton = true;
		this.saveOrder = 500;
		this.pageContent = null;

		const context = JSON.parse(document.documentElement.getAttribute('data-he-context'));
		this.orgUnitId = context ? context.orgUnitId : '';
	}

	connectedCallback() {
		super.connectedCallback();
		this.saveTitle = this.saveTitle.bind(this);
		this.saveContent = this.saveContent.bind(this);
	}

	render() {
		const contentFileEntity = contentFileStore.getContentFileActivity(this.href);
		let pageRenderer = undefined;

		if (contentFileEntity) {
			this.skeleton = false;
			this.pageContent = contentFileEntity.fileContent;

			switch (contentFileEntity.fileType) {
				case FILE_TYPES.html:
					pageRenderer = html`
						<d2l-activity-content-html-file-editor
							.href=${this.href}
							.token=${this.token}
							.onSave=${this.saveContent}
							?skeleton=${this.skeleton}
						></d2l-activity-content-html-file-editor>
					`;
					break;
			}
		} else {
			pageRenderer = this._renderUnknownLoadingFileType();
		}

		return html`
			<d2l-activity-content-editor-title
				.entity=${contentFileEntity}
				.onSave=${this.saveTitle}
				?skeleton="${this.skeleton}"
			>
			</d2l-activity-content-editor-title>
			<d2l-activity-content-editor-due-date
				.href="${this.activityUsageHref}"
				.token="${this.token}"
				?skeleton="${this.skeleton}"
				expanded="true"
			>
			</d2l-activity-content-editor-due-date>
			<div id="content-page-content-container">
				${pageRenderer}
			</div>
		`;
	}

	async cancelCreate() {
		const contentFileEntity = contentFileStore.getContentFileActivity(this.href);
		if (!contentFileEntity) {
			return;
		}

		await contentFileEntity.cancelCreate();
	}

	hasPendingChanges() {
		const contentFileActivity = contentFileStore.getContentFileActivity(this.href);
		if (!contentFileActivity) {
			return false;
		}
		return contentFileActivity.dirty;
	}

	async save() {
		const contentFileActivity = contentFileStore.getContentFileActivity(this.href);

		if (!contentFileActivity) {
			return;
		}

		this._saveOnChange('htmlContent');

		const originalActivityUsageHref = this.activityUsageHref;
		const updatedEntity = await contentFileActivity.save();
		const event = new CustomEvent('d2l-content-working-copy-committed', {
			detail: {
				originalActivityUsageHref: originalActivityUsageHref,
				updatedActivityUsageHref: updatedEntity.getActivityUsageHref()
			},
			bubbles: true,
			composed: true,
			cancelable: true
		});

		await this.dispatchEvent(event);
	}

	saveContent(content) {
		const contentFileActivity = contentFileStore.getContentFileActivity(this.href);
		if (!contentFileActivity) {
			return;
		}
		contentFileActivity.setPageContent(content);
	}

	saveTitle(title) {
		const contentFileActivity = contentFileStore.getContentFileActivity(this.href);
		if (!contentFileActivity) {
			return;
		}
		contentFileActivity.setTitle(title);
	}

	_renderUnknownLoadingFileType() {
		return html`
			<d2l-activity-content-file-loading
				.href="${this.href}"
				.token="${this.token}"
			></d2l-activity-content-file-loading>
		`;
	}

	_saveOnChange(jobName) {
		this._debounceJobs[jobName] && this._debounceJobs[jobName].flush();
	}

	_savePageContent(htmlContent) {
		const contentFileEntity = contentFileStore.getContentFileActivity(this.href);
		if (!contentFileEntity) {
			return;
		}
		contentFileEntity.setPageContent(htmlContent);
		this.pageContent = htmlContent;
	}
}

customElements.define('d2l-activity-content-file-detail', ContentFileDetail);
