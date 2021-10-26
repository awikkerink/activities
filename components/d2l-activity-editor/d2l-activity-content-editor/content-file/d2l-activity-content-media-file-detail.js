import '../shared-components/d2l-activity-content-external-activity-container.js';
import '@brightspace-ui-labs/media-player/media-player.js';
import '@d2l/d2l-attachment/components/attachment';
import { css, html } from 'lit-element/lit-element.js';
import { ActivityEditorMixin } from '../../mixins/d2l-activity-editor-mixin.js';
import { bodySmallStyles } from '@brightspace-ui/core/components/typography/styles.js';
import { shared as contentFileStore } from './state/content-file-store.js';
import { ContentMediaFileEntity } from 'siren-sdk/src/activities/content/ContentMediaFileEntity.js';
import { EntityMixinLit } from 'siren-sdk/src/mixin/entity-mixin-lit.js';
import { ErrorHandlingMixin } from '../../error-handling-mixin.js';
import { LocalizeActivityEditorMixin } from '../../mixins/d2l-activity-editor-lang-mixin.js';
import { MobxLitElement } from '@adobe/lit-mobx';
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
			bodySmallStyles,
			css`
				.d2l-captions-list {
					margin-bottom: 12px;
				}
				.d2l-media-not-embedded {
					margin-top: 24px;
				}
			`
		];
	}

	constructor() {
		super(contentFileStore);
		this._setEntityType(ContentMediaFileEntity);
		this.skeleton = true;
		this.saveOrder = 250;
	}

	connectedCallback() {
		super.connectedCallback();
	}

	render() {
		const mediaFileEntity = contentFileStore.getContentFileActivity(this.href);

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
			<d2l-activity-content-external-activity-container
				.entityName=${this._getEntityName(mediaFileEntity)}
				?skeleton=${this.skeleton}
			>
				<d2l-button-subtle
					slot="action-button"
					text=${this.localize('content.advancedEditing')}
					class="d2l-skeletize"
					@click=${this._openDialog}
				>
				</d2l-button-subtle>
			</d2l-activity-content-external-activity-container>
			<div class="d2l-media-renderer d2l-skeltize">
				${this._renderAudioVideo(mediaFileEntity)}
			</div>
		`;
	}

	async save() {
		const mediaFileEntity = contentFileStore.getContentFileActivity(this.href);
		if (!mediaFileEntity) {
			return;
		}

		await mediaFileEntity.saveMediaFile();
	}

	_getEntityName(mediaFileEntity) {
		if (!mediaFileEntity) {
			return '';
		}

		return decodeURI(mediaFileEntity.fileLocationHref.split('/').pop());
	}

	_openDialog() {
		// TODO: Implement the opening of a dialog
		console.log('Opening dialog'); // eslint-disable-line no-console
	}

	_renderAttachmentView(mediaFileEntity) {
		const attachment = {
			id: mediaFileEntity.fileLocationHref,
			name: 'TODO',
			url: mediaFileEntity.fileLocationHref
		};

		return html`
			<div class="d2l-media-not-embedded d2l-skeletize">
				<d2l-labs-attachment
					?hidden="${this.skeleton}"
					.attachmentId="${attachment.id}"
					.attachment="${attachment}"
				>
				</d2l-labs-attachment>
			</div>
		`;
	}

	_renderAudioVideo(mediaFileEntity) {
		if (!mediaFileEntity) {
			return;
		}

		// TODO: Go get captions
		const captions = ['English'];

		const captionsRender = this._renderCaptionsList('content.fileHasCaptions', captions);

		const mediaRender = mediaFileEntity.isMediaEmbedded
			? this._renderMedia(mediaFileEntity.fileLocationHref)
			: this._renderAttachmentView(mediaFileEntity);

		return html`
			${captionsRender}
			<div class="d2l-media">
				${mediaRender}
			</div>
		`;
	}

	_renderCaptionsList(langterm, captions) {
		if (captions.length === 0) {
			return html``;
		}

		return html`
			<div class="d2l-captions-list d2l-skeletize">
				<span class="d2l-body-small">
					${this.localize(langterm)}: ${captions.join(', ')}
				</span>
			</div>
		`;
	}

	_renderMedia(src) {
		return html`
			<d2l-labs-media-player
				src=${src}
			>
			</d2l-labs-media-player>
		`;
	}
}

customElements.define('d2l-activity-content-media-file-detail', ContentMediaFileDetail);
