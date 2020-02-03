import { css, html, LitElement } from 'lit-element/lit-element.js';
import { ActivityEditorMixin } from './mixins/d2l-activity-editor-mixin.js';
import { getLocalizeResources } from './localization';
import { LocalizeMixin } from '@brightspace-ui/core/mixins/localize-mixin.js';
import { shared as store } from './state/activity-store.js';

class ActivityEditor extends ActivityEditorMixin(LocalizeMixin(LitElement)) {

	static get properties() {
		return {
			loading: { type: Boolean }
		};
	}

	static get styles() {
		return css`
			:host {
				display: block;
			}
			:host([hidden]) {
				display: none;
			}
			.d2l-activity-editor-loading {
				padding: 20px;
				position: fixed;
				background-color: #fff;
				width: 100%;
				height: 100vh;
				z-index: 100001;
			}
		`;
	}

	static async getLocalizeResources(langs) {
		return getLocalizeResources(langs, import.meta.url);
	}

	async save() {
		const activity = store.get(this.href);
		if (activity) {
			await activity.save();
		}
	}

	render() {
		return html`
			<div class="d2l-activity-editor-loading" ?hidden="${!this.loading}">${this.localize('loading')}</div>
			<div>
				<slot name="editor"></slot>
			</div>
		`;
	}
}
customElements.define('d2l-activity-editor', ActivityEditor);
