import '../shared-components/d2l-activity-content-external-activity-container.js';
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

	_getEntityName(mediaFileEntity) {
		if (!mediaFileEntity) {
			return '';
		}

		return decodeURI(mediaFileEntity.fileLocationHref.split('/').pop());
	}

	async _openDialog() {
		const mediaFileEntity = contentFileStore.getContentFileActivity(this.href);

		// TODO: check if file is contentService, sent as a property
		if (mediaFileEntity.isContentServiceResource && mediaFileEntity.isAdvancedEditingEnabled) {
			// eslint-disable-next-line no-console
			console.log('opening new dialog');
			// TODO: Media Team will add in the new dialog here
		} else {
			const subTitlePath = `?subtitlePath=${mediaFileEntity.orgUnitPath}&subtitleFile=${this._getEntityName(mediaFileEntity)}`;
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
			name: this._getEntityName(mediaFileEntity),
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
			? this._renderMedia(mediaFileEntity)
			: this._renderAttachmentView(mediaFileEntity);

		return html`
			<div class="d2l-captions-list-container d2l-skeletize">
				${this._renderCaptionsList('content.fileHasCaptions', mediaFileEntity.mediaCaptions)}
			</div>
			<div class="d2l-media-container">
				${mediaRender}
			</div>
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

	_renderCaptionsTracks(captions) {
		if (captions.length === 0) {
			return html``;
		}

		const captionTracks = captions.map((caption) => {
			const captionHref = caption.getLinkByRel('alternate').href;
			const { langName, langCode } = caption.properties;

			return html`
				<track src=${captionHref} label=${langName} srcLang=${langCode} kind="captions" />
			`;
		});

		return html`${captionTracks}`;
	}

	_renderMedia(mediaFileEntity) {
		return html`
			<d2l-labs-media-player
				src=${mediaFileEntity.fileLocationHref}
			>
				${this._renderCaptionsTracks(mediaFileEntity.mediaCaptions)}
			</d2l-labs-media-player>
		`;
	}
}

customElements.define('d2l-activity-content-media-file-detail', ContentMediaFileDetail);
