import '@d2l/d2l-attachment/components/attachment-list';
import './d2l-activity-attachment';
import { repeat } from 'lit-html/directives/repeat';
import { css, html } from 'lit-element/lit-element';
import storeName from './state-mobxs/store-name.js';
import { connect } from '../mobxs-connect-mixin.js';
import { ActivityEditorMixin } from '../d2l-activity-editor-mixin.js';
import { MobxLitElement } from '@adobe/lit-mobx';

class ActivityAttachmentsList extends connect(ActivityEditorMixin(MobxLitElement)) {

	static storeName = storeName;

	static get properties() {
		return {
			_isEditMode: { type: Boolean },
			_collection: { type: Object }
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

	render() {
		if (!this._collection) {
			return html``;
		}

		const {
			attachments
		} = this._collection;

		return html`
			<d2l-labs-attachment-list ?editing="${this._isEditMode}">
				${repeat(attachments, href => href, href => html`
					<li slot="attachment" class="panel">
						<d2l-activity-attachment
							href="${href}"
							.token="${this.token}">
						</d2l-activity-attachment>
					</li>
				`)}
			</d2l-labs-attachment-list>
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

customElements.define('d2l-activity-attachments-list', ActivityAttachmentsList);
