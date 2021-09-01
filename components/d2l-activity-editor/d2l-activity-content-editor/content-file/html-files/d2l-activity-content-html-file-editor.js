import { bodySmallStyles, labelStyles } from '@brightspace-ui/core/components/typography/styles.js';
import { css, html } from 'lit-element/lit-element.js';
import { activityContentEditorStyles } from '../../shared-components/d2l-activity-content-editor-styles.js';
import { activityHtmlEditorStyles } from '../../shared-components/d2l-activity-html-editor-styles.js';
import { ContentEditorConstants } from '../../constants';
import { ContentHtmlFileTemplatesEntity } from 'siren-sdk/src/activities/content/ContentHtmlFileTemplatesEntity.js';
import { Debouncer } from '@polymer/polymer/lib/utils/debounce.js';
import { fetchEntity } from '../../../state/fetch-entity.js';
import { FileEntity } from 'siren-sdk/src/files/FileEntity.js';
import { getComposedActiveElement } from '@brightspace-ui/core/helpers/focus.js';
import { timeOut } from '@polymer/polymer/lib/utils/async.js';
import { shared as htmlFileStore } from './state/content-html-file-store.js';
import { LocalizeActivityEditorMixin } from '../../../mixins/d2l-activity-editor-lang-mixin.js';
import { MobxLitElement } from '@adobe/lit-mobx';
import { RtlMixin } from '@brightspace-ui/core/mixins/rtl-mixin.js';
import { SkeletonMixin } from '@brightspace-ui/core/components/skeleton/skeleton-mixin.js';

const browseTemplateKey = 'browse';
const editorKeyInitial = 'content-page-content';

export class ContentHtmlFileEditor extends SkeletonMixin(LocalizeActivityEditorMixin(RtlMixin(MobxLitElement))) {

	static get properties() {
		return {
			htmlFileTemplates: { type: Array },
			htmlContent: { typeof: Text },
			sortHTMLTemplatesByName: { type: Boolean },
		};
	}
	static get styles() {
		return [
			super.styles,
			labelStyles,
			activityContentEditorStyles,
			activityHtmlEditorStyles,
			bodySmallStyles,
			css`
				:host > div {
					padding-bottom: 0;
				}
				.d2l-page-content-label-select-template-container {
					align-items: center;
					display: flex;
					justify-content: space-between;
					margin-bottom: 6px;
				}
				.d2l-menu-item-span {
					padding: 15px 20px;
				}
			`,
		];
	}

	constructor() {
		super();
		this.htmlContent = null;
		this.fontSize = '12pt';
		this.htmlTemplatesHref = null;
		this.htmlFileTemplates = [];
		this.firstTemplatesLoadAttempted = false;
		this.htmlFileTemplatesLoaded = false;
		this.editorKey = this.editorKeyInitial;
	}

	render() {
		const contentHtmlFileEntity = htmlFileStore.getContentHtmlFileActivity(this.href);
		let pageRenderer = undefined;

		if (contentHtmlFileEntity) {
			this.skeleton = false;
			this.htmlContent = contentHtmlFileEntity.fileContent;
			this.htmlTemplatesHref = contentHtmlFileEntity.htmlTemplatesHref;
			this.fontSize = contentHtmlFileEntity.fontSize ? `${contentHtmlFileEntity.fontSize}pt` : this.fontSize;

			pageRenderer = this._renderHtmlEditor();
		} else {
			pageRenderer = this._renderUnknownLoadingFileType();
		}

		return html`
			${pageRenderer}
			${this._renderTemplateReplacementConfirmationdialog()}
		`;
	}

	_getHtmlTemplateLoadingMenuItem() {
		return html`<p class="d2l-menu-item-span d2l-body-small">${this.localize('content.htmlTemplatesLoading')}</p>`;
	}

