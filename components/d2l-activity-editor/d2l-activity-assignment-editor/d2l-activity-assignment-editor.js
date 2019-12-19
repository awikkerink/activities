import '../d2l-activity-editor.js';
import './d2l-activity-assignment-editor-detail.js';
import { css, html, LitElement } from 'lit-element/lit-element.js';
import { PendingContainerMixin } from 'siren-sdk/src/mixin/pending-container-mixin.js';
import { ProviderMixin } from '../instance-provider-mixin.js';
import { ActivityEditorMixin } from '../d2l-activity-editor-mixin.js';
import { connect } from '../connect-mixin.js';
import reducer, { storeName, selectActivityEntity, actions } from './state/assignment.js';


class AssignmentEditor extends ProviderMixin(connect(PendingContainerMixin(ActivityEditorMixin(LitElement)))) {

	static get properties() {
		return {
			/**
			 * True if the user's settings allow for rendering the WYSIWYG HTML editor
			 */
			htmlEditorEnabled: { type: Boolean },
			_entity: { type: Object },
			/**
			 * API endpoint for attachment unfurling service
			 */
			unfurlEndpoint: { type: String },
			/**
			 * API endpoint for determining whether a domain is trusted
			 */
			trustedSitesEndpoint: { type: String },
			_initialLoadComplete: { type: Boolean }
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
		super();
		this._storeName = storeName;
	}

	get _reducers() {
		return reducer;
	}

	_mapStateToProps(state) {
		const entity = selectActivityEntity(state, this.href, this.token);
		return entity ? {
			_entity: entity
		} : {};
	}

	_mapDispatchToProps(dispatch) {
		return {
			_fetchActivity: () => dispatch(actions.fetchActivity(this.href, this.token)),
		}
	}

	updated(changedProperties) {
		super.updated(changedProperties);

		if ((changedProperties.has('href') || changedProperties.has('token')) &&
			this.href && this.token) {
			this._fetchActivity();
		}
	}

	_onRequestProvider(e) {
		if (e.detail.key === 'd2l-provider-html-editor-enabled') {
			e.detail.provider = this.htmlEditorEnabled;
			e.stopPropagation();
		}
	}

	_onPendingResolved() {
		// Once we've loaded the page once, this prevents us from ever showing
		// the "Loading..." div again, even if page components are (re)loading
		this._initialLoadComplete = true;
	}

	render() {
		if (!this._entity) {
			return html``;
		}

		return html`
			<d2l-activity-editor
				.href="${this.href}"
				.token="${this.token}"
				?loading="${this._hasPendingChildren && !this._initialLoadComplete}"
				unfurlEndpoint="${this.unfurlEndpoint}"
				trustedSitesEndpoint="${this.trustedSitesEndpoint}"
				@d2l-request-provider="${this._onRequestProvider}"
				@d2l-pending-resolved="${this._onPendingResolved}">

				<d2l-activity-assignment-editor-detail
					href="${this._entity.assignmentHref()}"
					.token="${this.token}"
					slot="editor">
				</d2l-activity-assignment-editor-detail>

			</d2l-activity-editor>
		`;
	}
}
customElements.define('d2l-activity-assignment-editor', AssignmentEditor);
