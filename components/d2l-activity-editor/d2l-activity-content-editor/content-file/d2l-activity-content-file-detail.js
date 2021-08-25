import '../shared-components/d2l-activity-content-editor-title.js';
import './d2l-activity-content-file-loading.js';
import '@brightspace-ui/core/components/menu/menu-item-separator.js';
import './html-files/d2l-activity-content-html-file-detail.js';
import { bodySmallStyles, labelStyles } from '@brightspace-ui/core/components/typography/styles.js';
import { ContentFileEntity, FILE_TYPES } from 'siren-sdk/src/activities/content/ContentFileEntity.js';
import { css, html } from 'lit-element/lit-element.js';
import { activityContentEditorStyles } from '../shared-components/d2l-activity-content-editor-styles.js';
import { ActivityEditorMixin } from '../../mixins/d2l-activity-editor-mixin.js';
import { activityHtmlEditorStyles } from '../shared-components/d2l-activity-html-editor-styles.js';
import { ContentEditorConstants } from '../constants';
import { shared as contentFileStore } from './state/content-file-store.js';
import { Debouncer } from '@polymer/polymer/lib/utils/debounce.js';
import { EntityMixinLit } from 'siren-sdk/src/mixin/entity-mixin-lit.js';
import { ErrorHandlingMixin } from '../../error-handling-mixin.js';
import { LocalizeActivityEditorMixin } from '../../mixins/d2l-activity-editor-lang-mixin.js';
import { MobxLitElement } from '@adobe/lit-mobx';
import { RtlMixin } from '@brightspace-ui/core/mixins/rtl-mixin.js';
import { SkeletonMixin } from '@brightspace-ui/core/components/skeleton/skeleton-mixin.js';
import { timeOut } from '@polymer/polymer/lib/utils/async.js';

const editorKeyInitial = 'content-page-content';

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
				.d2l-page-content-label-select-template-container {
					align-items: center;
					display: flex;
					justify-content: space-between;
					margin-bottom: 6px;
				}
				.d2l-menu-item-span {
					padding: 15px 20px;
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
		this.editorKey = editorKeyInitial;
		this.replacementContent = null;

		const context = JSON.parse(document.documentElement.getAttribute('data-he-context'));
		this.orgUnitId = context ? context.orgUnitId : '';
	}

	connectedCallback() {
		super.connectedCallback();
		this.saveTitle = this.saveTitle.bind(this);
	}

	render() {
		const contentFileEntity = contentFileStore.getContentFileActivity(this.href);

		if (contentFileEntity) {
			this.skeleton = false;
			this.pageContent = contentFileEntity.fileContent;

			switch (contentFileEntity.fileType) {
				case FILE_TYPES.html:
					return html`
						<d2l-activity-content-html-file-detail
							.href=${this.href}
							.token=${this.token}
							.activityUsageHref=${this.activityUsageHref}
							?skeleton=${this.skeleton}
						>
						</d2l-activity-content-html-file-detail>
					`;
			}
		}

		return this._renderUnknownLoadingFileType();
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

	saveTitle(title) {
		const contentFileActivity = contentFileStore.getContentFileActivity(this.href);
		if (!contentFileActivity) {
			return;
		}
		contentFileActivity.setTitle(title);
	}

	_onPageContentChange(e) {
		const htmlContent = e.detail.content;
		this._savePageContent(htmlContent);
	}

	_onPageContentChangeDebounced(e) {
		const htmlContent = e.detail.content;
		this._debounceJobs.description = Debouncer.debounce(
			this._debounceJobs.description,
			timeOut.after(ContentEditorConstants.DEBOUNCE_TIMEOUT),
			() => this._savePageContent(htmlContent)
		);
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

	_tryOverwriteContent(htmlContent) {
		const contentFileEntity = contentFileStore.getContentFileActivity(this.href);

		if (contentFileEntity.empty) {
			this._savePageContent(htmlContent);
		} else {
			this.replacementContent = htmlContent;
			this._openReplaceHtmlTemplateDialog();
		}
	}
}

customElements.define('d2l-activity-content-file-detail', ContentFileDetail);