	async _getHtmlTemplates() {
		const htmlTemplatesResponse = await fetchEntity(this.htmlTemplatesHref, this.token);
		const htmlTemplatesEntity = new ContentHtmlFileTemplatesEntity(htmlTemplatesResponse, this.token, { remove: () => { } });
		const templates = htmlTemplatesEntity.getHtmlFileTemplates().map(rawEntity => new FileEntity(rawEntity)) || [];

		if (this.sortHTMLTemplatesByName) {
			templates.sort((a, b) => a.title().localeCompare(b.title(), undefined, { sensitivity: 'base' }));
		}

		this.htmlFileTemplates = templates;
		this.htmlFileTemplatesLoaded = true;
	}

	async _handleBrowseHtmlTemplates() {
		const location = `/d2l/le/lessons/${this.orgUnitId}/OpenTemplateDialog`;

		const dialogResult = await D2L.LP.Web.UI.Desktop.MasterPages.Dialog.Open(
			getComposedActiveElement(),
			new D2L.LP.Web.Http.UrlLocation(location),
		);

		// Called when the dialog is closed
		dialogResult.AddListener(results => {
			if (results.length !== 0) {
				this._handleBrowseHtmlTemplatesDialogClosed(results);
			}
		});
	}

	async _handleBrowseHtmlTemplatesDialogClosed([file]) {
		const valenceHost = `${window.location.protocol}//${window.location.host}`;

		const encodedFileUrl = encodeURIComponent(file.m_id);

		const fileContentUrl = `${valenceHost}/d2l/api/le/unstable/file/GetFileContents?ou=${this.orgUnitId}&filters=ConvertToAbsolutePaths&fileId=${encodedFileUrl}`;

		const response = await window.d2lfetch.fetch(new Request(fileContentUrl));

		if (response.ok) {
			const content = await response.text();

			this._tryOverwriteContent(content);
		}
	}

	_handleClickSelectTemplateButton() {
		if (!this.htmlFileTemplatesLoaded && !this.firstTemplatesLoadAttempted) {
			this.firstTemplatesLoadAttempted = true;
			this._getHtmlTemplates(this.htmlTemplatesHref);
		}
	}

	async _handleClickTemplateMenuItem(e) {
		const target = e.target.getAttribute('key');

		if (target === browseTemplateKey) {
			this._handleBrowseHtmlTemplates();
		}
		else {
			const response = await window.d2lfetch.fetch(target);

			if (response.ok) {
				const content = await response.text();

				this._tryOverwriteContent(content);
			}
		}
	}

	_handleReplaceHtmlTemplateDialogClose(e) {
		if (e.detail.action === 'yes') {
			this.htmlContent = this.replacementContent;
			this.onSave(this.htmlContent);
			this.editorKey = `${editorKeyInitial}-${Date.now().toString()}`;
		}

		this.replacementContent = null;
	}

	_onPageContentChange(e) {
		const htmlContent = e.detail.content;
		this.htmlContent = htmlContent;
	}

	_onPageContentChangeDebounced(e) {
		const htmlContent = e.detail.content;
		this._debounceJobs.description = Debouncer.debounce(
			this._debounceJobs.description,
			timeOut.after(ContentEditorConstants.DEBOUNCE_TIMEOUT),
			() => this.htmlContent = htmlContent
		);
	}

	_openReplaceHtmlTemplateDialog() {
		const dialog = this.shadowRoot.querySelector('d2l-dialog-confirm');
		dialog.opened = true;
	}

