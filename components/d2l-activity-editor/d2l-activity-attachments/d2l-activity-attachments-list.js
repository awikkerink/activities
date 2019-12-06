import './d2l-activity-attachment';
import { css, html, LitElement } from 'lit-element/lit-element';
import { AttachmentCollectionEntity } from 'siren-sdk/src/activities/AttachmentCollectionEntity';
import { EntityMixinLit } from 'siren-sdk/src/mixin/entity-mixin-lit';
import { repeat } from 'lit-html/directives/repeat';

class ActivityAttachmentsList extends EntityMixinLit(LitElement) {
	static get properties() {
		return {
			_attachmentUrls: { type: Array }
		};
	}

	static get styles() {
		return css`
			:host {
				display: block;
			}
			d2l-activity-attachment {
				margin-bottom: 20px;
			}
		`;
	}

	constructor() {
		super();
		this._setEntityType(AttachmentCollectionEntity);
	}

	set _entity(entity) {
		if (!this._entityHasChanged(entity)) {
			return;
		}

		if (entity) {
			const attachments = entity.getAttachmentEntities();
			this._attachmentUrls = attachments.map(attachment => {
				if (attachment.href) {
					return attachment.href;
				}

				return attachment.getLinkByRel('self').href;
			});
		}

		super._entity = entity;
	}

	render() {
		return html`
			${repeat(this._attachmentUrls, href => href, href => html`
				<d2l-activity-attachment
					.href="${href}"
					.token="${this.token}">
				</d2l-activity-attachment>
			`)}
		`;
	}
}

customElements.define('d2l-activity-attachments-list', ActivityAttachmentsList);
