import '@brightspace-ui/core/components/button/button';
import '@brightspace-ui/core/components/colors/colors';
import 'd2l-tooltip/d2l-tooltip';
import { getLocalizeResources } from '../localization.js';
import { LocalizeMixin } from '@brightspace-ui/core/mixins/localize-mixin.js';
import { css, html } from 'lit-element/lit-element';
import storeName from './state-mobxs/store-name.js';
import { connect } from '../mobxs-connect-mixin.js';
import { ActivityEditorMixin } from '../d2l-activity-editor-mixin.js';
import { MobxLitElement } from '@adobe/lit-mobx';


class ActivityAttachmentsPicker extends connect(ActivityEditorMixin(LocalizeMixin(MobxLitElement))) {

	static storeName = storeName;

	static get properties() {
		return {
			_collection: { type: Object }
		};
	}

	static get styles() {
		return css`
			:host {
				display: flex;
				flex-direction: row;
				justify-content: space-between;
				align-items: center;
				background: var(--d2l-color-regolith);
				border-radius: 6px;
				border: 1px solid var(--d2l-color-mica);
				padding: 12px;
			}

			:host([hidden]) { display: none; }

			.button-container {
				display: flex;
				flex-direction: row;
			}

			.button-container > * {
				display: inline-block;
			}
		`;
	}

	static async getLocalizeResources(langs) {
		return getLocalizeResources(langs, import.meta.url);
	}

	constructor() {
		super();

		this._tooltipBoundary = {
			left: 20 + 12, // padding-left applied to d2l-activity-attachments-picker + padding-left of d2l-button-icon
			right: 0
		};
	}

	_openDialog(opener, settings, callback) {
		// const match = this.href.match(/\.(com|d2l)\/(\d+)\//);
		// if (!match || match.length < 3) {
		// 	return;
		// }
		const orgUnitId = '121213'// match[2];

		const params = new URLSearchParams();
		params.set('initialViewType', 'Items');
		params.set('canChangeType', false); // Hides the top toolbar which allows changing the dialog picker type
		params.set('outputFormat', 'html'); // Only valid value is "html"

		for (const setting in settings) {
			params.set(setting, settings[setting]);
		}

		const location = `/d2l/lp/quicklinks/manage/${orgUnitId}/CreateDialog?${params.toString()}`;

		const event = D2L.LP.Web.UI.Common.MasterPages.Dialog.Open(
			opener,
			new D2L.LP.Web.Http.UrlLocation(location)
		);

		event.AddListener(callback);

		return orgUnitId;
	}

	_launchAddQuicklinkDialog() {
		const opener = this.shadowRoot.querySelector('#add-quicklink-button');
		const settings = {
			typeKey: '',
			initialViewType: 'Default',
			pickOnly: true // Prevents creating new items from the picker
		};

		// Required for the async handler below to work in Edge
		const superEntity = super._entity;

		const orgUnitId = this._openDialog(opener, settings, async event => {
			const quicklinkUrl = `/d2l/api/lp/unstable/${orgUnitId}/quickLinks/${event.m_typeKey}/${event.m_id}`;
			const response = await fetch(quicklinkUrl);
			const json = await response.json();
			this.wrapSaveAction(superEntity.addLinkAttachment(event.m_title, json.QuickLink));
		});
	}

	_launchAddLinkDialog() {
		const opener = this.shadowRoot.querySelector('#add-link-button');
		const settings = {
			typeKey: 'url',
			customTitle: '', // Hides "Insert Quicklink" title on dialog
			showCancelButton: false, // Uses urlShowCancelButtonInline instead
			urlShowCancelButtonInline: true, // Shows the Cancel button next to Insert button
			urlShowTarget: false // Hides ability to set URL to open in same window/new window
		};

		this._openDialog(opener, settings, event => {
			this.wrapSaveAction(super._entity.addLinkAttachment(event.m_title, event.m_url));
		});
	}

	_launchAddGoogleDriveLinkDialog() {
		const opener = this.shadowRoot.querySelector('#add-google-drive-link-button');
		const settings = {
			typeKey: 'google-drive',
			customTitleLangTerm: 'Pickers.Quicklinks.titleAddMaterials',
			showCancelButton: false // Google Drive picker has its own cancel button
		};

		this._openDialog(opener, settings, event => {
			this.wrapSaveAction(super._entity.addGoogleDriveLinkAttachment(event.m_title, event.m_url));
		});
	}

	_launchAddOneDriveLinkDialog() {
		const opener = this.shadowRoot.querySelector('#add-onedrive-link-button');
		const settings = {
			typeKey: 'one-drive',
			customTitleLangTerm: 'Pickers.Quicklinks.titleAddMaterials',
			showCancelButton: false // OneDrive picker has its own cancel button
		};

		this._openDialog(opener, settings, event => {
			this.wrapSaveAction(super._entity.addOneDriveLinkAttachment(event.m_title, event.m_url));
		});
	}

	render() {
		if (!this._collection) {
			return html``;
		}

		const {
			canAddLink,
			canAddGoogleDriveLink,
			canAddOneDriveLink,
		} = this._collection;

		return html`
			<div id="button-container">
				<d2l-button-icon
					id="add-quicklink-button"
					icon="d2l-tier1:quicklink"
					?hidden="${!canAddLink}"
					@click="${this._launchAddQuicklinkDialog}">
				</d2l-button-icon>
				<d2l-tooltip
					for="add-quicklink-button"
					.boundary="${this._tooltipBoundary}">
					${this.localize('addQuicklink')}
				</d2l-tooltip>

				<d2l-button-icon
					id="add-link-button"
					icon="d2l-tier1:link"
					?hidden="${!canAddLink}"
					@click="${this._launchAddLinkDialog}">
				</d2l-button-icon>
				<d2l-tooltip
					for="add-link-button"
					.boundary="${this._tooltipBoundary}">
					${this.localize('addLink')}
				</d2l-tooltip>

				<d2l-button-icon
					id="add-google-drive-link-button"
					icon="d2l-tier1:google-drive"
					?hidden="${!canAddGoogleDriveLink}"
					@click="${this._launchAddGoogleDriveLinkDialog}">
				</d2l-button-icon>
				<d2l-tooltip
					for="add-google-drive-link-button"
					.boundary="${this._tooltipBoundary}">
					${this.localize('addGoogleDriveLink')}
				</d2l-tooltip>

				<d2l-button-icon
					id="add-onedrive-link-button"
					icon="d2l-tier1:one-drive"
					?hidden="${!canAddOneDriveLink}"
					@click="${this._launchAddOneDriveLinkDialog}">
				</d2l-button-icon>
				<d2l-tooltip
					for="add-onedrive-link-button"
					.boundary="${this._tooltipBoundary}">
					${this.localize('addOneDriveLink')}
				</d2l-tooltip>
			</div>
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
customElements.define('d2l-activity-attachments-picker', ActivityAttachmentsPicker);
