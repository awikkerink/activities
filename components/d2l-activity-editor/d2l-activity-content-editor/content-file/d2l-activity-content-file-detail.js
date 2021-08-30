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
				d2l-activity-content-html-file-detail {
					display: flex;
					flex-direction: column;
					height: inherit;
				}
			`
		];
	}

	constructor() {
		super(contentFileStore);
		this._debounceJobs = {};
		this._setEntityType(ContentFileEntity);
		this.skeleton = true;
		this.saveOrder = 500;
		this.contentFileActions = {};

		const context = JSON.parse(document.documentElement.getAttribute('data-he-context'));
		this.orgUnitId = context ? context.orgUnitId : '';
	}

	connectedCallback() {
		super.connectedCallback();
		this.saveTitle = this.saveTitle.bind(this);
		this.savePageContent = this.savePageContent.bind(this);

		this.contentFileActions = {
			saveTitle: this.saveTitle,
			savePageContent: this.savePageContent,
		};
	}

	render() {
		const contentFileEntity = contentFileStore.getContentFileActivity(this.href);

		if (contentFileEntity) {
			this.skeleton = false;

			switch (contentFileEntity.fileType) {
				case FILE_TYPES.html:
					return html`
						<d2l-activity-content-html-file-detail
							.href=${this.href}
							.token=${this.token}
							.activityUsageHref=${this.activityUsageHref}
							.contentFileActions=${this.contentFileActions}
							?skeleton=${this.skeleton}
							?sortHTMLTemplatesByName=${this.sortHTMLTemplatesByName}
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

	savePageContent(pageContent) {
		const contentFileEntity = contentFileStore.getContentFileActivity(this.href);
		if (!contentFileEntity) {
			return;
		}
		contentFileEntity.setPageContent(pageContent);
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
}

customElements.define('d2l-activity-content-file-detail', ContentFileDetail);
