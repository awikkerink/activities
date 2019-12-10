import '@brightspace-ui/core/components/button/button.js';
import 'd2l-save-status/d2l-save-status.js';
import { css, html, LitElement } from 'lit-element/lit-element.js';
import { connect } from './connect-mixin.js';
import { ActivityEditorMixin } from './d2l-activity-editor-mixin.js';
import reducer, { storeName, fetchActivity, saveActivity } from './state/activity-usage.js';

class ActivityEditor extends connect(ActivityEditorMixin(LitElement)) {

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
		this._storeName = storeName;
	}

	get _reducers() {
		return reducer;
	}

	_mapStateToProps() {
		return {};
	}

	_mapDispatchToProps(dispatch) {
		return {
			_fetchActivity: () => dispatch(fetchActivity(this.href, this.token)),
			_saveActivity: () => dispatch(saveActivity(this.href, this.token))
		}
	}

	updated(changedProperties) {
		super.updated(changedProperties);

		if ((changedProperties.has('href') || changedProperties.has('token')) &&
			this.href && this.token) {
			this._fetchActivity();
		}
	}

	async _save() {
		await this._saveActivity();

		const event = new CustomEvent('d2l-activity-editor-save', {
			bubbles: true,
			composed: true,
			cancelable: true
		});
		this.dispatchEvent(event);
	}

	firstUpdated(changedProperties) {
		super.firstUpdated(changedProperties);

		this.addEventListener('d2l-siren-entity-save-start', () => {
			this.shadowRoot.querySelector('#save-status').start();
		});
		this.addEventListener('d2l-siren-entity-save-end', () => {
			this.shadowRoot.querySelector('#save-status').end();
		});
		this.addEventListener('d2l-siren-entity-save-error', () => {
			this.shadowRoot.querySelector('#save-status').error();
		});
	}

	render() {
		return html`
			<d2l-save-status
				id="save-status">
			</d2l-save-status>
			<div ?hidden="${!this.loading}">Loading ...</div>
			<div ?hidden="${this.loading}">
				<slot name="editor"></slot>
				<d2l-button @click="${this._save}" primary>Save</d2l-button>
			</div>
		`;
	}
}
customElements.define('d2l-activity-editor', ActivityEditor);
