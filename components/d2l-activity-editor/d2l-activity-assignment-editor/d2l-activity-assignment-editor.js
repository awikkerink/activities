import '../d2l-activity-editor.js';
import './d2l-activity-assignment-editor-detail.js';
import { css, html, LitElement } from 'lit-element/lit-element.js';
import { AssignmentActivityUsageEntity } from 'siren-sdk/src/activities/assignments/AssignmentActivityUsageEntity.js';
import { EntityMixinLit } from 'siren-sdk/src/mixin/entity-mixin-lit.js';
import { PendingContainerMixin } from 'siren-sdk/src/mixin/pending-container-mixin.js';

class AssignmentEditor extends PendingContainerMixin(EntityMixinLit(LitElement)) {

	static get properties() {
		return {
			/**
			 * True if the user's settings allow for rendering the WYSIWYG HTML editor
			 */
			htmlEditorEnabled: { type: Boolean },
			/**
			 * API endpoint for attachment unfurling service
			 */
			unfurlEndpoint: { type: String },
			/**
			 * API endpoint for determining whether a domain is trusted
			 */
			trustedSitesEndpoint: { type: String },
			_assignmentHref: { type: String },
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
		this._setEntityType(AssignmentActivityUsageEntity);
		this._assignmentHref = '';
	}

	set _entity(entity) {
		if (this._entityHasChanged(entity)) {
			this._onAssignmentActivityUsageChange(entity);
			super._entity = entity;
		}
	}

	_onAssignmentActivityUsageChange(assignmentActivityUsage) {
		this._assignmentHref = assignmentActivityUsage.assignmentHref();
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
		return html`
			<d2l-activity-editor
				?loading="${this._hasPendingChildren && !this._initialLoadComplete}"
				unfurlEndpoint="${this.unfurlEndpoint}"
				trustedSitesEndpoint="${this.trustedSitesEndpoint}"
				@d2l-request-provider="${this._onRequestProvider}"
				@d2l-pending-resolved="${this._onPendingResolved}">

				<d2l-activity-assignment-editor-detail
					href="${this._assignmentHref}"
					.token="${this.token}"
					slot="editor">
				</d2l-activity-assignment-editor-detail>

			</d2l-activity-editor>
		`;
	}
}
customElements.define('d2l-activity-assignment-editor', AssignmentEditor);
