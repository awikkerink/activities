import '@d2l/d2l-attachment/components/attachment';
import { css, html, LitElement } from 'lit-element/lit-element';
import { AttachmentEntity } from 'siren-sdk/src/activities/AttachmentEntity';
import { EntityMixinLit } from 'siren-sdk/src/mixin/entity-mixin-lit';

class ActivityAttachment extends EntityMixinLit(LitElement) {
	static get properties() {
		return {
			_attachment: { type: Object },
			_editing: { type: Boolean }
		};
	}

	static get styles() {
		return css`
			:host {
				display: block;
			}
		`;
	}

	constructor() {
		super();
		this._setEntityType(AttachmentEntity);
	}

	set _entity(entity) {
		if (!this._entityHasChanged(entity)) {
			return;
		}

		if (entity) {
			this._attachment = {
				id: entity.href(),
				url: entity.href(),
				name: entity.name()
			};
			this._editing = entity.canDeleteAttachment();
		}

		super._entity = entity;
	}

	_onAttachmentRemoved() {
		super._entity.deleteAttachment();
		this._deleted = true;
	}

	render() {
		return html`
			<d2l-labs-attachment
				attachmentId="${this._attachment.id}"
				.attachment="${this._attachment}"
				?editing="${this._editing}"
				@d2l-attachment-removed="${this._onAttachmentRemoved}">
			</d2l-labs-attachment>
		`;
	}
}

customElements.define('d2l-activity-attachment', ActivityAttachment);
