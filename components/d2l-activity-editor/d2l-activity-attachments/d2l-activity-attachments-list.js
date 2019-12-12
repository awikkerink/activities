import '@d2l/d2l-attachment/components/attachment-list';
import './d2l-activity-attachment';
import { css, html, LitElement } from 'lit-element/lit-element';
import { AttachmentCollectionEntity } from 'siren-sdk/src/activities/AttachmentCollectionEntity';
import { EntityMixinLit } from 'siren-sdk/src/mixin/entity-mixin-lit';
import { repeat } from 'lit-html/directives/repeat';

class ActivityAttachmentsList extends EntityMixinLit(LitElement) {
	static get properties() {
		return {
			creating: { type: Boolean },
			_attachmentUrls: { type: Array },
			_isEditMode: { type: Boolean }
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
			this._isEditMode = entity.canAddAttachments();
		}

		super._entity = entity;
	}

	render() {
		return html`
			<d2l-labs-attachment-list ?editing="${this._isEditMode}">
				${repeat(this._attachmentUrls, href => href, href => html`
					<li slot="attachment" class="panel">
						<d2l-activity-attachment
							?creating="${this.creating}"
							.href="${href}"
							.token="${this.token}">
						</d2l-activity-attachment>
					</li>
				`)}
			</d2l-labs-attachment-list>
		`;
	}
}

customElements.define('d2l-activity-attachments-list', ActivityAttachmentsList);
