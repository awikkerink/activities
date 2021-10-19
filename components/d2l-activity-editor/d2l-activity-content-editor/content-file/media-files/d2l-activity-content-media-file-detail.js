import { css, html } from 'lit-element/lit-element.js';
import { ActivityEditorMixin } from '../../../mixins/d2l-activity-editor-mixin.js';
import { ContentMediaFileEntity } from 'siren-sdk/src/activities/content/ContentMediaFileEntity.js';
import { EntityMixinLit } from 'siren-sdk/src/mixin/entity-mixin-lit.js';
import { ErrorHandlingMixin } from '../../../error-handling-mixin.js';
import { LocalizeActivityEditorMixin } from '../../../mixins/d2l-activity-editor-lang-mixin.js';
import { MobxLitElement } from '@adobe/lit-mobx';
import { shared as contentMediaFileStore } from './state/content-media-file-store.js';
import { RtlMixin } from '@brightspace-ui/core/mixins/rtl-mixin.js';
import { SkeletonMixin } from '@brightspace-ui/core/components/skeleton/skeleton-mixin.js';

class ContentMediaFileDetail extends SkeletonMixin(ErrorHandlingMixin(LocalizeActivityEditorMixin(EntityMixinLit(RtlMixin(ActivityEditorMixin(MobxLitElement)))))) {

	static get properties() {
		return {
			activityUsageHref: { type: String }
		};
	}

	static get styles() {
		return  [
			super.styles,
		];
	}

	constructor() {
		super(contentMediaFileStore);
		this._setEntityType(ContentMediaFileEntity);
		this.skeleton = true;
		this.saveOrder = 250;
	}

	connectedCallback() {
		super.connectedCallback();
	}

	render() {
		const mediaFileEntity = contentMediaFileStore.getContentMediaFileActivity(this.href);

        if (mediaFileEntity) {
			this.skeleton = false;

			const loadedFileEvent = new CustomEvent('d2l-loaded-file', {
				bubbles: false,
				composed: true,
				cancelable: true
			});
			this.dispatchEvent(loadedFileEvent);	
		} 

		return html`
            <slot name="title"></slot>
            <slot name="due-date"></slot>
			<div>
            
            </div>
		`;
	}

	async cancelCreate() {
		const mediaFileEntity = contentMediaFileStore.getContentMediaFileActivity(this.href);
		if (!mediaFileEntity) {
			return;
		}

		await mediaFileEntity.cancelCreate();
	}

    async save() {
		const mediaFileEntity = contentMediaFileStore.getContentMediaFileActivity(this.href);
		if (!mediaFileEntity) {
			return;
		}

		await mediaFileEntity.save();
	}

}
customElements.define('d2l-activity-content-media-file-detail', ContentMediaFileDetail);
