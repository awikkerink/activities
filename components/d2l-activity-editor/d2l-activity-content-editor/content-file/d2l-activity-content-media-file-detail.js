import '../shared-components/d2l-activity-content-external-activity-container.js';
import '@brightspace/content-components/capture/d2l-capture-producer/d2l-capture-producer.js';
import '@brightspace-ui/core/components/dialog/dialog-fullscreen.js';
import '@brightspace-ui-labs/media-player/media-player.js';
import '@d2l/d2l-attachment/components/attachment.js';
import { css, html } from 'lit-element/lit-element.js';
import { ActivityEditorMixin } from '../../mixins/d2l-activity-editor-mixin.js';
import { bodySmallStyles } from '@brightspace-ui/core/components/typography/styles.js';
import { shared as contentFileStore } from './state/content-file-store.js';
import { ContentMediaFileEntity } from 'siren-sdk/src/activities/content/ContentMediaFileEntity.js';
import { EntityMixinLit } from 'siren-sdk/src/mixin/entity-mixin-lit.js';
import { ErrorHandlingMixin } from '../../error-handling-mixin.js';
import { getComposedActiveElement } from '@brightspace-ui/core/helpers/focus';
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
				.d2l-captions-list-container {
					min-height: 28px;
				}
				.d2l-caption {
					display: inline-block;
					margin: 12px 0;
				}
				.d2l-media-container {
					padding-bottom: 30px;
				}
				.d2l-media-not-embedded {
					margin-top: 24px;
				}
				.d2l-action-button {
					padding-right: 4%;
				}
			`
		];
	}

	constructor() {
		super(contentFileStore);
		this._setEntityType(ContentMediaFileEntity);
		this.skeleton = true;
		this.saveOrder = 250;
		const context = JSON.parse(document.documentElement.getAttribute('data-he-context'));
		this.orgUnitId = context ? context.orgUnitId : '';
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
				.entityName=${mediaFileEntity.mediaFileName}
				?skeleton=${this.skeleton}
			>
				<d2l-button-subtle
					slot="action-button"
					text=${this.localize('content.advancedEditing')}
					class="d2l-skeletize d2l-action-button"
					@click=${this._openDialog}
				>
				</d2l-button-subtle>
			</d2l-activity-content-external-activity-container>
			<div class="d2l-media-renderer d2l-skeletize">
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

	async _openDialog() {
		const mediaFileEntity = contentFileStore.getContentFileActivity(this.href);
		if (mediaFileEntity.isContentServiceResource && mediaFileEntity.isAdvancedEditingEnabled) {
			const producerDialog = this.shadowRoot.querySelector('.d2l-producer-dialog');
			producerDialog.opened = true;
		} else {
			const subTitlePath = `?subtitlePath=${mediaFileEntity.orgUnitPath}&subtitleFile=${mediaFileEntity.mediaFileName}`;
			const location = `/d2l/le/content/video/subtitles/${this.orgUnitId}/OpenSubtitleDialog${subTitlePath}`;

			const dialogResult = await D2L.LP.Web.UI.Desktop.MasterPages.Dialog.Open(
				getComposedActiveElement(),
				new D2L.LP.Web.Http.UrlLocation(location),
			);

			dialogResult.AddListener(() => {
				this._refetchCaptions(mediaFileEntity);
			});
		}
	}

	async _refetchCaptions(mediaFileEntity) {
		await mediaFileEntity.fetchCaptions();
		return this.requestUpdate();
	}

	_renderAttachmentView(mediaFileEntity) {
		const attachment = {
			name: mediaFileEntity.mediaFileName,
			url: mediaFileEntity.fileLocationHref,
			type: 'Document'
		};

		//this is only for enabling the link; actual permission checking is not handled here
		const hasPermission = {
			canAccess: () => true
		};

		return html`
			<div class="d2l-media-not-embedded d2l-skeletize">
				<d2l-labs-attachment-file
					?hidden="${this.skeleton}"
					.attachment="${attachment}"
					.permission=${hasPermission}
				>
				</d2l-labs-attachment-file>
			</div>
		`;
	}

	_renderAudioVideo(mediaFileEntity) {
		if (!mediaFileEntity) {
			return;
		}

		const mediaRender = mediaFileEntity.isMediaEmbedded
			? this._renderMedia(mediaFileEntity.fileLocationHref)
			: this._renderAttachmentView(mediaFileEntity);

		return html`
			<div class="d2l-captions-list-container d2l-skeletize">
				${this._renderCaptionsList('content.fileHasCaptions', mediaFileEntity.mediaCaptions)}
			</div>
			<div class="d2l-media-container">
				${mediaRender}
			</div>
			${this._renderProducer(mediaFileEntity)}
		`;
	}

	_renderCaptionsList(langterm, captions) {
		if (captions.length === 0) {
			return html``;
		}

		const captionsCSV = captions.map((caption) =>
			caption.properties.langName
		).join(', ');

		return html`
			<div class="d2l-body-small d2l-caption">
				${this.localize(langterm)}: ${captionsCSV}
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

	_renderProducer(mediaFileEntity) {
		return html`
			<d2l-dialog-fullscreen class="d2l-producer-dialog" title-text="${this.localize('content.advancedEditing')}">
				<d2l-capture-producer
					endpoint="${mediaFileEntity.contentServiceEndpoint}"
					tenant-id="${mediaFileEntity.tenantId}"
					content-id="${mediaFileEntity.contentServiceContentId}"
				></d2l-capture-producer>
			</d2l-dialog-fullscreen>
		`;
	}
}

customElements.define('d2l-activity-content-media-file-detail', ContentMediaFileDetail);