	_renderHtmlEditor() {
		const newEditorEvent = new CustomEvent('d2l-request-provider', {
			detail: { key: 'd2l-provider-html-new-editor-enabled' },
			bubbles: true,
			composed: true,
			cancelable: true
		});

		this.dispatchEvent(newEditorEvent);
		const htmlNewEditorEnabled = newEditorEvent.detail.provider;

		//@d2l-activity-text-editor-change for the new editor is on blur, while the old editor is on change
		//we don't want the debouncer on the new editor in case the user clicks directly onto a button from the editor
		const activityTextEditorChange = htmlNewEditorEnabled ? this._onPageContentChange : this._onPageContentChangeDebounced;

		return html`
			<div class="d2l-page-content-label-select-template-container">
				<label class="d2l-label-text d2l-skeletize">
					${this.localize('content.pageContent')}
				</label>
				${this._renderTemplateSelectDropdown()}
			</div>
			<div class="d2l-skeletize ${htmlNewEditorEnabled ? 'd2l-new-html-editor-container' : ''}">
				<d2l-activity-text-editor
					.ariaLabel="${this.localize('content.pageContent')}"
					.key=${this.editorKey}
					.value="${this.htmlContent}"
					@d2l-activity-text-editor-change="${activityTextEditorChange}"
					.richtextEditorConfig="${{}}"
					html-editor-height="100%"
					full-page
					full-page-font-size=${this.fontSize}
					full-page-font-family="Verdana"
				>
				</d2l-activity-text-editor>
			</div>`;
	}

	_renderHtmlTemplates() {
		if (this.htmlFileTemplates.length === 0) {
			return html`<p class="d2l-menu-item-span d2l-body-small">${this.localize('content.noHtmlTemplates')}</p>`;
		}

		return this.htmlFileTemplates.map((template) => html`<d2l-menu-item text=${template.title()} key=${template.getFileDataLocationHref()}></d2l-menu-item>`);
	}

	_renderTemplateReplacementConfirmationdialog() {
		return html`
			<d2l-dialog-confirm
				title-text="${this.localize('content.confirmDialogTitle')}"
				text="${this.localize('content.confirmDialogBody')}"
				@d2l-dialog-close=${this._handleReplaceHtmlTemplateDialogClose}
			>
				<d2l-button slot="footer" primary data-dialog-action="yes">
					${this.localize('content.confirmDialogActionOption')}
				</d2l-button>
				<d2l-button slot="footer" data-dialog-action="no">
					${this.localize('content.confirmDialogCancelOption')}
				</d2l-button>
			</d2l-dialog-confirm>
		`;
	}

	_renderTemplateSelectDropdown() {
		if (!this.htmlTemplatesHref) {
			return html``;
		}

		let label = this.localize('content.defaultHtmlTemplateHeader');

		if (this.htmlFileTemplates.length === 0) {
			label = `${label} ${this.localize('content.noHtmlTemplates')}`;
		}

		return html`
		<d2l-dropdown-button-subtle
			text=${this.localize('content.selectTemplate')}
			class="d2l-skeletize"
			@click=${this._handleClickSelectTemplateButton}
		>

		<d2l-dropdown-menu align="end">
			<d2l-menu label="${label}" @d2l-menu-item-select=${this._handleClickTemplateMenuItem}>
				<d2l-menu-item text=${this.localize('content.browseForHtmlTemplate')} key=${browseTemplateKey}></d2l-menu-item>
				<d2l-menu-item-separator></d2l-menu-item-separator>
				${this.htmlFileTemplatesLoaded ? this._renderHtmlTemplates() : this._getHtmlTemplateLoadingMenuItem()}
			</d2l-menu>
		</d2l-dropdown-menu>
	</d2l-dropdown-button-subtle>`;
	}

	_renderUnknownLoadingFileType() {
		return html`
			<d2l-activity-content-file-loading
				.href="${this.href}"
				.token="${this.token}"
			></d2l-activity-content-file-loading>
		`;
	}

	_tryOverwriteContent(htmlContent) {
		const htmlFileEntity = htmlFileStore.getContentHtmlFileActivity(this.href);

		if (htmlFileEntity.empty) {
			this.htmlContent = htmlContent;
			this.onSave(this.htmlContent);
		} else {
			this.replacementContent = htmlContent;
			this._openReplaceHtmlTemplateDialog();
		}
	}
}

customElements.define('d2l-activity-content-html-file-editor', ContentHtmlFileEditor);
