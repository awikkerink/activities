import '../shared-components/d2l-activity-content-editor-title.js';
import './d2l-activity-content-file-loading.js';
import '@brightspace-ui/core/components/menu/menu-item-separator.js';
import './d2l-activity-content-html-file-detail.js';
import './d2l-activity-content-media-file-detail.js';
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
		this.addEventListener('d2l-loaded-file', () => {this.skeleton = false;});
		this.onRefetchComplete = ({ detail: { href } }) => this._onRefetchComplete(href);

		window.addEventListener('d2l-refetch-complete', this.onRefetchComplete);
	}

	disconnectedCallback() {
		super.disconnectedCallback();
		this.removeEventListener('d2l-loaded-file', () => {});
		window.removeEventListener('d2l-refetch-complete', this.onRefetchComplete);
	}

	render() {
		const contentFileEntity = contentFileStore.getContentFileActivity(this.href);

		if (!contentFileEntity) {
			return html`
				<d2l-activity-content-file-loading
					.href="${this.href}"
					.token="${this.token}"
				>
					${this._renderTitle()}
					${this._renderDueDate()}
				</d2l-activity-content-file-loading>
			`;
		}

		if (contentFileEntity.fileType === FILE_TYPES.html) {
			return html`
				<d2l-activity-content-html-file-detail
					.href=${this.href}
					.token=${this.token}
					.activityUsageHref=${this.activityUsageHref}
					?sortHTMLTemplatesByName=${this.sortHTMLTemplatesByName}
				>
					${this._renderTitle()}
					${this._renderDueDate()}
				</d2l-activity-content-html-file-detail>`;
		}

		if (contentFileEntity.fileType === FILE_TYPES.audio || contentFileEntity.fileType === FILE_TYPES.video) {
			return html`
				<d2l-activity-content-media-file-detail
					.href=${this.href}
					.token=${this.token}
					.activityUsageHref=${this.activityUsageHref}
				>
					${this._renderTitle()}
					${this._renderDueDate()}
				</d2l-activity-content-media-file-detail>`;
		}

		this.skeleton = false;

		return html`
			${this._renderTitle()}
			${this._renderDueDate()}
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

		const originalActivityUsageHref = this.activityUsageHref;
		const updatedEntity = await contentFileActivity.saveFile();

		let event = new CustomEvent('d2l-content-working-copy-committed', {
			detail: {
				originalActivityUsageHref: originalActivityUsageHref,
				updatedActivityUsageHref: updatedEntity.getActivityUsageHref()
			},
			bubbles: true,
			composed: true,
			cancelable: true
		});

		await this.dispatchEvent(event);

		// Tell the container it should fetch the new entity before finishing
		// the saving animation
		event = new CustomEvent('d2l-fetch-new-entity-after-save', {
			detail: {
				fetchNewHref: updatedEntity.getActivityUsageHref()
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

	_onRefetchComplete(href) {
		if (href) {
			this.activityUsageHref = href;
		}
	}

	_renderDueDate() {
		return html`
			<div slot="due-date">
				<d2l-activity-content-editor-due-date
					.href="${this.activityUsageHref}"
					.token="${this.token}"
					?skeleton=${this.skeleton}
					?expanded=${true}
				>
				</d2l-activity-content-editor-due-date>
			</div>
		`;
	}
	_renderTitle() {
		const contentFileActivity = contentFileStore.getContentFileActivity(this.href);

		return html`
			<div slot="title">
				<d2l-activity-content-editor-title
					.entity=${contentFileActivity}
					.onSave=${this.saveTitle}
					?skeleton="${this.skeleton}"
				>
				</d2l-activity-content-editor-title>
			</div>
		`;
	}

}

customElements.define('d2l-activity-content-file-detail', ContentFileDetail);
