import './d2l-activity-attachments-list';
import './d2l-activity-attachments-picker';
import { css, html } from 'lit-element/lit-element';
import storeName from './state-mobxs/store-name.js';
import { connect } from '../mobxs-connect-mixin.js';
import { ActivityEditorMixin } from '../d2l-activity-editor-mixin.js';
import { MobxLitElement } from '@adobe/lit-mobx';
import { AttachmentCollectionsStore } from './state-mobxs/attachment-collections-store.js';
import { ProviderMixin } from '../instance-provider-mixin.js';

class ActivityAttachmentsEditor extends connect(ProviderMixin(ActivityEditorMixin(MobxLitElement))) {

	static storeName = storeName;

	static get properties() {
		return {
			_collection: { type: Object }
		};
	}

	static get styles() {
		return css`
			:host {
				display: block;
			}
			:host > * {
				margin-bottom: 20px;
			}
		`;
	}

	constructor() {
		super();
		this.provideInstance(storeName, new AttachmentCollectionsStore());
	}

	render() {
		if (!this._collection) {
			return html``;
		}

		const {
			canAddAttachments
		} = this._collection;

		return html`
			<d2l-activity-attachments-list
				href="${this.href}"
				.token="${this.token}">
			</d2l-activity-attachments-list>
			<d2l-activity-attachments-picker
				?hidden="${!canAddAttachments}"
				href="${this.href}"
				.token="${this.token}">
			</d2l-activity-attachments-picker>
		`;
	}

	updated(changedProperties) {
		super.updated(changedProperties);

		if ((changedProperties.has('href') || changedProperties.has('token')) &&
			this.href && this.token) {
			this._collection = this.store.fetchCollection(this.href, this.token, this.autoSave);
		}
	}
}
customElements.define('d2l-activity-attachments-editor', ActivityAttachmentsEditor);
