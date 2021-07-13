import './editor-contents/d2l-activity-gbl-map-editor-secondary.js';
import './editor-contents/d2l-activity-gbl-map-editor-detail.js';
import { css, html } from 'lit-element/lit-element.js';
import { ActivityEditorMixin } from '../../mixins/d2l-activity-editor-mixin.js';
import { shared as activityStore } from '../../state/activity-store.js';
import { LocalizeActivityEditorMixin } from '../../mixins/d2l-activity-editor-lang-mixin.js';
import { MobxLitElement } from '@adobe/lit-mobx';
import { RtlMixin } from '@brightspace-ui/core/mixins/rtl-mixin.js';
import { shared as store } from './state/gbl-map-store.js';

class GblMapEditor extends LocalizeActivityEditorMixin(RtlMixin(ActivityEditorMixin(MobxLitElement))) {
	static get properties() {
		return {
			/**
			 * Is creating a new GBL map
			 */
			isNew: { type: Boolean, attribute: 'is-new' },
			/**
			 * API endpoint for determining whether a domain is trusted
			 */
			trustedSitesEndpoint: { type: String, attribute: 'trusted-sites-endpoint' },
			/**
			 * API endpoint for attachment unfurling service
			 */
			unfurlEndpoint: { type: String, attribute: 'unfurl-endpoint' },
			/**
			 * Set the WidthType on the template to constrain the page width if necessary
			 */
			widthType: { type: String, attribute: 'width-type' }
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
		`;
	}

	constructor() {
		super(store);
	}

	render() {
		return html`
			<d2l-activity-editor
				type="gbl"
				telemetryId="gbl"
				.href=${this.href}
				.token=${this.token}
				unfurlEndpoint=${this.unfurlEndpoint}
				trustedSitesEndpoint=${this.trustedSitesEndpoint}
				width-type=${this.widthType}
				error-term=${this.localize('gbl.saveError')}
				?isnew=${this.isNew}
			>
				${this._editorTemplate}
			</d2l-activity-editor>
		`;
	}

	updated(changedProperties) {
		if ((changedProperties.has('href') || changedProperties.has('token')) && this.href && this.token) {
			super._fetch(() => store.fetchGblMapActivity(this.href, this.token));
			super._fetch(() => activityStore.fetch(this.href, this.token));
		}
	}

	get _editorTemplate() {
		return html`
			<slot name="editor-nav" slot="header"></slot>
			<div slot="primary" class="d2l-activity-gbl-map-editor-primary-panel">
				<d2l-activity-gbl-map-editor-detail
					.href=${this.href}
					.token=${this.token}
				>
				</d2l-activity-gbl-map-editor-detail>
			</div>
			<div slot="secondary">
				<d2l-activity-gbl-map-editor-secondary
					.href=${this.href}
					.token=${this.token}
				>
				</d2l-activity-gbl-map-editor-secondary>
			</div>
		`;
	}
}

customElements.define('d2l-activity-gbl-map-editor', GblMapEditor);
