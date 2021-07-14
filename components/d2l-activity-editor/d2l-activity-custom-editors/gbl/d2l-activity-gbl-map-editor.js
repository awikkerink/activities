import './editor-contents/d2l-activity-gbl-map-editor-secondary.js';
import './editor-contents/d2l-activity-gbl-map-editor-detail.js';
import { css, html } from 'lit-element/lit-element.js';
import { ActivityEditorMixin } from '../../mixins/d2l-activity-editor-mixin.js';
import { shared as activityStore } from '../../state/activity-store.js';
import { AsyncContainerMixin } from '@brightspace-ui/core/mixins/async-container/async-container-mixin';
import { LocalizeActivityEditorMixin } from '../../mixins/d2l-activity-editor-lang-mixin.js';
import { MobxLitElement } from '@adobe/lit-mobx';
import { RtlMixin } from '@brightspace-ui/core/mixins/rtl-mixin.js';
import { shared as store } from './state/gbl-map-store.js';

class GblMapEditor extends AsyncContainerMixin(LocalizeActivityEditorMixin(RtlMixin(ActivityEditorMixin(MobxLitElement)))) {
	static get properties() {
		return {
			/**
			 * Is creating a new GBL map
			 */
			isNew: { type: Boolean, attribute: 'is-new' },
			/**
			 * Set the WidthType on the template to constrain the page width if necessary
			 */
			widthType: { type: String, attribute: 'width-type' },
			/**
			 * The location to return to when leaving the FACE page
			 */
			returnLocation: { type: String, attribute: 'return-location' }
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

	connectedCallback() {
		super.connectedCallback();

		this.addEventListener('d2l-activity-editor-save-complete', this._redirectOnSaveAndClose);
		this.addEventListener('d2l-activity-editor-cancel-complete', this._redirectOnCancel);
	}

	disconnectedCallback() {
		this.removeEventListener('d2l-activity-editor-save-complete', this._redirectOnSaveAndClose);
		this.removeEventListener('d2l-activity-editor-cancel-complete', this._redirectOnSaveAndClose);

		super.disconnectedCallback();
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

	_redirectOnCancel() {
		if (this.returnLocation) {
			window.location.href = this.returnLocation;
		}
	}

	_redirectOnSaveAndClose({ detail: { saveInPlace } }) {
		if (this.returnLocation && !saveInPlace) {
			window.location.href = this.returnLocation;
		}
	}
}

customElements.define('d2l-activity-gbl-map-editor', GblMapEditor);
