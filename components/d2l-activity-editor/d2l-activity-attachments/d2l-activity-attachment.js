import '@d2l/d2l-attachment/components/attachment';
import { css, html } from 'lit-element/lit-element';
import storeName from './state-mobxs/store-name.js';
import { connect } from '../mobxs-connect-mixin.js';
import { ActivityEditorMixin } from '../d2l-activity-editor-mixin.js';
import { MobxLitElement } from '@adobe/lit-mobx';

class ActivityAttachment extends connect(ActivityEditorMixin(MobxLitElement)) {

	static storeName = storeName;

	static get properties() {
		return {
			_attachment: { type: Object },
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
	}

	_onAttachmentRemoved() {
		this._attachment.deleteAttachment(!this._attachment.deleted);
	}

	render() {
		if (!this._attachment) {
			return html``;
		}

		const {
			attachment,
			editing,
			creating,
			deleted
		} = this._attachment;

		return html`
			<d2l-labs-attachment
				attachmentId="${attachment.id}"
				.attachment="${attachment}"
				?deleted="${deleted}"
				?creating="${creating}"
				?editing="${editing}"
				@d2l-attachment-removed="${this._onAttachmentRemoved}"
				@d2l-attachment-restored="${this._onAttachmentRemoved}">
			</d2l-labs-attachment>
		`;
	}

	updated(changedProperties) {
		super.updated(changedProperties);

		if ((changedProperties.has('href') || changedProperties.has('token')) &&
			this.href && this.token) {
			this._attachment = this.store.fetchAttachment(this.href, this.token, this.autoSave);
		}
	}
}

customElements.define('d2l-activity-attachment', ActivityAttachment);
