import '@brightspace-ui/core/components/button/button';
import '@brightspace-ui/core/components/colors/colors';
import 'd2l-tooltip/d2l-tooltip';
import { css, html, LitElement } from 'lit-element/lit-element';
import { AttachmentCollectionEntity } from 'siren-sdk/src/activities/AttachmentCollectionEntity';
import { EntityMixinLit } from 'siren-sdk/src/mixin/entity-mixin-lit';
import { getLocalizeResources } from '../localization.js';
import { LocalizeMixin } from '@brightspace-ui/core/mixins/localize-mixin.js';
import { SaveStatusMixin } from '../save-status-mixin';

class ActivityAttachmentsPicker extends SaveStatusMixin(EntityMixinLit(LocalizeMixin(LitElement))) {
	static get properties() {
		return {
			_canAddFile: { type: Boolean },
			_canAddLink: { type: Boolean },
			_canAddGoogleDriveLink: { type: Boolean },
			_canAddOneDriveLink: { type: Boolean }
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
		this._setEntityType(AttachmentCollectionEntity);

		this._tooltipBoundary = {
			left: 20 + 12, // padding-left applied to d2l-activity-attachments-picker + padding-left of d2l-button-icon
			right: 0
		};
	}

	set _entity(entity) {
		if (!this._entityHasChanged(entity)) {
			return;
		}

		if (entity) {
			this._canAddFile = entity.canAddFileAttachment();
			this._canAddLink = entity.canAddLinkAttachment();
			this._canAddGoogleDriveLink = entity.canAddGoogleDriveLinkAttachment();
			this._canAddOneDriveLink = entity.canAddOneDriveLinkAttachment();
		}

		super._entity = entity;
	}

	get _orgUnitId() {
		const match = this.href.match(/\.(com|d2l)\/(\d+)\//);
		if (!match || match.length < 3) {
			return -1;
		}
		const orgUnitId = match[2];
		return orgUnitId;
	}

	_openDialog(opener, settings, callback) {
		const params = new URLSearchParams();
		params.set('initialViewType', 'Items');
		params.set('canChangeType', false); // Hides the top toolbar which allows changing the dialog picker type
		params.set('outputFormat', 'html'); // Only valid value is "html"

		for (const setting in settings) {
			params.set(setting, settings[setting]);
		}

		const location = `/d2l/lp/quicklinks/manage/${this._orgUnitId}/CreateDialog?${params.toString()}`;

		const event = D2L.LP.Web.UI.Common.MasterPages.Dialog.Open(
			opener,
			new D2L.LP.Web.Http.UrlLocation(location)
		);

		event.AddListener(callback);
	}

	_launchAddFileDialog() {
		const opener = this.shadowRoot.querySelector('#add-file-button');

		const params = new URLSearchParams();
		params.set('ou', this._orgUnitId);
		params.set('af', 'mycomputer,oufiles,sharedfiles,mylocker,grouplocker'); // Area Filters
		params.set('am', '1'); // Allow Multiple files, 1 = allow
		params.set('fsc', '0'); // Force Save to Course files, 0 = don't force
		params.set('asc', '0'); // Allow Save to Course files, 0 = don't allow
		params.set('mfs', '0'); // Max File Size, 0 = don't set (use system setting)
		params.set('afid', '0'); // Ask For Image Description, 0 = don't ask
		params.set('uih', ''); // Upload Inline Help langterm, '' = don't show any upload help text (below file picker in My Computer)
		params.set('f', ''); // Filetype, '' = allow all file types
		const location = new D2L.LP.Web.Http.UrlLocation(`/d2l/common/dialogs/file/main.d2l?${params.toString()}`);

		const buttons = [
			{
				Key: 'save',
				Text: this.localize('save'),
				ResponseType: 1, // D2L.Dialog.ResponseType.Positive
				IsPrimary: true,
				IsEnabled: true,
				Param: 'next' // key for fileArea.js
			},
			{
				Text: this.localize('back'),
				ResponseType: 2, // D2L.Dialog.ResponseType.Negative
				IsPrimary: false,
				IsEnabled: true,
				Param: 'back' // key for fileArea.js
			}
		];

		const dialog = D2L.LP.Web.UI.Legacy.MasterPages.Dialog.Open.bind(
			this,
			opener,
			location,
			'DialogCallback', // srcCallback
			'', // resizeCallback
			'files', // responseDataKey
			720, // width
			1280, // height
			this.localize('closeFilePickerDialog'), // closeText
			buttons, // buttons
			false // forceTriggerOnCancel
		);

		const dialogId = {
			GetValue: () => 'AttachmentPickerDialog'
		};

		const callback = () => {
			const files = D2L.LP.Web.UI.Desktop.MasterPages.Dialog.FileSelectorDialog.GetFiles(dialogId);
			for (const file of files) {
				const fileSystemType = file.m_fileSystemType;
				const fileId = file.m_id;
				this.wrapSaveAction(super._entity.addFileAttachment(fileSystemType, fileId));
			}
		};

		D2L.LP.Web.UI.Desktop.MasterPages.Dialog.FileSelectorDialog.OpenDialog(
			dialog,
			dialogId,
			callback
		);
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

		this._openDialog(opener, settings, async event => {
			const quicklinkUrl = `/d2l/api/lp/unstable/${this._orgUnitId}/quickLinks/${event.m_typeKey}/${event.m_id}`;
			const response = await fetch(quicklinkUrl);
			const json = await response.json();
			this.wrapSaveAction(superEntity.addLinkAttachment(event.m_title, json.QuickLinkTemplate));
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
		return html`
			<div id="button-container">
				<d2l-button-icon
					id="add-file-button"
					icon="d2l-tier1:upload"
					?hidden="${!this._canAddFile}"
					@click="${this._launchAddFileDialog}">
				</d2l-button-icon>
				<d2l-tooltip
					for="add-file-button"
					.boundary="${this._tooltipBoundary}">
					${this.localize('addFile')}
				</d2l-tooltip>

				<d2l-button-icon
					id="add-quicklink-button"
					icon="d2l-tier1:quicklink"
					?hidden="${!this._canAddLink}"
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
					?hidden="${!this._canAddLink}"
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
					?hidden="${!this._canAddGoogleDriveLink}"
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
					?hidden="${!this._canAddOneDriveLink}"
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
}
customElements.define('d2l-activity-attachments-picker', ActivityAttachmentsPicker);
