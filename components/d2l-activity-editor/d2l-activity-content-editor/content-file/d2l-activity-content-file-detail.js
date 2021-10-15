import '../shared-components/d2l-activity-content-editor-title.js';
import './d2l-activity-content-file-loading.js';
import '@brightspace-ui/core/components/menu/menu-item-separator.js';
import './html-files/d2l-activity-content-html-file-detail.js';
import { ContentFileEntity, FILE_TYPES } from 'siren-sdk/src/activities/content/ContentFileEntity.js';
import { css, html } from 'lit-element/lit-element.js';
import { ActivityEditorMixin } from '../../mixins/d2l-activity-editor-mixin.js';
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
			sortHTMLTemplatesByName: { type: Boolean },
		};
	}

	static get styles() {
		return [
			css`
				d2l-activity-content-html-file-detail {
					display: flex;
					flex-direction: column;
					height: inherit;
				}
				d2l-loading-spinner {
					width: 100%;
				}
			`
		];
	}

	constructor() {
		super(contentFileStore);
		this._setEntityType(ContentFileEntity);
		this.saveOrder = 500;
		this.skeleton = true;
	}

	connectedCallback() {
		super.connectedCallback();
		this.saveTitle = this.saveTitle.bind(this);
	}

	render() {
		const contentFileEntity = contentFileStore.getContentFileActivity(this.href);

		if(!contentFileEntity) {
			return html`
				<d2l-loading-spinner size="80"></d2l-loading-spinner>
			`;
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
				?skeleton=${this.skeleton}
				?expanded=${true}
			>
			</d2l-activity-content-editor-due-date>

			${contentFileEntity.fileType == FILE_TYPES.html
			? html`
			<d2l-activity-content-html-file-detail
				.href=${this.href}
				.token=${this.token}
				.activityUsageHref=${this.activityUsageHref}
				.entity=${contentFileEntity}
				.store=${contentFileStore}
				?sortHTMLTemplatesByName=${this.sortHTMLTemplatesByName}
			>
			</d2l-activity-content-html-file-detail>` 
			: null}
		`		
	}

	connectedCallback() {
		super.connectedCallback();
		this.addEventListener('d2l-loaded-file', () => {this.skeleton = false});
	}

	disconnectedCallback() {
		super.disconnectedCallback();
		this.removeEventListener('d2l-loaded-file');
	}

	async cancelCreate() {
		const contentFileEntity = contentFileStore.getContentFileActivity(this.href);
		if (!contentFileEntity) {
			return;
		}
		await contentFileEntity.cancelCreate();
	}

	saveTitle(title) {
		const contentFileActivity = contentFileStore.getContentFileActivity(this.href);
		if (!contentFileActivity) {
			return;
		}
		contentFileActivity.setTitle(title);
	}
}

customElements.define('d2l-activity-content-file-detail', ContentFileDetail);
