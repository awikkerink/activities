import '@d2l/d2l-attachment/components/attachment';
import { css, html } from 'lit-element/lit-element';
import { ActivityEditorMixin } from '../mixins/d2l-activity-editor-mixin.js';
import { MobxLitElement } from '@adobe/lit-mobx';
import { shared as store } from './state/attachment-store.js';

class ActivityAttachment extends ActivityEditorMixin(MobxLitElement) {

	static get styles() {
		return css`
			:host {
				display: block;
			}
		`;
	}

	_onAttachmentRemoved() {
		// super._entity.deleteAttachment();
	}

	constructor() {
		super(store);
	}

	render() {
		const item = store.get(this.href);

		if (!item) {
			return html``;
		}

		const {
			id,
			attachment,
			editing,
		} = item;

		return html`
			<d2l-labs-attachment
				attachmentId="${id}"
				.attachment="${attachment}"
				?editing="${editing}"
				@d2l-attachment-removed="${this._onAttachmentRemoved}">
			</d2l-labs-attachment>
		`;
	}
}

customElements.define('d2l-activity-attachment', ActivityAttachment);
