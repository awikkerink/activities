import '@brightspace-ui/core/components/button/button.js';
import 'd2l-save-status/d2l-save-status.js';
import { css, html, LitElement } from 'lit-element/lit-element.js';
import { ProviderMixin } from './instance-provider-mixin.js';
import { store } from './state/store.js';
import activityStoreName from './state/store-name.js';
import { ActivityStore } from './state-mobxs/activity-store.js';
import activityStoreNameMobx from './state-mobxs/store-name.js';

class ActivityEditorContainer extends ProviderMixin(LitElement) {

	static get properties() {
		return {
			loading: { type: Boolean },
		};
	}

	static get styles() {
		return css`
			:host {
				display: block;
				padding: 20px;
			}
			:host([hidden]) {
				display: none;
			}
			d2l-save-status {
				padding-bottom: 20px;
			}
		`;
	}

	constructor() {
		super();
		this.provideInstance(activityStoreName, store);
		this.provideInstance(activityStoreNameMobx, new ActivityStore());
		this.addEventListener('d2l-activity-editor-connected', this._registerEditor);
		this.addEventListener('d2l-activity-editor-save', this._saveEditor)
		this._editors = new Set();
	}

	_registerEditor(e) {
		e.detail ? this._editors.add(e.composedPath()[0]) : this._editors.delete(e.composedPath()[0]);
		e.preventDefault();
	}

	async _saveEditor(e) {
		for (let editor of this._editors) {
			await editor.save();
		}
	}

	render() {
		return html`
			<slot></slot>
		`;
	}
}
customElements.define('d2l-activity-editor-container', ActivityEditorContainer);
